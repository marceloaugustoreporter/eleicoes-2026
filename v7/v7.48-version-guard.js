/* Central de Apuração — Version Guard V7.48 */
(function(){
'use strict';
if(window.__CENTRAL_APURACAO_VERSION_GUARD_748__)return;
window.__CENTRAL_APURACAO_VERSION_GUARD_748__=true;
const VERSION='V7.48';
function enforce(){
  if(document.title!=='Central de Apuração · '+VERSION)document.title='Central de Apuração · '+VERSION;
  const root=document.body;if(!root)return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){
    const p=n.parentElement;if(!p||['SCRIPT','STYLE'].includes(p.tagName))return NodeFilter.FILTER_REJECT;
    return /V7\.(14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47)\b/.test(n.nodeValue||'')?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
  }});
  const nodes=[];let n;while((n=w.nextNode()))nodes.push(n);
  nodes.forEach(x=>x.nodeValue=String(x.nodeValue).replace(/V7\.(14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47)\b/g,VERSION));
}
enforce();setInterval(enforce,500);
})();