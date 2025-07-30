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
  // Se vuelven a seleccionar los enlaces de navegación cada vez que se hace clic,
  // para incluir cualquier elemento agregado dinámicamente (como la pestaña Campañas).
  function showTab(sectionId) {
    // Obtiene dinámicamente todas las secciones (incluyendo las añadidas posteriormente)
    const sections = document.querySelectorAll('header.hero, section');
    sections.forEach(sec => {
      const id = sec.getAttribute('id');
      // Muestra el héroe cuando sectionId es 'inicio'
      if ((id === sectionId) || (sec.tagName.toLowerCase() === 'header' && sectionId === 'inicio')) {
        sec.style.display = '';
      } else {
        sec.style.display = 'none';
      }
    });
    // Actualiza estados activos en navegación
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      if (link.getAttribute('href').substring(1) === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Asigna manejadores de clic para enlaces de navegación
  function attachNavHandlers() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href').substring(1);
        showTab(target);
      });
    });
  }

  attachNavHandlers();

  // Mostrar pestaña inicial
  showTab('inicio');

  /**
   * Inserta dinámicamente la sección de campañas universitarias y el enlace en la navegación.
   * Esto se hace después de inicializar la navegación para que las nuevas secciones queden
   * incluidas en el comportamiento de pestañas.
   */
  (function createCampaignsSection() {
    const navList = document.querySelector('nav ul');
    if (!navList) return;
    // Comprobar si ya existe el enlace de campañas para evitar duplicados
    if (!navList.querySelector('a[href="#campanas"]')) {
      // Crear nuevo elemento de navegación
      const liCampanas = document.createElement('li');
      const aCampanas = document.createElement('a');
      aCampanas.href = '#campanas';
      aCampanas.textContent = 'Campañas';
      liCampanas.appendChild(aCampanas);
      // Insertar antes del elemento de precios (si existe) para ubicarlo lógicamente
      const preciosLink = navList.querySelector('a[href="#precios"]');
      if (preciosLink && preciosLink.parentNode) {
        navList.insertBefore(liCampanas, preciosLink.parentNode);
      } else {
        navList.appendChild(liCampanas);
      }
    }

    // Crear sección de campañas
    // Solo si aún no existe
    if (!document.getElementById('campanas')) {
      const campanasSection = document.createElement('section');
      campanasSection.id = 'campanas';
      campanasSection.className = 'promos';
      campanasSection.innerHTML = `
        <div class="container">
          <h2>Campañas universitarias</h2>
          <p>Conoce algunas de las campañas promocionales que hemos realizado en colaboración con diversas universidades. Estas imágenes reflejan nuestra presencia y compromiso con la comunidad académica en Ingeniería Industrial, Administración y otras carreras.</p>
          <div class="promo-grid">
            <div class="promo-card">
              <img src="images/campana_ucv.jpg" alt="Campaña UCV – El Profesor G llegó a la UCV" />
              <p><strong>UCV – Proyecto de investigación:</strong> El Profesor G llegó a la Universidad César Vallejo para impulsar proyectos de investigación en Administración e Ingeniería Industrial. ¡Consulta al 949 236 795!</p>
            </div>
            <div class="promo-card">
              <img src="images/campana_upn_tranqui.jpg" alt="Campaña UPN – Tranqui UPN" />
              <p><strong>UPN – Tranqui, El Profe G te salva:</strong> Asesoramos Tesis 1 y Tesis 2 en la Universidad Privada del Norte con la metodología G. Te acompañamos paso a paso.</p>
            </div>
            <div class="promo-card">
              <img src="images/campana_asesoramiento.jpg" alt="Campaña de asesoramiento de tesis" />
              <p><strong>Asesoramiento multidisciplinario:</strong> Proyectos de investigación, monografías, tesis 1, tesis 2 y tesis de titulación para Ingeniería Industrial, Administración y Marketing.</p>
            </div>
            <div class="promo-card">
              <img src="images/campana_asesoria_ucv.jpg" alt="Campaña UCV – Asesoría de tesis" />
              <p><strong>UCV – Asesoría de tesis:</strong> Asesoría integral en proyectos de investigación, monografías y tesis para estudiantes de Ingeniería Industrial, Administración y Marketing.</p>
            </div>
            <div class="promo-card">
              <img src="images/campana_asesoria_upao.jpg" alt="Campaña UPAO – Asesoría de proyectos" />
              <p><strong>UPAO – Proyectos de tesis:</strong> Apoyo especializado para estudiantes de UPAO en proyectos de investigación, monografías, tesis 1, tesis 2 y tesis de titulación.</p>
            </div>
            <div class="promo-card">
              <img src="images/campana_desesperado_upao.jpg" alt="Campaña UPAO – Desesperado por tu investigación" />
              <p><strong>UPAO – ¿Desesperado por tu tema?</strong> No te preocupes, El Profe G te ayuda en proyectos de investigación, monografías y tesis de titulación con un enfoque personalizado.</p>
            </div>
            <div class="promo-card">
              <img src="images/campana_cupo_upn.jpg" alt="Campaña UPN – Separa tu cupo" />
              <p><strong>UPN – Separa tu cupo:</strong> Reserva tu lugar en Tesis 1 y Tesis 2 con asesoría especializada del Profe G. ¡Prepárate y asegura tu éxito académico!</p>
            </div>
          </div>
        </div>
      `;
      // Insertar la sección antes de precios
      const preciosSection = document.getElementById('precios');
      if (preciosSection && preciosSection.parentNode) {
        preciosSection.parentNode.insertBefore(campanasSection, preciosSection);
      } else {
        document.body.appendChild(campanasSection);
      }
    }

    // Reconfigurar manejadores de navegación para incluir la nueva pestaña
    attachNavHandlers();
  })();

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
      font-weight: bold;
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
    /* Estilos para menú hamburguesa */
    .menu-toggle {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 30px;
      height: 24px;
      cursor: pointer;
      z-index: 1001;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .menu-toggle span {
      display: block;
      width: 100%;
      height: 3px;
      background-color: #C9A13B;
      border-radius: 2px;
    }
    nav ul.menu-hidden {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 60px;
      right: 20px;
      background-color: #1B2A4E;
      padding: 10px;
      border-radius: 6px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    nav ul.menu-hidden.show-menu {
      display: flex;
    }
    nav ul.menu-hidden li {
      margin: 8px 0;
    }
    /* Oculta el icono de menú hamburguesa en la vista de escritorio */
    .menu-toggle {
      display: none !important;
    }
    /* Navegación horizontal */
    nav ul {
      display: flex !important;
      gap: 20px;
    }
    nav ul li {
      margin: 0;
    }
    /* Formulario de registro en la portada */
    .hero-register {
      background-color: rgba(255, 255, 255, 0.95);
      padding: 20px;
      border-radius: 8px;
      max-width: 400px;
      margin-top: 20px;
    }
    .hero-register h3 {
      margin-bottom: 12px;
      color: #1B2A4E;
      font-weight: bold;
    }
    .hero-register input,
    .hero-register textarea {
      width: 100%;
      padding: 10px 12px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      font-family: 'Aptos', sans-serif;
    }
    .hero-register textarea {
      resize: vertical;
    }
    .hero-register button {
      width: 100%;
      background-color: #C9A13B;
      color: #ffffff;
      padding: 10px 12px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
    }
    .hero-register button:hover {
      background-color: #b38b33;
    }
  `;
  document.head.appendChild(style);

  const widget = document.createElement('div');
  widget.className = 'chat-widget';
  widget.innerHTML = `
    <div class="chat-widget-header">WhatsApp</div>
    <div class="chat-widget-body">
      <div class="bot-message">¡Hola! ¿En qué podemos ayudarte con tu tesis?</div>
    </div>
    <div class="chat-widget-footer">
      <a class="chat-btn" href="https://wa.me/51949236795?text=Hola,%20quisiera%20más%20información%20sobre%20las%20asesorías%20de%20tesis" target="_blank">Comenzar Chat</a>
    </div>
  `;
  document.body.appendChild(widget);

  // Ajuste de navegación: eliminar menú vertical y mostrar navegación horizontal
  (function fixNavigation() {
    const navBar = document.querySelector('nav');
    if (!navBar) return;
    const navListEl = navBar.querySelector('ul');
    // Eliminar clases que ocultan la navegación
    if (navListEl) {
      navListEl.classList.remove('menu-hidden', 'show-menu');
    }
    // Ocultar el icono de menú hamburguesa si existe
    const toggleEl = navBar.querySelector('.menu-toggle');
    if (toggleEl) {
      toggleEl.style.display = 'none';
    }
  })();

  // Insertar formulario de diagnóstico/asesoría en el héroe
  (function insertDiagnosisForm() {
    const hero = document.querySelector('header.hero .container');
    if (!hero) return;
    // Elimina la imagen del héroe si existe
    const heroImage = hero.querySelector('.image');
    if (heroImage) {
      heroImage.remove();
    }
    // Crear contenedor del formulario
    const formDiv = document.createElement('div');
    formDiv.className = 'hero-register';
    formDiv.innerHTML = `
      <h3>Solicita tu diagnóstico o asesoría gratuita</h3>
      <form id="diagnostico-form">
        <input type="text" name="nombre" placeholder="Nombre completo" required />
        <input type="email" name="email" placeholder="Correo electrónico" required />
        <input type="tel" name="telefono" placeholder="Teléfono" required />
        <input type="text" name="universidad" placeholder="Universidad" required />
        <input type="text" name="carrera" placeholder="Carrera" required />
        <textarea name="comentarios" placeholder="Comentarios (opcional)" rows="3"></textarea>
        <button type="submit">Enviar solicitud</button>
      </form>
    `;
    hero.appendChild(formDiv);
    const diagForm = document.getElementById('diagnostico-form');
    if (diagForm) {
      diagForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = encodeURIComponent(this.nombre.value);
        const email = encodeURIComponent(this.email.value);
        const telefono = encodeURIComponent(this.telefono.value);
        const universidad = encodeURIComponent(this.universidad.value);
        const carrera = encodeURIComponent(this.carrera.value);
        const comentarios = encodeURIComponent(this.comentarios.value || '');
        const message =
          `Hola, soy ${nombre}, estudiante de ${carrera} en ${universidad}. ` +
          `Mi número es ${telefono} (${email}). Solicito mi diagnóstico/asesoría gratuita.` +
          (comentarios ? ` Comentarios: ${comentarios}` : '');
        window.open(`https://wa.me/51949236795?text=${message}`, '_blank');
      });
    }
  })();
});