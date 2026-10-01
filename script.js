const button = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');
const links = [...document.querySelectorAll('#site-nav a[href^="#"]')];
const sectionLinks = [...links, ...document.querySelectorAll('.side-nav a')];

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
    sectionLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-30% 0px -60%', threshold: 0 });

document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
const dialog = document.querySelector('.activity-dialog');
const dialogTitle = dialog?.querySelector('h2');
const dialogBody = dialog?.querySelector('.dialog-body');

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-activity]');
  const template = trigger && document.getElementById(`activity-${trigger.dataset.activity}`);
  if (!dialog || !template) return;
  const card = document.querySelector(`.activity-card[data-activity="${trigger.dataset.activity}"]`);
  dialogTitle.textContent = card ? card.querySelector('strong').textContent : trigger.dataset.title;
  dialogBody.replaceChildren(template.content.cloneNode(true));
  dialogBody.scrollTop = 0;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('modal-open');
});

dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => document.body.classList.remove('modal-open'));

const progress = document.querySelector('.side-track span');
let progressQueued = false;
function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.height = `${max > 0 ? Math.min(scrollY / max, 1) * 100 : 0}%`;
  progressQueued = false;
}
addEventListener('scroll', () => {
  if (progressQueued) return;
  progressQueued = true;
  requestAnimationFrame(updateProgress);
}, { passive: true });
addEventListener('resize', updateProgress);
updateProgress();

document.getElementById('year').textContent = new Date().getFullYear();
