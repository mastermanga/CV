// Year
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('year-en').textContent = new Date().getFullYear();

// Theme (light/dark)
const root = document.documentElement;
const key = 'yt_theme';
const fromPrefers = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
const saved = localStorage.getItem(key) || fromPrefers;
root.setAttribute('data-theme', saved);

document.getElementById('themeBtn').addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem(key, next);
});

// Smooth scroll (both langs)
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
initSmoothScroll();

// Language switch
const mainFR = document.getElementById('main-fr');
const mainEN = document.getElementById('main-en');
const btnFR  = document.getElementById('btn-fr');
const btnEN  = document.getElementById('btn-en');

function setActiveLang(lang) {
  const navAnchors = document.querySelectorAll('.nav-anchor');
  const map = ['experiences','projets','competences','formation','contact'];

  if (lang === 'en') {
    document.documentElement.lang = 'en';
    mainFR.style.display = 'none';
    mainEN.style.display = '';
    navAnchors.forEach((a, i) => a.setAttribute('href', `#en-${map[i]}`));
    btnEN.style.opacity = '1';
    btnFR.style.opacity = '.6';
  } else {
    document.documentElement.lang = 'fr';
    mainFR.style.display = '';
    mainEN.style.display = 'none';
    navAnchors.forEach((a, i) => a.setAttribute('href', `#${map[i]}`));
    btnFR.style.opacity = '1';
    btnEN.style.opacity = '.6';
  }

  const url = new URL(window.location);
  url.searchParams.set('lang', lang);
  history.replaceState({}, '', url);
}

btnFR.addEventListener('click', () => setActiveLang('fr'));
btnEN.addEventListener('click', () => setActiveLang('en'));

const qLang = new URLSearchParams(location.search).get('lang');
setActiveLang(qLang === 'en' ? 'en' : 'fr');
