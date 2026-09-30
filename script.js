const button = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');
const links = [...document.querySelectorAll('#site-nav a[href^="#"]')];

button?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  button.setAttribute('aria-expanded', String(open));
});

links.forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  button?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-30% 0px -60%', threshold: 0 });

document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
const peek = document.querySelector('.n-peek');
const peekPage = peek?.querySelector('.n-page');
const peekScroll = peek?.querySelector('.n-peek-scroll');
const peekBack = peek?.querySelector('.n-peek-back');
const pageHistory = [];

function showPage(name, { push = true } = {}) {
  const template = document.getElementById(`notion-${name}`);
  if (!peek || !template) return;
  if (push && peek.open && peek.dataset.page) pageHistory.push(peek.dataset.page);
  peek.dataset.page = name;
  peek.setAttribute('aria-label', template.dataset.title);
  peekPage.replaceChildren(template.content.cloneNode(true));
  peekScroll.scrollTop = 0;
  peekBack.hidden = pageHistory.length === 0;
  if (!peek.open) {
    peek.showModal();
    document.body.classList.add('modal-open');
  }
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-page]');
  if (trigger) showPage(trigger.dataset.page);
});

peekBack?.addEventListener('click', () => { if (pageHistory.length) showPage(pageHistory.pop(), { push: false }); });
peek?.querySelector('.n-peek-close').addEventListener('click', () => peek.close());
peek?.addEventListener('click', (event) => { if (event.target === peek) peek.close(); });
peek?.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  peekPage.replaceChildren();
  peek.dataset.page = '';
  pageHistory.length = 0;
});

document.getElementById('year').textContent = new Date().getFullYear();
