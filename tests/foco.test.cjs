const {test}=require('node:test');const assert=require('node:assert/strict');const {browser}=require('./browser-fixture.cjs');
test('remover favorito filtrado transfere foco para produto restante e depois filtro',()=>{
 const app=browser(); app.favorites[0].click();app.favorites[1].click();app.node('#favorites-only').click();
 app.favorites[0].click();assert.equal(app.products[0].hidden,true);assert.equal(app.document.activeElement,app.favorites[1]);
 app.favorites[1].click();assert.equal(app.document.activeElement,app.node('#favorites-only'));
});
test('remover favorito sem filtro mantém foco no mesmo botão',()=>{const app=browser();app.favorites[0].click();app.favorites[0].click();assert.equal(app.document.activeElement,app.favorites[0]);});