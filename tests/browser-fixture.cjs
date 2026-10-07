const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
function browser() {
  const nodes = new Map();
  const document = { activeElement: null, documentElement: { dataset: {} } };
  function element(text = '') {
    return { textContent: text, value: '', dataset: {}, hidden: false, attrs: {}, listeners: {},
      setAttribute(k,v) { this.attrs[k]=v; }, removeAttribute(k) { delete this.attrs[k]; },
      addEventListener(k,fn) { this.listeners[k]=fn; },
      focus() { document.activeElement=this; },
      click() { this.focus(); this.listeners.click?.({currentTarget:this,target:this}); }
    };
  }
  const products=['milkshake','cascao','peso'].map((id,i)=> {
    const card=element(); card.dataset.product=id;
    const heading=element(['Milk-shake','Cascão','Sorvete por peso'][i]);
    const button=element(); button.dataset.favorite=id; button.closest=()=>card;
    card.querySelector=selector=>selector==='h3'?heading:button;
    return card;
  });
  const favorites=products.map(card=>card.querySelector('button'));
  const filters=['todos','milkshake','cascao','peso'].map(id=>{const el=element();el.dataset.filter=id;return el;});
  document.querySelector=selector=>{if(!nodes.has(selector))nodes.set(selector,element());return nodes.get(selector);};
  document.querySelectorAll=selector=>selector==='[data-product]'?products:selector==='[data-favorite]'?favorites:selector==='[data-filter]'?filters:[];
  const storage=new Map();
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../script.js'),'utf8'),{document,Intl,localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)}});
  return {document,products,favorites,filters,node:document.querySelector};
}
module.exports={browser};
