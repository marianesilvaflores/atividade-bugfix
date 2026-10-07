const {test}=require('node:test');
const assert=require('node:assert/strict');
const {browser}=require('./browser-fixture.cjs');
test('encontra milk-shake com variações de escrita e mantém filtros',()=>{
 const app=browser(); const input=app.node('#search');
 for(const text of ['milkshake','Milk Shake','MILK-SHAKE']) { input.value=text; input.listeners.input({target:input}); assert.equal(app.products[0].hidden,false,text); assert.equal(app.products[1].hidden,true); }
 app.filters[2].click(); assert.ok(app.products.every(card=>card.hidden));
 input.value='CASCAO'; input.listeners.input({target:input}); assert.equal(app.products[1].hidden,false);
});