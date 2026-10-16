/* Central de Apuração — V7.17 FINAL 2
   Análise Regional + higienização visual de versão
   - Regiões Geográficas Intermediárias do IBGE
   - agregação automática dos resultados municipais do TSE
   - destaque territorial no mapa
   - cartão da região destacada
   - panorama municipal legível no desktop
   - versão visível centralizada em V7.17
*/
(function(){
  'use strict';

  if (window.__CENTRAL_APURACAO_V717__) return;
  window.__CENTRAL_APURACAO_V717__ = true;

  const APP_VERSION = 'V7.17';
  window.CENTRAL_APURACAO_VERSION = APP_VERSION;

  const IBGE_BASE = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  const REGION_CACHE = new Map();

  if (!S.pres.regionFocus) S.pres.regionFocus = null;
  if (!S.pres.regionAnalysis) S.pres.regionAnalysis = [];

  const style = document.createElement('style');
  style.id = 'v717FinalStyles';
  style.textContent = `
    .v717RegionCard{margin-top:12px}
    .v717Status{margin:10px 0}
    .v717Summary{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:8px;
      margin-top:10px
    }
    .v717Mini{
      background:#071522;
      border:1px solid #24445d;
      border-radius:12px;
      padding:11px;
      min-width:0
    }
    .v717Mini b{
      display:block;
      font-size:17px;
      line-height:1.1;
      overflow-wrap:anywhere
    }
    .v717Mini span{
      display:block;
      margin-top:4px;
      color:var(--muted);
      font-size:8.5px;
      line-height:1.35;
      font-weight:850
    }

    #v717MapFocus{
      margin:10px 0 10px;
      display:none
    }
    #v717MapFocus.on{display:block}
    .v717FocusPanel{
      display:grid;
      grid-template-columns:minmax(0,1.5fr) repeat(3,minmax(105px,.65fr)) auto;
      gap:8px;
      align-items:stretch;
      padding:10px;
      background:#091b2a;
      border:1px solid var(--cyan);
      border-radius:12px;
      box-shadow:0 0 0 1px rgba(53,208,246,.08)
    }
    .v717FocusTitle{
      display:flex;
      flex-direction:column;
      justify-content:center;
      min-width:0
    }
    .v717FocusTitle b{
      display:block;
      color:#fff;
      font-size:15px;
      line-height:1.15;
      overflow-wrap:anywhere
    }
    .v717FocusTitle span{
      display:block;
      color:var(--muted);
      font-size:8.5px;
      font-weight:850;
      margin-top:4px
    }
    .v717FocusStat{
      background:#071522;
      border:1px solid #24445d;
      border-radius:10px;
      padding:8px 9px;
      min-width:0
    }
    .v717FocusStat b{
      display:block;
      font-size:14px;
      line-height:1.1
    }
    .v717FocusStat span{
      display:block;
      color:var(--muted);
      font-size:8px;
      margin-top:3px;
      font-weight:800
    }
    .v717RemoveBtn{
      align-self:center;
      border:1px solid #31536d;
      background:#10283a;
      color:#eaf7ff;
      border-radius:9px;
      padding:8px 10px;
      font-size:9px;
      font-weight:900;
      cursor:pointer;
      white-space:nowrap
    }

    .v717TableWrap{
      overflow:auto;
      margin-top:12px;
      border:1px solid #24445d;
      border-radius:13px
    }
    .v717Table{
      width:100%;
      min-width:860px;
      border-collapse:collapse;
      background:#071522
    }
    .v717Table th,.v717Table td{
      padding:10px 9px;
      border-bottom:1px solid #20384c;
      text-align:right;
      font-size:10px;
      vertical-align:middle
    }
    .v717Table th:first-child,.v717Table td:first-child{text-align:left}
    .v717Table th{
      color:#9eb4c5;
      background:#0a1b2a;
      font-size:8.5px;
      text-transform:uppercase;
      letter-spacing:.3px
    }
    .v717Table tr:last-child td{border-bottom:0}
    .v717Table tr.v717RowFocus td{
      background:rgba(53,208,246,.09);
      border-top:1px solid rgba(53,208,246,.55);
      border-bottom:1px solid rgba(53,208,246,.55)
    }
    .v717Table tr.v717RowFocus td:first-child{
      box-shadow:inset 3px 0 0 var(--cyan)
    }
    .v717RegionName{
      display:block;
      font-size:12px;
      font-weight:950;
      color:#fff
    }
    .v717RegionSub{
      display:block;
      margin-top:3px;
      color:var(--muted);
      font-size:8px;
      font-weight:800
    }
    .v717Red{color:#ff7378;font-weight:950}
    .v717Blue{color:#72afff;font-weight:950}
    .v717Margin{
      display:flex;
      align-items:center;
      justify-content:flex-end;
      gap:7px;
      white-space:nowrap
    }
    .v717Swatch{
      width:11px;height:11px;border-radius:3px;display:inline-block;flex:none
    }
    .v717MunicipalMix{
      white-space:nowrap;
      color:#cce0ed;
      font-weight:800
    }
    .v717MunicipalMix .r{color:#ff7378}
    .v717MunicipalMix .b{color:#72afff}
    .v717MunicipalMix .n{color:#aeb7bf}
    .v717MixShort{display:none}

    .v717FocusBtn{
      border:1px solid #31536d;
      background:#0a1b2a;
      color:#dcebf5;
      border-radius:8px;
      padding:6px 8px;
      font-size:8.5px;
      font-weight:900;
      cursor:pointer;
      white-space:nowrap
    }
    .v717FocusBtn.on{
      background:var(--cyan);
      color:#04131e;
      border-color:var(--cyan)
    }
    .v717Insights{
      display:grid;
      grid-template-columns:1fr;
      gap:8px;
      margin-top:12px
    }
    .v717Insight{
      background:#081a29;
      border:1px solid #27455e;
      border-radius:12px;
      padding:10px 11px;
      color:#dcebf5;
      font-size:10px;
      line-height:1.45
    }
    .v717Insight b{color:#fff}
    .v717Source{
      margin-top:9px;
      color:#829aae;
      font-size:8.5px;
      line-height:1.45
    }

    @media(max-width:699px){
      .v717MixFull{display:none}
      .v717MixShort{display:inline}
      .v717FocusPanel{
        grid-template-columns:repeat(2,minmax(0,1fr))
      }
      .v717FocusTitle{grid-column:1/-1}
      .v717RemoveBtn{grid-column:1/-1}
    }
    @media(min-width:700px){
      .v717Summary{grid-template-columns:repeat(4,minmax(0,1fr))}
      .v717Insights{grid-template-columns:repeat(2,minmax(0,1fr))}
    }
  `;
  document.head.appendChild(style);

  /* ------------------------------------------------------------
     Higienização visual da versão
     ------------------------------------------------------------ */
  function normalizeVisibleVersions(root=document){
    const target = root || document;
    const walker = document.createTreeWalker(
      target,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node){
          const p = node.parentElement;
          if (!p) return NodeFilter.FILTER_REJECT;
          if (['SCRIPT','STYLE'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
          return /V7\.(14|15|16)\b/.test(node.nodeValue || '')
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        }
      }
    );

    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(node=>{
      node.nodeValue = String(node.nodeValue).replace(/V7\.(14|15|16)\b/g,APP_VERSION);
    });

    document.title = `Central de Apuração · ${APP_VERSION}`;

    const top = document.querySelector('#appView .topbar h2');
    if (top) top.textContent = `Central de Apuração ${APP_VERSION}`;
  }

  let normalizeQueued = false;
  const versionObserver = new MutationObserver(()=>{
    if (normalizeQueued) return;
    normalizeQueued = true;
    requestAnimationFrame(()=>{
      normalizeQueued = false;
      normalizeVisibleVersions(document);
    });
  });

  const versionTarget = document.querySelector('#appView') || document.body;
  if (versionTarget){
    versionObserver.observe(versionTarget,{
      childList:true,
      subtree:true,
      characterData:true
    });
  }

  function v717Chrome(){
    normalizeVisibleVersions(document);

    const notice = [...document.querySelectorAll('#content .notice strong')]
      .find(x=>/Central de Dados V7\.\d+/i.test(x.textContent));
    if (notice) notice.textContent = `Central de Dados ${APP_VERSION} ativa`;

    const foot = document.querySelector('#appView .foot');
    if (foot){
      foot.textContent =
        'Painel independente com dados oficiais do Tribunal Superior Eleitoral. ' +
        'A V7.17 acrescenta análise por Regiões Geográficas Intermediárias do IBGE, ' +
        'calculada automaticamente a partir dos resultados municipais.';
    }
  }

  /* ------------------------------------------------------------
     Regionalização IBGE
     ------------------------------------------------------------ */
  async function loadIBGERegions(uf){
    const key = String(uf || '').toUpperCase();
    if (!key || key === 'BR') return new Map();

    if (REGION_CACHE.has(key)) return await REGION_CACHE.get(key);

    const promise = (async()=>{
      const url = `${IBGE_BASE}/${encodeURIComponent(key)}/municipios?orderBy=nome`;
      const r = await fetch(url,{cache:'force-cache'});
      if (!r.ok) throw new Error('IBGE HTTP '+r.status);

      const data = await r.json();
      const out = new Map();

      (Array.isArray(data) ? data : []).forEach(m=>{
        const immediate = m?.['regiao-imediata'] || null;
        const intermediate =
          immediate?.['regiao-intermediaria'] ||
          m?.microrregiao?.mesorregiao ||
          null;

        if (!intermediate?.id || !intermediate?.nome) return;

        const id = String(m?.id || '').replace(/\D/g,'');
        if (!id) return;

        out.set(id,{
          municipalityId:id,
          municipalityName:String(m?.nome || ''),
          immediateId:String(immediate?.id || ''),
          immediateName:String(immediate?.nome || ''),
          intermediateId:String(intermediate.id || ''),
          intermediateName:String(intermediate.nome || '')
        });
      });

      if (!out.size) throw new Error('O IBGE não retornou a regionalização municipal.');
      return out;
    })();

    REGION_CACHE.set(key,promise);

    try{
      const result = await promise;
      REGION_CACHE.set(key,result);
      return result;
    }catch(e){
      REGION_CACHE.delete(key);
      throw e;
    }
  }

  function regionalize(rows,regionMap){
    const groups = new Map();

    (rows || []).filter(stateRowHasVotes).forEach(row=>{
      const id = String(row?.cdi || '').replace(/\D/g,'');
      const region = regionMap.get(id);
      if (!region) return;

      const key = region.intermediateId;
      let g = groups.get(key);

      if (!g){
        g = {
          id:key,
          name:region.intermediateName,
          municipalities:0,
          v13:0,
          v22:0,
          valid:0,
          pairVotes:0,
          lulaMunicipal:0,
          flavioMunicipal:0,
          balancedMunicipal:0
        };
        groups.set(key,g);
      }

      const v13 = num(row.v13);
      const v22 = num(row.v22);
      const valid = num(row.valid);
      const margin = num(row.p13)-num(row.p22);

      g.municipalities++;
      g.v13 += v13;
      g.v22 += v22;
      g.valid += valid;
      g.pairVotes += v13+v22;

      if (Math.abs(margin)<=2) g.balancedMunicipal++;
      else if (margin>0) g.lulaMunicipal++;
      else g.flavioMunicipal++;
    });

    return [...groups.values()].map(g=>{
      const denom = g.valid || g.pairVotes;
      g.p13 = denom>0 ? 100*g.v13/denom : 0;
      g.p22 = denom>0 ? 100*g.v22/denom : 0;
      g.margin = g.p13-g.p22;
      g.absMargin = Math.abs(g.margin);
      g.leader =
        g.absMargin<=2 ? 'Equilíbrio' :
        g.margin>0 ? 'Lula' : 'Flávio Bolsonaro';
      return g;
    }).sort((a,b)=>b.margin-a.margin);
  }

  function pp(v){
    return Math.abs(num(v)).toLocaleString('pt-BR',{
      minimumFractionDigits:1,
      maximumFractionDigits:2
    })+' p.p.';
  }

  function regionColor(g){
    if (!g || Math.abs(g.margin)<=2) return '#7d8791';
    return raceColorFromMargin(g.margin);
  }

  /* ------------------------------------------------------------
     Cartão da região destacada sobre o mapa
     ------------------------------------------------------------ */
  function ensureMapFocusBox(){
    const map = $('#stateMap');
    const mapCard = map?.closest('.card');
    if (!mapCard) return null;

    let box = $('#v717MapFocus');
    if (!box){
      box = document.createElement('div');
      box.id = 'v717MapFocus';
    }

    /* Posição estável: logo após os quatro indicadores do mapa. */
    const summary = $('#stateMapSummary');
    const mapBox = map.closest('.mapBox');

    if (summary && summary.parentElement === mapCard){
      summary.insertAdjacentElement('afterend',box);
    }else if (mapBox && mapBox.parentElement === mapCard){
      mapBox.insertAdjacentElement('beforebegin',box);
    }

    return box;
  }

  function renderMapFocusBox(){
    const box = ensureMapFocusBox();
    if (!box) return;

    const focus = S.pres.regionFocus;
    if (!focus?.id){
      box.className = '';
      box.innerHTML = '';
      return;
    }

    /* O foco guarda uma cópia dos dados da região. Assim o cartão
       independe da ordem em que mapa e tabela terminaram de renderizar. */
    const g =
      (focus && Number.isFinite(Number(focus.p13)) ? focus : null) ||
      (S.pres.regionAnalysis || []).find(x=>x.id===focus.id);

    if (!g){
      box.className = '';
      box.innerHTML = '';
      return;
    }

    box.className = 'on';
    box.innerHTML = `
      <div class="v717FocusPanel">
        <div class="v717FocusTitle">
          <b>Região Intermediária de ${esc(g.name)}</b>
          <span>${nf(g.municipalities)} municípios · destaque territorial ativo</span>
        </div>
        <div class="v717FocusStat">
          <b class="v717Red">${ptxt(g.p13)}</b>
          <span>Lula · 13</span>
        </div>
        <div class="v717FocusStat">
          <b class="v717Blue">${ptxt(g.p22)}</b>
          <span>Flávio · 22</span>
        </div>
        <div class="v717FocusStat">
          <b>${esc(g.leader)}</b>
          <span>margem ${pp(g.margin)}</span>
        </div>
        <button id="v717RemoveFocus" class="v717RemoveBtn" type="button">Remover destaque</button>
      </div>
    `;

    $('#v717RemoveFocus')?.addEventListener('click',async()=>{
      S.pres.regionFocus = null;
      await drawStateMunicipalMap();
      await renderRegionAnalysis(false);
    });
  }

  async function applyRegionFocus(){
    const focus = S.pres.regionFocus;

    if (S.pres.uf==='br' || S.pres.mun || !focus?.id){
      renderMapFocusBox();
      return;
    }

    try{
      const regionMap = await loadIBGERegions(S.pres.uf);

      document.querySelectorAll('#stateMap path').forEach(path=>{
        const f = path.__data__;
        const id = String(
          f?.properties?.cd_geocmu ??
          f?.properties?.id ??
          ''
        ).replace(/\D/g,'');

        const region = regionMap.get(id);
        const same = region?.intermediateId===focus.id;

        path.style.opacity = same ? '1' : '.18';

        if (same){
          path.style.stroke = '#ffffff';
          path.style.strokeWidth = '1.05';
        }
      });

      renderMapFocusBox();
    }catch(_){
      renderMapFocusBox();
    }
  }

  async function focusRegion(region){
    if (S.pres.regionFocus?.id===region.id){
      S.pres.regionFocus = null;
    }else{
      S.pres.regionFocus = {
        ...region,
        uf:S.pres.uf
      };
    }

    await drawStateMunicipalMap();
    await renderRegionAnalysis(false);

    $('#stateMap')?.scrollIntoView({behavior:'smooth',block:'center'});
  }

  /* ------------------------------------------------------------
     Painel regional
     ------------------------------------------------------------ */
  function ensureRegionCard(){
    if (S.pres.uf==='br') return null;

    const map = $('#stateMap');
    const mapCard = map?.closest('.card');
    if (!mapCard) return null;

    let card = $('#v717RegionCard');
    if (card) return card;

    card = document.createElement('section');
    card.id = 'v717RegionCard';
    card.className = 'card v717RegionCard';
    card.innerHTML = `
      <div class="sectionHead">
        <div>
          <div class="eyebrow">ANÁLISE REGIONAL · IBGE · ${APP_VERSION}</div>
          <h2>Leitura por regiões intermediárias</h2>
          <div class="muted">
            Agrupamento oficial do IBGE. Os percentuais regionais são recalculados
            a partir dos votos municipais já carregados no painel.
          </div>
        </div>
        <button id="v717Refresh" class="btn secondary" type="button">Atualizar análise</button>
      </div>
      <div id="v717RegionBody"></div>
    `;

    mapCard.insertAdjacentElement('afterend',card);

    $('#v717Refresh')?.addEventListener('click',()=>{
      REGION_CACHE.delete(String(S.pres.uf || '').toUpperCase());
      renderRegionAnalysis(true);
    });

    return card;
  }

  function regionRow(g){
    const focus = S.pres.regionFocus?.id===g.id;

    return `
      <tr class="${focus?'v717RowFocus':''}">
        <td>
          <span class="v717RegionName">${esc(g.name)}</span>
          <span class="v717RegionSub">Região Geográfica Intermediária · IBGE</span>
        </td>
        <td><strong>${nf(g.municipalities)}</strong></td>
        <td class="v717Red">${ptxt(g.p13)}</td>
        <td class="v717Blue">${ptxt(g.p22)}</td>
        <td>
          <span class="v717Margin">
            <i class="v717Swatch" style="background:${regionColor(g)}"></i>
            <strong>${esc(g.leader)}</strong> · ${pp(g.margin)}
          </span>
        </td>
        <td>
          <span class="v717MunicipalMix">
            <span class="v717MixFull">
              <span class="r">${nf(g.lulaMunicipal)} Lula</span> ·
              <span class="n">${nf(g.balancedMunicipal)} equilibrados</span> ·
              <span class="b">${nf(g.flavioMunicipal)} Flávio</span>
            </span>
            <span class="v717MixShort">
              <span class="r">${nf(g.lulaMunicipal)} L</span> ·
              <span class="n">${nf(g.balancedMunicipal)} eq.</span> ·
              <span class="b">${nf(g.flavioMunicipal)} F</span>
            </span>
          </span>
        </td>
        <td>
          <button class="v717FocusBtn ${focus?'on':''}" data-v717-region="${esc(g.id)}" type="button">
            ${focus?'Destacada':'Destacar no mapa'}
          </button>
        </td>
      </tr>
    `;
  }

  async function renderRegionAnalysis(force=false){
    if (S.pres.uf==='br') return;

    const card = ensureRegionCard();
    const body = $('#v717RegionBody');
    if (!card || !body) return;

    const rows = S.pres.stateMapRows || [];

    if (S.pres.stateMapLoading && !rows.length){
      body.innerHTML =
        '<div class="loading"><span class="dot"></span>Aguardando os dados municipais para montar a análise regional…</div>';
      return;
    }

    if (!rows.length){
      body.innerHTML =
        '<div class="notice wait"><span class="dot"></span>A análise regional aparecerá assim que a leitura municipal estiver disponível.</div>';
      return;
    }

    if (force){
      body.innerHTML =
        '<div class="loading"><span class="dot"></span>Atualizando regionalização oficial do IBGE…</div>';
    }

    try{
      const regionMap = await loadIBGERegions(S.pres.uf);
      const regions = regionalize(rows,regionMap);
      S.pres.regionAnalysis = regions;

      if (S.pres.regionFocus?.uf && S.pres.regionFocus.uf!==S.pres.uf){
        S.pres.regionFocus = null;
      }

      if (!regions.length){
        throw new Error('Não foi possível associar os municípios às regiões do IBGE.');
      }

      const lulaRegions = regions.filter(x=>x.margin>2);
      const flavioRegions = regions.filter(x=>x.margin<-2);
      const balancedRegions = regions.filter(x=>Math.abs(x.margin)<=2);

      const bestLula = [...regions].sort((a,b)=>b.margin-a.margin)[0] || null;
      const bestFlavio = [...regions].sort((a,b)=>a.margin-b.margin)[0] || null;
      const closest = [...regions].sort((a,b)=>a.absMargin-b.absMargin)[0] || null;

      const totalMunicipalities = regions.reduce((s,x)=>s+x.municipalities,0);

      body.innerHTML = `
        <div class="v717Status">
          <div class="notice">
            <span class="dot" style="background:var(--green)"></span>
            <strong>${nf(regions.length)} regiões intermediárias analisadas</strong> ·
            ${nf(totalMunicipalities)} municípios com dados ·
            ${esc(S.pres.stateMapMeta?.roundLabel || 'leitura eleitoral atual')}
          </div>
        </div>

        <div class="v717Summary">
          <div class="v717Mini">
            <b>${nf(lulaRegions.length)}</b>
            <span>regiões com Lula mais de 2 p.p. à frente</span>
          </div>
          <div class="v717Mini">
            <b>${nf(flavioRegions.length)}</b>
            <span>regiões com Flávio mais de 2 p.p. à frente</span>
          </div>
          <div class="v717Mini">
            <b>${nf(balancedRegions.length)}</b>
            <span>regiões equilibradas · diferença até 2 p.p.</span>
          </div>
          <div class="v717Mini">
            <b>${closest ? esc(closest.name) : '—'}</b>
            <span>região intermediária com menor diferença entre os dois</span>
          </div>
        </div>

        <div class="v717TableWrap">
          <table class="v717Table">
            <thead>
              <tr>
                <th>Região intermediária</th>
                <th>Municípios</th>
                <th>Lula · 13</th>
                <th>Flávio · 22</th>
                <th>Liderança / margem</th>
                <th>Panorama municipal</th>
                <th>Mapa</th>
              </tr>
            </thead>
            <tbody>${regions.map(regionRow).join('')}</tbody>
          </table>
        </div>

        <div class="v717Insights">
          <div class="v717Insight">
            <b>Panorama regional:</b>
            Lula aparece mais de 2 p.p. à frente em ${nf(lulaRegions.length)} regiões intermediárias;
            Flávio em ${nf(flavioRegions.length)}; ${nf(balancedRegions.length)} ficam na faixa de equilíbrio.
          </div>
          <div class="v717Insight">
            <b>Maior vantagem de Lula:</b>
            ${bestLula ? `${esc(bestLula.name)} · ${pp(bestLula.margin)}` : '—'}.
          </div>
          <div class="v717Insight">
            <b>Maior vantagem de Flávio:</b>
            ${bestFlavio ? `${esc(bestFlavio.name)} · ${pp(bestFlavio.margin)}` : '—'}.
          </div>
          <div class="v717Insight">
            <b>Região mais equilibrada:</b>
            ${closest ? `${esc(closest.name)} · diferença de ${pp(closest.margin)}` : '—'}.
          </div>
        </div>

        <div class="v717Source">
          Regionalização: Regiões Geográficas Intermediárias do Instituto Brasileiro de Geografia e Estatística (IBGE).
          Resultados eleitorais: Tribunal Superior Eleitoral. A classificação de equilíbrio usa diferença de até 2 p.p.
        </div>
      `;

      body.querySelectorAll('[data-v717-region]').forEach(btn=>{
        btn.addEventListener('click',()=>{
          const id = btn.dataset.v717Region;
          const region = regions.find(x=>x.id===id);
          if (region) focusRegion(region);
        });
      });

      await applyRegionFocus();
      renderMapFocusBox();
      v717Chrome();

    }catch(e){
      body.innerHTML =
        `<div class="notice wait"><span class="dot"></span>Não foi possível carregar a regionalização do IBGE agora. ${esc(e.message || '')}</div>`;
    }
  }

  /* ------------------------------------------------------------
     Integração com V7.16
     ------------------------------------------------------------ */
  const drawStateMunicipalMapV716 = drawStateMunicipalMap;
  drawStateMunicipalMap = async function(){
    await drawStateMunicipalMapV716();
    await applyRegionFocus();
  };

  const loadStateMunicipalMapV716 = loadStateMunicipalMap;
  loadStateMunicipalMap = async function(force=false){
    await loadStateMunicipalMapV716(force);

    if (S.view==='pres' && S.pres.uf!=='br'){
      ensureRegionCard();
      ensureMapFocusBox();
      await renderRegionAnalysis(false);
    }
  };

  const renderPresidentV716 = renderPresident;
  renderPresident = function(){
    if (S.pres.mun) S.pres.regionFocus = null;
    if (S.pres.regionFocus?.uf && S.pres.regionFocus.uf!==S.pres.uf){
      S.pres.regionFocus = null;
    }

    renderPresidentV716();
    v717Chrome();

    if (S.pres.uf!=='br'){
      ensureMapFocusBox();
      ensureRegionCard();
      renderRegionAnalysis(false);
    }
  };

  const renderHomeV716 = renderHome;
  renderHome = function(){
    renderHomeV716();
    v717Chrome();

    const firstGrid = document.querySelector('#content .grid');
    if (firstGrid && !firstGrid.querySelector('[data-open="regional"]')){
      const module = document.createElement('button');
      module.className = 'module';
      module.type = 'button';
      module.dataset.open = 'regional';
      module.innerHTML = `
        <h3>Análise Regional · IBGE</h3>
        <p>Compare a força territorial de Lula e Flávio nas regiões intermediárias oficiais do IBGE.</p>
        <span class="tag">NOVO · ${APP_VERSION}</span>
      `;
      module.addEventListener('click',()=>{
        S.pres.uf = S.pres.uf==='br' ? 'mg' : S.pres.uf;
        S.pres.mun = '';
        S.pres.cityName = '';
        setView('pres');
      });
      firstGrid.appendChild(module);
    }

    normalizeVisibleVersions(document);
  };

  v717Chrome();
  setTimeout(v717Chrome,300);
  setTimeout(v717Chrome,1200);
})();
