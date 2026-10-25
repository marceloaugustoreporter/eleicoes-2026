/* Central de Apuração — V7.23 · Mesa de Corte Visual */
(function(){
'use strict';
if(window.__CENTRAL_APURACAO_V723__) return;
window.__CENTRAL_APURACAO_V723__=true;

const APP_VERSION='V7.44';
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

/* V7.44 · Studio Visual */
#appView .topbar h2{font-size:0!important}
#appView .topbar h2::after{content:"Central de Apuração V7.44";font-size:18px;font-weight:950}
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

/* V7.44 · Botoneira operacional */
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

/* V7.44 · acesso ADMIN + porta FREE */
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

/* V7.44 · legibilidade operacional */
.v723Room strong{font-size:14px}
.v723Room select{font-size:14px;padding:12px 13px;min-height:46px}
.v723Status{font-size:12px;padding:9px 12px}
.v723Section{padding:16px}
.v723SectionTitle{font-size:15px;letter-spacing:.6px;margin-bottom:12px}
.v723Monitor{padding:15px}
.v723Kicker{font-size:11px}
.v723Now{font-size:26px}
.v723Meta{font-size:12px;line-height:1.4}
.v723Take{font-size:14px;padding:18px 20px;min-width:145px}
.v723Cut{font-size:10px}
.v723Btn{min-height:78px;padding:13px 12px}
.v723Btn strong{font-size:14px}
.v723Btn small{font-size:11px;line-height:1.35}
.v723Controls select,.v723Controls input,.v725CityWrap select{font-size:14px;padding:12px 13px}
.v725CityHint,.v723Msg{font-size:11px}
.v723Out{padding:13px}
.v723Out b{font-size:13px}
.v723Out span{font-size:10px;line-height:1.35}
.v723OutActions button{min-height:44px;font-size:12px}
.v729StudioPreset{min-height:72px;padding:12px 10px}
.v729StudioPreset strong{font-size:12px}
.v729StudioPreset small{font-size:10px;line-height:1.35}
.v729SlotCard{padding:11px}
.v729SlotHead b{font-size:13px}
.v729SlotCurrent{font-size:10px}
.v729Choice{min-height:42px!important;font-size:11px!important;padding:9px 7px}
.v729SummaryCell{padding:9px}
.v729SummaryCell span{font-size:9px}
.v729SummaryCell b{font-size:11px}
.v727StudioTitle{font-size:13px!important}
.v730ContentPanel{padding:13px}
.v730ContentTitle b{font-size:13px}
.v730ContentTitle span{font-size:10px}
.v730Toggle{font-size:12px;padding:12px}
.v730Toggle small{font-size:9.5px;line-height:1.35}
.v730SelectBox{padding:10px}
.v730SelectBox label{font-size:10px}
.v730SelectBox select{font-size:12px;padding:10px}
.v730Dest{font-size:11px;padding:10px 6px;min-height:40px}
.v730Hint,.v732MapHint{font-size:10px}
.v732MapGrid select,.v732MapGrid input,.v732MapGrid button{font-size:12px;min-height:42px}
.v732MapFinderHead b{font-size:12px}
.v732MapFinderHead span{font-size:9px}

/* Formato de trabalho: botoneira real */
.v734Format{display:grid;grid-template-columns:1fr 1fr;gap:10px;border:1px solid #31526b;background:#071522;border-radius:13px;padding:10px}
.v734FormatBtn{border:1px solid #2b4e67;background:#0a1c2b;color:#c7d9e5;border-radius:11px;padding:13px 14px;text-align:left;cursor:pointer;min-height:66px}
.v734FormatBtn strong{display:block;font-size:14px;color:#fff}
.v734FormatBtn small{display:block;margin-top:4px;font-size:10px;color:#8fa8b8}
.v734FormatBtn.on{border-color:#35d0f6;background:rgba(53,208,246,.14);box-shadow:inset 0 0 0 1px rgba(53,208,246,.15)}
.v734FormatBtn.vertical.on{border-color:#b57cff;background:rgba(181,124,255,.14)}
.v734FormatBtn.on:before{content:"●";display:inline-block;color:#4fe0ad;margin-right:7px}
.v734FormatNote{margin-top:7px;font-size:11px;color:#9cb4c3;line-height:1.4}
.v734OutputHidden{display:none!important}
.v723Mini.verticalPreview{aspect-ratio:9/16;max-height:430px;width:min(245px,100%);margin-left:auto;margin-right:auto}

@media(max-width:900px){
  .v734Format{grid-template-columns:1fr}
  .v723Now{font-size:22px}
}


/* V7.44 · correções operacionais */
.v738MapFields{display:grid;grid-template-columns:1fr 1.7fr;gap:10px;margin-top:9px}
.v738MapFields>div{border:1px solid #29465e;background:#071522;border-radius:10px;padding:10px}
.v738MapFields label{display:block;font-size:10px;font-weight:950;color:#8fb3c8;margin-bottom:6px}
.v738MapFields select{width:100%;min-height:44px;border:1px solid #31516a;background:#0a1c2b;color:#fff;border-radius:9px;padding:10px 11px;font-size:12px}
.v738MapActions{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:10px}
.v738MapActions button{min-height:48px;border-radius:10px;font-size:12px;font-weight:950;cursor:pointer}
.v738MapStatus{margin-top:9px;border:1px solid #2c526c;background:#071724;border-radius:9px;padding:9px 10px;color:#9fc4d7;font-size:10px;line-height:1.4}
.v738GovPair{display:grid;gap:7px;margin-top:9px}
.v738GovCand{display:grid;grid-template-columns:38px 1fr;gap:8px;align-items:center;border-top:1px solid #173247;padding-top:7px}
.v738GovPic{width:36px;height:36px;border-radius:50%;overflow:hidden;background:#10283a;border:1px solid #31526b}
.v738GovPic img{width:100%;height:100%;object-fit:cover;display:block}
.v738GovName{font-size:11px;font-weight:950;color:#fff}
.v738GovMeta{font-size:8px;color:#8ba6b8;margin-top:2px}
.v738RadarSelect{width:100%;min-height:44px;border:1px solid #31516a;background:#071522;color:#fff;border-radius:10px;padding:9px 10px;font-size:12px}
@media(max-width:800px){.v738MapFields,.v738MapActions{grid-template-columns:1fr}}


/* V7.44 · ajuste de leitura do seletor de mapa estadual */
.v738MapFields{
  display:grid!important;
  grid-template-columns:1fr!important;
  gap:10px!important;
  margin-top:10px!important;
  overflow:visible!important;
}
.v738MapFields>div{
  width:100%!important;
  min-width:0!important;
  box-sizing:border-box!important;
  overflow:visible!important;
}
.v738MapFields label{
  display:block!important;
  margin-bottom:6px!important;
}
.v738MapFields select{
  display:block!important;
  width:100%!important;
  min-width:0!important;
  max-width:100%!important;
  box-sizing:border-box!important;
  position:relative!important;
  z-index:2!important;
  color:#fff!important;
  background:#0a1c2b!important;
}
.v738MapActions{
  position:relative!important;
  z-index:1!important;
  margin-top:10px!important;
}
.v738MapStatus{
  clear:both!important;
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
  const u=new URL('./obs-live-v744.html?v=742-map-lines',location.href);
  u.searchParams.set('channel',room.slug);
  u.searchParams.set('token',room.output_token);
  u.searchParams.set('layout',layout);
  return u.href;
}
function previewUrl(p,room,workLayout='horizontal'){
  const u=new URL('./obs-live-v744.html?v=742-map-lines',location.href);
  u.searchParams.set('direct','1');
  u.searchParams.set('layout',workLayout);
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
  const {data:{user}}=await sb.auth.getUser();
  if(!user)return[];

  // Busca primeiro os vínculos do próprio usuário. Isso evita depender de
  // uma filtragem indireta da tabela de canais e garante a sala pessoal.
  const {data:memberships,error:me}=await sb
    .from('broadcast_channel_members')
    .select('channel_id,role')
    .eq('user_id',user.id);
  if(me)throw me;

  const ids=[...new Set((memberships||[]).map(x=>x.channel_id).filter(Boolean))];
  if(!ids.length)return[];

  const {data,error}=await sb
    .from('broadcast_channels')
    .select('id,slug,name,output_token,active,default_uf,default_mun,default_city')
    .in('id',ids)
    .eq('active',true)
    .order('name');
  if(error)throw error;
  if(!data?.length)return[];

  const {data:states,error:e2}=await sb
    .from('broadcast_state')
    .select('*')
    .in('channel_id',data.map(x=>x.id));
  if(e2)throw e2;

  const m=new Map((states||[]).map(x=>[x.channel_id,x]));
  return data
    .map(x=>({...x,state:m.get(x.id)||null}))
    .sort((a,b)=>{
      if(a.slug==='marcelo-augusto')return -1;
      if(b.slug==='marcelo-augusto')return 1;
      return String(a.name).localeCompare(String(b.name),'pt-BR');
    });
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
    let workLayout='horizontal';
    const current=()=>{
      const id=$('#v723Room').value;
      if(id==='__admin__')return null;
      return rooms.find(r=>r.id===id)||null;
    };
    const previewProxyRoom=()=>current()||rooms[0]||null;

    let v730Dest='fullscreen';
    async function v732FillMapCities(){
      const mapUf=$('#v732MapUf')?.value||uf.value;
      const sel=$('#v732MapCity');if(!sel)return;
      sel.innerHTML='<option value="">Selecione um município</option>';
      if(!mapUf||mapUf==='br')return;
      const all=await loadMunicipalities();
      (all[mapUf]||[]).forEach(m=>sel.insertAdjacentHTML('beforeend',`<option value="${esc(m.cd)}">${esc(m.nm)}</option>`));
      const st=$('#v738MapStatus');if(st)st.innerHTML=`<strong>ESTADO DO MAPA: ${esc(UF_NAMES[mapUf]||mapUf.toUpperCase())}</strong> · ${(all[mapUf]||[]).length} municípios disponíveis.`;
    }
    function v732SelectedCity(){
      const mapUf=$('#v732MapUf')?.value||uf.value;
      const cd=$('#v732MapCity')?.value||'';
      const rows=(S.municipalities?.[mapUf]||[]);
      return rows.find(m=>String(m.cd)===String(cd))||null;
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
      const st=$('#v738MapStatus');if(st)st.textContent=`Mapa de ${UF_NAMES[mapUf]||mapUf.toUpperCase()} preparado. Confira a PRÉVIA acima.`;
      document.querySelector('.v723Program')?.scrollIntoView({behavior:'smooth',block:'start'});
    }
    async function v732PrepareMunicipality(){
      const mapUf=$('#v732MapUf')?.value||uf.value;
      const m=v732SelectedCity();
      if(!m){msg.textContent='Selecione um município antes de preparar.';const st=$('#v738MapStatus');if(st)st.textContent='Selecione um município na lista.';return}
      uf.value=mapUf;
      await fillCities();
      const hit=[...city.options].find(o=>String(o.dataset.cd||'')===String(m.cd));
      if(hit)city.value=hit.value;
      preview={screen:'president',scene:'fullscreen',office:'pres',uf:mapUf,mun:String(m.cd),label:m.nm};
      scene.value='fullscreen';office.value='pres';
      showPreview();
      await savePreview().catch(()=>{});
      msg.textContent=`${m.nm} preparado na PRÉVIA.`;
      const st=$('#v738MapStatus');if(st)st.textContent=`${m.nm} preparado. Confira a PRÉVIA acima e use TAKE quando desejar.`;
      document.querySelector('.v723Program')?.scrollIntoView({behavior:'smooth',block:'start'});
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
      if(mu&&$('#v732MapFinder')?.classList.contains('on'))v732FillMapCities().catch(()=>{});
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
        <select id="v723Room">${S.plan==='admin'?'<option value="__admin__">ADMIN · SEM SALA</option>':''}${rooms.map(r=>`<option value="${r.id}" ${r.slug==='marcelo-augusto'?'selected':''}>${esc(r.name)}</option>`).join('')}</select>
      </div>
      <div id="v733NoRoom" class="v733NoRoom" style="display:none">Modo administrador de teste: você pode montar e conferir a PRÉVIA, mas TAKE e saídas OBS ficam bloqueados até selecionar uma sala.</div>

      <div>
        <div class="v723SectionTitle" style="margin-bottom:7px">FORMATO DE TRABALHO</div>
        <div class="v734Format">
          <button type="button" id="v734Horizontal" class="v734FormatBtn on"><strong>HORIZONTAL · 16:9</strong><small>OBS/vMix · 1920×1080</small></button>
          <button type="button" id="v734Vertical" class="v734FormatBtn vertical" disabled style="display:none"><strong>VERTICAL · 9:16</strong><small>Temporariamente desativado</small></button>
        </div>
        <div id="v734FormatNote" class="v734FormatNote">HORIZONTAL · 16:9 ativo. A saída vertical está temporariamente desativada para priorizar estabilidade na transmissão.</div>
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
            <div id="v734OutH" class="v723Out"><b>Horizontal · 1920×1080</b><span>OBS / vMix</span><div class="v723OutActions"><button id="v723OpenH" class="btn">Abrir saída</button><button id="v723CopyH" class="btn secondary">Copiar URL</button></div></div>
            <div id="v734OutV" class="v723Out v734OutputHidden"><b>Vertical · 1080×1920</b><span>Live vertical · fonte Browser 1080×1920</span><div class="v723OutActions"><button id="v723OpenV" class="btn">Abrir saída</button><button id="v723CopyV" class="btn secondary">Copiar URL</button></div></div>
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
            <div class="v732MapFinderHead"><b>MAPA MUNICIPAL DO ESTADO</b><span>escolha o estado e depois o município</span></div>
            <div class="v738MapFields">
              <div><label>ESTADO</label><select id="v732MapUf"></select></div>
              <div><label>MUNICÍPIO</label><select id="v732MapCity"><option value="">Selecione um município</option></select></div>
            </div>
            <div class="v738MapActions">
              <button type="button" id="v732OpenMap" class="v732Open">ABRIR MAPA DO ESTADO</button>
              <button type="button" id="v732PrepareCity" class="v732Prepare">PREPARAR MUNICÍPIO NA PRÉVIA</button>
            </div>
            <div id="v738MapStatus" class="v738MapStatus">Selecione um estado. O mapa é carregado somente quando solicitado.</div>
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
      if(!r)return {uf:'mg',mun:'',city:'Município selecionado'};
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
    function isStandaloneMap(){
      return ['map-br','map-mg','map-state'].includes(preview.screen);
    }
    function syncSceneAvailability(){
      const mapOnly=isStandaloneMap();
      $$('[data-scene]').forEach(b=>{
        const locked=mapOnly&&b.dataset.scene!=='fullscreen';
        b.disabled=locked;
        b.classList.toggle('v733Locked',locked);
        b.classList.toggle('active',!locked&&b.dataset.scene===preview.scene);
      });
      [...scene.options].forEach(o=>{
        o.disabled=mapOnly&&o.value!=='fullscreen';
      });
      document.querySelectorAll('.v730Dest').forEach(b=>{
        const mapMode=$('#v732MapMode')?.classList.contains('on');
        const locked=mapMode&&b.dataset.dest!=='fullscreen';
        b.disabled=locked;
        b.classList.toggle('v733Locked',locked);
        if(locked&&b.classList.contains('on'))b.classList.remove('on');
      });
      if(mapOnly){
        preview.scene='fullscreen';
        scene.value='fullscreen';
      }
    }
    function syncWorkLayout(){
      workLayout='horizontal';
      $('#v734Horizontal')?.classList.add('on');
      $('#v734Vertical')?.classList.remove('on');
      $('#v734OutH')?.classList.remove('v734OutputHidden');
      $('#v734OutV')?.classList.add('v734OutputHidden');
      frame.closest('.v723Mini')?.classList.remove('verticalPreview');
      const n=$('#v734FormatNote');
      if(n)n.textContent='HORIZONTAL · 16:9 ativo. A saída vertical está temporariamente desativada para priorizar estabilidade na transmissão.';
    }
    async function setWorkLayout(next){
      workLayout='horizontal';
      syncWorkLayout();
      showPreview();
    }
    function syncRoomMode(){
      const noRoom=!current();
      $('#v733NoRoom').style.display=noRoom?'block':'none';
      const takeBtn=$('#v723Take');
      takeBtn.disabled=noRoom;
      takeBtn.classList.toggle('v733TakeLocked',noRoom);
      takeBtn.innerHTML=noRoom?'TAKE BLOQUEADO<br>SELECIONE UMA SALA':'TAKE<br>COLOCAR NO AR';
      ['#v723OpenH','#v723CopyH','#v723OpenV','#v723CopyV'].forEach(id=>{
        const b=$(id);if(b)b.disabled=noRoom;
      });
      syncWorkLayout();
      document.querySelector('.v723Monitor.program')?.classList.toggle('v733ProgramDisabled',noRoom);
    }
    function syncSceneButtons(){
      syncSceneAvailability();
    }
    function showPreview(){
      preview.studio_slots=studioSlots;
      $('#v723PrevTitle').textContent=describe(preview);
      frame.src=previewUrl(preview,previewProxyRoom(),workLayout);
      syncSceneButtons();
      syncRoomMode();
      fillStudioControls();
    }
    function showLive(){
      const r=current();
      if(!r){
        $('#v723OnTitle').textContent='Nenhuma sala selecionada';
        $('#v723OnMeta').textContent='Modo ADMIN · somente prévia';
        syncRoomMode();
        return;
      }
      const s=stateOf(r.state);
      $('#v723OnTitle').textContent=describe(s);
      const when=r.state?.updated_at?new Date(r.state.updated_at).toLocaleTimeString('pt-BR'):'—';
      $('#v723OnMeta').textContent=`${r.name} · última troca ${when}`;
      syncRoomMode();
    }
    async function savePreview(){
      const r=current();
      if(!r)return;
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
      if(!r){
        msg.textContent='ADMIN · SEM SALA: selecione uma emissora antes de colocar uma cena no ar.';
        syncRoomMode();
        return;
      }
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
      finally{syncRoomMode()}
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
      const r=current();
      updateLocal();
      if(!r){
        preview={screen:'president',scene:'fullscreen',office:'pres',uf:'br',mun:'',label:'Brasil'};
        scene.value='fullscreen';office.value='pres';uf.value='br';city.value='';
        await fillCities();
        showPreview();showLive();
        msg.textContent='ADMIN · SEM SALA: bancada de prévia ativa. Escolha uma sala para habilitar TAKE e saídas.';
        return;
      }
      const s=stateOf(r.state);
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
      if(b.disabled)return;
      preview.scene=b.dataset.scene;
      if(preview.scene==='studio')preview.screen='president';
      scene.value=preview.scene;showPreview();await savePreview().catch(()=>{});
    }));
    scene.addEventListener('change',async()=>{
      if(isStandaloneMap()&&scene.value!=='fullscreen'){scene.value='fullscreen';return}
      preview.scene=scene.value;if(preview.scene==='studio')preview.screen='president';showPreview();await savePreview().catch(()=>{})
    });
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
      v730Dest='fullscreen';
      syncV730();syncSceneAvailability();await v732FillMapCities();
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
      if(b.disabled)return;
      v730Dest=b.dataset.dest;
      await prepareV730();
    }));

    $('#v723Take').addEventListener('click',take);
    $('#v734Horizontal')?.addEventListener('click',()=>setWorkLayout('horizontal'));
    $('#v723OpenH').addEventListener('click',()=>{const r=current();if(r)window.open(outputUrl(r,'horizontal'),'_blank','noopener')});
    $('#v723CopyH').addEventListener('click',()=>current()&&copy(outputUrl(current(),'horizontal'),$('#v723CopyH')));

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
    a.href='./free.html?v=744-rounds';
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


(function v736LoadSanity(){
  const oldLoaded=!!(
    window.__CENTRAL_APURACAO_VERSION_GUARD_729__ ||
    window.__CENTRAL_APURACAO_VERSION_GUARD_734__ ||
    window.__CENTRAL_APURACAO_VERSION_GUARD_735__
  );
  setTimeout(()=>{
    const badge=document.createElement('span');
    badge.id='v736LoadState';
    badge.className=oldLoaded?'warn':'ok';
    badge.textContent=oldLoaded?'CONFLITO DE PATCHES':'V7.44 LIMPA';
    const top=document.querySelector('#appView .topbar h2');
    if(top)top.insertAdjacentElement('afterend',badge);
  },250);
})();


(function v738RadarSelectOverride(){
  const originalRenderRadar=renderRadar;
  renderRadar=function(){
    const stateName=UF_NAMES[S.radar.uf]||S.radar.uf.toUpperCase();
    const cityDisplay=displayCityName(S.radar.cityName||'Município');
    content.innerHTML=`
      <section class="card">
        <div class="sectionHead">
          <div><div class="eyebrow">RADAR MUNICIPAL · V7.44</div><h2>${esc(cityDisplay)} · ${esc(S.radar.uf.toUpperCase())}</h2><div class="muted">Escolha o estado e role a lista de municípios. Você também pode digitar as primeiras letras com a lista aberta.</div></div>
          <button id="radarRefresh" class="btn secondary" type="button">Atualizar Radar</button>
        </div>
        <div class="controls">
          <select id="radarUF">${UFS.map(uf=>`<option value="${uf}">${UF_NAMES[uf]} · ${uf.toUpperCase()}</option>`).join('')}</select>
          <select id="radarCitySelect" class="v738RadarSelect"><option value="">Carregando municípios…</option></select>
          <button id="radarGo" class="btn" type="button">Abrir Radar</button>
        </div>
        <div id="radarBody"></div>
      </section>`;

    const uf=$('#radarUF'), city=$('#radarCitySelect');
    uf.value=S.radar.uf;

    const fill=async()=>{
      const all=await loadMunicipalities();
      const arr=all[uf.value]||[];
      city.innerHTML='<option value="">Selecione um município</option>'+arr.map(m=>`<option value="${esc(m.cd)}">${esc(m.nm)}</option>`).join('');
      if(uf.value===S.radar.uf&&S.radar.mun)city.value=String(S.radar.mun);
      if(!city.value&&uf.value===S.radar.uf&&S.radar.cityName){
        const hit=arr.find(m=>norm(m.nm)===norm(S.radar.cityName));
        if(hit)city.value=String(hit.cd);
      }
    };

    uf.addEventListener('change',async()=>{
      S.radar.uf=uf.value;S.radar.mun='';S.radar.cityName='';resetRadarData();await fill();
    });
    const open=async()=>{
      if(!city.value){alert('Selecione um município.');return}
      const all=await loadMunicipalities(),m=(all[uf.value]||[]).find(x=>String(x.cd)===String(city.value));
      if(!m)return;
      S.radar.uf=uf.value;S.radar.mun=m.cd;S.radar.cityName=m.nm;resetRadarData();
      await loadRadar(false);
    };
    $('#radarGo').addEventListener('click',open);
    city.addEventListener('change',()=>{});
    $('#radarRefresh').addEventListener('click',()=>loadRadar(true));
    fill().then(()=>renderRadarBody());
    renderRadarBody();
  };
})();


(function v738GovernorPhotos(){
  const originalRenderGovernorBody=renderGovernorBody;
  renderGovernorBody=function(){
    const box=$('#govBody');if(!box)return;
    if(S.gov.loading&&!S.gov.states.length){box.innerHTML=`<div class="loading"><span class="dot"></span><span id="govProgress">Consultando as unidades da Federação…</span></div>`;return}
    if(S.gov.selected){return originalRenderGovernorBody()}
    if(!S.gov.states.length){box.innerHTML='<div class="loading">Nenhuma disputa estadual identificada ainda nos arquivos carregados.</div>';return}
    box.innerHTML=`<div class="notice"><strong>${S.gov.states.length}</strong> unidades da Federação identificadas com candidaturas marcadas para o 2º turno.</div>
      <div class="stateGrid">${S.gov.states.map(st=>{
        const cards=st.candidates.slice(0,2).map(c=>{
          const ph=candidatePhoto(c,'gov',st.uf);
          return `<div class="v738GovCand"><div class="v738GovPic">${ph?`<img src="${ph}" alt="" loading="lazy" onerror="this.style.display='none'">`:''}</div><div><div class="v738GovName">${esc(c.nmu||c.nm)}</div><div class="v738GovMeta">${esc(c.party||'')} · ${esc(c.n||'')}</div></div></div>`;
        }).join('');
        return `<button class="stateCard" type="button" data-gov="${st.uf}"><strong>${esc(UF_NAMES[st.uf])} · ${st.uf.toUpperCase()}</strong><span>Toque para abrir a apuração do 2º turno</span><div class="v738GovPair">${cards}</div></button>`;
      }).join('')}</div>`;
    $$('[data-gov]').forEach(b=>b.addEventListener('click',()=>loadGovernorLive(b.dataset.gov)));
  };
})();


/* V7.44 · consulta de turnos no PRO (análise; transmissão permanece 2º turno) */
(function v743Rounds(){
'use strict';
if(window.__V743_ROUNDS__)return;window.__V743_ROUNDS__=true;
S.analysisRound=S.analysisRound||'2';

const v743PresElection=()=>S.analysisRound==='1'?ELE.pres1:ELE.pres2;
const v743GovElection=()=>S.analysisRound==='1'?ELE.state1:ELE.state2;
function v743RoundLabel(data=null){
  if(S.analysisRound==='1')return'1º TURNO · RESULTADO FINAL';
  const t=totalPct(data);
  if(t>=99.9)return'2º TURNO · RESULTADO FINAL';
  if(t>0)return'2º TURNO · AO VIVO';
  return'2º TURNO · AGUARDANDO APURAÇÃO';
}
function v743RoundBar(){
  return `<div class="v743RoundBar">
    <div class="v743RoundBtns">
      <button type="button" class="v743RoundBtn ${S.analysisRound==='2'?'on':''}" data-v743-round="2">2º TURNO</button>
      <button type="button" class="v743RoundBtn ${S.analysisRound==='1'?'on':''}" data-v743-round="1">1º TURNO · FINAL</button>
    </div>
    <div class="v743RoundState">${v743RoundLabel(S.pres?.data)}</div>
  </div>`;
}
function v743BindRound(){
  document.querySelectorAll('[data-v743-round]').forEach(b=>b.addEventListener('click',()=>{
    const next=b.dataset.v743Round==='1'?'1':'2';
    if(next===S.analysisRound)return;
    S.analysisRound=next;
    S.pres.data=null;S.pres.mapData={};S.pres.stateMapRows=[];S.pres.stateMapUF='';S.pres.stateMapMeta=null;
    clearTimers();render();
    window.scrollTo({top:0,behavior:'smooth'});
  }));
}

const v743OldRenderPresident=renderPresident;
renderPresident=function(){
  v743OldRenderPresident();
  const first=content.querySelector('.card');
  if(first&&!first.querySelector('.v743RoundBar'))first.insertAdjacentHTML('afterbegin',v743RoundBar());
  const ey=first?.querySelector('.eyebrow');
  if(ey)ey.textContent=S.analysisRound==='1'?'1º TURNO · PRESIDENTE · FINAL':'2º TURNO · PRESIDENTE';
  v743BindRound();
};

loadPresidentLive=async function(){
  S.pres.error='';const uf=S.pres.uf,mun=S.pres.mun;
  try{
    const params={mode:'result',election:v743PresElection(),cargo:'1',uf};
    if(mun)params.mun=mun;
    const tasks=[centralData(params)];
    if(S.analysisRound==='2')tasks.push(loadScopeReference());
    if(mun)tasks.push(loadOfficialMunicipalElectorate(uf,mun));
    const [packet]=await Promise.all(tasks);
    S.pres.data=packet.data;S.pres.cacheMeta=packet.meta||null;S.pres.last=new Date();
  }catch(e){
    S.pres.data=null;S.pres.cacheMeta=null;S.pres.error=e.message||'Arquivo ainda indisponível';
  }
  if(S.view==='pres')renderPresidentBody();
};

loadPresMap=async function(){
  if(S.pres.mapLoading)return;S.pres.mapLoading=true;
  const result={};
  try{
    const packet=await centralData({mode:'president-map',election:v743PresElection()});
    (packet.data?.states||[]).forEach(item=>{
      const d=item?.payload||null,arr=d?uniqueCandidates(d):[];
      const c13=arr.find(c=>String(c.n)==='13'),c22=arr.find(c=>String(c.n)==='22');
      const v13=num(c13?.vap),v22=num(c22?.vap),p13=pct(c13?.pvap),p22=pct(c22?.pvap);
      const hasVotes=(v13+v22)>0||num(d?.v?.vv)>0;
      let leader=null;if(hasVotes&&v13!==v22)leader=v13>v22?c13:c22;
      result[item.uf]={data:d,leader,hasVotes,p13,p22,v13,v22,margin:p13-p22};
    });
    S.pres.mapCacheMeta=packet.meta||null;
  }catch(e){
    UFS.forEach(uf=>result[uf]={data:null,leader:null,hasVotes:false,p13:0,p22:0,v13:0,v22:0,margin:0});
    S.pres.mapCacheMeta=null;
  }
  S.pres.mapData=result;S.pres.mapLoading=false;
  if(S.view==='pres')drawBrazilMap();
};

loadStateMunicipalMap=async function(force=false){
  const uf=S.pres.uf;if(uf==='br'||S.pres.stateMapLoading)return;
  if(S.analysisRound==='2'&&!secondRoundStarted(S.pres.data)){
    S.pres.stateMapLoading=false;S.pres.stateMapError='';renderStateMapStatus();drawStateMunicipalMap();return;
  }
  if(!force&&S.pres.stateMapUF===`${uf}:${S.analysisRound}`&&S.pres.stateMapRows.length){
    renderStateMapStatus();drawStateMunicipalMap();return;
  }
  S.pres.stateMapLoading=true;S.pres.stateMapError='';renderStateMapStatus();
  try{
    const packet=await centralData({mode:'state-municipal-map',election:v743PresElection(),cargo:'1',uf});
    S.pres.stateMapUF=`${uf}:${S.analysisRound}`;
    S.pres.stateMapRows=packet.data?.municipalities||[];
    S.pres.stateMapMeta={...(packet.meta||{}),totalMunicipalities:packet.data?.totalMunicipalities||0,okMunicipalities:packet.data?.okMunicipalities||0,building:!!packet.data?.building};
  }catch(e){S.pres.stateMapError=e.message||'Não foi possível carregar os dados municipais.'}
  finally{S.pres.stateMapLoading=false;if(S.view==='pres'){renderStateMapStatus();renderStateMapSummary();drawStateMunicipalMap()}}
};

const v743OldRenderPresidentBody=renderPresidentBody;
renderPresidentBody=function(){
  if(S.analysisRound==='2'){v743OldRenderPresidentBody();return}
  const box=$('#presBody');if(!box)return;
  const data=S.pres.data,official=officialElectorateForCurrentScope();
  if(!data){box.innerHTML=`<div class="notice wait"><span class="dot"></span><strong>${esc(presLocationLabel())}</strong> · não foi possível carregar o resultado final do 1º turno.${S.pres.error?' '+esc(S.pres.error):''}</div>`;return}
  box.innerHTML=`<div class="notice"><span class="dot" style="background:var(--green)"></span><strong>${esc(presLocationLabel())}</strong> · 1º turno · resultado final${S.pres.last?' · leitura '+S.pres.last.toLocaleTimeString('pt-BR'):''}</div>
    <div class="progress"><i style="width:100%"></i></div>
    ${statsHTML(data,{aptOverride:official?.voters??undefined,aptLabel:official?'eleitores aptos':'eleitorado na totalização',aptSub:official?'cadastro eleitoral 2026 · TSE':'1º turno · final'})}
    ${candidatesHTML(data,'pres',S.pres.uf,true)}`;
  const st=box.closest('.card')?.querySelector('.v743RoundState');if(st)st.textContent=v743RoundLabel(data);
};

const v743OldRadarSource=radarSource;
radarSource=function(live,reference){
  if(S.analysisRound==='1')return reference?{data:reference,round:'1º turno · final',live:false}:{data:null,round:'sem dados',live:false};
  return v743OldRadarSource(live,reference);
};
const v743OldRenderRadar=renderRadar;
renderRadar=function(){
  v743OldRenderRadar();
  const first=content.querySelector('.card');
  if(first&&!first.querySelector('.v743RoundBar'))first.insertAdjacentHTML('afterbegin',v743RoundBar());
  v743BindRound();
};

const v743OldLoadGovernorLive=loadGovernorLive;
loadGovernorLive=async function(uf){
  if(S.analysisRound==='2'){return v743OldLoadGovernorLive(uf)}
  S.gov.selected=uf;S.gov.error='';S.gov.live=null;renderGovernorBody();
  try{
    const packet=await centralData({mode:'result',election:ELE.state1,cargo:'3',uf});
    S.gov.live=packet.data;S.gov.cacheMeta=packet.meta||null;S.gov.last=new Date();
  }catch(e){S.gov.cacheMeta=null;S.gov.error=e.message||'Arquivo ainda indisponível'}
  if(S.view==='gov')renderGovernorBody();
};
const v743OldRenderGovernors=renderGovernors;
renderGovernors=function(){
  v743OldRenderGovernors();
  const first=content.querySelector('.card');
  if(first&&!first.querySelector('.v743RoundBar'))first.insertAdjacentHTML('afterbegin',v743RoundBar());
  const ey=first?.querySelector('.eyebrow');if(ey&&S.analysisRound==='1')ey.textContent='1º TURNO · GOVERNADORES · FINAL';
  v743BindRound();
};
const v743OldRenderGovernorBody=renderGovernorBody;
renderGovernorBody=function(){
  if(S.analysisRound==='2'){v743OldRenderGovernorBody();return}
  const box=$('#govBody');if(!box)return;
  if(S.gov.loading&&!S.gov.states.length){box.innerHTML='<div class="loading"><span class="dot"></span>Carregando referência do 1º turno…</div>';return}
  if(S.gov.selected){
    const data=S.gov.live;
    box.innerHTML=`<button id="govBack" class="btn ghost back" type="button">← Voltar aos estados</button>
      <div class="sectionHead"><div><div class="eyebrow">${esc(S.gov.selected.toUpperCase())} · 1º TURNO</div><h2>${esc(UF_NAMES[S.gov.selected])}</h2></div><button id="govNow" class="btn secondary" type="button">Atualizar</button></div>
      ${data?`<div class="notice"><span class="dot" style="background:var(--green)"></span>Resultado final do 1º turno · ${ptxt(totalPct(data))} das seções totalizadas</div><div class="progress"><i style="width:100%"></i></div>${statsHTML(data)}${candidatesHTML(data,'gov',S.gov.selected,true)}`:`<div class="notice wait">Não foi possível carregar o 1º turno.${S.gov.error?' '+esc(S.gov.error):''}</div>`}`;
    $('#govBack')?.addEventListener('click',()=>{S.gov.selected='';S.gov.live=null;renderGovernorBody()});
    $('#govNow')?.addEventListener('click',()=>loadGovernorLive(S.gov.selected));
    return;
  }
  v743OldRenderGovernorBody();
};

const style=document.createElement('style');
style.textContent=`
.v743RoundBar{display:flex;justify-content:space-between;align-items:center;gap:9px;margin:0 0 11px;padding:9px 10px;border:1px solid #2c526c;background:#071522;border-radius:11px}
.v743RoundBtns{display:flex;gap:7px;flex-wrap:wrap}
.v743RoundBtn{border:1px solid #31516a;background:#0a1c2b;color:#a9c0cf;border-radius:9px;padding:8px 11px;font-size:10px;font-weight:950;cursor:pointer}
.v743RoundBtn.on{border-color:#35d0f6;background:rgba(53,208,246,.14);color:#fff}
.v743RoundState{font-size:10px;font-weight:950;color:#ffd34e}
@media(max-width:700px){.v743RoundBar{align-items:stretch;flex-direction:column}}
`;
document.head.appendChild(style);
})();



/* V7.44 · seletor persistente de turno no PRO */
(function v744GlobalRoundSelector(){
'use strict';
if(window.__V744_GLOBAL_ROUND__)return;
window.__V744_GLOBAL_ROUND__=true;

function statusText(){
  if(S.analysisRound==='1')return '1º TURNO · RESULTADO FINAL';
  const t=typeof totalPct==='function'?totalPct(S.pres?.data):0;
  if(t>=99.9)return '2º TURNO · RESULTADO FINAL';
  if(t>0)return '2º TURNO · AO VIVO';
  return '2º TURNO · AGUARDANDO APURAÇÃO';
}
function mount(){
  const app=document.querySelector('#appView');
  if(!app)return;
  let bar=document.querySelector('#v744GlobalRound');
  if(!bar){
    bar=document.createElement('div');
    bar.id='v744GlobalRound';
    bar.className='v744GlobalRound';
    const nav=app.querySelector('.nav');
    if(nav)nav.insertAdjacentElement('afterend',bar);
    else {
      const top=app.querySelector('.topbar');
      if(top)top.insertAdjacentElement('afterend',bar);
      else app.prepend(bar);
    }
  }
  bar.innerHTML=`
    <div class="v744RoundLabel"><b>CONSULTA ELEITORAL</b><span>Resultados, mapas e análises</span></div>
    <div class="v744RoundBtns">
      <button type="button" class="v744RoundBtn ${S.analysisRound==='2'?'on':''}" data-v744-round="2">2º TURNO</button>
      <button type="button" class="v744RoundBtn ${S.analysisRound==='1'?'on':''}" data-v744-round="1">1º TURNO · FINAL</button>
    </div>
    <div class="v744RoundState">${statusText()}</div>`;
  bar.querySelectorAll('[data-v744-round]').forEach(b=>b.addEventListener('click',()=>{
    const next=b.dataset.v744Round==='1'?'1':'2';
    if(next===S.analysisRound)return;
    S.analysisRound=next;
    S.pres.data=null;S.pres.mapData={};S.pres.stateMapRows=[];S.pres.stateMapUF='';S.pres.stateMapMeta=null;
    clearTimers();
    render();
    mount();
    window.scrollTo({top:0,behavior:'smooth'});
  }));
}
const originalRender=render;
render=function(){originalRender();mount()};
mount();
setTimeout(()=>{mount();render()},120);
const css=document.createElement('style');
css.textContent=`
.v744GlobalRound{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:14px;margin:10px 0 12px;padding:10px 12px;border:1px solid #31536d;background:#071522;border-radius:12px}
.v744RoundLabel b{display:block;font-size:10px;color:#fff;letter-spacing:.4px}.v744RoundLabel span{display:block;margin-top:2px;font-size:8px;color:#86a2b5}
.v744RoundBtns{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.v744RoundBtn{border:1px solid #31516a;background:#0a1c2b;color:#aac0cf;border-radius:9px;padding:9px 13px;font-size:10px;font-weight:950;cursor:pointer}
.v744RoundBtn.on{border-color:#35d0f6;background:rgba(53,208,246,.14);color:#fff;box-shadow:inset 0 0 0 1px rgba(53,208,246,.12)}
.v744RoundState{font-size:9px;font-weight:950;color:#ffd34e;text-align:right}
#content>.card>.v743RoundBar{display:none!important}
@media(max-width:780px){.v744GlobalRound{grid-template-columns:1fr}.v744RoundBtns{justify-content:flex-start}.v744RoundState{text-align:left}}
`;
document.head.appendChild(css);
})();

