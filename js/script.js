const header = document.querySelector('.site-header');
const nav = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');
const revealItems = document.querySelectorAll('.reveal');
const form = document.getElementById('contact-form');
const yearNode = document.getElementById('year');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const updateHeaderState = () => {
  if (!header) return;
  if (window.scrollY > 48) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = form.querySelector('.form-message');
    if (message) {
      message.textContent = 'Merci ! Votre demande a bien été enregistrée. LUMA vous répondra rapidement.';
    }
    form.reset();
  });
}
