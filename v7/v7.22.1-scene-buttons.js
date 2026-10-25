/* V7.22.1 — Scene cards clickable */
(function(){
'use strict';
if(window.__CENTRAL_APURACAO_V7221__) return;
window.__CENTRAL_APURACAO_V7221__ = true;

function installSceneCards(){
  const scene=document.querySelector('#v722Scene');
  if(!scene) return false;

  const cards=[...document.querySelectorAll('.module')].filter(card=>{
    const h=(card.querySelector('h3')?.textContent||'').trim();
    return ['Tela cheia','Lateral direita','Lateral esquerda','Barra inferior'].includes(h);
  });
  if(cards.length<4) return false;

  const map={
    'Tela cheia':'fullscreen',
    'Lateral direita':'sidebar-right',
    'Lateral esquerda':'sidebar-left',
    'Barra inferior':'lower-third'
  };

  const style=document.createElement('style');
  style.textContent=`
    .v722SceneCard{cursor:pointer;transition:transform .12s ease,border-color .12s ease,box-shadow .12s ease}
    .v722SceneCard:hover{transform:translateY(-1px);border-color:#35d0f6}
    .v722SceneCard.active{border-color:#35d0f6;box-shadow:0 0 0 1px #35d0f6 inset;background:rgba(53,208,246,.06)}
  `;
  document.head.appendChild(style);

  function sync(){
    cards.forEach(card=>{
      const val=map[(card.querySelector('h3')?.textContent||'').trim()];
      card.classList.toggle('active',scene.value===val);
      card.classList.add('v722SceneCard');
      card.setAttribute('role','button');
      card.setAttribute('tabindex','0');
      card.setAttribute('aria-pressed',scene.value===val?'true':'false');
    });
  }

  function activate(card){
    const label=(card.querySelector('h3')?.textContent||'').trim();
    const val=map[label];
    if(!val) return;
    scene.value=val;
    scene.dispatchEvent(new Event('change',{bubbles:true}));
    sync();
  }

  cards.forEach(card=>{
    card.addEventListener('click',()=>activate(card));
    card.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();activate(card);
      }
    });
  });

  scene.addEventListener('change',sync);
  sync();
  return true;
}

if(!installSceneCards()){
  const obs=new MutationObserver(()=>{
    if(installSceneCards()) obs.disconnect();
  });
  obs.observe(document.body,{childList:true,subtree:true});
}
})();