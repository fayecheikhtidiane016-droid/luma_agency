const header = document.querySelector('.site-header');
const nav = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');
const revealItems = document.querySelectorAll('.reveal');
const form = document.getElementById('contact-form');
const yearNode = document.getElementById('year');
const themeSwitch = document.querySelector('.theme-switch');

const getSavedTheme = () => {
  try {
    return localStorage.getItem('luma-theme') || 'dark';
  } catch (error) {
    return 'dark';
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem('luma-theme', theme);
  } catch (error) {
  }
};

const applyTheme = (theme) => {
  const isLight = theme === 'light';
  document.body.dataset.theme = isLight ? 'light' : 'dark';

  if (themeSwitch) {
    themeSwitch.setAttribute('aria-pressed', String(isLight));
    themeSwitch.setAttribute('aria-label', isLight ? 'Activer le thème noir' : 'Activer le thème clair');
  }
};

const savedTheme = getSavedTheme();
applyTheme(savedTheme);

if (themeSwitch) {
  themeSwitch.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });
}

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
    link.addEventListener('click', (event) => {
      if (link.getAttribute('href') === '#top') {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.replaceState(null, '', '#top');
      }

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

    const formData = new FormData(form);
    const subject = `Demande de projet - ${formData.get('company') || formData.get('name') || 'Nouveau contact'}`;
    const body = [
      `Nom : ${formData.get('name') || ''}`,
      `Email : ${formData.get('email') || ''}`,
      `Téléphone : ${formData.get('phone') || ''}`,
      `Entreprise : ${formData.get('company') || ''}`,
      '',
      'Projet :',
      formData.get('project') || ''
    ].join('\n');

    window.location.href = `mailto:direction.lumaagency@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
