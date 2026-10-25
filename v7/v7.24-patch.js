/* Central de Apuração — V7.24 · Saída estável + municípios */
(function(){
'use strict';
if(window.__CENTRAL_APURACAO_V724__) return;
window.__CENTRAL_APURACAO_V724__=true;

const BUILD='724';

function currentRoomData(){
  const room=document.querySelector('#v723Room');
  if(!room)return null;
  const option=room.options[room.selectedIndex];
  return {name:option?.textContent||'', id:room.value};
}

function roomSlugFromName(name){
  const n=(name||'').toLowerCase();
  if(n.includes('ind'))return'ind-fm';
  if(n.includes('líder')||n.includes('lider'))return'tv-lider';
  if(n.includes('rádio passos')||n.includes('radio passos'))return'radio-passos';
  if(n.includes('tv passos'))return'tv-passos';
  return '';
}

async function roomOutputToken(){
  const room=currentRoomData();
  if(!room)return null;
  try{
    const {data,error}=await sb.from('broadcast_channels')
      .select('slug,output_token')
      .eq('id',room.id)
      .single();
    if(error)throw error;
    return data;
  }catch(_){
    return null;
  }
}

async function v724Url(layout){
  const r=await roomOutputToken();
  if(!r)return'';
  const u=new URL('./obs-live-v724.html',location.href);
  u.searchParams.set('channel',r.slug);
  u.searchParams.set('token',r.output_token);
  u.searchParams.set('layout',layout);
  u.searchParams.set('v',BUILD);
  return u.href;
}

function installOutputButtons(){
  const openH=document.querySelector('#v723OpenH');
  const openV=document.querySelector('#v723OpenV');
  const copyH=document.querySelector('#v723CopyH');
  const copyV=document.querySelector('#v723CopyV');
  if(!openH||openH.dataset.v724)return false;

  [openH,openV,copyH,copyV].forEach(b=>b.dataset.v724='1');

  openH.addEventListener('click',async e=>{
    e.stopImmediatePropagation();e.preventDefault();
    const u=await v724Url('horizontal');if(u)window.open(u,'_blank','noopener');
  },true);
  openV.addEventListener('click',async e=>{
    e.stopImmediatePropagation();e.preventDefault();
    const u=await v724Url('vertical');if(u)window.open(u,'_blank','noopener');
  },true);
  copyH.addEventListener('click',async e=>{
    e.stopImmediatePropagation();e.preventDefault();
    const u=await v724Url('horizontal');if(!u)return;
    try{await navigator.clipboard.writeText(u);const old=copyH.textContent;copyH.textContent='Copiado';setTimeout(()=>copyH.textContent=old,1100)}
    catch(_){prompt('Copie a URL:',u)}
  },true);
  copyV.addEventListener('click',async e=>{
    e.stopImmediatePropagation();e.preventDefault();
    const u=await v724Url('vertical');if(!u)return;
    try{await navigator.clipboard.writeText(u);const old=copyV.textContent;copyV.textContent='Copiado';setTimeout(()=>copyV.textContent=old,1100)}
    catch(_){prompt('Copie a URL:',u)}
  },true);
  return true;
}

function installGovernorButton(){
  const b=document.querySelector('[data-preset="govmg"]');
  if(!b||b.dataset.v724)return false;
  b.dataset.v724='1';
  b.dataset.preset='gov2';
  const strong=b.querySelector('strong'), small=b.querySelector('small');
  if(strong)strong.textContent='Governadores · 2º turno';
  if(small)small.textContent='Painel nacional · em preparação';
  b.style.opacity='.82';
  b.addEventListener('click',e=>{
    e.stopImmediatePropagation();
    e.preventDefault();
    const msg=document.querySelector('#v723Msg');
    if(msg)msg.textContent='Painel nacional de governadores em 2º turno: próxima etapa.';
  },true);
  return true;
}

function installCitySelect(){
  const old=document.querySelector('#v723City');
  const uf=document.querySelector('#v723UF');
  if(!old||!uf||document.querySelector('#v724City'))return false;

  old.style.display='none';

  const wrap=document.createElement('div');
  wrap.className='wide';
  wrap.id='v724CityWrap';
  wrap.innerHTML=`
    <select id="v724City" style="width:100%;background:#071522;color:#fff;border:1px solid #28465f;border-radius:11px;padding:10px 11px;font-size:12px">
      <option value="">Selecione um município</option>
    </select>
    <div style="font-size:9px;color:#8fa7b8;margin-top:5px">
      Clique na lista e use a roda do mouse ou digite as primeiras letras para localizar mais rápido.
    </div>`;
  old.parentElement.after(wrap);

  const sel=wrap.querySelector('#v724City');

  async function populate(preserve=true){
    const previous=preserve?old.value:'';
    sel.innerHTML='<option value="">Selecione um município</option>';
    if(uf.value==='br'){
      sel.disabled=true;
      sel.innerHTML='<option value="">Brasil inteiro</option>';
      old.value='';
      return;
    }
    sel.disabled=false;
    try{
      const all=await loadMunicipalities();
      const arr=(all?.[uf.value]||S?.municipalities?.[uf.value]||[]);
      for(const m of arr){
        const o=document.createElement('option');
        o.value=m.nm;
        o.textContent=m.nm;
        sel.appendChild(o);
      }
      if(previous){
        const found=[...sel.options].find(o=>o.value===previous);
        if(found)sel.value=previous;
      }
    }catch(_){}
  }

  sel.addEventListener('change',()=>{
    old.value=sel.value;
    old.dispatchEvent(new Event('change',{bubbles:true}));
  });

  uf.addEventListener('change',()=>setTimeout(()=>populate(false),0));

  const room=document.querySelector('#v723Room');
  room?.addEventListener('change',()=>setTimeout(()=>populate(true),150));

  const syncTimer=setInterval(()=>{
    if(!document.body.contains(sel)){clearInterval(syncTimer);return}
    if(old.value && sel.value!==old.value){
      const exists=[...sel.options].some(o=>o.value===old.value);
      if(exists)sel.value=old.value;
    }
  },700);

  populate(true);
  return true;
}

function install(){
  const a=installOutputButtons();
  const b=installGovernorButton();
  const c=installCitySelect();
  return a||b||c;
}

install();
const mo=new MutationObserver(()=>install());
mo.observe(document.body,{childList:true,subtree:true});
})();