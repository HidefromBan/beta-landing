// === ELEMENTOS ===
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';

// Diferir hasta que DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
  // === TEMA INICIAL ===
  setTheme(savedTheme);

  // === DRAWER ===
  const navDrawer = document.getElementById('navDrawer');
  const hamburger = document.getElementById('hamburger');
  const drawerClose = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-links');
  const drawerThemeBtn = document.getElementById('drawerDarkModeToggle');
  const themeDesktopBtn = document.getElementById('darkModeToggle');
  const themeMobileBtn = document.getElementById('mobileDarkModeToggle');

  hamburger?.addEventListener('click', () => {
    navDrawer.classList.add('open');
    document.body.classList.add('no-scroll');
  });

  drawerClose?.addEventListener('click', () => {
    navDrawer.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });

  drawerLinks?.forEach(link => {
    link.addEventListener('click', () => {
      navDrawer.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      navDrawer.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  });

  drawerThemeBtn?.addEventListener('click', () => {
    toggleTheme();
    navDrawer.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });

  themeDesktopBtn?.addEventListener('click', toggleTheme);
  themeMobileBtn?.addEventListener('click', toggleTheme);

  // === FORMULARIO WHATSAPP ===
  const form = document.getElementById('wsp-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = form.querySelector('#nombre')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const mensaje = form.querySelector('#mensaje')?.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nombre || !email || !mensaje) {
      alert('Por favor completa todos los campos.');
      return;
    }
    if (!emailRegex.test(email)) {
      alert('Por favor ingresa un correo válido.');
      return;
    }

    const text = `Hola, mi nombre es ${nombre}. Mi correo es ${email}. Quisiera cotizar: ${mensaje}`;
    const url = `https://wa.me/56974188951?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });

  // === SLIDER SERVICIOS ===
  const slider = document.getElementById('serviciosSlider');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');

  function slide(dir) {
    const cardW = slider.querySelector('.servicio-card')?.offsetWidth + 24 || 300;
    slider.scrollBy({ left: dir * cardW, behavior: 'smooth' });
  }

  function updateSliderButtons() {
    if (!slider) return;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    prevBtn.style.display = slider.scrollLeft > 10 ? 'flex' : 'none';
    nextBtn.style.display = slider.scrollLeft < maxScroll - 10 ? 'flex' : 'none';
  }

  prevBtn?.addEventListener('click', () => {
    slide(-1);
    setTimeout(updateSliderButtons, 400);
  });

  nextBtn?.addEventListener('click', () => {
    slide(1);
    setTimeout(updateSliderButtons, 400);
  });

  slider?.addEventListener('scroll', updateSliderButtons);
  updateSliderButtons();

  // === BOTÓN "VOLVER ARRIBA" ===
  const scrollTopBtn = document.getElementById('btnScrollTop');

  window.addEventListener('scroll', () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    scrollTopBtn.classList.toggle('visible', bottom);
  });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // === SCROLL ANIMATION ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target); // animación 1 sola vez
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.scroll-animate, .gallery-item').forEach(el => observer.observe(el));
});

// === SCROLL RESTORE ===
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// === FUNCIONES TEMA ===
function updateThemeIcons(theme) {
  const icon = theme === 'dark' ? 'sun.webp' : 'moon.webp';
  document.querySelectorAll('.icon-mode').forEach(img => {
    img.src = `./img/${icon}`;
    img.alt = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
  });
}

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcons(theme);
}

function toggleTheme() {
  const current = root.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
}

const heroSection = document.getElementById('inicio');

