// === ELEMENTOS GLOBALES ===
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';

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
  // === ELEMENTOS DEL FORMULARIO ===
const btnWhatsapp = document.getElementById("btnWhatsapp");
const btnEmail = document.getElementById("btnEmail");

// === VALIDACIÓN Y FORMATO ===
function obtenerDatosFormulario() {
  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const servicio = document.getElementById("servicio").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !servicio || !mensaje) {
    alert("Por favor completa todos los campos obligatorios (Nombre, Servicio y Mensaje).");
    return null;
  }

  if (telefono && !/^\+?56\s?9\s?\d{4}\s?\d{4}$/.test(telefono)) {
    alert("El número de teléfono ingresado no es válido. Usa el formato +56 9 1234 5678.");
    return null;
  }

  return { nombre, telefono, servicio, mensaje };
}

// === ENVÍO POR WHATSAPP ===
btnWhatsapp.addEventListener("click", () => {
  const datos = obtenerDatosFormulario();
  if (!datos) return;

  const { nombre, telefono, servicio, mensaje } = datos;

  const texto = `Hola, mi nombre es ${nombre}. Tengo una propuesta sobre: ${servicio},  ${mensaje}` +
                (telefono ? ` Mi teléfono es: ${telefono}` : "");

  const numero = "56974188951"; // número de WhatsApp sin "+"
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");
});

// === ENVÍO POR CORREO ===
btnEmail.addEventListener("click", (e) => {
  const datos = obtenerDatosFormulario();
  if (!datos) {
    e.preventDefault(); // cancela el enlace si hay error
    return;
  }

  const { nombre, telefono, servicio, mensaje } = datos;

  const asunto = `Solicitud: ${servicio}`;
  const cuerpo = `Hola, mi nombre es ${nombre}. Tengo una propuesta sobre: ${servicio}` +
                 (telefono ? `\n\nMi teléfono es: ${telefono}` : "");

  const mailtoLink = `mailto:serviciosesecspa@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  btnEmail.href = mailtoLink;
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

  // === BOTÓN VOLVER ARRIBA ===
  const scrollTopBtn = document.getElementById('btnScrollTop');

  window.addEventListener('scroll', () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    scrollTopBtn?.classList.toggle('visible', bottom);
  });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // === ANIMACIONES AL SCROLL ===
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // animación solo una vez
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.scroll-animate, .gallery-item').forEach(el => {
    observer.observe(el);
  });
});

// === RESTAURAR SCROLL ARRIBA AL REFRESCAR ===
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

  // Cambiar logos al modo correspondiente
  const logoSrc = theme === 'dark' ? './img/logo-negativo.webp' : './img/logo.webp';
  const logoNavbar = document.getElementById('logoNavbar');
  const logoDrawer = document.getElementById('logoDrawer');

  if (logoNavbar) logoNavbar.src = logoSrc;
  if (logoDrawer) logoDrawer.src = logoSrc;
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
