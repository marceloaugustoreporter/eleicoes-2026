/* Central de Apuração — V7.18 FINAL 2
   Rankings e Curiosidades Eleitorais
   - rankings municipais automáticos
   - maior vantagem de Lula
   - maior vantagem de Flávio
   - disputas mais equilibradas
   - curiosidades territoriais e regionais
   - acesso direto ao município ranqueado
*/
(function(){
  'use strict';

  if (window.__CENTRAL_APURACAO_V718__) return;
  window.__CENTRAL_APURACAO_V718__ = true;

  const APP_VERSION = 'V7.18';
  window.CENTRAL_APURACAO_VERSION = APP_VERSION;

  const style = document.createElement('style');
  style.id = 'v718Styles';
  style.textContent = `
    .v718Card{margin-top:12px}
    .v718Kpis{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:8px;
      margin-top:10px
    }
    .v718Kpi{
      background:#071522;
      border:1px solid #24445d;
      border-radius:12px;
      padding:11px;
      min-width:0
    }
    .v718Kpi b{
      display:block;
      color:#fff;
      font-size:16px;
      line-height:1.15;
      overflow-wrap:anywhere
    }
    .v718Kpi span{
      display:block;
      margin-top:4px;
      color:var(--muted);
      font-size:8.5px;
      line-height:1.35;
      font-weight:850
    }
    .v718Kpi.red b{color:#ff7378}
    .v718Kpi.blue b{color:#72afff}
    .v718Kpi.neutral b{color:#c7d0d8}

    .v718Ranks{
      display:grid;
      grid-template-columns:1fr;
      gap:10px;
      margin-top:12px
    }
    .v718RankBox{
      background:#071522;
      border:1px solid #24445d;
      border-radius:13px;
      overflow:hidden
    }
    .v718RankHead{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:8px;
      padding:10px 11px;
      background:#0a1b2a;
      border-bottom:1px solid #24445d
    }
    .v718RankHead b{
      font-size:11px;
      color:#fff
    }
    .v718RankHead span{
      font-size:8px;
      color:var(--muted);
      font-weight:850
    }
    .v718RankRow{
      display:grid;
      grid-template-columns:26px minmax(0,1.35fr) minmax(82px,.9fr) auto;
      align-items:center;
      gap:6px;
      padding:9px 9px;
      border-bottom:1px solid #1d3548
    }
    .v718RankRow:last-child{border-bottom:0}
    .v718Pos{
      width:25px;
      height:25px;
      display:grid;
      place-items:center;
      border-radius:8px;
      background:#0d2638;
      color:#a8c0d0;
      font-size:9px;
      font-weight:950
    }
    .v718City{
      min-width:0
    }
    .v718City b{
      display:block;
      font-size:10px;
      color:#fff;
      white-space:normal;
      overflow:visible;
      text-overflow:clip;
      overflow-wrap:anywhere;
      line-height:1.18
    }
    .v718City span{
      display:block;
      margin-top:2px;
      color:var(--muted);
      font-size:7.5px;
      font-weight:800
    }
    .v718Value{
      text-align:right;
      min-width:0
    }
    .v718Value b{
      display:block;
      font-size:10px
    }
    .v718Value span{
      display:block;
      margin-top:2px;
      color:var(--muted);
      font-size:7.2px;
      font-weight:800;
      line-height:1.22;
      white-space:normal
    }
    .v718Value.red b{color:#ff7378}
    .v718Value.blue b{color:#72afff}
    .v718Value.neutral b{color:#c7d0d8}

    .v718Open{
      border:1px solid #31536d;
      background:#0a1b2a;
      color:#dcebf5;
      border-radius:8px;
      padding:5px 6px;
      font-size:7.4px;
      font-weight:900;
      cursor:pointer;
      white-space:nowrap
    }
    .v718Open:hover{
      border-color:var(--cyan);
      color:#fff
    }

    .v718Curiosities{
      display:grid;
      grid-template-columns:1fr;
      gap:8px;
      margin-top:12px
    }
    .v718Curiosity{
      background:#081a29;
      border:1px solid #27455e;
      border-radius:12px;
      padding:10px 11px;
      min-width:0
    }
    .v718Curiosity .ey{
      color:var(--cyan);
      font-size:7.5px;
      font-weight:950;
      text-transform:uppercase;
      letter-spacing:.35px
    }
    .v718Curiosity b{
      display:block;
      margin-top:4px;
      color:#fff;
      font-size:12px;
      line-height:1.25;
      overflow-wrap:anywhere
    }
    .v718Curiosity p{
      margin:4px 0 0;
      color:#b8ccda;
      font-size:9px;
      line-height:1.45
    }
    .v718Source{
      margin-top:9px;
      color:#829aae;
      font-size:8.5px;
      line-height:1.45
    }

    @media(max-width:560px){
      .v718RankRow{
        grid-template-columns:26px minmax(0,1fr) auto;
      }
      .v718Value{
        grid-column:2/-1;
        text-align:left
      }
      .v718Open{
        grid-column:2/-1;
        justify-self:start
      }
    }
    @media(min-width:700px){
      .v718Kpis{grid-template-columns:repeat(4,minmax(0,1fr))}
      .v718Ranks{
        grid-template-columns:minmax(0,1fr) minmax(0,1.08fr) minmax(0,1fr)
      }
      .v718Curiosities{grid-template-columns:repeat(3,minmax(0,1fr))}
    }
  `;
  document.head.appendChild(style);

  function normalizeVersions(root=document){
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node){
          const p=node.parentElement;
          if(!p || ['SCRIPT','STYLE'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
          return /V7\.(14|15|16|17)\b/.test(node.nodeValue||'')
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        }
      }
    );
    const nodes=[];
    let n;
    while((n=walker.nextNode())) nodes.push(n);
    nodes.forEach(node=>{
      node.nodeValue=String(node.nodeValue).replace(/V7\.(14|15|16|17)\b/g,APP_VERSION);
    });

    document.title=`Central de Apuração · ${APP_VERSION}`;
    const top=document.querySelector('#appView .topbar h2');
    if(top) top.textContent=`Central de Apuração ${APP_VERSION}`;
  }

  let normalizeQueued=false;
  const observer=new MutationObserver(()=>{
    if(normalizeQueued) return;
    normalizeQueued=true;
    requestAnimationFrame(()=>{
      normalizeQueued=false;
      normalizeVersions(document);
    });
  });
  const observerTarget=document.querySelector('#appView')||document.body;
  if(observerTarget){
    observer.observe(observerTarget,{childList:true,subtree:true,characterData:true});
  }

  function v718Chrome(){
    normalizeVersions(document);

    const notice=[...document.querySelectorAll('#content .notice strong')]
      .find(x=>/Central de Dados V7\.\d+/i.test(x.textContent));
    if(notice) notice.textContent=`Central de Dados ${APP_VERSION} ativa`;

    const foot=document.querySelector('#appView .foot');
    if(foot){
      foot.textContent =
        'Painel independente com dados oficiais do Tribunal Superior Eleitoral. '+
        'A V7.18 acrescenta rankings municipais e curiosidades territoriais calculados automaticamente a partir da base eleitoral carregada.';
    }
  }

  function margin(row){
    return num(row?.p13)-num(row?.p22);
  }

  function absMargin(row){
    return Math.abs(margin(row));
  }

  function pp(v){
    return Math.abs(num(v)).toLocaleString('pt-BR',{
      minimumFractionDigits:1,
      maximumFractionDigits:2
    })+' p.p.';
  }

  function pct2(v){
    return num(v).toLocaleString('pt-BR',{
      minimumFractionDigits:1,
      maximumFractionDigits:2
    })+'%';
  }

  function validRows(){
    return (S.pres.stateMapRows||[])
      .filter(r=>stateRowHasVotes(r) && !r.error && r.nm);
  }

  function topN(rows,sorter,n=5){
    return [...rows].sort(sorter).slice(0,n);
  }

  function municipalLeader(row){
    const m=margin(row);
    if(Math.abs(m)<=2) return 'Equilíbrio';
    return m>0?'Lula':'Flávio';
  }

  async function openMunicipality(row){
    if(!row?.cd || !row?.nm) return;

    S.pres.mun=String(row.cd).padStart(5,'0');
    S.pres.cityName=row.nm;
    S.pres.scopeReference=null;
    S.pres.scopeReferenceKey='';
    S.pres.regionFocus=null;

    clearTimers();
    renderPresident();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function ensureRankCard(){
    if(S.pres.uf==='br') return null;

    let card=$('#v718RankCard');
    if(card) return card;

    const regional=$('#v717RegionCard');
    const map=$('#stateMap');
    const mapCard=map?.closest('.card');
    const anchor=regional||mapCard;
    if(!anchor) return null;

    card=document.createElement('section');
    card.id='v718RankCard';
    card.className='card v718Card';
    card.innerHTML=`
      <div class="sectionHead">
        <div>
          <div class="eyebrow">RANKINGS E CURIOSIDADES · ${APP_VERSION}</div>
          <h2>Destaques eleitorais do estado</h2>
          <div class="muted">
            Rankings calculados automaticamente a partir dos resultados municipais.
            A referência acompanha a mesma rodada exibida no mapa.
          </div>
        </div>
        <button id="v718Refresh" class="btn secondary" type="button">Atualizar rankings</button>
      </div>
      <div id="v718Body"></div>
    `;
    anchor.insertAdjacentElement('afterend',card);

    $('#v718Refresh')?.addEventListener('click',async()=>{
      await loadStateMunicipalMap(true);
      renderRankings();
    });

    return card;
  }

  function rankRow(row,pos,type){
    const m=margin(row);
    const leader=municipalLeader(row);

    let value='';
    let sub='';
    let cls='neutral';

    if(type==='lula'){
      value=pp(m);
      sub=`Lula ${pct2(row.p13)} · Flávio ${pct2(row.p22)}`;
      cls='red';
    }else if(type==='flavio'){
      value=pp(m);
      sub=`Flávio ${pct2(row.p22)} · Lula ${pct2(row.p13)}`;
      cls='blue';
    }else{
      value=pp(m);
      sub=`${leader} · Lula ${pct2(row.p13)} · Flávio ${pct2(row.p22)}`;
      cls='neutral';
    }

    return `
      <div class="v718RankRow">
        <span class="v718Pos">${pos}</span>
        <div class="v718City">
          <b>${esc(row.nm)}</b>
          <span>${S.pres.uf.toUpperCase()} · ${nf(row.valid||0)} votos válidos</span>
        </div>
        <div class="v718Value ${cls}">
          <b>${value}</b>
          <span>${esc(sub)}</span>
        </div>
        <button class="v718Open" data-v718-open="${esc(row.cd)}" type="button" title="Abrir ${esc(row.nm)}">Abrir</button>
      </div>
    `;
  }

  function rankBox(title,subtitle,rows,type){
    return `
      <div class="v718RankBox">
        <div class="v718RankHead">
          <b>${esc(title)}</b>
          <span>${esc(subtitle)}</span>
        </div>
        ${rows.map((r,i)=>rankRow(r,i+1,type)).join('')}
      </div>
    `;
  }

  function regionCuriosities(){
    const regions=S.pres.regionAnalysis||[];
    if(!regions.length) return [];

    const prepared=regions.map(r=>{
      const total=Math.max(1,num(r.municipalities));
      const l=num(r.lulaMunicipal);
      const f=num(r.flavioMunicipal);
      const e=num(r.balancedMunicipal);
      const max=Math.max(l,f);
      const dominant=max===l?'Lula':'Flávio';
      return {
        ...r,
        dominance:max/total,
        dominant,
        balancedRate:e/total
      };
    });

    const homogeneous=[...prepared]
      .sort((a,b)=>b.dominance-a.dominance || b.municipalities-a.municipalities)[0];

    const balanced=[...prepared]
      .sort((a,b)=>b.balancedRate-a.balancedRate || b.balancedMunicipal-a.balancedMunicipal)[0];

    const bestLula=[...prepared].sort((a,b)=>b.margin-a.margin)[0];
    const bestFlavio=[...prepared].sort((a,b)=>a.margin-b.margin)[0];

    return [
      homogeneous ? {
        ey:'Região mais homogênea',
        title:homogeneous.name,
        text:
          `${Math.round(homogeneous.dominance*100)}% dos municípios da região estão no campo de `+
          `${homogeneous.dominant}, considerando a faixa de equilíbrio de até 2 p.p.`
      }:null,
      balanced ? {
        ey:'Maior concentração de disputas apertadas',
        title:balanced.name,
        text:
          `${nf(balanced.balancedMunicipal)} de ${nf(balanced.municipalities)} municípios `+
          `estão na faixa de diferença de até 2 p.p.`
      }:null,
      bestLula && bestFlavio ? {
        ey:'Contraste regional',
        title:`${bestLula.name} × ${bestFlavio.name}`,
        text:
          `A distância entre os extremos regionais chega a `+
          `${pp(num(bestLula.margin)-num(bestFlavio.margin))} na margem Lula–Flávio.`
      }:null
    ].filter(Boolean);
  }

  function renderRankings(){
    if(S.pres.uf==='br') return;

    const card=ensureRankCard();
    const body=$('#v718Body');
    if(!card || !body) return;

    const rows=validRows();

    if(S.pres.stateMapLoading && !rows.length){
      body.innerHTML='<div class="loading"><span class="dot"></span>Aguardando a base municipal para calcular os rankings…</div>';
      return;
    }

    if(!rows.length){
      body.innerHTML='<div class="notice wait"><span class="dot"></span>Os rankings aparecerão assim que houver dados municipais carregados.</div>';
      return;
    }

    const lula=topN(rows,(a,b)=>margin(b)-margin(a),5);
    const flavio=topN(rows,(a,b)=>margin(a)-margin(b),5);
    const close=topN(rows,(a,b)=>absMargin(a)-absMargin(b),5);

    const bestLula=lula[0];
    const bestFlavio=flavio[0];
    const closest=close[0];
    const biggestValid=[...rows].sort((a,b)=>num(b.valid)-num(a.valid))[0];

    const over20Lula=rows.filter(r=>margin(r)>20).length;
    const over20Flavio=rows.filter(r=>margin(r)<-20).length;
    const tight=rows.filter(r=>absMargin(r)<=2).length;

    const curiosities=regionCuriosities();

    body.innerHTML=`
      <div class="notice">
        <span class="dot" style="background:var(--green)"></span>
        <strong>${nf(rows.length)} municípios ranqueados</strong> ·
        ${esc(S.pres.stateMapMeta?.roundLabel||'leitura eleitoral atual')}
      </div>

      <div class="v718Kpis">
        <div class="v718Kpi neutral">
          <b>${esc(closest?.nm||'—')}</b>
          <span>menor diferença · ${closest?pp(margin(closest)):'—'}</span>
        </div>
        <div class="v718Kpi red">
          <b>${esc(bestLula?.nm||'—')}</b>
          <span>maior vantagem de Lula · ${bestLula?pp(margin(bestLula)):'—'}</span>
        </div>
        <div class="v718Kpi blue">
          <b>${esc(bestFlavio?.nm||'—')}</b>
          <span>maior vantagem de Flávio · ${bestFlavio?pp(margin(bestFlavio)):'—'}</span>
        </div>
        <div class="v718Kpi">
          <b>${esc(biggestValid?.nm||'—')}</b>
          <span>maior volume de votos válidos · ${biggestValid?nf(biggestValid.valid):'—'}</span>
        </div>
      </div>

      <div class="v718Ranks">
        ${rankBox('Maiores vantagens de Lula','top 5 municipal',lula,'lula')}
        ${rankBox('Disputas mais equilibradas','top 5 municipal',close,'close')}
        ${rankBox('Maiores vantagens de Flávio','top 5 municipal',flavio,'flavio')}
      </div>

      <div class="v718Curiosities">
        <div class="v718Curiosity">
          <div class="ey">Margens superiores a 20 p.p.</div>
          <b>${nf(over20Lula)} Lula · ${nf(over20Flavio)} Flávio</b>
          <p>${nf(tight)} municípios estão na faixa de equilíbrio de até 2 p.p.</p>
        </div>

        ${curiosities.map(c=>`
          <div class="v718Curiosity">
            <div class="ey">${esc(c.ey)}</div>
            <b>${esc(c.title)}</b>
            <p>${esc(c.text)}</p>
          </div>
        `).join('')}
      </div>

      <div class="v718Source">
        Rankings calculados sobre os dados municipais do Tribunal Superior Eleitoral já carregados no mapa.
        “Equilíbrio” corresponde a diferença absoluta de até 2 pontos percentuais entre Lula e Flávio.
      </div>
    `;

    body.querySelectorAll('[data-v718-open]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const cd=btn.dataset.v718Open;
        const row=rows.find(r=>String(r.cd)===String(cd));
        if(row) openMunicipality(row);
      });
    });

    v718Chrome();
  }

  /* Integração com a cadeia V7.17 */
  const loadStateMunicipalMapV717=loadStateMunicipalMap;
  loadStateMunicipalMap=async function(force=false){
    await loadStateMunicipalMapV717(force);
    if(S.view==='pres' && S.pres.uf!=='br'){
      ensureRankCard();
      renderRankings();
    }
  };

  const renderPresidentV717=renderPresident;
  renderPresident=function(){
    renderPresidentV717();
    v718Chrome();

    if(S.pres.uf!=='br'){
      ensureRankCard();
      renderRankings();
    }
  };

  const renderHomeV717=renderHome;
  renderHome=function(){
    renderHomeV717();
    v718Chrome();

    const firstGrid=document.querySelector('#content .grid');
    if(firstGrid && !firstGrid.querySelector('[data-open="rankings"]')){
      const module=document.createElement('button');
      module.className='module';
      module.type='button';
      module.dataset.open='rankings';
      module.innerHTML=`
        <h3>Rankings e Curiosidades</h3>
        <p>Veja os municípios mais equilibrados, maiores vantagens e destaques territoriais calculados automaticamente.</p>
        <span class="tag">NOVO · ${APP_VERSION}</span>
      `;
      module.addEventListener('click',()=>{
        S.pres.uf=S.pres.uf==='br'?'mg':S.pres.uf;
        S.pres.mun='';
        S.pres.cityName='';
        setView('pres');
      });
      firstGrid.appendChild(module);
    }

    normalizeVersions(document);
  };

  v718Chrome();
  setTimeout(v718Chrome,300);
  setTimeout(v718Chrome,1200);
})();
