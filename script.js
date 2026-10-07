const form = document.querySelector('#weight-form');
const weightInput = document.querySelector('#weight');
const totalOutput = document.querySelector('#total');
const errorOutput = document.querySelector('#weight-error');
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const PRICE_PER_KILO_IN_CENTS = 6000;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const grams = Number(weightInput.value);
  if (!weightInput.value.trim() || !Number.isInteger(grams) || grams < 1 || grams > 5000) {
    errorOutput.textContent = 'Informe um peso inteiro entre 1 e 5.000 gramas.';
    weightInput.setAttribute('aria-invalid', 'true');
    totalOutput.value = '—';
    weightInput.focus();
    return;
  }
  errorOutput.textContent = '';
  weightInput.removeAttribute('aria-invalid');
  const cents = Math.round(grams * PRICE_PER_KILO_IN_CENTS / 1000);
  totalOutput.value = currency.format(cents / 100);
});

// Evita manter um total anterior quando o peso é alterado.
weightInput.addEventListener('input', () => {
  totalOutput.value = '—';
  errorOutput.textContent = '';
  weightInput.removeAttribute('aria-invalid');
});

const products = [...document.querySelectorAll('[data-product]')];
const menuState = { category: 'todos', search: '', favoritesOnly: false };
function updateProducts() {
  let count = 0;
  for (const card of products) {
    const matchesCategory = menuState.category === 'todos' || card.dataset.product === menuState.category;
    const matches = (!menuState.favoritesOnly || favorites.has(card.dataset.product)) && matchesCategory && normalize(card.querySelector('h3').textContent).includes(menuState.search);
    card.hidden = !matches;
    if (matches) count++;
  }
  const status = document.querySelector('#menu-status');
  if (status) status.textContent = count ? count + (count === 1 ? ' opção encontrada' : ' opções encontradas') : 'Nenhuma opção encontrada. Ajuste os filtros.';
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  menuState.category = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  updateProducts();
}));

function normalize(value) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[\s-]+/g, '').trim(); }
document.querySelector('#search').addEventListener('input', event => {
  menuState.search = normalize(event.target.value);
  updateProducts();
});

const sizes = { 300: 14, 400: 18, 500: 22 };
document.querySelector('#size').addEventListener('change', event => {
  document.querySelector('#shake-price').textContent = currency.format(sizes[event.target.value]);
  document.querySelector('#shake-size').textContent = 'copo de ' + event.target.value + ' ml';
});

const flavorOne = document.querySelector('#flavor-one');
const flavorTwo = document.querySelector('#flavor-two');
function updateFlavors() { document.querySelector('#flavor-summary').textContent = 'Seu cascão: ' + flavorOne.value + ' + ' + flavorTwo.value; }
[flavorOne, flavorTwo].forEach(select => select.addEventListener('change', updateFlavors));

const favorites = new Set();
function renderFavorites() {
  document.querySelectorAll('[data-favorite]').forEach(button => {
    const active = favorites.has(button.dataset.favorite);
    button.setAttribute('aria-pressed', String(active));
    button.textContent = active ? '♥' : '♡';
  });
  updateProducts();
}
document.querySelectorAll('[data-favorite]').forEach(button => button.addEventListener('click', () => {
  const id = button.dataset.favorite;
  favorites.has(id) ? favorites.delete(id) : favorites.add(id);
  try { localStorage.setItem('doce-favorites', JSON.stringify([...favorites])); } catch {}
  renderFavorites();
  // Não deixa o foco dentro de um card que acabou de ser ocultado.
  if (button.closest('[data-product]').hidden) {
    const nextCard = products.find(card => !card.hidden);
    const nextControl = nextCard ? nextCard.querySelector('[data-favorite]') : document.querySelector('#favorites-only');
    nextControl.focus();
  }
}));

try {
  const saved = JSON.parse(localStorage.getItem('doce-favorites') || '[]');
  if (Array.isArray(saved)) saved.filter(id => products.some(card => card.dataset.product === id)).forEach(id => favorites.add(id));
} catch {}
document.querySelector('#favorites-only').addEventListener('click', event => {
  menuState.favoritesOnly = !menuState.favoritesOnly;
  event.currentTarget.setAttribute('aria-pressed', String(menuState.favoritesOnly));
  renderFavorites();
});
renderFavorites();

const themeButton = document.querySelector('#theme-toggle');
function setTheme(dark) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.textContent = dark ? 'Tema claro' : 'Tema escuro';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#231c22' : '#fff9f2';
}
themeButton.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  setTheme(dark);
  try { localStorage.setItem('doce-theme', dark ? 'dark' : 'light'); } catch {}
});
try { setTheme(localStorage.getItem('doce-theme') === 'dark'); } catch { setTheme(false); }

