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

const deck = document.querySelector('.deck-dialog');
const deckSlide = deck?.querySelector('.deck-slide');
const deckCounter = deck?.querySelector('.deck-counter');
const deckPrev = deck?.querySelector('.deck-prev');
const deckNext = deck?.querySelector('.deck-next');
const deckView = deck?.querySelector('.deck-view');
const decks = {
  portfolio: { title: 'Portfolio', count: 27, src: (n) => `assets/portfolio/slide-${String(n).padStart(2, '0')}.jpg`, pdf: 'assets/portfolio/Portfolio_MinseonPark.pdf', ratio: '16/9' },
  cv: { title: 'CV', count: 2, src: (n) => `assets/cv/page-${String(n).padStart(2, '0')}.jpg`, pdf: 'assets/CV_MinseonPark.pdf', ratio: '1400/1980', document: true },
};
let current = decks.portfolio;
let deckPage = 1;

function showSlide(n) {
  deckPage = Math.min(Math.max(n, 1), current.count);
  deckSlide.src = current.src(deckPage);
  deckSlide.alt = `${current.title} ${deckPage}쪽`;
  deckCounter.textContent = `${deckPage} / ${current.count}`;
  deckPrev.disabled = deckPage === 1;
  deckNext.disabled = deckPage === current.count;
  deckView.scrollTop = 0;
  if (deckPage < current.count) new Image().src = current.src(deckPage + 1);
}

document.querySelectorAll('[data-deck]').forEach((trigger) => trigger.addEventListener('click', (event) => {
  event.preventDefault();
  nav.classList.remove('open');
  button?.setAttribute('aria-expanded', 'false');
  current = decks[trigger.dataset.deck];
  deck.querySelector('h2').textContent = current.title;
  deck.setAttribute('aria-label', current.title);
  deck.querySelector('.deck-download').href = current.pdf;
  deck.style.setProperty('--ratio', current.ratio);
  deck.classList.toggle('is-document', Boolean(current.document));
  showSlide(1);
  deck.showModal();
  document.body.classList.add('modal-open');
}));
deckPrev?.addEventListener('click', () => showSlide(deckPage - 1));
deckNext?.addEventListener('click', () => showSlide(deckPage + 1));
deck?.querySelector('.deck-close').addEventListener('click', () => deck.close());
deck?.addEventListener('click', (event) => { if (event.target === deck) deck.close(); });
deck?.addEventListener('close', () => document.body.classList.remove('modal-open'));
deck?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showSlide(deckPage - 1);
  if (event.key === 'ArrowRight') showSlide(deckPage + 1);
});
let swipeX = null;
deckSlide?.addEventListener('pointerdown', (event) => { swipeX = event.clientX; });
deckSlide?.addEventListener('pointerup', (event) => {
  if (swipeX === null) return;
  const dx = event.clientX - swipeX;
  swipeX = null;
  if (Math.abs(dx) > 40) showSlide(deckPage + (dx < 0 ? 1 : -1));
});
deckSlide?.addEventListener('dragstart', (event) => event.preventDefault());

document.getElementById('year').textContent = new Date().getFullYear();
