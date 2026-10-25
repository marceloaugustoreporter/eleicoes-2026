/* Central de Apuração — V7.23 · Mesa de Corte Visual */
(function(){
'use strict';
if(window.__CENTRAL_APURACAO_V723__) return;
window.__CENTRAL_APURACAO_V723__=true;

const APP_VERSION='V7.32';
window.CENTRAL_APURACAO_VERSION=APP_VERSION;

const SCENE_LABEL={
  'fullscreen':'Tela cheia',
  'sidebar-right':'Lateral direita',
  'sidebar-left':'Lateral esquerda',
  'lower-third':'Barra inferior',
  'studio':'Studio Multislot'
};

const css=document.createElement('style');
css.id='v723Styles';
css.textContent=`
.v723Shell{display:grid;gap:14px}
.v723Top{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.v723Room{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.v723Room select{min-width:250px}
.v723Status{display:flex;align-items:center;gap:7px;border:1px solid #28506a;background:#081a29;border-radius:999px;padding:8px 11px;font-size:11px;font-weight:900}
.v723Dot{width:8px;height:8px;border-radius:50%;background:#4fe0ad;box-shadow:0 0 10px rgba(79,224,173,.45)}
.v723Program{display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:stretch}
.v723Monitor{border:1px solid #264861;background:#071725;border-radius:16px;padding:13px;min-height:245px}
.v723Monitor.preview{border-color:#936f1e;background:linear-gradient(180deg,rgba(255,211,78,.05),#071725)}
.v723Monitor.program{border-color:#1c7f68;background:linear-gradient(180deg,rgba(79,224,173,.05),#071725)}
.v723MonitorHead{display:flex;align-items:center;justify-content:space-between;gap:8px}
.v723Kicker{font-size:10px;font-weight:950;letter-spacing:1.5px}
.preview .v723Kicker{color:#ffd34e}.program .v723Kicker{color:#4fe0ad}
.v723Now{font-size:22px;font-weight:950;line-height:1.08;margin-top:6px}
.v723Meta{font-size:10px;color:var(--muted);margin-top:5px}
.v723Mini{margin-top:10px;aspect-ratio:16/9;border:1px solid #29465f;border-radius:11px;overflow:hidden;background:#06101a}
.v723Mini iframe{display:block;width:100%;height:100%;border:0}
.v723TakeCol{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-width:130px}
.v723Take{border:0;border-radius:14px;background:#4fe0ad;color:#031812;font-weight:950;padding:16px 18px;min-width:125px;cursor:pointer;font-size:12px;box-shadow:0 5px 18px rgba(79,224,173,.18)}
.v723Take:hover{filter:brightness(1.06)}
.v723Take:disabled{opacity:.55;cursor:wait}
.v723Cut{font-size:9px;color:#829bad;text-align:center;line-height:1.35}
.v723Section{border:1px solid #24445d;background:#081827;border-radius:16px;padding:14px}
.v723SectionTitle{font-size:12px;font-weight:950;letter-spacing:.8px;margin-bottom:10px}
.v723SceneGrid,.v723PresetGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.v723Btn{position:relative;border:1px solid #2b4e67;background:#0a1c2b;color:#edf8ff;border-radius:12px;padding:11px 10px;text-align:left;cursor:pointer;min-height:66px}
.v723Btn strong{display:block;font-size:12px;line-height:1.15}
.v723Btn small{display:block;font-size:9px;color:#9ab0c0;margin-top:5px;line-height:1.25}
.v723Btn.active{box-shadow:0 0 0 1px currentColor inset}
.v723Btn.blue{border-color:#2369a8;background:rgba(35,116,225,.08)}
.v723Btn.blue.active{color:#76b8ff;background:rgba(35,116,225,.16)}
.v723Btn.green{border-color:#237d67;background:rgba(79,224,173,.07)}
.v723Btn.green.active{color:#77efc3;background:rgba(79,224,173,.14)}
.v723Btn.purple{border-color:#6653a4;background:rgba(150,110,255,.07)}
.v723Btn.purple.active{color:#bca8ff;background:rgba(150,110,255,.14)}
.v723Btn.yellow{border-color:#80691f;background:rgba(255,211,78,.07)}
.v723Btn.yellow.active{color:#ffe47c;background:rgba(255,211,78,.14)}
.v723Btn.red{border-color:#8d2e36;background:rgba(215,25,32,.07)}
.v723Btn.red.active{color:#ff8084;background:rgba(215,25,32,.14)}
.v723Controls{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:10px}
.v723Controls select,.v723Controls input{width:100%;background:#071522;color:#fff;border:1px solid #28465f;border-radius:11px;padding:10px 11px;font-size:12px}
.v723Controls .wide{grid-column:1/-1}
.v723Actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.v723Actions button{flex:1;min-width:150px}
.v723Standby{border:1px solid #826b20;background:rgba(255,211,78,.07);color:#ffe68a}
.v723Clear{border:1px solid #7d3541;background:rgba(215,25,32,.06);color:#ffb0b4}
.v723Outs{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.v723Out{border:1px solid #24445d;background:#071522;border-radius:12px;padding:11px}
.v723Out b{display:block;font-size:11px}.v723Out span{display:block;font-size:9px;color:var(--muted);margin:4px 0 8px}
.v723OutActions{display:flex;gap:6px}.v723OutActions button{flex:1}
.v723Msg{font-size:10px;color:var(--muted);margin-top:7px;line-height:1.35}
.v723History{display:grid;gap:6px;margin-top:8px}
.v723HistoryItem{display:flex;justify-content:space-between;gap:10px;border-bottom:1px solid #16334a;padding:6px 0;font-size:10px}
.v723HistoryItem:last-child{border-bottom:0}
.v723HistoryItem span{color:var(--muted)}
.v723ThemeStub{display:flex;gap:8px;flex-wrap:wrap}
.v723ThemeChip{border:1px solid #2a4963;border-radius:999px;padding:7px 10px;font-size:10px;font-weight:900;color:#b8cfdd}
.v723ThemeChip.active{border-color:#35d0f6;color:#e8fbff;background:rgba(53,208,246,.08)}

.v725CityWrap{grid-column:1/-1}
.v725CityWrap select{width:100%;max-height:220px;background:#071522;color:#fff;border:1px solid #28465f;border-radius:11px;padding:10px 11px;font-size:12px}
.v725CityHint{font-size:9px;color:#8fa7b8;margin-top:5px}


.v727StudioCfg{display:none;margin-top:10px;border:1px solid #31526b;background:#071522;border-radius:12px;padding:11px}
.v727StudioCfg.on{display:block}
.v727StudioTitle{font-size:10px;font-weight:950;color:#8fe8ff;letter-spacing:.8px;margin-bottom:8px}
.v727Slots{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.v727Slot label{display:block;font-size:9px;color:#94aebe;font-weight:900;margin-bottom:5px}
.v727Slot select{width:100%;background:#081827;color:#fff;border:1px solid #2a4c65;border-radius:9px;padding:9px;font-size:11px}
@media(max-width:700px){.v727Slots{grid-template-columns:1fr}}

/* V7.32 · Studio Visual */
#appView .topbar h2{font-size:0!important}
#appView .topbar h2::after{content:"Central de Apuração V7.32";font-size:18px;font-weight:950}
.v729StudioPresets{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px;margin-bottom:10px}
.v729StudioPreset{border:1px solid #2d5069;background:#0a1b2a;color:#dff5ff;border-radius:11px;padding:10px 8px;cursor:pointer;text-align:left;min-height:58px}
.v729StudioPreset:hover{border-color:#35d0f6;filter:brightness(1.06)}
.v729StudioPreset strong{display:block;font-size:10px;font-weight:950}
.v729StudioPreset small{display:block;margin-top:3px;color:#8fa8b9;font-size:8px;line-height:1.25}
.v729SlotCards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.v729SlotCard{border:1px solid #2b4a62;background:#081724;border-radius:13px;padding:9px;min-width:0}
.v729SlotHead{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:7px}
.v729SlotHead b{font-size:11px;color:#fff}
.v729SlotCurrent{font-size:8px;color:#8fe8ff;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:68%}
.v729Choices{display:grid;grid-template-columns:1fr 1fr;gap:5px}
.v729Choice{border:1px solid #29465c;background:#0b1e2d;color:#bed3df;border-radius:8px;padding:7px 6px;font-size:8px;font-weight:900;cursor:pointer;line-height:1.15}
.v729Choice:hover{border-color:#35d0f6;color:#fff}
.v729Choice.on{border-color:#4fe0ad;background:rgba(79,224,173,.10);color:#dffdf4;box-shadow:inset 0 0 0 1px rgba(79,224,173,.15)}
.v729Choice.map{border-color:#285b81;color:#9ddfff}
.v729Choice.gov{border-color:#654c83;color:#d9bfff}
.v729Choice.off{color:#8b9aa4}
.v729StudioSummary{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:9px}
.v729SummaryCell{border:1px solid #213d52;background:#06131e;border-radius:9px;padding:7px}
.v729SummaryCell span{display:block;font-size:7px;color:#7894a7;font-weight:900}
.v729SummaryCell b{display:block;margin-top:2px;font-size:9px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.v729LegacySelects{position:absolute!important;left:-99999px!important;width:1px!important;height:1px!important;overflow:hidden!important}

/* V7.32 · Botoneira operacional */
.v727StudioCfg{
  background:linear-gradient(180deg,#0a2030 0%,#081825 100%)!important;
  border:1px solid #3b6683!important;
  box-shadow:inset 0 0 0 1px rgba(53,208,246,.06),0 10px 26px rgba(0,0,0,.12)
}
.v727StudioTitle{
  display:flex;align-items:center;gap:7px;
  color:#bff3ff!important;font-size:11px!important
}
.v727StudioTitle:before{
  content:"";width:8px;height:8px;border-radius:50%;background:#35d0f6;box-shadow:0 0 10px rgba(53,208,246,.7)
}
.v729StudioPreset{background:#0b1d2b!important}
.v729StudioPreset.on{border-color:#ffd34e!important;background:rgba(255,211,78,.09)!important;box-shadow:inset 0 0 0 1px rgba(255,211,78,.15)}
.v729SlotCard{
  background:linear-gradient(180deg,#091d2b 0%,#071722 100%)!important;
  border-color:#335872!important
}
.v729SlotHead b{
  display:inline-flex;align-items:center;gap:6px
}
.v729SlotHead b:before{content:"";width:7px;height:7px;border-radius:50%;background:#4fe0ad;box-shadow:0 0 8px rgba(79,224,173,.45)}
.v729Choice{
  min-height:34px!important;
  font-size:8.5px!important;
  transition:transform .08s,border-color .12s,background .12s,color .12s
}
.v729Choice:active{transform:scale(.985)}
.v729Choice.on{
  border-color:#4fe0ad!important;
  background:linear-gradient(180deg,rgba(79,224,173,.2),rgba(79,224,173,.08))!important;
  color:#eafff7!important;
  box-shadow:0 0 0 1px rgba(79,224,173,.2),0 0 12px rgba(79,224,173,.12)!important
}
.v729Choice.off{border-color:#7b3540!important;background:rgba(215,25,32,.08)!important;color:#ffb5b9!important}
.v729Choice.off.on{border-color:#d71920!important;background:rgba(215,25,32,.24)!important;color:#fff!important;box-shadow:0 0 0 1px rgba(215,25,32,.22)!important}
.v729Choice.off:before{content:"● ";color:#d71920}
.v729Choice:not(.off).on:before{content:"● ";color:#4fe0ad}
.v730ContentPanel{
  margin-top:11px;
  border:1px solid #394f69;
  border-radius:13px;
  background:linear-gradient(180deg,#0c1723 0%,#08131e 100%);
  padding:11px
}
.v730ContentTitle{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:9px}
.v730ContentTitle b{font-size:10px;color:#fff;letter-spacing:.45px}
.v730ContentTitle span{font-size:8px;color:#8fa7b8}
.v730ToggleRow{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:9px}
.v730Toggle{
  border:1px solid #31516a;background:#0b1d2b;color:#b9cfdd;border-radius:10px;
  padding:10px;font-size:9px;font-weight:950;cursor:pointer;text-align:left
}
.v730Toggle small{display:block;font-size:7px;color:#7f98aa;margin-top:2px;font-weight:800}
.v730Toggle.on.pres{border-color:#35d0f6;background:rgba(53,208,246,.12);color:#e8fbff}
.v730Toggle.on.gov{border-color:#b57cff;background:rgba(181,124,255,.12);color:#f3eaff}
.v730SelectGrid{display:grid;grid-template-columns:1fr 1.2fr 1fr;gap:7px}
.v730SelectBox{border:1px solid #29465e;background:#071522;border-radius:10px;padding:8px}
.v730SelectBox label{display:block;font-size:7px;color:#7894a8;font-weight:950;margin-bottom:5px}
.v730SelectBox select{width:100%;background:#0b1e2d;color:#fff;border:1px solid #31516a;border-radius:8px;padding:8px;font-size:9px}
.v730Destination{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}
.v730Dest{
  border:1px solid #2d4b62;background:#0a1a27;color:#9eb4c2;border-radius:8px;
  padding:8px 5px;font-size:8px;font-weight:950;cursor:pointer
}
.v730Dest.on{border-color:#ffd34e;background:rgba(255,211,78,.12);color:#fff6c7}
.v730Hint{font-size:7.5px;color:#7f98aa;margin-top:7px;line-height:1.35}

/* V7.32 · acesso ADMIN + porta FREE */
.v731AccessScope{display:block;margin-top:3px;color:#8fe8ff;font-size:9px;font-weight:900}
.v731FreeLink{
  display:flex;align-items:center;justify-content:center;gap:7px;
  margin-top:12px;padding:11px 12px;border:1px solid #31536d;border-radius:11px;
  background:#081a29;color:#dff7ff;text-decoration:none;font-size:10px;font-weight:950
}
.v731FreeLink:hover{border-color:#35d0f6;background:#0a2030}
.v731AdminNote{margin-top:8px;border:1px solid #31536d;background:rgba(53,208,246,.06);border-radius:10px;padding:9px 10px;font-size:9px;color:#b9d8e8;line-height:1.4}

@media(max-width:800px){.v730SelectGrid{grid-template-columns:1fr}.v730Destination{grid-template-columns:1fr 1fr}}

@media(max-width:1000px){.v729StudioPresets{grid-template-columns:repeat(3,1fr)}.v729SlotCards{grid-template-columns:1fr}}
@media(max-width:620px){.v729StudioPresets{grid-template-columns:1fr 1fr}.v729Choices{grid-template-columns:1fr 1fr}.v729StudioSummary{grid-template-columns:1fr}}

@media(max-width:1000px){
  .v723Program{grid-template-columns:1fr}
  .v723TakeCol{flex-direction:row;min-width:0}
  .v723SceneGrid,.v723PresetGrid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media(max-width:620px){
  .v723SceneGrid,.v723PresetGrid{grid-template-columns:1fr 1fr}
  .v723Controls{grid-template-columns:1fr}
  .v723Controls .wide{grid-column:auto}
  .v723Outs{grid-template-columns:1fr}
  .v723Monitor{min-height:0}
  .v723Now{font-size:19px}
  .v723Top{align-items:stretch}
  .v723Room{width:100%}.v723Room select{width:100%;min-width:0}
  .v723Take{width:100%}.v723TakeCol{display:grid;grid-template-columns:1fr}
}
`;
document.head.appendChild(css);

function normalizeVersion(){
  const walker=document.createTreeWalker(document,NodeFilter.SHOW_TEXT,{
    acceptNode(n){
      const p=n.parentElement;
      if(!p||['SCRIPT','STYLE'].includes(p.tagName))return NodeFilter.FILTER_REJECT;
      return /V7\.(14|15|16|17|18|19|20|21|22|23|24)\b/.test(n.nodeValue||'')?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }
  });
  const nodes=[];let n;
  while((n=walker.nextNode()))nodes.push(n);
  nodes.forEach(x=>x.nodeValue=String(x.nodeValue).replace(/V7\.(14|15|16|17|18|19|20|21|22|23|24)\b/g,APP_VERSION));
  document.title=`Central de Apuração · ${APP_VERSION}`;
}

function stateOf(r){
  return {
    screen:r?.screen||'waiting',scene:r?.scene||'fullscreen',
    office:r?.office||'pres',uf:r?.uf||'br',mun:r?.mun||'',label:r?.label||'',
    preview_screen:r?.preview_screen||'president',
    preview_scene:r?.preview_scene||r?.scene||'fullscreen',
    preview_office:r?.preview_office||'pres',
    preview_uf:r?.preview_uf||'br',
    preview_mun:r?.preview_mun||'',
    preview_label:r?.preview_label||'',
    studio_slots:r?.studio_slots||{
      left:{kind:'president',uf:'mg',label:'Minas Gerais'},
      right:{kind:'gov2'},
      lower:{kind:'president',uf:'br',label:'Brasil'}
    },
    preview_studio_slots:r?.preview_studio_slots||r?.studio_slots||{
      left:{kind:'president',uf:'mg',label:'Minas Gerais'},
      right:{kind:'gov2'},
      lower:{kind:'president',uf:'br',label:'Brasil'}
    }
  };
}

function describe(s){
  if(s.screen==='waiting')return`Tela de espera · ${SCENE_LABEL[s.scene]||s.scene}`;
  if(s.screen==='map-br')return`Mapa Brasil · liderança por estado · ${SCENE_LABEL[s.scene]||s.scene}`;
  if(s.screen==='map-mg')return`Mapa Minas Gerais · liderança municipal · ${SCENE_LABEL[s.scene]||s.scene}`;
  if(s.screen==='map-state')return`Mapa ${UF_NAMES[s.uf]||s.uf.toUpperCase()} · liderança municipal · ${SCENE_LABEL[s.scene]||s.scene}`;
  const cargo=s.office==='gov'?'Governador':'Presidente';
  const scope=s.label||(s.mun?'Município':(s.uf==='br'?'Brasil':UF_NAMES[s.uf]||s.uf.toUpperCase()));
  return `${cargo} · ${scope} · ${SCENE_LABEL[s.scene]||s.scene}`;
}

function outputUrl(room,layout){
  const u=new URL('./obs-live-v732.html',location.href);
  u.searchParams.set('channel',room.slug);
  u.searchParams.set('token',room.output_token);
  u.searchParams.set('layout',layout);
  return u.href;
}
function previewUrl(p,room){
  const u=new URL('./obs-live-v732.html',location.href);
  u.searchParams.set('direct','1');
  u.searchParams.set('layout','horizontal');
  if(room?.slug)u.searchParams.set('channel',room.slug);
  if(room?.output_token)u.searchParams.set('token',room.output_token);
  u.searchParams.set('screen',p.screen);
  u.searchParams.set('scene',p.scene);
  u.searchParams.set('office',p.office);
  u.searchParams.set('uf',p.uf);
  if(p.mun)u.searchParams.set('mun',p.mun);
  if(p.label)u.searchParams.set('label',p.label);
  if(p.studio_slots)u.searchParams.set('slots',JSON.stringify(p.studio_slots));
  return u.href;
}
async function copy(v,b){
  try{
    await navigator.clipboard.writeText(v);
    const old=b.textContent;b.textContent='Copiado';
    setTimeout(()=>b.textContent=old,1200);
  }catch(_){prompt('Copie a URL:',v)}
}
async function getRooms(){
  const {data,error}=await sb
    .from('broadcast_channels')
    .select('id,slug,name,output_token,active,default_uf,default_mun,default_city')
    .eq('active',true).order('name');
  if(error)throw error;
  if(!data?.length)return[];
  const {data:states,error:e2}=await sb.from('broadcast_state').select('*').in('channel_id',data.map(x=>x.id));
  if(e2)throw e2;
  const m=new Map((states||[]).map(x=>[x.channel_id,x]));
  return data.map(x=>({...x,state:m.get(x.id)||null}));
}

renderBroadcast=async function(){
  normalizeVersion();
  content.innerHTML=`<section class="card"><div class="eyebrow">TRANSMISSÃO · ${APP_VERSION}</div><h2 style="margin:4px 0 5px">Mesa de Corte Visual</h2><div class="loading" id="v723Load">Carregando operação…</div></section>`;

  try{
    const rooms=await getRooms();
    if(!rooms.length){$('#v723Load').textContent='Nenhuma sala vinculada a este usuário.';return}

    let preview={screen:'president',scene:'fullscreen',office:'pres',uf:'br',mun:'',label:'Brasil'};
    let studioSlots={
      left:{kind:'president',uf:'mg',label:'Minas Gerais'},
      right:{kind:'gov2'},
      lower:{kind:'president',uf:'br',label:'Brasil'}
    };
    let history=[];
    const current=()=>rooms.find(r=>r.id===$('#v723Room').value)||rooms[0];

    let v730Dest='fullscreen';
    async function v732FillMapCities(){
      const mapUf=$('#v732MapUf')?.value||uf.value;
      const dl=$('#v732MapCities');if(!dl)return;
      dl.innerHTML='';
      if(!mapUf||mapUf==='br')return;
      const all=await loadMunicipalities();
      (all[mapUf]||[]).forEach(m=>dl.insertAdjacentHTML('beforeend',`<option value="${esc(m.nm)}" data-cd="${esc(m.cd)}"></option>`));
    }
    function v732SelectedCity(){
      const mapUf=$('#v732MapUf')?.value||uf.value;
      const q=norm($('#v732MapCity')?.value||'');
      const rows=(S.municipalities?.[mapUf]||[]);
      return rows.find(m=>norm(m.nm)===q)||rows.find(m=>norm(m.nm).startsWith(q))||null;
    }
    async function v732OpenStateMap(){
      const mapUf=$('#v732MapUf')?.value||uf.value;
      if(!mapUf||mapUf==='br'){msg.textContent='Escolha um estado para abrir o mapa municipal.';return}
      uf.value=mapUf;
      preview={screen:'map-state',scene:'fullscreen',office:'pres',uf:mapUf,mun:'',label:UF_NAMES[mapUf]||mapUf.toUpperCase()};
      scene.value='fullscreen';
      showPreview();
      await savePreview().catch(()=>{});
      msg.textContent=`Mapa de ${UF_NAMES[mapUf]||mapUf.toUpperCase()} preparado na PRÉVIA.`;
    }
    async function v732PrepareMunicipality(){
      const mapUf=$('#v732MapUf')?.value||uf.value;
      const m=v732SelectedCity();
      if(!m){msg.textContent='Município não localizado. Digite o nome completo ou selecione uma sugestão.';return}
      uf.value=mapUf;
      await fillCities();
      const hit=[...city.options].find(o=>String(o.dataset.cd||'')===String(m.cd));
      if(hit)city.value=hit.value;
      preview={screen:'president',scene:'fullscreen',office:'pres',uf:mapUf,mun:String(m.cd),label:m.nm};
      scene.value='fullscreen';office.value='pres';
      showPreview();
      await savePreview().catch(()=>{});
      msg.textContent=`${m.nm} preparado na PRÉVIA.`;
    }
    function syncV730(){
      const um=$('#v730UfMirror'),cm=$('#v730CityMirror');
      if(um){
        um.innerHTML=uf.innerHTML;
        um.value=uf.value;
      }
      if(cm){
        cm.innerHTML=city.innerHTML;
        cm.value=city.value;
      }
      $('#v730Pres')?.classList.toggle('on',office.value==='pres');
      $('#v730Gov')?.classList.toggle('on',office.value==='gov');
      document.querySelectorAll('.v730Dest').forEach(b=>b.classList.toggle('on',b.dataset.dest===v730Dest));
      const mf=$('#v732MapFinder');
      if(mf)mf.classList.toggle('on',$('#v732MapMode')?.classList.contains('on'));
      const mu=$('#v732MapUf');
      if(mu&&!mu.options.length){mu.innerHTML=uf.innerHTML}
      if(mu&&(!mu.value||mu.value==='br'))mu.value=uf.value==='br'?'mg':uf.value;
    }
    async function prepareV730(){
      office.value=$('#v730Gov')?.classList.contains('on')?'gov':'pres';
      if($('#v730UfMirror'))uf.value=$('#v730UfMirror').value||uf.value;
      await fillCities();
      if($('#v730CityMirror')?.value)city.value=$('#v730CityMirror').value;
      fromControls();
      preview.scene=v730Dest;
      scene.value=v730Dest;
      showPreview();
      await savePreview().catch(()=>{});
      syncV730();
      msg.textContent='Conteúdo preparado na PRÉVIA. Confira e use TAKE.';
    }


    content.innerHTML=`<section class="card v723Shell">
      <div class="v723Top">
        <div>
          <div class="eyebrow">TRANSMISSÃO · ${APP_VERSION}</div>
          <h2 style="margin:4px 0 4px">Mesa de Corte Visual</h2>
          <div class="muted">Prepare a cena, confira a prévia e envie ao ar com um único comando.</div>
        </div>
        <div class="v723Status"><span class="v723Dot"></span> CONTROLE CONECTADO</div>
      </div>

      <div class="v723Room">
        <strong>Sala:</strong>
        <select id="v723Room">${rooms.map(r=>`<option value="${r.id}">${esc(r.name)}</option>`).join('')}</select>
      </div>

      <div class="v723Program">
        <div class="v723Monitor preview">
          <div class="v723MonitorHead"><div class="v723Kicker">PRÉVIA</div><span class="tag">PRÓXIMA CENA</span></div>
          <div id="v723PrevTitle" class="v723Now"></div>
          <div class="v723Meta">Nada muda na transmissão enquanto estiver apenas na prévia.</div>
          <div class="v723Mini"><iframe id="v723PrevFrame" title="Prévia"></iframe></div>
        </div>

        <div class="v723TakeCol">
          <button id="v723Take" class="v723Take" type="button">TAKE<br>COLOCAR NO AR</button>
          <div class="v723Cut">PREVIEW → PROGRAM</div>
        </div>

        <div class="v723Monitor program">
          <div class="v723MonitorHead"><div class="v723Kicker">NO AR</div><span class="tag">PROGRAM</span></div>
          <div id="v723OnTitle" class="v723Now"></div>
          <div id="v723OnMeta" class="v723Meta"></div>
          <div class="v723Outs" style="margin-top:12px">
            <div class="v723Out"><b>Horizontal · 1920×1080</b><span>OBS / vMix</span><div class="v723OutActions"><button id="v723OpenH" class="btn">Abrir</button><button id="v723CopyH" class="btn secondary">Copiar URL</button></div></div>
            <div class="v723Out"><b>Vertical · 1080×1920</b><span>Live vertical</span><div class="v723OutActions"><button id="v723OpenV" class="btn">Abrir</button><button id="v723CopyV" class="btn secondary">Copiar URL</button></div></div>
          </div>
        </div>
      </div>

      <div class="v723Section">
        <div class="v723SectionTitle">CENAS RÁPIDAS</div>
        <div class="v723PresetGrid">
          <button class="v723Btn blue" data-preset="br"><strong>Presidente · Brasil</strong><small>Placar nacional</small></button>
          <button class="v723Btn blue" data-preset="mg"><strong>Presidente · Minas Gerais</strong><small>Resultado estadual</small></button>
          <button class="v723Btn blue" data-preset="local" id="v723Local"><strong>Presidente · Cidade</strong><small>Cidade principal da sala</small></button>
          <button class="v723Btn purple" data-preset="gov2" id="v726Gov2"><strong>Governadores · 2º turno</strong><small>AC · AM · DF · ES · RN · TO</small></button>
          <button class="v723Btn blue" data-preset="map-br"><strong>Mapa · Brasil</strong><small>Liderança e margem por estado</small></button>
          <button class="v723Btn blue" data-preset="map-mg"><strong>Mapa · Minas</strong><small>Municípios por diferença percentual</small></button>
          <button class="v723Btn yellow" data-preset="waiting"><strong>Tela de espera</strong><small>Interrompe os dados sem perder a saída</small></button>
          <button class="v723Btn red" data-preset="clear"><strong>Retirar do ar</strong><small>Envia a tela de espera imediatamente</small></button>
        </div>
      </div>

      <div class="v723Section">
        <div class="v723SectionTitle">MÁSCARA / COMPOSIÇÃO</div>
        <div class="v723SceneGrid">
          <button class="v723Btn green" data-scene="fullscreen"><strong>FULL</strong><small>Tela cheia</small></button>
          <button class="v723Btn green" data-scene="sidebar-right"><strong>RIGHT</strong><small>Lateral direita</small></button>
          <button class="v723Btn green" data-scene="sidebar-left"><strong>LEFT</strong><small>Lateral esquerda</small></button>
          <button class="v723Btn green" data-scene="lower-third"><strong>LOWER</strong><small>Barra inferior</small></button>
          <button class="v723Btn purple" data-scene="studio"><strong>STUDIO</strong><small>LEFT + RIGHT + LOWER</small></button>
        </div>

        <div class="v723Controls">
          <select id="v723Office"><option value="pres">Presidente · 2º turno</option><option value="gov">Governador · 2º turno</option></select>
          <select id="v723UF"><option value="br">Brasil</option>${UFS.map(uf=>`<option value="${uf}">${UF_NAMES[uf]} · ${uf.toUpperCase()}</option>`).join('')}</select>
          <select id="v723Scene"><option value="fullscreen">Tela cheia</option><option value="sidebar-right">Lateral direita</option><option value="sidebar-left">Lateral esquerda</option><option value="lower-third">Barra inferior</option><option value="studio">Studio Multislot</option></select>
          <div class="v725CityWrap">
  <select id="v723City"><option value="">Selecione um município</option></select>
  <div class="v725CityHint">Use a roda do mouse ou digite as primeiras letras para localizar rapidamente.</div>
</div>
        </div>

        <div class="v730ContentPanel" id="v730ContentPanel">
          <div class="v730ContentTitle">
            <b>SELEÇÃO DE CONTEÚDO</b>
            <span>prepare o que deseja exibir antes de escolher a composição</span>
          </div>
          <div class="v730ToggleRow" style="grid-template-columns:repeat(3,1fr)">
            <button type="button" id="v730Pres" class="v730Toggle pres on"><strong>PRESIDENTE</strong><small>resultado nacional, estadual ou municipal</small></button>
            <button type="button" id="v730Gov" class="v730Toggle gov"><strong>GOVERNADOR</strong><small>resultado estadual e 2º turno</small></button>
            <button type="button" id="v732MapMode" class="v730Toggle pres"><strong>MAPA ESTADUAL</strong><small>municípios coloridos pela diferença percentual</small></button>
          </div>
          <div class="v730SelectGrid">
            <div class="v730SelectBox"><label>ESTADO</label><select id="v730UfMirror"></select></div>
            <div class="v730SelectBox"><label>MUNICÍPIO</label><select id="v730CityMirror"></select></div>
            <div class="v730SelectBox">
              <label>DESTINO DA CENA</label>
              <div class="v730Destination">
                <button type="button" class="v730Dest on" data-dest="fullscreen">FULL</button>
                <button type="button" class="v730Dest" data-dest="sidebar-left">LEFT</button>
                <button type="button" class="v730Dest" data-dest="sidebar-right">RIGHT</button>
                <button type="button" class="v730Dest" data-dest="lower-third">LOWER</button>
              </div>
            </div>
          </div>
          <div id="v732MapFinder" class="v732MapFinder">
            <div class="v732MapFinderHead"><b>MAPA MUNICIPAL DO ESTADO</b><span>clique no mapa ou localize pelo nome</span></div>
            <div class="v732MapGrid">
              <select id="v732MapUf"></select>
              <input id="v732MapCity" list="v732MapCities" placeholder="Digite o nome do município">
              <datalist id="v732MapCities"></datalist>
              <button type="button" id="v732OpenMap" class="v732Open">ABRIR MAPA</button>
              <button type="button" id="v732PrepareCity" class="v732Prepare">PREPARAR MUNICÍPIO</button>
            </div>
            <div class="v732MapHint">O mapa só é carregado quando solicitado. A intensidade da cor representa a diferença percentual entre os candidatos; até 2 p.p. permanece neutro.</div>
          </div>
          <div class="v730Hint">A botoneira acima prepara uma cena simples. Para combinar várias informações ao mesmo tempo, use o construtor STUDIO logo abaixo.</div>
        </div>

        <div id="v727StudioCfg" class="v727StudioCfg">
          <div class="v727StudioTitle">STUDIO · COMPOSIÇÃO VISUAL</div>

          <div class="v729StudioPresets">
            <button class="v729StudioPreset" data-studio-preset="brasil"><strong>BRASIL</strong><small>Mapa BR + placar nacional + Minas</small></button>
            <button class="v729StudioPreset" data-studio-preset="minas"><strong>MINAS</strong><small>Mapa MG + placar MG + cidade local</small></button>
            <button class="v729StudioPreset" data-studio-preset="cidade"><strong>CIDADE</strong><small>Mapa MG + município + Brasil</small></button>
            <button class="v729StudioPreset" data-studio-preset="governadores"><strong>GOVERNADORES</strong><small>Mapa BR + governadores + Brasil</small></button>
            <button class="v729StudioPreset" data-studio-preset="apresentador"><strong>APRESENTADOR</strong><small>Mapa MG + Brasil + cidade local</small></button>
          </div>

          <div class="v729SlotCards">
            <div class="v729SlotCard" data-slot-card="left">
              <div class="v729SlotHead"><b>LEFT</b><span id="v729CurrentLeft" class="v729SlotCurrent">—</span></div>
              <div id="v729ChoicesLeft" class="v729Choices"></div>
            </div>
            <div class="v729SlotCard" data-slot-card="right">
              <div class="v729SlotHead"><b>RIGHT</b><span id="v729CurrentRight" class="v729SlotCurrent">—</span></div>
              <div id="v729ChoicesRight" class="v729Choices"></div>
            </div>
            <div class="v729SlotCard" data-slot-card="lower">
              <div class="v729SlotHead"><b>LOWER</b><span id="v729CurrentLower" class="v729SlotCurrent">—</span></div>
              <div id="v729ChoicesLower" class="v729Choices"></div>
            </div>
          </div>

          <div class="v729StudioSummary">
            <div class="v729SummaryCell"><span>LEFT PREPARADO</span><b id="v729SumLeft">—</b></div>
            <div class="v729SummaryCell"><span>RIGHT PREPARADO</span><b id="v729SumRight">—</b></div>
            <div class="v729SummaryCell"><span>LOWER PREPARADO</span><b id="v729SumLower">—</b></div>
          </div>

          <div class="v729LegacySelects">
            <select id="v727Left"></select>
            <select id="v727Right"></select>
            <select id="v727Lower"></select>
          </div>

          <div class="v723Msg">Toque nos botões para montar a cena. O centro fica transparente para câmera/apresentador. Nada vai ao ar até o TAKE.</div>
        </div>

        <div id="v723Msg" class="v723Msg"></div>
      </div>

      <div class="v723Section">
        <div class="v723SectionTitle">VISUAL</div>
        <div class="v723ThemeStub">
          <span class="v723ThemeChip active">Central</span>
          <span class="v723ThemeChip">Emissora · próxima etapa</span>
          <span class="v723ThemeChip">Cores personalizadas · próxima etapa</span>
          <span class="v723ThemeChip">Logo · próxima etapa</span>
        </div>
      </div>

      <div class="v723Section">
        <div class="v723SectionTitle">HISTÓRICO DE TROCAS</div>
        <div id="v723History" class="v723History"><div class="muted">As trocas desta sessão aparecerão aqui.</div></div>
      </div>
    </section>`;

    const room=$('#v723Room'),office=$('#v723Office'),uf=$('#v723UF'),scene=$('#v723Scene'),
          city=$('#v723City'),msg=$('#v723Msg'),frame=$('#v723PrevFrame');

    function studioOptions(slotKey='left'){
      const l=localInfo();
      const selected=resolveCity();
      const cityLabel=selected.label||l.city;
      const base=[
        {v:'off',t:'Desligado'},
        {v:'pres-br',t:'Presidente · Brasil'},
        {v:'pres-mg',t:'Presidente · Minas Gerais'},
        {v:'pres-local',t:`Presidente · ${l.city}`},
        {v:'pres-selected',t:`Presidente · ${cityLabel||'cidade selecionada'}`},
        {v:'gov2',t:'Governadores · 2º turno'}
      ];
      if(slotKey!=='lower')base.push(
        {v:'map-br',t:'Mapa · Brasil'},
        {v:'map-mg',t:'Mapa · Minas Gerais'},
        {v:'map-state',t:`Mapa · ${UF_NAMES[uf.value]||uf.value.toUpperCase()}`}
      );
      return base;
    }
    function studioLabel(v){
      const opt=studioOptions('left').find(x=>x.v===v)||studioOptions('lower').find(x=>x.v===v);
      return opt?.t||'Desligado';
    }
    function choiceClass(v){
      if(v==='off')return'off';
      if(v.startsWith('map-'))return'map';
      if(v==='gov2')return'gov';
      return'';
    }
    function renderStudioVisual(){
      const config=[
        {key:'left',select:'#v727Left',box:'#v729ChoicesLeft',current:'#v729CurrentLeft',sum:'#v729SumLeft'},
        {key:'right',select:'#v727Right',box:'#v729ChoicesRight',current:'#v729CurrentRight',sum:'#v729SumRight'},
        {key:'lower',select:'#v727Lower',box:'#v729ChoicesLower',current:'#v729CurrentLower',sum:'#v729SumLower'}
      ];
      config.forEach(c=>{
        const sel=$(c.select),box=$(c.box);if(!sel||!box)return;
        const opts=studioOptions(c.key),value=sel.value||'off';
        box.innerHTML=opts.map(o=>`<button type="button" class="v729Choice ${choiceClass(o.v)} ${o.v===value?'on':''}" data-slot="${c.key}" data-slot-value="${o.v}">${esc(o.t.replace('Presidente · ','').replace('Governadores · 2º turno','Governadores'))}</button>`).join('');
        $(c.current).textContent=studioLabel(value);
        $(c.sum).textContent=studioLabel(value);
      });
    }
    async function applyStudioChoice(key,value){
      const id=key==='left'?'#v727Left':key==='right'?'#v727Right':'#v727Lower';
      const el=$(id);if(!el)return;
      el.value=value;
      readStudioControls();
      renderStudioVisual();
      showPreview();
      await savePreview().catch(()=>{});
      msg.textContent=`STUDIO: ${key.toUpperCase()} preparado com ${studioLabel(value)}.`;
    }
    async function applyStudioPreset(name){
      const l=localInfo(),sel=resolveCity();
      const chosen=sel.mun?'pres-selected':'pres-local';
      const presets={
        brasil:{left:'map-br',right:'pres-br',lower:'pres-mg'},
        minas:{left:'map-mg',right:'pres-mg',lower:'pres-local'},
        cidade:{left:'map-mg',right:chosen,lower:'pres-br'},
        governadores:{left:'map-br',right:'gov2',lower:'pres-br'},
        apresentador:{left:'map-mg',right:'pres-br',lower:'pres-local'}
      };
      const pr=presets[name];if(!pr)return;
      $('#v727Left').value=pr.left;
      $('#v727Right').value=pr.right;
      $('#v727Lower').value=pr.lower;
      readStudioControls();
      renderStudioVisual();
      showPreview();
      await savePreview().catch(()=>{});
      msg.textContent=`Preset ${name.toUpperCase()} preparado na PRÉVIA.`;
    }

    function slotToValue(s){
      if(!s||s.kind==='off')return'off';
      if(s.kind==='gov2')return'gov2';
      if(s.kind==='map-br')return'map-br';
      if(s.kind==='map-mg')return'map-mg';
      if(s.kind==='map-state')return'map-state';
      if(s.kind==='president'&&s.uf==='br')return'pres-br';
      if(s.kind==='president'&&s.uf==='mg'&&!s.mun)return'pres-mg';
      const l=localInfo();
      if(s.kind==='president'&&s.mun&&String(s.mun)===String(l.mun))return'pres-local';
      if(s.kind==='president'&&s.mun)return'pres-selected';
      return'off';
    }
    function valueToSlot(v){
      const l=localInfo(),sel=resolveCity();
      if(v==='off')return{kind:'off'};
      if(v==='gov2')return{kind:'gov2'};
      if(v==='map-br')return{kind:'map-br',label:'Brasil'};
      if(v==='map-mg')return{kind:'map-mg',uf:'mg',label:'Minas Gerais'};
      if(v==='map-state')return{kind:'map-state',uf:uf.value,label:UF_NAMES[uf.value]||uf.value.toUpperCase()};
      if(v==='pres-br')return{kind:'president',uf:'br',label:'Brasil'};
      if(v==='pres-mg')return{kind:'president',uf:'mg',label:'Minas Gerais'};
      if(v==='pres-local')return{kind:'president',uf:l.uf,mun:l.mun,label:l.city};
      if(v==='pres-selected'){
        if(sel.mun)return{kind:'president',uf:uf.value,mun:sel.mun,label:sel.label};
        return{kind:'president',uf:l.uf,mun:l.mun,label:l.city};
      }
      return{kind:'off'};
    }
    function fillStudioControls(){
      [['#v727Left','left'],['#v727Right','right'],['#v727Lower','lower']].forEach(([id,key])=>{
        const el=$(id); if(!el)return;
        const opts=studioOptions(key);
        el.innerHTML=opts.map(o=>`<option value="${o.v}">${esc(o.t)}</option>`).join('');
        el.value=slotToValue(studioSlots[key]);
      });
      $('#v727StudioCfg')?.classList.toggle('on',scene.value==='studio');
      renderStudioVisual();
    }
    function readStudioControls(){
      studioSlots={
        left:valueToSlot($('#v727Left').value),
        right:valueToSlot($('#v727Right').value),
        lower:valueToSlot($('#v727Lower').value)
      };
      preview.studio_slots=studioSlots;
    }

    function localInfo(){
      const r=current();
      return {uf:r.default_uf||'mg',mun:r.default_mun||'',city:r.default_city||'Cidade local'};
    }
    function updateLocal(){
      const l=localInfo();
      $('#v723Local strong').textContent=`Presidente · ${l.city}`;
      $('#v723Local small').textContent='Cidade principal da sala';
    }
    async function fillCities(){
      const previous=city.value;
      city.innerHTML='<option value="">Selecione um município</option>';
      city.disabled=uf.value==='br';
      if(uf.value==='br'){
        city.innerHTML='<option value="">Brasil inteiro</option>';
        return;
      }
      try{
        const all=await loadMunicipalities();
        const arr=(all[uf.value]||[]);
        city.innerHTML='<option value="">Selecione um município</option>'+arr.map(m=>`<option value="${esc(m.nm)}" data-cd="${esc(m.cd)}">${esc(m.nm)}</option>`).join('');
        if(previous&&[...city.options].some(o=>o.value===previous))city.value=previous;
      }catch(_){}
    }
    function resolveCity(){
      if(!city.value||uf.value==='br')return{mun:'',label:''};
      const opt=city.options[city.selectedIndex];
      const cd=opt?.dataset?.cd||'';
      return{mun:cd,label:city.value};
    }
    function fromControls(){
      const c=resolveCity();
      let chosen=uf.value;
      if(office.value==='gov'&&chosen==='br'&&preview.screen!=='gov2'){chosen='mg';uf.value='mg'}
      preview={screen:'president',scene:scene.value,office:office.value,uf:chosen,mun:c.mun,label:c.label||(chosen==='br'?'Brasil':UF_NAMES[chosen])};
    }
    function syncSceneButtons(){
      $$('[data-scene]').forEach(b=>b.classList.toggle('active',b.dataset.scene===preview.scene));
    }
    function showPreview(){
      preview.studio_slots=studioSlots;
      $('#v723PrevTitle').textContent=describe(preview);
      frame.src=previewUrl(preview,current());
      syncSceneButtons();
      fillStudioControls();
    }
    function showLive(){
      const r=current(),s=stateOf(r.state);
      $('#v723OnTitle').textContent=describe(s);
      const when=r.state?.updated_at?new Date(r.state.updated_at).toLocaleTimeString('pt-BR'):'—';
      $('#v723OnMeta').textContent=`${r.name} · última troca ${when}`;
    }
    async function savePreview(){
      const r=current();
      const {error}=await sb.from('broadcast_state').update({
        preview_screen:preview.screen,preview_scene:preview.scene,preview_office:preview.office,
        preview_uf:preview.uf,preview_mun:preview.mun||null,preview_label:preview.label||null,
        preview_studio_slots:studioSlots
      }).eq('channel_id',r.id);
      if(error)throw error;
      r.state={...(r.state||{}),preview_screen:preview.screen,preview_scene:preview.scene,preview_office:preview.office,preview_uf:preview.uf,preview_mun:preview.mun||null,preview_label:preview.label||null,preview_studio_slots:studioSlots};
    }
    function addHistory(label){
      history.unshift({label,time:new Date().toLocaleTimeString('pt-BR')});
      history=history.slice(0,6);
      $('#v723History').innerHTML=history.map(h=>`<div class="v723HistoryItem"><strong>${esc(h.label)}</strong><span>${h.time}</span></div>`).join('');
    }
    async function take(){
      const r=current(),b=$('#v723Take');
      b.disabled=true;b.innerHTML='ENVIANDO…';
      try{
        await savePreview();
        const {data:{user}}=await sb.auth.getUser();
        const payload={screen:preview.screen,scene:preview.scene,office:preview.office,uf:preview.uf,mun:preview.mun||null,label:preview.label||null,studio_slots:studioSlots,updated_at:new Date().toISOString(),updated_by:user?.id||null};
        const {data,error}=await sb.from('broadcast_state').update(payload).eq('channel_id',r.id).select().single();
        if(error)throw error;
        r.state=data;showLive();addHistory(describe(preview));
        msg.textContent=`No ar: ${describe(preview)}.`;
      }catch(e){msg.textContent=e.message||'Falha ao colocar no ar.'}
      finally{b.disabled=false;b.innerHTML='TAKE<br>COLOCAR NO AR'}
    }
    async function preset(kind){
      const sc=scene.value;
      if(kind==='br')preview={screen:'president',scene:sc,office:'pres',uf:'br',mun:'',label:'Brasil'};
      if(kind==='mg')preview={screen:'president',scene:sc,office:'pres',uf:'mg',mun:'',label:'Minas Gerais'};
      if(kind==='local'){const l=localInfo();preview={screen:'president',scene:sc,office:'pres',uf:l.uf,mun:l.mun,label:l.city}}
      if(kind==='gov2'){
        preview={screen:'gov2',scene:sc,office:'gov',uf:'br',mun:'',label:'Governadores · 2º turno'};
      }
      if(kind==='map-br'){
        preview={screen:'map-br',scene:'fullscreen',office:'pres',uf:'br',mun:'',label:'Brasil'};
        scene.value='fullscreen';
      }
      if(kind==='map-mg'){
        preview={screen:'map-mg',scene:'fullscreen',office:'pres',uf:'mg',mun:'',label:'Minas Gerais'};
        scene.value='fullscreen';
      }
      if(kind==='waiting')preview={screen:'waiting',scene:sc,office:'pres',uf:'br',mun:'',label:'Tela de espera'};
      if(kind==='clear'){
        preview={screen:'waiting',scene:'fullscreen',office:'pres',uf:'br',mun:'',label:'Tela de espera'};
        scene.value='fullscreen';office.value='pres';uf.value='br';city.value='';
        showPreview();await take();return;
      }
      scene.value=preview.scene;office.value=preview.office;uf.value=preview.uf;
      await fillCities();city.value=preview.mun?preview.label:'';
      showPreview();await savePreview().catch(()=>{});
      msg.textContent='Cena preparada na prévia.';
    }
    async function applyRoom(){
      const r=current(),s=stateOf(r.state);
      updateLocal();
      preview={screen:s.preview_screen,scene:s.preview_scene,office:s.preview_office,uf:s.preview_uf,mun:s.preview_mun,label:s.preview_label};
      studioSlots=s.preview_studio_slots||s.studio_slots||studioSlots;
      preview.studio_slots=studioSlots;
      scene.value=preview.scene;office.value=preview.office;uf.value=preview.uf;
      await fillCities();city.value=preview.mun?preview.label:'';
      showPreview();showLive();msg.textContent=`Sala ${r.name} pronta · cidade principal: ${localInfo().city}.`;
    }

    room.addEventListener('change',applyRoom);
    $$('[data-preset]').forEach(b=>b.addEventListener('click',()=>preset(b.dataset.preset)));
    $$('[data-scene]').forEach(b=>b.addEventListener('click',async()=>{
      preview.scene=b.dataset.scene;
      if(preview.scene==='studio')preview.screen='president';
      scene.value=preview.scene;showPreview();await savePreview().catch(()=>{});
    }));
    scene.addEventListener('change',async()=>{preview.scene=scene.value;if(preview.scene==='studio')preview.screen='president';showPreview();await savePreview().catch(()=>{})});
    office.addEventListener('change',async()=>{fromControls();await fillCities();showPreview();await savePreview().catch(()=>{})});
    uf.addEventListener('change',async()=>{await fillCities();fromControls();showPreview();await savePreview().catch(()=>{})});
    city.addEventListener('change',async()=>{fromControls();fillStudioControls();showPreview();await savePreview().catch(()=>{})});
    ['#v727Left','#v727Right','#v727Lower'].forEach(id=>$(id)?.addEventListener('change',async()=>{
      readStudioControls();showPreview();await savePreview().catch(()=>{});
      msg.textContent='Composição STUDIO preparada na prévia.';
    }));
    $('#v727StudioCfg')?.addEventListener('click',async(e)=>{
      const choice=e.target.closest('[data-slot][data-slot-value]');
      if(choice){await applyStudioChoice(choice.dataset.slot,choice.dataset.slotValue);return}
      const presetBtn=e.target.closest('[data-studio-preset]');
      if(presetBtn){
        document.querySelectorAll('.v729StudioPreset').forEach(x=>x.classList.remove('on'));
        presetBtn.classList.add('on');
        await applyStudioPreset(presetBtn.dataset.studioPreset);
      }
    });

    window.addEventListener('message',async(ev)=>{
      if(ev.origin!==location.origin)return;
      const d=ev.data||{};
      if(d.type!=='central-map-select')return;
      if(d.uf&&d.mun){
        uf.value=String(d.uf).toLowerCase();
        await fillCities();
        const opts=[...city.options];
        const hit=opts.find(o=>String(o.dataset.cd||'')===String(d.mun));
        if(hit)city.value=hit.value;
        preview={screen:'president',scene:'fullscreen',office:'pres',uf:String(d.uf).toLowerCase(),mun:String(d.mun),label:d.label||hit?.textContent||'Município'};
      }else if(d.uf){
        uf.value=String(d.uf).toLowerCase();
        preview={screen:'president',scene:'fullscreen',office:'pres',uf:String(d.uf).toLowerCase(),mun:'',label:d.label||String(d.uf).toUpperCase()};
      }else return;
      scene.value='fullscreen';
      office.value='pres';
      showPreview();
      await savePreview().catch(()=>{});
      msg.textContent='Detalhe territorial preparado na PRÉVIA. Confira e use TAKE quando quiser colocar no ar.';
    });


    $('#v732MapMode')?.addEventListener('click',async()=>{
      $('#v732MapMode').classList.add('on');$('#v730Pres').classList.remove('on');$('#v730Gov').classList.remove('on');
      syncV730();await v732FillMapCities();
    });
    $('#v732MapUf')?.addEventListener('change',async()=>{await v732FillMapCities()});
    $('#v732OpenMap')?.addEventListener('click',v732OpenStateMap);
    $('#v732PrepareCity')?.addEventListener('click',v732PrepareMunicipality);
    $('#v730Pres')?.addEventListener('click',async()=>{
      $('#v730Pres').classList.add('on');$('#v730Gov').classList.remove('on');$('#v732MapMode')?.classList.remove('on');
      await prepareV730();
    });
    $('#v730Gov')?.addEventListener('click',async()=>{
      $('#v730Gov').classList.add('on');$('#v730Pres').classList.remove('on');$('#v732MapMode')?.classList.remove('on');
      await prepareV730();
    });
    $('#v730UfMirror')?.addEventListener('change',async()=>{
      uf.value=$('#v730UfMirror').value;
      await fillCities();
      syncV730();
      await prepareV730();
    });
    $('#v730CityMirror')?.addEventListener('change',async()=>{await prepareV730()});
    document.querySelectorAll('.v730Dest').forEach(b=>b.addEventListener('click',async()=>{
      v730Dest=b.dataset.dest;
      await prepareV730();
    }));

    $('#v723Take').addEventListener('click',take);
    $('#v723OpenH').addEventListener('click',()=>window.open(outputUrl(current(),'horizontal'),'_blank','noopener'));
    $('#v723OpenV').addEventListener('click',()=>window.open(outputUrl(current(),'vertical'),'_blank','noopener'));
    $('#v723CopyH').addEventListener('click',()=>copy(outputUrl(current(),'horizontal'),$('#v723CopyH')));
    $('#v723CopyV').addEventListener('click',()=>copy(outputUrl(current(),'vertical'),$('#v723CopyV')));

    await applyRoom();
  }catch(e){
    $('#v723Load').innerHTML=`<span style="color:#ffd2d7">${esc(e.message||'Falha ao carregar a Mesa de Corte Visual.')}</span>`;
  }
};

normalizeVersion();

})();

(function v731AccessLayer(){
  'use strict';

  async function v731RoomCount(user){
    try{
      const {data,error}=await sb
        .from('broadcast_channel_members')
        .select('channel_id')
        .eq('user_id',user.id);
      if(error)return 0;
      return new Set((data||[]).map(x=>x.channel_id)).size;
    }catch(_){return 0}
  }

  loadProfile=async function(user){
    const roomCount=await v731RoomCount(user);
    const {data,error}=await sb.from('profiles').select('plan,active').eq('id',user.id).maybeSingle();

    if(data?.active===false){
      await sb.auth.signOut();
      throw new Error('Acesso desativado. Fale com o administrador.');
    }

    const isAdmin=roomCount>1;
    if(!data&&!isAdmin){
      await sb.auth.signOut();
      throw new Error('Perfil de acesso não encontrado.');
    }

    S.user=user;
    userEmail.textContent=user.email||'';
    setPlanUI(isAdmin?'admin':(data?.plan||'free'));

    let scope=document.querySelector('#v731AccessScope');
    if(!scope){
      scope=document.createElement('span');
      scope.id='v731AccessScope';
      scope.className='v731AccessScope';
      userEmail.insertAdjacentElement('afterend',scope);
    }
    scope.textContent=isAdmin
      ? `ADMINISTRADOR · ${roomCount} SALAS AUTORIZADAS`
      : roomCount===1 ? 'OPERADOR · 1 SALA AUTORIZADA' : 'ACESSO DE CONSULTA';

    loginView.style.display='none';
    appView.style.display='block';
    render();
    loadOfficialElectorate().catch(()=>{});
  };

  function installFreeDoor(){
    if(document.querySelector('#v731FreeLink'))return;
    const card=document.querySelector('#loginView');
    if(!card)return;
    const a=document.createElement('a');
    a.id='v731FreeLink';
    a.className='v731FreeLink';
    a.href='./free.html';
    a.textContent='ACESSAR VERSÃO FREE · SOMENTE CONSULTA';
    card.appendChild(a);

    const note=document.createElement('div');
    note.className='v731AdminNote';
    note.textContent='FREE: acompanhamento dos resultados sem acesso à transmissão, salas ou TAKE.';
    card.appendChild(note);
  }

  installFreeDoor();

  // Revalida sessão com a nova regra caso o patch carregue depois do script-base.
  sb.auth.getSession().then(({data})=>{
    if(data?.session?.user)loadProfile(data.session.user).catch(()=>{});
  });
})();
