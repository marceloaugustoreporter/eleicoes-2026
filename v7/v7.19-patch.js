/* Central de Apuração — V7.19 · Modo Eleição + Recuperação de senha */
(function(){
  'use strict';
  if(window.__CENTRAL_APURACAO_V719__) return;
  window.__CENTRAL_APURACAO_V719__=true;

  const APP_VERSION='V7.19';
  const MAP_POLL_SAFE=300000; // 5 minutos
  window.CENTRAL_APURACAO_VERSION=APP_VERSION;

  const startTimerV718=startTimer;
  startTimer=function(fn,ms=POLL){
    return startTimerV718(fn,Number(ms)===120000?MAP_POLL_SAFE:ms);
  };

  function normalizeVersions(root=document){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{
      acceptNode(node){
        const p=node.parentElement;
        if(!p||['SCRIPT','STYLE'].includes(p.tagName))return NodeFilter.FILTER_REJECT;
        return /V7\.(14|15|16|17|18)\b/.test(node.nodeValue||'')
          ?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
      }
    });
    const nodes=[]; let n;
    while((n=walker.nextNode()))nodes.push(n);
    nodes.forEach(node=>{
      node.nodeValue=String(node.nodeValue).replace(/V7\.(14|15|16|17|18)\b/g,APP_VERSION);
    });
    document.title=`Central de Apuração · ${APP_VERSION}`;
    const top=document.querySelector('#appView .topbar h2');
    if(top)top.textContent=`Central de Apuração ${APP_VERSION}`;
  }

  let queued=false;
  const obs=new MutationObserver(()=>{
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;normalizeVersions(document)});
  });
  const target=document.querySelector('#appView')||document.body;
  if(target)obs.observe(target,{childList:true,subtree:true,characterData:true});

  function chrome(){
    normalizeVersions(document);
    const notice=[...document.querySelectorAll('#content .notice strong')]
      .find(x=>/Central de Dados V7\.\d+/i.test(x.textContent));
    if(notice)notice.textContent=`Central de Dados ${APP_VERSION} ativa`;
    const foot=document.querySelector('#appView .foot');
    if(foot)foot.textContent=
      'Painel independente com dados oficiais do Tribunal Superior Eleitoral. '+
      'Modo Eleição ativo: placares em 30 segundos e mapa municipal em ciclo conservador de 5 minutos.';
  }

  function broadcastUrl(layout,office,uf,mun='',label=''){
    const u=new URL('./obs-live.html',location.href);
    u.searchParams.set('layout',layout);
    u.searchParams.set('office',office);
    u.searchParams.set('uf',uf);
    if(mun)u.searchParams.set('mun',mun);
    if(label)u.searchParams.set('label',label);
    return u.href;
  }

  renderBroadcast=function(){
    content.innerHTML=`
      <section class="card">
        <div class="sectionHead">
          <div>
            <div class="eyebrow">TRANSMISSÃO · ${APP_VERSION}</div>
            <h2 style="margin:4px 0 5px">Saídas operacionais para OBS</h2>
            <div class="muted">Páginas leves e independentes do painel principal. Resultado atualizado a cada 30 segundos.</div>
          </div>
          <span class="badge admin">MODO ELEIÇÃO</span>
        </div>

        <div class="notice" style="margin-top:12px">
          <span class="dot" style="background:var(--green)"></span>
          <strong>Configuração segura para o domingo</strong> · placar em 30 s · mapa municipal em 5 min · saída OBS sem mapas ou rankings.
        </div>

        <div class="controls" style="margin-top:12px">
          <select id="bcOffice">
            <option value="pres">Presidente · 2º turno</option>
            <option value="gov">Governador · 2º turno</option>
          </select>
          <select id="bcUF">
            <option value="br">Brasil</option>
            ${UFS.map(uf=>`<option value="${uf}">${UF_NAMES[uf]} · ${uf.toUpperCase()}</option>`).join('')}
          </select>
          <div>
            <input id="bcCity" list="bcCityList" placeholder="Município opcional" autocomplete="off">
            <datalist id="bcCityList"></datalist>
          </div>
        </div>

        <div class="grid" style="margin-top:12px">
          <div class="module">
            <h3>Horizontal · 1920×1080</h3>
            <p>Placar de dois candidatos, fotos, votos, percentuais, totalização e indicadores essenciais.</p>
            <div class="radarActions">
              <button id="bcOpenH" class="btn" type="button">Abrir 16:9</button>
              <button id="bcCopyH" class="btn secondary" type="button">Copiar URL</button>
            </div>
          </div>
          <div class="module">
            <h3>Vertical · 1080×1920</h3>
            <p>Composição para live vertical com os mesmos dados e a mesma atualização.</p>
            <div class="radarActions">
              <button id="bcOpenV" class="btn" type="button">Abrir 9:16</button>
              <button id="bcCopyV" class="btn secondary" type="button">Copiar URL</button>
            </div>
          </div>
        </div>

        <div id="bcResolved" class="notice" style="margin-top:12px"></div>
        <div class="dataSourceNote">
          No OBS, use uma Fonte do Navegador com 1920×1080 ou 1080×1920. A saída mantém o último dado válido se houver falha temporária.
        </div>
      </section>`;

    const office=$('#bcOffice'),uf=$('#bcUF'),city=$('#bcCity'),list=$('#bcCityList'),resolved=$('#bcResolved');

    async function fillCities(){
      city.value='';
      if(uf.value==='br'){
        city.disabled=true;city.placeholder='Brasil inteiro';list.innerHTML='';return;
      }
      city.disabled=false;city.placeholder='Município opcional';
      try{
        const all=await loadMunicipalities();
        list.innerHTML=(all[uf.value]||[]).map(m=>`<option value="${esc(m.nm)}"></option>`).join('');
      }catch(_){list.innerHTML=''}
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

    function current(){
      let chosenUF=uf.value;
      if(office.value==='gov'&&chosenUF==='br'){
        chosenUF='mg';uf.value='mg';fillCities();
      }
      const c=resolveCity();
      const scopeLabel=c.label||(chosenUF==='br'?'Brasil':UF_NAMES[chosenUF]);
      const h=broadcastUrl('horizontal',office.value,chosenUF,c.mun,scopeLabel);
      const v=broadcastUrl('vertical',office.value,chosenUF,c.mun,scopeLabel);
      resolved.innerHTML=`<span class="dot" style="background:var(--cyan)"></span><strong>${office.value==='pres'?'Presidente':'Governador'} · ${esc(scopeLabel)}</strong> · saídas prontas para OBS.`;
      return{h,v};
    }

    async function copy(url,btn){
      try{
        await navigator.clipboard.writeText(url);
        const old=btn.textContent;btn.textContent='URL copiada';
        setTimeout(()=>btn.textContent=old,1400);
      }catch(_){prompt('Copie a URL abaixo:',url)}
    }

    office.addEventListener('change',()=>{if(office.value==='gov'&&uf.value==='br'){uf.value='mg';fillCities()}current()});
    uf.addEventListener('change',async()=>{await fillCities();current()});
    city.addEventListener('change',current);

    $('#bcOpenH').addEventListener('click',()=>window.open(current().h,'_blank','noopener'));
    $('#bcOpenV').addEventListener('click',()=>window.open(current().v,'_blank','noopener'));
    $('#bcCopyH').addEventListener('click',()=>copy(current().h,$('#bcCopyH')));
    $('#bcCopyV').addEventListener('click',()=>copy(current().v,$('#bcCopyV')));

    fillCities().then(current);current();chrome();
  };

  const renderHomeV718=renderHome;
  renderHome=function(){renderHomeV718();chrome()};

  const renderPresidentV718=renderPresident;
  renderPresident=function(){renderPresidentV718();chrome()};

  /* ------------------------------------------------------------
     Recuperação de senha
     ------------------------------------------------------------ */
  let recoveryMode=false;

  const recoveryStyle=document.createElement('style');
  recoveryStyle.id='v719RecoveryStyles';
  recoveryStyle.textContent=`
    .v719AuthLink{
      margin-top:8px;
      width:100%;
      border:1px solid #2b4b64;
      background:#0b1c2b;
      color:#ddecf6;
      border-radius:10px;
      padding:10px 12px;
      font-size:11px;
      font-weight:900;
      cursor:pointer
    }
    .v719RecoveryPanel{
      display:none;
      margin-top:12px;
      padding-top:12px;
      border-top:1px solid #24445d
    }
    .v719RecoveryPanel.on{display:block}
    .v719RecoveryPanel h3{margin:0 0 5px;font-size:17px}
    .v719RecoveryPanel p{margin:0 0 10px;color:var(--muted);font-size:10px;line-height:1.45}
    .v719RecoveryMsg{display:none;margin-top:9px;padding:9px 10px;border-radius:9px;font-size:10px;line-height:1.4}
    .v719RecoveryMsg.ok{display:block;background:rgba(79,224,173,.08);border:1px solid rgba(79,224,173,.35);color:#c9ffe9}
    .v719RecoveryMsg.err{display:block;background:rgba(255,107,122,.08);border:1px solid rgba(255,107,122,.35);color:#ffd2d7}
    .v719RecoveryActions{display:flex;gap:7px;margin-top:9px}
    .v719RecoveryActions .btn{flex:1}
  `;
  document.head.appendChild(recoveryStyle);

  function authMsg(el,msg,type='ok'){
    if(!el)return;
    el.className=`v719RecoveryMsg ${type}`;
    el.textContent=msg;
  }

  function showLoginOnly(){
    recoveryMode=false;
    localStorage.removeItem('ce26RecoveryRequested');
    $('#v719RecoveryPanel')?.classList.remove('on');
    $('#v719NewPasswordPanel')?.classList.remove('on');
    loginView.style.display='block';
    appView.style.display='none';
  }

  function showNewPassword(){
    recoveryMode=true;
    clearTimers();
    loginView.style.display='block';
    appView.style.display='none';
    $('#loginForm').style.display='none';
    $('#v719ForgotPassword').style.display='none';
    $('#v719RecoveryPanel')?.classList.remove('on');
    $('#v719NewPasswordPanel')?.classList.add('on');
    authMsg($('#v719NewPasswordMsg'),'Link de recuperação validado. Defina uma nova senha para continuar.','ok');
  }

  function installRecoveryUI(){
    if($('#v719ForgotPassword'))return;

    const forgot=document.createElement('button');
    forgot.id='v719ForgotPassword';
    forgot.className='v719AuthLink';
    forgot.type='button';
    forgot.textContent='Esqueci minha senha';
    loginForm.insertAdjacentElement('afterend',forgot);

    const recovery=document.createElement('div');
    recovery.id='v719RecoveryPanel';
    recovery.className='v719RecoveryPanel';
    recovery.innerHTML=`
      <h3>Recuperar acesso</h3>
      <p>Informe o e-mail cadastrado. Você receberá um link do Supabase para redefinir sua senha.</p>
      <label for="v719RecoveryEmail">E-mail</label>
      <input id="v719RecoveryEmail" type="email" autocomplete="email" placeholder="seu@email.com">
      <div class="v719RecoveryActions">
        <button id="v719SendRecovery" class="btn" type="button">Enviar recuperação</button>
        <button id="v719CancelRecovery" class="btn secondary" type="button">Voltar</button>
      </div>
      <div id="v719RecoveryMsg" class="v719RecoveryMsg"></div>`;
    forgot.insertAdjacentElement('afterend',recovery);

    const newPass=document.createElement('div');
    newPass.id='v719NewPasswordPanel';
    newPass.className='v719RecoveryPanel';
    newPass.innerHTML=`
      <h3>Definir nova senha</h3>
      <p>Use pelo menos 8 caracteres. Depois de salvar, faça login normalmente com a nova senha.</p>
      <label for="v719Password1">Nova senha</label>
      <input id="v719Password1" type="password" autocomplete="new-password" minlength="8" placeholder="Nova senha">
      <label for="v719Password2">Confirmar nova senha</label>
      <input id="v719Password2" type="password" autocomplete="new-password" minlength="8" placeholder="Repita a nova senha">
      <button id="v719SavePassword" class="btn block" type="button" style="margin-top:10px">Salvar nova senha</button>
      <div id="v719NewPasswordMsg" class="v719RecoveryMsg"></div>`;
    recovery.insertAdjacentElement('afterend',newPass);

    forgot.addEventListener('click',()=>{
      $('#v719RecoveryEmail').value=$('#email').value.trim();
      $('#v719RecoveryPanel').classList.add('on');
      $('#v719RecoveryEmail').focus();
    });

    $('#v719CancelRecovery').addEventListener('click',()=>{
      $('#v719RecoveryPanel').classList.remove('on');
    });

    $('#v719SendRecovery').addEventListener('click',async()=>{
      const email=$('#v719RecoveryEmail').value.trim();
      const btn=$('#v719SendRecovery');
      const msg=$('#v719RecoveryMsg');

      if(!email){
        authMsg(msg,'Informe o e-mail cadastrado.','err');
        return;
      }

      btn.disabled=true;
      btn.textContent='Enviando…';
      authMsg(msg,'Solicitando o link de recuperação…','ok');

      try{
        localStorage.setItem('ce26RecoveryRequested','1');
        const redirectTo=location.origin+location.pathname;
        const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo});
        if(error)throw error;

        authMsg(
          msg,
          'E-mail enviado. Abra a mensagem de recuperação e clique no link. Ele retornará para esta mesma página.',
          'ok'
        );
      }catch(e){
        localStorage.removeItem('ce26RecoveryRequested');
        authMsg(
          msg,
          e?.message || 'Não foi possível enviar a recuperação de senha.',
          'err'
        );
      }finally{
        btn.disabled=false;
        btn.textContent='Enviar recuperação';
      }
    });

    $('#v719SavePassword').addEventListener('click',async()=>{
      const p1=$('#v719Password1').value;
      const p2=$('#v719Password2').value;
      const btn=$('#v719SavePassword');
      const msg=$('#v719NewPasswordMsg');

      if(p1.length<8){
        authMsg(msg,'A nova senha precisa ter pelo menos 8 caracteres.','err');
        return;
      }
      if(p1!==p2){
        authMsg(msg,'As duas senhas não coincidem.','err');
        return;
      }

      btn.disabled=true;
      btn.textContent='Salvando…';

      try{
        const {error}=await sb.auth.updateUser({password:p1});
        if(error)throw error;

        authMsg(msg,'Senha atualizada com sucesso. Voltando para o login…','ok');
        localStorage.removeItem('ce26RecoveryRequested');

        setTimeout(async()=>{
          await sb.auth.signOut();
          $('#loginForm').style.display='';
          $('#v719ForgotPassword').style.display='';
          $('#v719NewPasswordPanel').classList.remove('on');
          $('#password').value='';
          loginView.style.display='block';
          appView.style.display='none';
          recoveryMode=false;
        },900);
      }catch(e){
        authMsg(msg,e?.message || 'Não foi possível atualizar a senha. Abra novamente o link recebido por e-mail.','err');
      }finally{
        btn.disabled=false;
        btn.textContent='Salvar nova senha';
      }
    });
  }

  installRecoveryUI();

  sb.auth.onAuthStateChange((event,session)=>{
    if(event==='PASSWORD_RECOVERY'){
      recoveryMode=true;
      showNewPassword();
    }
  });

  /* Em alguns navegadores o evento pode ocorrer antes da montagem visual.
     O marcador local garante que o formulário reapareça quando a sessão
     de recuperação já tiver sido criada pelo link do e-mail. */
  async function detectRecoverySession(){
    if(localStorage.getItem('ce26RecoveryRequested')!=='1')return;
    const {data:{session}}=await sb.auth.getSession();
    if(session)showNewPassword();
  }

  detectRecoverySession();
  setTimeout(detectRecoverySession,400);
  setTimeout(detectRecoverySession,1200);

  chrome();
  setTimeout(chrome,300);
  setTimeout(chrome,1200);
})();