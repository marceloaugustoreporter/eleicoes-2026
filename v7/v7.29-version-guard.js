/* Central de Apuração — Version Guard V7.29 */
(function(){
'use strict';
if(window.__CENTRAL_APURACAO_VERSION_GUARD_729__)return;
window.__CENTRAL_APURACAO_VERSION_GUARD_729__=true;
const VERSION='V7.29';
function enforce(){
  if(document.title!=='Central de Apuração · '+VERSION)document.title='Central de Apuração · '+VERSION;
  const root=document.body;if(!root)return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){
    const p=n.parentElement;
    if(!p||['SCRIPT','STYLE'].includes(p.tagName))return NodeFilter.FILTER_REJECT;
    return /V7\.(14|15|16|17|18|19|20|21|22|23|24|25|26|27|28)\b/.test(n.nodeValue||'')?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
  }});
  const nodes=[];let n;while((n=w.nextNode()))nodes.push(n);
  nodes.forEach(x=>x.nodeValue=String(x.nodeValue).replace(/V7\.(14|15|16|17|18|19|20|21|22|23|24|25|26|27|28)\b/g,VERSION));
}
enforce();setInterval(enforce,500);
})();