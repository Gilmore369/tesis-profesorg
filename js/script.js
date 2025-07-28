/*
 * script.js
 * Funcionalidades para El Profesor G
 * Gestión de cookies y widget de WhatsApp
 */

// Manejador de cookies
document.addEventListener('DOMContentLoaded', function () {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesBtn = document.getElementById('accept-cookies');
  // Verifica si ya se aceptaron cookies
  if (localStorage.getItem('cookiesAccepted')) {
    if (cookieBanner) cookieBanner.style.display = 'none';
  }
  // Al hacer clic en aceptar
  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', function () {
      localStorage.setItem('cookiesAccepted', 'true');
      if (cookieBanner) cookieBanner.style.display = 'none';
    });
  }
});

/*
 * Integración de navegación por pestañas y nuevo widget de WhatsApp
 * Este bloque gestiona el comportamiento de los enlaces de navegación para
 * funcionar como pestañas sin desplazamiento y agrega un widget simplificado
 * de WhatsApp al pie de la página. Además, oculta el widget anterior del chatbot.
 */
document.addEventListener('DOMContentLoaded', function () {
  // Configura navegación por pestañas
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('header.hero, section');

  function showTab(sectionId) {
    sections.forEach(sec => {
      const id = sec.getAttribute('id');
      if ((id === sectionId) || (sec.tagName.toLowerCase() === 'header' && sectionId === 'inicio')) {
        sec.style.display = '';
      } else {
        sec.style.display = 'none';
      }
    });
    navLinks.forEach(link => {
      if (link.getAttribute('href').substring(1) === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href').substring(1);
      showTab(target);
    });
  });

  // Mostrar pestaña inicial
  showTab('inicio');

  // Generar menús desplegables para "Servicios" y "Precios" programáticamente
  const serviciosLink = document.querySelector('nav ul li a[href="#servicios"]');
  if (serviciosLink) {
    const serviciosLi = serviciosLink.parentElement;
    serviciosLi.classList.add('dropdown');
    const serviciosDropdown = document.createElement('div');
    serviciosDropdown.className = 'dropdown-content';
    serviciosDropdown.innerHTML = `
      <a href="#servicios">Asesoría completa</a>
      <a href="#servicios">Informes y prácticas</a>
      <a href="#servicios">Artículos y monografías</a>
      <a href="#servicios">Corrección y similitud</a>
      <a href="#servicios">Presentaciones y defensa</a>
    `;
    serviciosLi.appendChild(serviciosDropdown);
  }
  const preciosLink = document.querySelector('nav ul li a[href="#precios"]');
  if (preciosLink) {
    const preciosLi = preciosLink.parentElement;
    preciosLi.classList.add('dropdown');
    const preciosDropdown = document.createElement('div');
    preciosDropdown.className = 'dropdown-content';
    preciosDropdown.innerHTML = `
      <a href="#precios">Ingeniería Industrial</a>
      <a href="#precios">Administración</a>
      <a href="#precios">Servicios adicionales</a>
    `;
    preciosLi.appendChild(preciosDropdown);
  }

  // Crear widget de WhatsApp simplificado y ocultar el anterior
  const style = document.createElement('style');
  style.textContent = `
    /* Oculta el widget anterior del chatbot */
    .chatbot-button, .chatbot-window { display: none !important; }
    /* Estilos para el nuevo widget de WhatsApp */
    .chat-widget {
      font-family: 'Aptos', sans-serif;
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 280px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      z-index: 10000;
    }
    .chat-widget-header {
      background-color: #25D366;
      color: #ffffff;
      padding: 8px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .chat-title {
      font-weight: bold;
    }
    .chat-close {
      cursor: pointer;
    }
    .chat-widget-body {
      padding: 12px;
      background-color: #f7f7f7;
    }
    .chat-widget-body .bot-message {
      background-color: #e4f6e8;
      border-radius: 6px;
      padding: 8px 10px;
      color: #333333;
      margin-bottom: 8px;
      font-size: 14px;
    }
    .chat-widget-footer {
      padding: 8px 12px 12px 12px;
      text-align: right;
    }
    .chat-widget-footer .chat-btn {
      display: inline-block;
      background-color: #25D366;
      color: #ffffff;
      padding: 8px 12px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);

  // Agregar estilos para la sección del Ebook
  style.textContent += `
    .ebook-section {
      background-color: var(--primary);
      color: #ffffff;
      padding: 60px 0;
      text-align: center;
    }
    .ebook-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 2rem;
    }
    .ebook-image img {
      max-width: 260px;
      width: 100%;
      border-radius: 8px;
    }
    .ebook-info h2 {
      font-size: 1.8rem;
      color: var(--secondary);
      margin-bottom: 10px;
    }
    .ebook-info p {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }
    .big-number {
      font-size: 1.4rem;
      color: var(--secondary);
    }
    @media (max-width: 768px) {
      .ebook-container {
        flex-direction: column;
        text-align: center;
      }
      .ebook-info h2 {
        font-size: 1.5rem;
      }
      .big-number {
        font-size: 1.2rem;
      }
    }
  `;

  // Crear el widget de WhatsApp con un encabezado que incluya un botón para cerrar
  const widget = document.createElement('div');
  widget.className = 'chat-widget';
  widget.innerHTML = `
    <div class="chat-widget-header">
      <span class="chat-title">WhatsApp</span>
      <span class="chat-close">✕</span>
    </div>
    <div class="chat-widget-body">
      <div class="bot-message">¡Hola! ¿En qué podemos ayudarte con tu tesis?</div>
    </div>
    <div class="chat-widget-footer">
      <a class="chat-btn" href="https://wa.me/51949236795?text=Hola,%20quisiera%20más%20información%20sobre%20las%20asesorías%20de%20tesis" target="_blank">Comenzar Chat</a>
    </div>
  `;
  document.body.appendChild(widget);
  // Funcionalidad para cerrar el widget al hacer clic en la '✕'
  const closeIcon = widget.querySelector('.chat-close');
  if (closeIcon) {
    closeIcon.addEventListener('click', function () {
      widget.style.display = 'none';
    });
  }

  // Crear sección del Ebook y añadirla a la página de inicio y promociones
  const ebookSection = document.createElement('section');
  ebookSection.className = 'ebook-section';
  ebookSection.innerHTML = `
    <div class="container ebook-container">
      <div class="ebook-image">
        <img src="images/ebook_cover.png" alt="Ebook cómo redactar tu tesis" />
      </div>
      <div class="ebook-info">
        <h2>¡Consigue tu Ebook Gratis!</h2>
        <p>“Cómo redactar tu tesis y no morir en el intento”</p>
        <p>Envía un mensaje al <strong class="big-number">+51 949 236 975</strong> y solicita tu copia gratuita.</p>
        <a href="https://wa.me/51949236975?text=Hola,%20quiero%20recibir%20el%20ebook%20gratuito%20sobre%20tesis" class="btn" target="_blank">Solicitar Ebook</a>
      </div>
    </div>
  `;
  const heroSec = document.querySelector('header.hero');
  if (heroSec) {
    heroSec.insertAdjacentElement('afterend', ebookSection);
  }
  // También añadir el aviso en la sección de promociones
  const promoSec = document.querySelector('section.promotion');
  if (promoSec) {
    const ebookPromo = ebookSection.cloneNode(true);
    promoSec.appendChild(ebookPromo);
  }
});