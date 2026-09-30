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
const dialog = document.querySelector('.activity-dialog');
const dialogTitle = dialog?.querySelector('h2');
const dialogBody = dialog?.querySelector('.dialog-body');

document.querySelectorAll('.activity-card').forEach((card) => card.addEventListener('click', () => {
  const template = document.getElementById(`activity-${card.dataset.activity}`);
  if (!dialog || !template) return;
  dialogTitle.textContent = card.querySelector('strong').textContent;
  dialogBody.replaceChildren(template.content.cloneNode(true));
  dialogBody.scrollTop = 0;
  dialog.showModal();
  document.body.classList.add('modal-open');
}));

dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => document.body.classList.remove('modal-open'));

document.getElementById('year').textContent = new Date().getFullYear();
