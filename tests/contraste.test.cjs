const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'); const path=require('node:path');
const css=fs.readFileSync(path.join(__dirname,'../style.css'),'utf8');
function color(hex) { const c=hex.replace('#','').match(/../g).map(n=>parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4); return .2126*c[0]+.7152*c[1]+.0722*c[2]; }
function contrast(a,b) {const x=color(a),y=color(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
test('atalho de navegação do tema escuro mantém contraste AA',()=>{
 const selector='[data-theme="dark"] .skip-link';
 const rule=css.slice(css.lastIndexOf(selector)).match(/^[^{]+\{([^}]+)\}/)?.[1];
 assert.ok(rule,'O atalho usa texto branco sobre fundo quase branco no tema escuro');
 const bg=rule.match(/background:\s*(#[a-f0-9]{6})/i)?.[1]; const fg=rule.match(/color:\s*(#[a-f0-9]{6})/i)?.[1];
 assert.ok(bg&&fg); assert.ok(contrast(bg,fg)>=4.5);
 assert.ok(contrast('#ffa3bf','#321e28')>=4.5);
});
