/* Central de Apuração — V7.22 · Cenas e Máscaras */
(function(){
'use strict';
if(window.__CENTRAL_APURACAO_V722__)return;
window.__CENTRAL_APURACAO_V722__=true;

const APP_VERSION='V7.22';
window.CENTRAL_APURACAO_VERSION=APP_VERSION;

const sceneNames={
  'fullscreen':'Tela cheia',
  'sidebar-right':'Lateral direita',
  'sidebar-left':'Lateral esquerda',
  'lower-third':'Barra inferior'
};

function normalizeVersion(){
  const w=document.createTreeWalker(document,NodeFilter.SHOW_TEXT,{
    acceptNode(n){
      const p=n.parentElement;
      if(!p||['SCRIPT','STYLE'].includes(p.tagName))return NodeFilter.FILTER_REJECT;
      return /V7\.(14|15|16|17|18|19|20|21)\b/.test(n.nodeValue||'')?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }
  });
  const nodes=[];let n;
  while((n=w.nextNode()))nodes.push(n);
  nodes.forEach(x=>x.nodeValue=String(x.nodeValue).replace(/V7\.(14|15|16|17|18|19|20|21)\b/g,APP_VERSION));
  document.title=`Central de Apuração · ${APP_VERSION}`;
}

function stateOf(r){
  return {
    screen:r?.screen||'waiting',scene:r?.scene||'fullscreen',
    office:r?.office||'pres',uf:r?.uf||'br',mun:r?.mun||'',label:r?.label||'',
    preview_screen:r?.preview_screen||'president',preview_scene:r?.preview_scene||r?.scene||'fullscreen',
    preview_office:r?.preview_office||'pres',preview_uf:r?.preview_uf||'br',
    preview_mun:r?.preview_mun||'',preview_label:r?.preview_label||''
  };
}

function describe(screen,scene,office,uf,mun,label){
  if(screen==='waiting')return`Tela de espera · ${sceneNames[scene]||scene}`;
  const cargo=office==='gov'?'Governador':'Presidente';
  const scope=label||(mun?'Município':(uf==='br'?'Brasil':UF_NAMES[uf]||uf.toUpperCase()));
  return `${cargo} · ${scope} · ${sceneNames[scene]||scene}`;
}

function liveUrl(r,layout){
  const u=new URL('./obs-live-v722.html',location.href);
  u.searchParams.set('channel',r.slug);
  u.searchParams.set('token',r.output_token);
  u.searchParams.set('layout',layout);
  return u.href;
}

function previewUrl(p,layout='horizontal'){
  const u=new URL('./obs-live-v722.html',location.href);
  u.searchParams.set('direct','1');
  u.searchParams.set('layout',layout);
  u.searchParams.set('screen',p.screen);
  u.searchParams.set('scene',p.scene);
  u.searchParams.set('office',p.office);
  u.searchParams.set('uf',p.uf);
  if(p.mun)u.searchParams.set('mun',p.mun);
  if(p.label)u.searchParams.set('label',p.label);
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
  return data.map(x=>({...x,state:m.get(x.id)||null}));
}

renderBroadcast=async function(){
  normalizeVersion();
  content.innerHTML=`<section class="card">
    <div class="eyebrow">TRANSMISSÃO · ${APP_VERSION}</div>
    <h2 style="margin:4px 0 5px">Central de Controle PRO</h2>
    <div class="muted">Cenas e máscaras leves para OBS e vMix.</div>
    <div class="loading" id="v722Load" style="margin-top:12px">Carregando salas…</div>
  </section>`;

  try{
    const rs=await getRooms();
    if(!rs.length){$('#v722Load').textContent='Nenhuma sala vinculada a este usuário.';return}

    content.innerHTML=`<section class="card">
      <div class="sectionHead">
        <div>
          <div class="eyebrow">TRANSMISSÃO · ${APP_VERSION}</div>
          <h2 style="margin:4px 0 5px">Central de Controle PRO</h2>
          <div class="muted">Escolha o conteúdo, a cena e a prévia. OBS/vMix continua na mesma URL fixa.</div>
        </div>
        <span class="badge pro">PRO</span>
      </div>

      <div class="v720Room">
        <strong>Sala</strong>
        <select id="v722Room">${rs.map(r=>`<option value="${r.id}">${esc(r.name)}</option>`).join('')}</select>
      </div>

      <div class="v720Desk">
        <div class="v720Pane v720On">
          <div class="v720Label">NO AR AGORA</div>
          <div class="v720Now" id="v722OnTitle"></div>
          <div class="v720Sub" id="v722OnMeta"></div>
          <div class="v720Urls">
            <div class="v720Url">
              <b>Horizontal · 1920×1080</b><span>OBS / vMix</span>
              <div class="v720Actions">
                <button class="btn" id="v722OpenH">Abrir</button>
                <button class="btn secondary" id="v722CopyH">Copiar URL</button>
              </div>
            </div>
            <div class="v720Url">
              <b>Vertical · 1080×1920</b><span>OBS / navegador vertical</span>
              <div class="v720Actions">
                <button class="btn" id="v722OpenV">Abrir</button>
                <button class="btn secondary" id="v722CopyV">Copiar URL</button>
              </div>
            </div>
          </div>
        </div>

        <div class="v720Pane v720Prev">
          <div class="v720Label">PRÓXIMA TELA · PRÉVIA</div>
          <div class="v720Now" id="v722PrevTitle"></div>
          <div class="v720Sub">Nada muda no ar até tocar em <strong>Colocar no ar</strong>.</div>

          <div class="v720Quick">
            <button data-q="br">Presidente · Brasil</button>
            <button data-q="mg">Presidente · Minas Gerais</button>
            <button data-q="local" id="v722LocalBtn">Presidente · cidade local</button>
            <button data-q="govmg">Governador · Minas Gerais</button>
          </div>

          <div class="v720Controls">
            <select id="v722Scene">
              <option value="fullscreen">Cena · Tela cheia</option>
              <option value="sidebar-right">Cena · Lateral direita</option>
              <option value="sidebar-left">Cena · Lateral esquerda</option>
              <option value="lower-third">Cena · Barra inferior</option>
            </select>
            <select id="v722Office">
              <option value="pres">Presidente · 2º turno</option>
              <option value="gov">Governador · 2º turno</option>
            </select>
            <select id="v722UF">
              <option value="br">Brasil</option>
              ${UFS.map(uf=>`<option value="${uf}">${UF_NAMES[uf]} · ${uf.toUpperCase()}</option>`).join('')}
            </select>
            <div class="wide">
              <input id="v722City" list="v722CityList" placeholder="Município opcional" autocomplete="off">
              <datalist id="v722CityList"></datalist>
            </div>
          </div>

          <button id="v722Air" class="v720AirBtn">COLOCAR NO AR</button>
          <button id="v722Wait" class="v720StandbyBtn">Preparar tela de espera</button>
          <div id="v722Msg" class="v720Msg"></div>
        </div>
      </div>

      <div class="v720Pane" style="margin-top:14px">
        <div class="v720Label">PRÉVIA VISUAL</div>
        <div class="v720PreviewFrame"><iframe id="v722Frame" title="Prévia da transmissão"></iframe></div>
      </div>

      <div class="grid" style="margin-top:14px">
        <div class="module"><h3>Tela cheia</h3><p>Placar ocupa toda a área da fonte. Ideal para chamadas e resultados.</p><span class="tag">SÓ O MÓDULO ATIVO É CARREGADO</span></div>
        <div class="module"><h3>Lateral direita</h3><p>Dados compactos à direita e área transparente para apresentador/câmera.</p><span class="tag">OVERLAY</span></div>
        <div class="module"><h3>Lateral esquerda</h3><p>Mesma lógica, com os dados à esquerda.</p><span class="tag">OVERLAY</span></div>
        <div class="module"><h3>Barra inferior</h3><p>Faixa transparente para placar e totalização, preservando o restante da imagem.</p><span class="tag">OVERLAY</span></div>
      </div>
    </section>`;

    const room=$('#v722Room'),scene=$('#v722Scene'),office=$('#v722Office'),uf=$('#v722UF'),
          city=$('#v722City'),list=$('#v722CityList'),msg=$('#v722Msg'),frame=$('#v722Frame');

    let preview={screen:'president',scene:'fullscreen',office:'pres',uf:'br',mun:'',label:'Brasil'};
    const current=()=>rs.find(r=>r.id===room.value)||rs[0];

    function localInfo(){
      const r=current();
      return {uf:r.default_uf||'mg',mun:r.default_mun||'',city:r.default_city||'Cidade local'};
    }

    function updateLocalButton(){
      $('#v722LocalBtn').textContent=`Presidente · ${localInfo().city}`;
    }

    async function fillCities(){
      list.innerHTML='';
      city.disabled=uf.value==='br';
      city.placeholder=uf.value==='br'?'Brasil inteiro':'Município opcional';
      if(uf.value==='br'){city.value='';return}
      try{
        const all=await loadMunicipalities();
        list.innerHTML=(all[uf.value]||[]).map(m=>`<option value="${esc(m.nm)}"></option>`).join('');
      }catch(_){}
    }

    function resolveCity(){
      const typed=city.value.trim();
      if(!typed||uf.value==='br')return{mun:'',label:''};
      const arr=S.municipalities?.[uf.value]||[];
      const q=norm(typed);
      const m=arr.find(x=>norm(x.nm)===q)||arr.find(x=>norm(x.nm).startsWith(q))||arr.find(x=>norm(x.nm).includes(q));
      if(m){city.value=m.nm;return{mun:m.cd,label:m.nm}}
      return{mun:'',label:typed};
    }

    function fromControls(){
      const c=resolveCity();
      let chosen=uf.value;
      if(office.value==='gov'&&chosen==='br'){chosen='mg';uf.value='mg';fillCities()}
      preview={
        screen:'president',
        scene:scene.value,
        office:office.value,
        uf:chosen,
        mun:c.mun,
        label:c.label||(chosen==='br'?'Brasil':UF_NAMES[chosen])
      };
    }

    async function savePreview(){
      const r=current();
      const {error}=await sb.from('broadcast_state').update({
        preview_screen:preview.screen,
        preview_scene:preview.scene,
        preview_office:preview.office,
        preview_uf:preview.uf,
        preview_mun:preview.mun||null,
        preview_label:preview.label||null
      }).eq('channel_id',r.id);
      if(error)throw error;
      r.state={...(r.state||{}),
        preview_screen:preview.screen,preview_scene:preview.scene,
        preview_office:preview.office,preview_uf:preview.uf,
        preview_mun:preview.mun||null,preview_label:preview.label||null
      };
    }

    function showPreview(){
      $('#v722PrevTitle').textContent=describe(preview.screen,preview.scene,preview.office,preview.uf,preview.mun,preview.label);
      frame.src=previewUrl(preview,matchMedia('(max-width:480px)').matches?'vertical':'horizontal');
    }

    function showLive(){
      const r=current(),s=stateOf(r.state);
      $('#v722OnTitle').textContent=describe(s.screen,s.scene,s.office,s.uf,s.mun,s.label);
      const when=r.state?.updated_at?new Date(r.state.updated_at).toLocaleTimeString('pt-BR'):'—';
      $('#v722OnMeta').textContent=`${r.name} · última troca ${when}`;
    }

    async function preset(k){
      const sc=scene.value;
      if(k==='br')preview={screen:'president',scene:sc,office:'pres',uf:'br',mun:'',label:'Brasil'};
      if(k==='mg')preview={screen:'president',scene:sc,office:'pres',uf:'mg',mun:'',label:'Minas Gerais'};
      if(k==='local'){
        const l=localInfo();
        preview={screen:'president',scene:sc,office:'pres',uf:l.uf,mun:l.mun,label:l.city};
      }
      if(k==='govmg')preview={screen:'president',scene:sc,office:'gov',uf:'mg',mun:'',label:'Minas Gerais'};
      office.value=preview.office;uf.value=preview.uf;
      await fillCities();city.value=preview.mun?preview.label:'';
      showPreview();
      try{await savePreview();msg.textContent='Prévia preparada. O que está no ar ainda não mudou.'}
      catch(e){msg.textContent=e.message||'Falha ao salvar a prévia.';msg.classList.add('v720Err')}
    }

    async function air(){
      const r=current(),b=$('#v722Air');
      b.disabled=true;b.textContent='COLOCANDO NO AR…';
      try{
        await savePreview();
        const {data:{user}}=await sb.auth.getUser();
        const payload={
          screen:preview.screen,scene:preview.scene,office:preview.office,uf:preview.uf,
          mun:preview.mun||null,label:preview.label||null,
          updated_at:new Date().toISOString(),updated_by:user?.id||null
        };
        const {data,error}=await sb.from('broadcast_state').update(payload).eq('channel_id',r.id).select().single();
        if(error)throw error;
        r.state=data;showLive();
        msg.classList.remove('v720Err');
        msg.textContent=`No ar: ${describe(preview.screen,preview.scene,preview.office,preview.uf,preview.mun,preview.label)}.`;
      }catch(e){
        msg.textContent=e.message||'Falha ao alterar a saída.';
        msg.classList.add('v720Err');
      }finally{
        b.disabled=false;b.textContent='COLOCAR NO AR';
      }
    }

    async function applyRoom(){
      const r=current(),s=stateOf(r.state);
      updateLocalButton();
      preview={
        screen:s.preview_screen,scene:s.preview_scene,office:s.preview_office,uf:s.preview_uf,
        mun:s.preview_mun,label:s.preview_label
      };
      scene.value=preview.scene;office.value=preview.office;uf.value=preview.uf;
      await fillCities();city.value=preview.mun?preview.label:'';
      showLive();showPreview();
      msg.textContent=`Sala ${r.name} pronta · cidade principal: ${localInfo().city}.`;
    }

    room.addEventListener('change',applyRoom);
    scene.addEventListener('change',()=>{fromControls();showPreview();savePreview().catch(()=>{})});
    office.addEventListener('change',async()=>{fromControls();await fillCities();showPreview();savePreview().catch(()=>{})});
    uf.addEventListener('change',async()=>{await fillCities();fromControls();showPreview();savePreview().catch(()=>{})});
    city.addEventListener('change',()=>{fromControls();showPreview();savePreview().catch(()=>{})});
    $$('[data-q]').forEach(b=>b.addEventListener('click',()=>preset(b.dataset.q)));
    $('#v722Air').addEventListener('click',air);
    $('#v722Wait').addEventListener('click',async()=>{
      preview={screen:'waiting',scene:scene.value,office:'pres',uf:'br',mun:'',label:'Tela de espera'};
      showPreview();
      try{await savePreview();msg.textContent='Tela de espera preparada. Toque em Colocar no ar.'}
      catch(e){msg.textContent=e.message||'Falha ao preparar espera.'}
    });
    $('#v722OpenH').addEventListener('click',()=>window.open(liveUrl(current(),'horizontal'),'_blank','noopener'));
    $('#v722OpenV').addEventListener('click',()=>window.open(liveUrl(current(),'vertical'),'_blank','noopener'));
    $('#v722CopyH').addEventListener('click',()=>copy(liveUrl(current(),'horizontal'),$('#v722CopyH')));
    $('#v722CopyV').addEventListener('click',()=>copy(liveUrl(current(),'vertical'),$('#v722CopyV')));

    await applyRoom();
  }catch(e){
    $('#v722Load').innerHTML=`<span style="color:#ffd2d7">${esc(e.message||'Falha ao carregar a Central de Controle.')}</span>`;
  }
};

normalizeVersion();
new MutationObserver(normalizeVersion).observe(document.body,{childList:true,subtree:true,characterData:true});
})();