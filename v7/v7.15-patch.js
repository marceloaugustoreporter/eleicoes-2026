/* Central de Apuração — V7.15
   Camada de evolução sobre a V7.14:
   - Comparação entre dois municípios
   - Cadastro Eleitoral 2026 já consolidado no Supabase
   - Rotina antiga de importação estadual desativada
*/
(function () {
  'use strict';

  if (window.__CENTRAL_APURACAO_V715__) return;
  window.__CENTRAL_APURACAO_V715__ = true;

  const V715 = 'V7.15';

  /* ------------------------------------------------------------
     Cadastro eleitoral
     A base nacional já está consolidada em
     official_municipal_electorate_2026. Não é mais necessário
     disparar importação pesada por estado.
  ------------------------------------------------------------- */
  try {
    S.electorateImports = {};
    maybeImportRadarElectorate = async function () { return null; };
    importOfficialElectorateState = async function () { return null; };
  } catch (e) {
    console.warn('V7.15: não foi possível neutralizar a rotina antiga de importação.', e);
  }

  /* ------------------------------------------------------------
     Estado da comparação
  ------------------------------------------------------------- */
  if (!S.compare) {
    S.compare = {
      a: { uf: 'mg', cityName: 'Passos', mun: '' },
      b: { uf: 'sp', cityName: 'Franca', mun: '' },
      loading: false,
      error: '',
      last: null,
      requestSeq: 0,
      result: null
    };
  }

  /* ------------------------------------------------------------
     Estilos
  ------------------------------------------------------------- */
  const style = document.createElement('style');
  style.id = 'v715Styles';
  style.textContent = `
    .comparePickers{
      display:grid;
      grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);
      gap:10px;
      align-items:stretch;
      margin-top:14px
    }
    .comparePicker{
      background:#071522;
      border:1px solid #24445d;
      border-radius:14px;
      padding:12px;
      min-width:0
    }
    .comparePickerGrid{
      display:grid;
      grid-template-columns:minmax(135px,.8fr) minmax(0,1.4fr);
      gap:8px;
      margin-top:8px
    }
    .compareSwap{
      align-self:center;
      width:44px;
      height:44px;
      border-radius:50%;
      border:1px solid #31516b;
      background:#10283a;
      color:#eaf8ff;
      font-size:20px;
      font-weight:900;
      cursor:pointer
    }
    .compareTopActions{
      display:flex;
      gap:8px;
      flex-wrap:wrap;
      margin-top:10px
    }
    .compareHero{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:8px;
      margin-top:12px
    }
    .compareKpi{
      background:#071522;
      border:1px solid #24445d;
      border-radius:13px;
      padding:12px;
      min-width:0
    }
    .compareKpi strong{
      display:block;
      font-size:20px;
      line-height:1.08;
      overflow-wrap:anywhere
    }
    .compareKpi span{
      display:block;
      margin-top:4px;
      color:var(--muted);
      font-size:9px;
      font-weight:850;
      line-height:1.35
    }
    .compareTableWrap{
      overflow:auto;
      margin-top:12px;
      border:1px solid #24445d;
      border-radius:13px
    }
    .compareTable{
      width:100%;
      border-collapse:collapse;
      min-width:790px;
      background:#071522
    }
    .compareTable th,
    .compareTable td{
      padding:11px 10px;
      border-bottom:1px solid #20384c;
      text-align:right;
      font-size:11px
    }
    .compareTable th:first-child,
    .compareTable td:first-child{text-align:left}
    .compareTable th{
      color:#9eb4c5;
      font-size:9px;
      letter-spacing:.35px;
      text-transform:uppercase;
      background:#0a1b2a
    }
    .compareTable tr:last-child td{border-bottom:0}
    .compareScope{
      display:block;
      font-size:13px;
      font-weight:950
    }
    .compareRound{
      display:block;
      margin-top:3px;
      color:var(--muted);
      font-size:8.5px;
      font-weight:800
    }
    .compareInsights{
      display:grid;
      grid-template-columns:1fr;
      gap:8px;
      margin-top:12px
    }
    .compareInsight{
      background:#081a29;
      border:1px solid #27455e;
      border-radius:12px;
      padding:11px 12px;
      font-size:11px;
      line-height:1.5;
      color:#dcebf5
    }
    .compareInsight b{color:#fff}
    .compareActions{
      display:flex;
      gap:8px;
      flex-wrap:wrap;
      margin-top:12px
    }
    @media(min-width:700px){
      .compareHero{grid-template-columns:repeat(4,minmax(0,1fr))}
      .compareInsights{grid-template-columns:repeat(2,minmax(0,1fr))}
    }
    @media(max-width:699px){
      .comparePickers{grid-template-columns:1fr}
      .compareSwap{justify-self:center;transform:rotate(90deg)}
      .comparePickerGrid{grid-template-columns:1fr}
    }
  `;
  document.head.appendChild(style);

  /* ------------------------------------------------------------
     Identidade visual / versão
  ------------------------------------------------------------- */
  function updateV715Chrome() {
    document.title = 'Central de Apuração · V7.15';

    const title = document.querySelector('#appView .topbar h2');
    if (title) title.textContent = 'Central de Apuração V7.15';

    const foot = document.querySelector('#appView .foot');
    if (foot) {
      foot.textContent =
        'Painel independente com dados oficiais do Tribunal Superior Eleitoral. ' +
        'A V7.15 integra o Cadastro Eleitoral 2026 dos 5.571 municípios, mantém ' +
        'totalização e mapas separados e acrescenta comparação direta entre municípios.';
    }

    const nav = document.querySelector('#appView .nav');
    if (nav && !nav.querySelector('[data-view="compare"]')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.view = 'compare';
      btn.textContent = 'Comparar Municípios';

      const gov = nav.querySelector('[data-view="gov"]');
      if (gov) nav.insertBefore(btn, gov);
      else nav.appendChild(btn);

      btn.addEventListener('click', () => setView('compare'));
    }

    document.querySelectorAll('[data-view]').forEach(b => {
      b.classList.toggle('on', b.dataset.view === S.view);
    });
  }

  /* ------------------------------------------------------------
     Resolução de município
  ------------------------------------------------------------- */
  async function resolveCompareMunicipality(slot) {
    const all = await loadMunicipalities();
    const arr = all[slot.uf] || [];

    if (slot.mun) {
      const current = arr.find(x => String(x.cd) === String(slot.mun));
      if (current) {
        slot.cityName = current.nm;
        return current;
      }
    }

    const q = norm(slot.cityName || '');
    const m =
      arr.find(x => norm(x.nm) === q) ||
      arr.find(x => norm(x.nm).startsWith(q)) ||
      arr.find(x => norm(x.nm).includes(q));

    if (!m) {
      throw new Error(
        `${slot.cityName || 'Município'} não foi localizado na lista oficial do TSE para ` +
        `${UF_NAMES[slot.uf] || slot.uf.toUpperCase()}.`
      );
    }

    slot.mun = m.cd;
    slot.cityName = m.nm;
    return m;
  }

  async function fetchCompareBundle(slot) {
    const m = await resolveCompareMunicipality(slot);
    const uf = slot.uf;

    const [reference, live, official] = await Promise.allSettled([
      centralData({ mode: 'result', election: ELE.pres1, cargo: '1', uf, mun: m.cd }),
      centralData({ mode: 'result', election: ELE.pres2, cargo: '1', uf, mun: m.cd }),
      loadOfficialMunicipalElectorate(uf, m.cd)
    ]);

    return {
      municipality: m,
      reference: reference.status === 'fulfilled' ? reference.value.data : null,
      referenceMeta: reference.status === 'fulfilled' ? reference.value.meta || null : null,
      live: live.status === 'fulfilled' ? live.value.data : null,
      liveMeta: live.status === 'fulfilled' ? live.value.meta || null : null,
      official: official.status === 'fulfilled' ? official.value : null
    };
  }

  /* ------------------------------------------------------------
     Motor da comparação
  ------------------------------------------------------------- */
  async function loadCompare(refreshOnly = false) {
    if (S.compare.loading) return;

    const seq = ++S.compare.requestSeq;
    S.compare.loading = true;
    S.compare.error = '';
    renderCompareBody();

    try {
      const [a, b] = await Promise.all([
        fetchCompareBundle(S.compare.a),
        fetchCompareBundle(S.compare.b)
      ]);

      if (seq !== S.compare.requestSeq) return;

      if (
        S.compare.a.uf === S.compare.b.uf &&
        String(S.compare.a.mun) === String(S.compare.b.mun)
      ) {
        throw new Error('Escolha dois municípios diferentes para fazer a comparação.');
      }

      if (!a.reference || !b.reference) {
        throw new Error('Não foi possível carregar a referência final do 1º turno para os dois municípios.');
      }

      /*
        Só migra a comparação inteira para o 2º turno quando ambos os
        municípios tiverem votos. Assim não se misturam rodadas.
      */
      const useLive = secondRoundStarted(a.live) && secondRoundStarted(b.live);

      const sourceA = useLive
        ? { data: a.live, round: '2º turno', live: true }
        : { data: a.reference, round: '1º turno · referência', live: false };

      const sourceB = useLive
        ? { data: b.live, round: '2º turno', live: true }
        : { data: b.reference, round: '1º turno · referência', live: false };

      const labelA = displayCityName(S.compare.a.cityName);
      const labelB = displayCityName(S.compare.b.cityName);

      const snapA = radarSnapshot(sourceA, labelA);
      const snapB = radarSnapshot(sourceB, labelB);

      S.compare.result = {
        a,
        b,
        snapA,
        snapB,
        useLive,
        roundLabel: useLive ? '2º turno em acompanhamento' : 'Referência final do 1º turno'
      };

      S.compare.last = new Date();
    } catch (e) {
      if (seq === S.compare.requestSeq) {
        S.compare.error = e.message || 'Não foi possível comparar os municípios.';
      }
    } finally {
      if (seq === S.compare.requestSeq) {
        S.compare.loading = false;
        if (S.view === 'compare') renderCompareBody();
      }
    }
  }

  function comparePctDifference(valueA, valueB, nameA, nameB, label) {
    const d = num(valueA) - num(valueB);
    if (Math.abs(d) < 0.005) {
      return `<b>${esc(label)}:</b> os dois municípios registram praticamente o mesmo percentual.`;
    }
    const higher = d > 0 ? nameA : nameB;
    const lower = d > 0 ? nameB : nameA;
    return `<b>${esc(label)}:</b> ${esc(higher)} está ${radarPP(Math.abs(d))} acima de ${esc(lower)}.`;
  }

  function buildCompareInsights(r) {
    const a = r.snapA;
    const b = r.snapB;
    const nameA = displayCityName(S.compare.a.cityName);
    const nameB = displayCityName(S.compare.b.cityName);

    const electA = num(r.a.official?.voters || a.stats.apt);
    const electB = num(r.b.official?.voters || b.stats.apt);
    const electDiff = electA - electB;

    const out = [];

    if (electA || electB) {
      if (electDiff === 0) {
        out.push(`<b>Eleitorado:</b> ${esc(nameA)} e ${esc(nameB)} têm o mesmo número de eleitores aptos.`);
      } else {
        const bigger = electDiff > 0 ? nameA : nameB;
        const smaller = electDiff > 0 ? nameB : nameA;
        out.push(
          `<b>Eleitorado:</b> ${esc(bigger)} tem ${nf(Math.abs(electDiff))} eleitores aptos a mais que ${esc(smaller)}.`
        );
      }
    }

    out.push(comparePctDifference(a.p13, b.p13, nameA, nameB, 'Lula · 13'));
    out.push(comparePctDifference(a.p22, b.p22, nameA, nameB, 'Flávio · 22'));

    const marginDiff = a.margin - b.margin;
    if (Math.abs(marginDiff) < 0.005) {
      out.push(`<b>Distância entre os dois:</b> a margem é praticamente igual nos dois municípios.`);
    } else {
      const wider = marginDiff > 0 ? nameA : nameB;
      const narrower = marginDiff > 0 ? nameB : nameA;
      out.push(
        `<b>Distância entre os dois:</b> ${esc(wider)} tem margem ${radarPP(Math.abs(marginDiff))} maior que ${esc(narrower)}.`
      );
    }

    if (a.leader === b.leader) {
      out.push(
        `<b>Liderança entre Lula e Flávio:</b> ${esc(a.leader)} aparece à frente nos dois municípios.`
      );
    } else {
      out.push(
        `<b>Lideranças diferentes:</b> ${esc(a.leader)} aparece à frente em ${esc(nameA)}, enquanto ` +
        `${esc(b.leader)} lidera em ${esc(nameB)}.`
      );
    }

    if (a.stats.pabs || b.stats.pabs) {
      const absDiff = num(a.stats.pabs) - num(b.stats.pabs);
      if (Math.abs(absDiff) >= 0.005) {
        const higher = absDiff > 0 ? nameA : nameB;
        const lower = absDiff > 0 ? nameB : nameA;
        out.push(
          `<b>Abstenção:</b> ${esc(higher)} registra taxa ${radarPP(Math.abs(absDiff))} maior que ${esc(lower)}.`
        );
      }
    }

    return out;
  }

  function compareRow(slot, bundle, snap) {
    const city = displayCityName(slot.cityName);
    const electorate = num(bundle.official?.voters || snap.stats.apt);

    return `
      <tr>
        <td>
          <span class="compareScope">${esc(city)} · ${esc(slot.uf.toUpperCase())}</span>
          <span class="compareRound">${esc(snap.round)}</span>
        </td>
        <td><strong>${electorate ? nf(electorate) : '—'}</strong></td>
        <td class="radarRed">${snap.data ? ptxt(snap.p13) : '—'}</td>
        <td class="radarBlue">${snap.data ? ptxt(snap.p22) : '—'}</td>
        <td>
          <strong>${snap.data ? esc(snap.leader) : '—'}</strong>
          ${snap.data ? `<span class="compareRound">diferença ${radarPP(snap.margin)}</span>` : ''}
        </td>
        <td>${snap.stats.pabs ? ptxt(snap.stats.pabs) : '—'}</td>
      </tr>
    `;
  }

  function openCompareSideInRadar(side) {
    const slot = S.compare[side];
    if (!slot?.mun) return;

    S.radar.uf = slot.uf;
    S.radar.mun = slot.mun;
    S.radar.cityName = slot.cityName;

    if (typeof resetRadarData === 'function') resetRadarData();

    setView('radar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ------------------------------------------------------------
     Tela da comparação
  ------------------------------------------------------------- */
  function renderCompare() {
    updateV715Chrome();

    const a = S.compare.a;
    const b = S.compare.b;

    content.innerHTML = `
      <section class="card">
        <div class="sectionHead">
          <div>
            <div class="eyebrow">COMPARAR MUNICÍPIOS · V7.15</div>
            <h2>${esc(displayCityName(a.cityName))} × ${esc(displayCityName(b.cityName))}</h2>
            <div class="muted">
              Compare dois municípios de qualquer estado. Eleitorado, votação presidencial,
              liderança, margem e abstenção são colocados lado a lado. A comparação só muda
              para o 2º turno quando houver votos nas duas cidades.
            </div>
          </div>
          <button id="compareRefresh" class="btn secondary" type="button">Atualizar</button>
        </div>

        <div class="comparePickers">
          <div class="comparePicker">
            <div class="eyebrow">MUNICÍPIO A</div>
            <div class="comparePickerGrid">
              <select id="compareUfA">
                ${UFS.map(uf => `<option value="${uf}">${UF_NAMES[uf]} · ${uf.toUpperCase()}</option>`).join('')}
              </select>
              <div>
                <input id="compareCityA" list="compareCityListA" placeholder="Digite o município" autocomplete="off">
                <datalist id="compareCityListA"></datalist>
              </div>
            </div>
          </div>

          <button id="compareSwap" class="compareSwap" type="button" title="Inverter municípios">⇄</button>

          <div class="comparePicker">
            <div class="eyebrow">MUNICÍPIO B</div>
            <div class="comparePickerGrid">
              <select id="compareUfB">
                ${UFS.map(uf => `<option value="${uf}">${UF_NAMES[uf]} · ${uf.toUpperCase()}</option>`).join('')}
              </select>
              <div>
                <input id="compareCityB" list="compareCityListB" placeholder="Digite o município" autocomplete="off">
                <datalist id="compareCityListB"></datalist>
              </div>
            </div>
          </div>
        </div>

        <div class="compareTopActions">
          <button id="compareGo" class="btn" type="button">Comparar municípios</button>
        </div>

        <div id="compareBody"></div>
      </section>
    `;

    const ufA = $('#compareUfA');
    const ufB = $('#compareUfB');
    const cityA = $('#compareCityA');
    const cityB = $('#compareCityB');
    const listA = $('#compareCityListA');
    const listB = $('#compareCityListB');

    ufA.value = a.uf;
    ufB.value = b.uf;
    cityA.value = displayCityName(a.cityName);
    cityB.value = displayCityName(b.cityName);

    fillCitySuggestions(a.uf, listA);
    fillCitySuggestions(b.uf, listB);

    ufA.addEventListener('change', async () => {
      cityA.value = '';
      await fillCitySuggestions(ufA.value, listA);
    });

    ufB.addEventListener('change', async () => {
      cityB.value = '';
      await fillCitySuggestions(ufB.value, listB);
    });

    $('#compareGo').addEventListener('click', () => {
      const typedA = cityA.value.trim();
      const typedB = cityB.value.trim();

      if (!typedA || !typedB) {
        alert('Digite os dois municípios que deseja comparar.');
        return;
      }

      S.compare.a = { uf: ufA.value, cityName: typedA, mun: '' };
      S.compare.b = { uf: ufB.value, cityName: typedB, mun: '' };
      S.compare.result = null;
      S.compare.error = '';
      loadCompare(false);
    });

    $('#compareRefresh').addEventListener('click', () => loadCompare(true));

    $('#compareSwap').addEventListener('click', () => {
      const oldA = { ...S.compare.a };
      S.compare.a = { ...S.compare.b };
      S.compare.b = oldA;
      S.compare.result = null;
      S.compare.error = '';
      renderCompare();
      loadCompare(false);
    });

    renderCompareBody();

    if (!S.compare.result && !S.compare.loading) loadCompare(false);

    startTimer(() => loadCompare(true), POLL);
  }

  function renderCompareBody() {
    const box = $('#compareBody');
    if (!box) return;

    if (S.compare.loading && !S.compare.result) {
      box.innerHTML = `
        <div class="loading">
          <span class="dot"></span>
          Carregando os dois municípios e preparando a comparação…
        </div>
      `;
      return;
    }

    const r = S.compare.result;

    if (!r) {
      box.innerHTML = S.compare.error
        ? `<div class="notice wait"><span class="dot"></span>${esc(S.compare.error)}</div>`
        : '';
      return;
    }

    const nameA = displayCityName(S.compare.a.cityName);
    const nameB = displayCityName(S.compare.b.cityName);

    const electA = num(r.a.official?.voters || r.snapA.stats.apt);
    const electB = num(r.b.official?.voters || r.snapB.stats.apt);
    const totalElectorate = electA + electB;

    const biggerElectorate =
      electA >= electB
        ? { name: nameA, voters: electA }
        : { name: nameB, voters: electB };

    const widerMargin =
      r.snapA.margin >= r.snapB.margin
        ? { name: nameA, margin: r.snapA.margin }
        : { name: nameB, margin: r.snapB.margin };

    const progressText = r.useLive
      ? `${Math.min(totalPct(r.snapA.data), totalPct(r.snapB.data)).toLocaleString('pt-BR', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        })}% ou mais`
      : '1º turno encerrado';

    const insights = buildCompareInsights(r);

    const updated = S.compare.last
      ? ` · leitura ${S.compare.last.toLocaleTimeString('pt-BR')}`
      : '';

    box.innerHTML = `
      <div class="notice ${r.useLive ? '' : 'wait'}">
        <span class="dot" style="background:${r.useLive ? 'var(--green)' : 'var(--yellow)'}"></span>
        <strong>${esc(r.roundLabel)}</strong>
        · mesma rodada usada para os dois municípios${updated}
      </div>

      ${S.compare.error
        ? `<div class="dataSourceNote">Última atualização parcial: ${esc(S.compare.error)}</div>`
        : ''}

      <div class="compareHero">
        <div class="compareKpi">
          <strong>${nf(totalElectorate)}</strong>
          <span>eleitores aptos somados nos dois municípios</span>
        </div>
        <div class="compareKpi">
          <strong>${esc(biggerElectorate.name)}</strong>
          <span>maior eleitorado · ${nf(biggerElectorate.voters)} aptos</span>
        </div>
        <div class="compareKpi">
          <strong>${esc(widerMargin.name)}</strong>
          <span>maior distância entre Lula e Flávio · ${radarPP(widerMargin.margin)}</span>
        </div>
        <div class="compareKpi">
          <strong>${esc(progressText)}</strong>
          <span>${r.useLive ? 'menor avanço de totalização entre as duas cidades' : 'base comum usada na comparação'}</span>
        </div>
      </div>

      <div class="sectionTitle" style="font-size:16px">${esc(nameA)} × ${esc(nameB)}</div>

      <div class="compareTableWrap">
        <table class="compareTable">
          <thead>
            <tr>
              <th>Município</th>
              <th>Eleitores aptos</th>
              <th>Lula · 13</th>
              <th>Flávio · 22</th>
              <th>Liderança entre os dois</th>
              <th>Abstenção</th>
            </tr>
          </thead>
          <tbody>
            ${compareRow(S.compare.a, r.a, r.snapA)}
            ${compareRow(S.compare.b, r.b, r.snapB)}
          </tbody>
        </table>
      </div>

      <div class="sectionTitle" style="font-size:16px">Leituras da comparação</div>
      <div class="compareInsights">
        ${insights.map(x => `<div class="compareInsight">${x}</div>`).join('')}
      </div>

      <div class="compareActions">
        <button id="compareOpenA" class="btn" type="button">Abrir Radar de ${esc(nameA)}</button>
        <button id="compareOpenB" class="btn secondary" type="button">Abrir Radar de ${esc(nameB)}</button>
      </div>

      <div class="dataSourceNote">
        Fonte: Tribunal Superior Eleitoral. Eleitorado apto vem do Cadastro Eleitoral 2026.
        A comparação não mistura rodadas: enquanto o 2º turno não tiver votos nos dois
        municípios, os dois lados permanecem na referência final do 1º turno.
      </div>
    `;

    $('#compareOpenA')?.addEventListener('click', () => openCompareSideInRadar('a'));
    $('#compareOpenB')?.addEventListener('click', () => openCompareSideInRadar('b'));
  }

  /* ------------------------------------------------------------
     Integração com as telas existentes
  ------------------------------------------------------------- */
  const renderOriginal = render;
  const renderHomeOriginal = renderHome;
  const renderRadarOriginal = renderRadar;

  renderHome = function () {
    renderHomeOriginal();

    const firstGrid = content.querySelector('.grid');
    if (firstGrid && !firstGrid.querySelector('[data-open="compare"]')) {
      const module = document.createElement('button');
      module.className = 'module';
      module.type = 'button';
      module.dataset.open = 'compare';
      module.innerHTML = `
        <h3>Comparar municípios</h3>
        <p>Coloque duas cidades lado a lado e compare eleitorado, Lula, Flávio, margem e abstenção.</p>
        <span class="tag">NOVO · V7.15</span>
      `;

      const radarModule = firstGrid.querySelector('[data-open="radar"]');
      if (radarModule?.nextSibling) firstGrid.insertBefore(module, radarModule.nextSibling);
      else firstGrid.appendChild(module);

      module.addEventListener('click', () => setView('compare'));
    }

    const centralNotice = [...content.querySelectorAll('.notice strong')]
      .find(x => x.textContent.includes('Central de Dados V7.14'));

    if (centralNotice) centralNotice.textContent = 'Central de Dados V7.15 ativa';

    updateV715Chrome();
  };

  renderRadar = function () {
    renderRadarOriginal();

    const eyebrow = content.querySelector('.sectionHead .eyebrow');
    if (eyebrow && eyebrow.textContent.includes('RADAR MUNICIPAL')) {
      eyebrow.textContent = 'RADAR MUNICIPAL · V7.15';
    }

    updateV715Chrome();
  };

  render = function () {
    if (S.view === 'compare') {
      renderCompare();
      return;
    }

    renderOriginal();
    updateV715Chrome();
  };

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && S.user && S.view === 'compare') {
      loadCompare(true);
    }
  });

  updateV715Chrome();

  /*
    A sessão pode terminar de carregar logo depois deste arquivo.
    A reaplicação apenas atualiza rótulos; não interfere na autenticação.
  */
  setTimeout(updateV715Chrome, 300);
  setTimeout(updateV715Chrome, 1200);
})();
