/* Central de Apuração — V7.16
   Camada sobre V7.15:
   - mapa municipal disponível com referência final do 1º turno
   - Liderança / Margem / Lula / Flávio
   - vermelho = Lula, azul = Flávio
   - zona neutra para disputa até 2 p.p.
*/
(function(){
  'use strict';

  if (window.__CENTRAL_APURACAO_V716__) return;
  window.__CENTRAL_APURACAO_V716__ = true;

  const V716_NEUTRAL = '#5b6570';
  const V716_RED = '#d71920';
  const V716_BLUE = '#2374e1';
  const V716_EMPTY = '#1a3346';

  if (!['leader','margin','lula','flavio'].includes(S.pres.mapMode)) {
    S.pres.mapMode = 'margin';
  }
  if (S.pres.mapMode === 'race') S.pres.mapMode = 'margin';

  const v716Style = document.createElement('style');
  v716Style.id = 'v716Styles';
  v716Style.textContent = `
    .v716MapHint{
      margin:8px 0 2px;
      padding:9px 10px;
      background:#081a29;
      border:1px solid #27455e;
      border-radius:11px;
      color:#b9cfdd;
      font-size:9px;
      line-height:1.45;
      font-weight:800
    }
    .v716MapHint b{color:#fff}
    .mapScale.v716margin{
      background:linear-gradient(
        90deg,
        #9c1119 0%,
        #d71920 20%,
        #d98286 41%,
        #5b6570 50%,
        #7d9fca 59%,
        #2374e1 80%,
        #1555ad 100%
      )
    }
    .mapScale.v716leader{
      background:linear-gradient(
        90deg,
        #d71920 0%,
        #d71920 42%,
        #5b6570 48%,
        #5b6570 52%,
        #2374e1 58%,
        #2374e1 100%
      )
    }
    .v716ScaleTicks{
      display:grid;
      grid-template-columns:repeat(5,1fr);
      gap:3px;
      margin:5px 2px 0;
      color:var(--muted);
      font-size:8px;
      font-weight:850;
      text-align:center
    }
    .v716ScaleTicks span:first-child{text-align:left}
    .v716ScaleTicks span:last-child{text-align:right}
    .v716Tight{
      display:inline-flex;
      align-items:center;
      gap:5px
    }
    .v716Tight i{
      width:10px;height:10px;border-radius:3px;
      display:inline-block;background:${V716_NEUTRAL}
    }
  `;
  document.head.appendChild(v716Style);

  function v716RoundIsLive(){
    return secondRoundStarted(S.pres.data);
  }

  function v716Election(){
    return v716RoundIsLive() ? ELE.pres2 : ELE.pres1;
  }

  function v716RoundLabel(){
    return v716RoundIsLive() ? '2º turno em acompanhamento' : 'referência final do 1º turno';
  }

  function v716Margin(row){
    return num(row?.p13) - num(row?.p22);
  }

  function v716TightRace(row){
    return stateRowHasVotes(row) && Math.abs(v716Margin(row)) <= 2;
  }

  function v716RaceColor(margin, mode='margin'){
    const m = Math.max(-35, Math.min(35, num(margin)));
    const a = Math.abs(m);

    if (a <= 2) return V716_NEUTRAL;

    const leaderColor = m > 0 ? V716_RED : V716_BLUE;

    if (mode === 'leader') return leaderColor;

    /*
      A intensidade começa suave depois da zona neutra e cresce
      continuamente até 25 p.p.; acima disso permanece no tom forte.
    */
    const t = Math.max(0, Math.min(1, (a - 2) / 23));
    const soft = m > 0 ? '#d9999c' : '#91add0';
    return d3.interpolateRgb(soft, leaderColor)(t);
  }

  /* Também melhora o mapa do Brasil. */
  raceColorFromMargin = function(margin){
    return v716RaceColor(margin, 'margin');
  };

  stateRowColor = function(row, mode=S.pres.mapMode){
    if (!stateRowHasVotes(row)) return V716_EMPTY;

    if (mode === 'lula') {
      const p = Math.max(0, Math.min(100, num(row.p13)));
      const t = Math.max(0, Math.min(1, (p - 20) / 50));
      return d3.interpolateRgb('#44272d', V716_RED)(.12 + .88*t);
    }

    if (mode === 'flavio') {
      const p = Math.max(0, Math.min(100, num(row.p22)));
      const t = Math.max(0, Math.min(1, (p - 20) / 50));
      return d3.interpolateRgb('#24364e', V716_BLUE)(.12 + .88*t);
    }

    return v716RaceColor(v716Margin(row), mode === 'leader' ? 'leader' : 'margin');
  };

  stateRowTooltip = function(row, name){
    if (!row || !stateRowHasVotes(row)) {
      return `${name}\nSem votos disponíveis para ${v716RoundLabel()}`;
    }

    const dif = Math.abs(v716Margin(row));
    const lead =
      v716TightRace(row) ? 'Disputa equilibrada' :
      v716Margin(row) > 0 ? 'Lula' :
      v716Margin(row) < 0 ? 'Flávio Bolsonaro' : 'Empate';

    return `${name}
${v716RoundLabel()}
Lula: ${ptxt(row.p13)} · ${nf(row.v13)} votos
Flávio Bolsonaro: ${ptxt(row.p22)} · ${nf(row.v22)} votos
${lead === 'Disputa equilibrada'
  ? `Equilíbrio: diferença de ${dif.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:2})} p.p.`
  : `Liderança entre os dois: ${lead} · ${dif.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:2})} p.p.`}
Seções totalizadas: ${ptxt(row.sections)}`;
  };

  loadStateMunicipalMap = async function(force=false){
    const uf = S.pres.uf;
    if (uf === 'br' || S.pres.stateMapLoading) return;

    const election = v716Election();
    const scopeKey = `${election}:${uf}`;

    if (!force && S.pres.stateMapUF === scopeKey && S.pres.stateMapRows.length) {
      renderStateMapStatus();
      drawStateMunicipalMap();
      return;
    }

    S.pres.stateMapLoading = true;
    S.pres.stateMapError = '';
    renderStateMapStatus();

    try {
      const packet = await centralData({
        mode:'state-municipal-map',
        election,
        cargo:'1',
        uf
      });

      S.pres.stateMapUF = scopeKey;
      S.pres.stateMapRows = packet.data?.municipalities || [];
      S.pres.stateMapMeta = {
        ...(packet.meta || {}),
        election,
        roundLabel: v716RoundLabel(),
        totalMunicipalities: packet.data?.totalMunicipalities || 0,
        okMunicipalities: packet.data?.okMunicipalities || 0,
        building: !!packet.data?.building
      };
    } catch(e) {
      S.pres.stateMapError = e.message || 'Não foi possível carregar os dados municipais.';
    } finally {
      S.pres.stateMapLoading = false;
      if (S.view === 'pres') {
        renderStateMapStatus();
        renderStateMapSummary();
        drawStateMunicipalMap();
      }
    }
  };

  renderStateMapStatus = function(){
    const box = $('#stateMapStatus');
    if (!box) return;

    const source = v716RoundLabel();

    if (S.pres.stateMapLoading) {
      box.innerHTML =
        `<div class="loading"><span class="dot"></span>Buscando mapa municipal · ${esc(source)}…</div>`;
      return;
    }

    if (S.pres.stateMapError) {
      box.innerHTML =
        `<div class="notice wait"><span class="dot"></span>${esc(S.pres.stateMapError)} A malha geográfica continua disponível.</div>`;
      return;
    }

    const meta = S.pres.stateMapMeta;

    if (meta?.building && !S.pres.stateMapRows.length) {
      box.innerHTML =
        `<div class="notice wait"><span class="dot"></span>A primeira leitura municipal da ${esc(source)} está sendo montada. O mapa continua navegável e será colorido assim que a base ficar pronta.</div>`;
      return;
    }

    if (meta && S.pres.stateMapRows.length) {
      const when = meta.fetchedAt
        ? new Date(meta.fetchedAt).toLocaleTimeString('pt-BR')
        : '';

      box.innerHTML =
        `<div class="notice"><span class="dot" style="background:var(--green)"></span>` +
        `<strong>${esc(source)}</strong> · ${nf(meta.okMunicipalities || S.pres.stateMapRows.length)} municípios com dados` +
        `${when ? ' · leitura '+when : ''}${meta.cache ? ' · cache '+esc(meta.cache) : ''}</div>`;
      return;
    }

    const qtd = S.pres.stateGeoCount ? nf(S.pres.stateGeoCount)+' municípios · ' : '';
    box.innerHTML =
      `<div class="notice"><span class="dot" style="background:var(--green)"></span>${qtd}malha municipal carregada · ${esc(source)}.</div>`;
  };

  renderStateMapSummary = function(){
    const box = $('#stateMapSummary');
    if (!box) return;

    const rows = S.pres.stateMapRows || [];
    const voted = rows.filter(stateRowHasVotes);
    const source = v716RoundLabel();

    if (!rows.length) {
      box.innerHTML = '';
      return;
    }

    if (S.pres.mun) {
      const m = selectedMunicipality();
      const row =
        rows.find(r => String(r.cdi) === String(m?.cdi)) ||
        rows.find(r => norm(r.nm) === norm(S.pres.cityName));

      if (row && stateRowHasVotes(row)) {
        const margin = Math.abs(v716Margin(row));
        const leader =
          v716TightRace(row) ? 'Equilibrado' :
          v716Margin(row) > 0 ? 'Lula' :
          v716Margin(row) < 0 ? 'Flávio' : 'Empate';

        box.innerHTML = `<div class="mapSummary">
          <div class="mini"><b>${ptxt(row.p13)}</b><span>Lula em ${esc(row.nm)}</span></div>
          <div class="mini"><b>${ptxt(row.p22)}</b><span>Flávio em ${esc(row.nm)}</span></div>
          <div class="mini"><b>${margin.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:2})} p.p.</b><span>diferença entre os dois</span></div>
          <div class="mini"><b>${esc(leader)}</b><span>${esc(source)}</span></div>
        </div>`;
      }
      return;
    }

    if (!voted.length) {
      box.innerHTML =
        `<div class="notice wait"><span class="dot"></span>Sem municípios com votos disponíveis para ${esc(source)}.</div>`;
      return;
    }

    const lula = voted.filter(r => v716Margin(r) > 2).length;
    const flavio = voted.filter(r => v716Margin(r) < -2).length;
    const tight = voted.filter(v716TightRace).length;
    const closest = [...voted].sort((a,b)=>Math.abs(v716Margin(a))-Math.abs(v716Margin(b)))[0];

    box.innerHTML = `<div class="mapSummary">
      <div class="mini"><b>${nf(lula)}</b><span>Lula à frente por mais de 2 p.p.</span></div>
      <div class="mini"><b>${nf(flavio)}</b><span>Flávio à frente por mais de 2 p.p.</span></div>
      <div class="mini"><b>${nf(tight)}</b><span>disputa equilibrada · até 2 p.p.</span></div>
      <div class="mini"><b>${closest ? esc(closest.nm) : '—'}</b><span>menor diferença do estado</span></div>
    </div>`;
  };

  renderStateMapScale = function(){
    const box = $('#stateMapScale');
    if (!box) return;

    const mode = S.pres.mapMode;

    if (mode === 'lula') {
      box.innerHTML =
        '<div class="mapScale lula"></div>' +
        '<div class="scaleLabels"><span>menor percentual Lula</span><span>maior percentual Lula</span></div>';
      return;
    }

    if (mode === 'flavio') {
      box.innerHTML =
        '<div class="mapScale flavio"></div>' +
        '<div class="scaleLabels"><span>menor percentual Flávio</span><span>maior percentual Flávio</span></div>';
      return;
    }

    if (mode === 'leader') {
      box.innerHTML =
        '<div class="mapScale v716leader"></div>' +
        '<div class="scaleLabels"><span>Lula à frente</span><span>até 2 p.p.</span><span>Flávio à frente</span></div>';
      return;
    }

    box.innerHTML =
      '<div class="mapScale v716margin"></div>' +
      '<div class="scaleLabels"><span>Lula · vantagem maior</span><span>equilíbrio · até 2 p.p.</span><span>Flávio · vantagem maior</span></div>' +
      '<div class="v716ScaleTicks"><span>20+ p.p.</span><span>10</span><span>0–2</span><span>10</span><span>20+ p.p.</span></div>';
  };

  function v716InstallMapControls(){
    if (S.pres.uf === 'br') return;

    const tools = $('.stateMapTools');
    if (!tools) return;

    let group = tools.querySelector('.modeGroup');

    if (!group) {
      group = document.createElement('div');
      group.className = 'modeGroup';
      tools.prepend(group);
    }

    group.innerHTML = `
      <button class="modeBtn ${S.pres.mapMode==='leader'?'on':''}" data-map-mode="leader" type="button">Liderança</button>
      <button class="modeBtn ${S.pres.mapMode==='margin'?'on':''}" data-map-mode="margin" type="button">Margem</button>
      <button class="modeBtn ${S.pres.mapMode==='lula'?'on':''}" data-map-mode="lula" type="button">Lula</button>
      <button class="modeBtn ${S.pres.mapMode==='flavio'?'on':''}" data-map-mode="flavio" type="button">Flávio</button>
    `;

    tools.querySelector('.mapModeWaiting')?.remove();

    group.querySelectorAll('[data-map-mode]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        S.pres.mapMode = btn.dataset.mapMode;
        group.querySelectorAll('[data-map-mode]').forEach(x=>{
          x.classList.toggle('on', x.dataset.mapMode === S.pres.mapMode);
        });
        renderStateMapScale();
        drawStateMunicipalMap();
      });
    });

    const card = tools.closest('.card');
    const eyebrow = card?.querySelector('.sectionHead .eyebrow');
    const subtitle = card?.querySelector('.sectionHead .muted');

    if (eyebrow) eyebrow.textContent = `MAPA MUNICIPAL · ${S.pres.uf.toUpperCase()} · V7.16`;
    if (subtitle && !S.pres.mun) {
      subtitle.textContent =
        `Vermelho = Lula · azul = Flávio Bolsonaro · tons mais fortes indicam vantagem maior. ` +
        `Municípios com diferença de até 2 p.p. entram na faixa de equilíbrio.`;
    }

    if (card && !card.querySelector('.v716MapHint')) {
      const hint = document.createElement('div');
      hint.className = 'v716MapHint';
      hint.innerHTML =
        `<b>${esc(v716RoundLabel())}.</b> No modo Margem, a intensidade representa o tamanho da diferença. ` +
        `<span class="v716Tight"><i></i> Faixa neutra = disputa até 2 p.p.</span>`;
      tools.insertAdjacentElement('afterend', hint);
    }

    const refresh = $('#stateMapRefresh');
    if (refresh && !refresh.dataset.v716) {
      refresh.dataset.v716 = '1';
      refresh.addEventListener('click',()=>loadStateMunicipalMap(true));
    }

    renderStateMapScale();
  }

  function v716Chrome(){
    document.title = 'Central de Apuração · V7.16';
    const title = document.querySelector('#appView .topbar h2');
    if (title) title.textContent = 'Central de Apuração V7.16';

    const foot = document.querySelector('#appView .foot');
    if (foot) {
      foot.textContent =
        'Painel independente com dados oficiais do Tribunal Superior Eleitoral. ' +
        'A V7.16 acrescenta leitura territorial por liderança e margem, com referência final do 1º turno até o início efetivo da totalização do 2º turno.';
    }
  }

  const renderPresidentV715 = renderPresident;

  renderPresident = function(){
    if (S.pres.mapMode === 'race') S.pres.mapMode = 'margin';

    renderPresidentV715();

    v716Chrome();
    v716InstallMapControls();

    /*
      O render original só solicitava cores após o início do 2º turno.
      A V7.16 busca também a referência final do 1º turno.
    */
    if (S.pres.uf !== 'br') {
      loadStateMunicipalMap(false);
      setTimeout(()=>{
        if (S.view === 'pres' && S.pres.uf !== 'br') {
          v716InstallMapControls();
          loadStateMunicipalMap(false);
        }
      }, 700);
    }
  };

  /*
    O render da V7.15 chama o render principal antigo, que por sua vez
    resolve renderPresident dinamicamente. Portanto basta substituir
    renderPresident e reaplicar a identificação da versão.
  */
  v716Chrome();
  setTimeout(v716Chrome, 300);
  setTimeout(v716Chrome, 1200);
})();
