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

        /* Distribución del héroe: coloca la descripción y el formulario uno al lado del otro en pantallas anchas */
        header.hero {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-start;
        }
        header.hero .content {
          flex: 1 1 40%;
          min-width: 280px;
          margin-right: 20px;
        }
        header.hero .hero-register {
          flex: 1 1 40%;
          max-width: 450px;
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

    // Eliminar enlaces duplicados de contacto (conserva solo el primero)
    if (navListEl) {
      const contactLinks = navListEl.querySelectorAll('a[href="#contacto"]');
      if (contactLinks.length > 1) {
        for (let i = 1; i < contactLinks.length; i++) {
          const li = contactLinks[i].closest('li');
          if (li) li.remove();
        }
      }
    }
  })();

  // Insertar formulario de diagnóstico/asesoría en el héroe
  (function insertDiagnosisForm() {
    // Selecciona el contenedor del héroe completo
    const hero = document.querySelector('header.hero');
    if (!hero) return;
    // Eliminar la imagen del héroe para dar espacio al formulario
    const heroImage = hero.querySelector('.image');
    if (heroImage) {
      heroImage.remove();
    }
    // Crear contenedor del formulario
    const formDiv = document.createElement('div');
    formDiv.className = 'hero-register';
    formDiv.innerHTML = `
      <h3>Solicita diagnóstico/asesoría y tu eBook gratuito</h3>
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
    // Insertar el formulario en el héroe después del contenido existente
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
          `Mi número es ${telefono} (${email}). Deseo solicitar mi diagnóstico/asesoría gratuita y el eBook \"Cómo redactar tu tesis\".` +
          (comentarios ? ` Comentarios: ${comentarios}` : '');
        window.open(`https://wa.me/51949236795?text=${message}`, '_blank');
      });
    }
  })();

  /**
   * Inicializa la sección de precios con tarjetas de estilo glassmorphism.
   * Crea un modal con una encuesta de 10 preguntas que se debe completar
   * para desbloquear la visualización de precios. Usa localStorage para recordar
   * si ya se completó el formulario y genera enlaces dinámicos de WhatsApp.
   */
  (function initPricingSection() {
    const preciosSection = document.getElementById('precios');
    if (!preciosSection) return;
    // Si la sección ya contiene tarjetas con la clase .price-card (es decir, se definieron en el HTML),
    // no generamos nuevas tarjetas sino que configuramos la lógica de desbloqueo y el modal.
    if (preciosSection.querySelector('.price-card')) {
      // Asegurar que el modal exista; si no, crearlo de forma similar al estático
      let modalOverlay = document.getElementById('precios-modal');
      if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'precios-modal';
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
          <div class="modal-content">
            <h3>Cuéntanos sobre tu proyecto</h3>
            <form id="precios-form">
              <input type="text" name="nombre" placeholder="Nombre completo" required />
              <input type="email" name="correo" placeholder="Correo electrónico" required />
              <input type="text" name="carrera" placeholder="Carrera profesional" required />
              <input type="text" name="universidad" placeholder="Universidad" required />
              <select name="tipo" required>
                <option value="" disabled selected>Tipo de tesis o proyecto</option>
                <option value="Pregrado Tesis 1">Pregrado Tesis 1</option>
                <option value="Pregrado Tesis 2">Pregrado Tesis 2</option>
                <option value="Titulación">Titulación</option>
                <option value="Proyecto">Proyecto</option>
              </select>
              <select name="tema" required>
                <option value="" disabled selected>¿Ya tienes un tema definido?</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <select name="modalidad" required>
                <option value="" disabled selected>Modalidad</option>
                <option value="Individual">Individual</option>
                <option value="Grupo">Grupo</option>
              </select>
              <select name="avance" required>
                <option value="" disabled selected>Nivel de avance</option>
                <option value="0%">0%</option>
                <option value="25%">25%</option>
                <option value="50%">50%</option>
                <option value="75%">75%</option>
                <option value="100%">100%</option>
              </select>
              <select name="tiempo" required>
                <option value="" disabled selected>Tiempo estimado para entregar</option>
                <option value="Menos de 1 mes">Menos de 1 mes</option>
                <option value="1–3 meses">Entre 1–3 meses</option>
                <option value="Más de 3 meses">Más de 3 meses</option>
              </select>
              <select name="asesoria" required>
                <option value="" disabled selected>¿Deseas recibir asesoría gratuita?</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <button type="submit" class="submit-form">Enviar</button>
            </form>
            <button type="button" class="close-modal">&times;</button>
          </div>
        `;
        document.body.appendChild(modalOverlay);
      }
      // Funciones para abrir y cerrar el modal
      function openModal() {
        modalOverlay.style.display = 'flex';
      }
      function closeModal() {
        modalOverlay.style.display = 'none';
      }
      // Cerrar modal al hacer clic en el botón de cerrar
      const closeBtn = modalOverlay.querySelector('.close-modal');
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          closeModal();
        });
      }
      // Cerrar modal si se hace clic en el fondo
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
          closeModal();
        }
      });
      const form = modalOverlay.querySelector('#precios-form');
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          const formData = new FormData(form);
          const nombre = formData.get('nombre') || '';
          const carrera = formData.get('carrera') || '';
          const tipo = formData.get('tipo') || '';
          // Guardar estado en localStorage
          localStorage.setItem('preciosDesbloqueados', 'true');
          localStorage.setItem('lastNombre', nombre);
          localStorage.setItem('lastCarrera', carrera);
          localStorage.setItem('lastTipo', tipo);
          closeModal();
          updatePriceCards();
        });
      }
      // Logica para actualizar tarjetas segun estado
      function updatePriceCards() {
        const unlocked = localStorage.getItem('preciosDesbloqueados') === 'true';
        const cards = preciosSection.querySelectorAll('.price-card');
        cards.forEach(card => {
          const priceDetails = card.querySelector('.price-details');
          const button = card.querySelector('.unlock-btn');
          if (unlocked) {
            priceDetails.style.display = '';
            button.textContent = 'Cotiza ahora por WhatsApp';
            button.addEventListener('click', function (e) {
              e.preventDefault();
              const nombre = encodeURIComponent(localStorage.getItem('lastNombre') || '');
              const carrera = encodeURIComponent(localStorage.getItem('lastCarrera') || card.dataset.service);
              const tipo = encodeURIComponent(localStorage.getItem('lastTipo') || '');
              const message = `Hola,%20quiero%20cotizar%20una%20tesis%20de%20${carrera}%20(${tipo})`;
              window.open(`https://wa.me/51949236795?text=${message}`, '_blank');
            }, { once: true });
          } else {
            priceDetails.style.display = 'none';
            button.textContent = 'Desbloquear precio';
            button.addEventListener('click', function (e) {
              e.preventDefault();
              openModal();
            }, { once: true });
          }
        });
      }
      // Inicializar tarjetas al cargar
      updatePriceCards();
      // Ya manejamos tarjetas existentes, no continuar con generación dinámica
      return;
    }
    // Para versiones antiguas o páginas sin tarjetas predefinidas, se limpia el contenido existente para reemplazarlo por las nuevas tarjetas
    // Limpia el contenido existente
    preciosSection.innerHTML = '';

    // Datos de servicios con sus precios y descripciones
    const services = [
      {
        id: 'industrial',
        title: 'Ingeniería Industrial',
        description: 'Tesis de titulación, Tesis de pregrado (Tesis 1 y Tesis 2), Proyecto de investigación e Informe de prácticas preprofesionales.',
        prices: [
          { label: 'Tesis de titulación', value: 'S/ 3,500' },
          { label: 'Tesis de pregrado IIND (Tesis 1)', value: 'S/ 1,250' },
          { label: 'Tesis de pregrado IIND (Tesis 2)', value: 'S/ 1,750' },
          { label: 'Proyecto de investigación IIND', value: 'S/ 1,000' },
          { label: 'Informe de prácticas preprofesionales IIND', value: 'S/ 1,250' },
        ],
        icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>`
      },
      {
        id: 'administracion',
        title: 'Administración',
        description: 'Tesis de titulación, Tesis de pregrado (Tesis 1 y Tesis 2) y Proyectos de investigación para carreras administrativas.',
        prices: [
          { label: 'Tesis de titulación', value: 'S/ 3,000' },
          { label: 'Tesis de pregrado ADM (Tesis 1)', value: 'S/ 1,000' },
          { label: 'Tesis de pregrado ADM (Tesis 2)', value: 'S/ 1,250' },
          { label: 'Proyecto de investigación ADM', value: 'S/ 750' },
        ],
        icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M2 11h20"></path></svg>`
      },
      {
        id: 'extras',
        title: 'Servicios adicionales',
        description: 'Diagnóstico de tesis, definición de tema, proyectos de cursos y más. Ajusta el precio según tus necesidades.',
        prices: [
          { label: 'Diagnóstico de tesis (40 min)', value: 'S/ 80' },
          { label: 'Definición de tema (40 min)', value: 'S/ 80' },
          { label: 'Proyectos de cursos importantes', value: 'S/ 500 – 750' },
        ],
        icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-8"></path><path d="M8 12l4-4 4 4"></path><rect x="3" y="4" width="18" height="4" rx="2"></rect></svg>`
      }
    ];

    // Contenedor de tarjetas
    const grid = document.createElement('div');
    grid.className = 'pricing-grid';
    services.forEach(service => {
      const card = document.createElement('div');
      card.className = 'price-card';
      card.dataset.service = service.title;
      // Construye las líneas de precios ocultas
      const priceLines = service.prices.map(p => `<p>${p.label}: <strong>${p.value}</strong></p>`).join('');
      card.innerHTML = `
        <div class="icon-container">${service.icon}</div>
        <h3>${service.title}</h3>
        <p class="service-desc">${service.description}</p>
        <div class="price-details" style="display: none;">
          ${priceLines}
        </div>
        <a href="#" class="unlock-btn">Desbloquear precio</a>
      `;
      grid.appendChild(card);
    });
    preciosSection.appendChild(grid);

    // Crea el modal y lo adjunta al cuerpo si aún no existe
    let modalOverlay = document.getElementById('precios-modal');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'precios-modal';
      modalOverlay.className = 'modal-overlay';
      modalOverlay.innerHTML = `
        <div class="modal-content">
          <h3>Cuéntanos sobre tu proyecto</h3>
          <form id="precios-form">
            <input type="text" name="nombre" placeholder="Nombre completo" required />
            <input type="email" name="correo" placeholder="Correo electrónico" required />
            <input type="text" name="carrera" placeholder="Carrera profesional" required />
            <input type="text" name="universidad" placeholder="Universidad" required />
            <select name="tipo" required>
              <option value="" disabled selected>Tipo de tesis o proyecto</option>
              <option value="Pregrado Tesis 1">Pregrado Tesis 1</option>
              <option value="Pregrado Tesis 2">Pregrado Tesis 2</option>
              <option value="Titulación">Titulación</option>
              <option value="Proyecto">Proyecto</option>
            </select>
            <select name="tema" required>
              <option value="" disabled selected>¿Ya tienes un tema definido?</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
            <select name="modalidad" required>
              <option value="" disabled selected>Modalidad</option>
              <option value="Individual">Individual</option>
              <option value="Grupo">Grupo</option>
            </select>
            <select name="avance" required>
              <option value="" disabled selected>Nivel de avance</option>
              <option value="0%">0%</option>
              <option value="25%">25%</option>
              <option value="50%">50%</option>
              <option value="75%">75%</option>
              <option value="100%">100%</option>
            </select>
            <select name="tiempo" required>
              <option value="" disabled selected>Tiempo estimado para entregar</option>
              <option value="Menos de 1 mes">Menos de 1 mes</option>
              <option value="1–3 meses">Entre 1–3 meses</option>
              <option value="Más de 3 meses">Más de 3 meses</option>
            </select>
            <select name="asesoria" required>
              <option value="" disabled selected>¿Deseas recibir asesoría gratuita?</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
            <button type="submit" class="submit-form">Enviar</button>
          </form>
          <button type="button" class="close-modal">&times;</button>
        </div>
      `;
      document.body.appendChild(modalOverlay);
    }

    // Función para mostrar el modal
    function openModal() {
      modalOverlay.style.display = 'flex';
    }
    // Función para cerrar el modal
    function closeModal() {
      modalOverlay.style.display = 'none';
    }

    // Cerrar modal al hacer clic en el botón de cerrar
    modalOverlay.querySelector('.close-modal').addEventListener('click', function () {
      closeModal();
    });
    // Cerrar modal si se hace clic fuera del contenido
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Manejo del envío del formulario
    const form = modalOverlay.querySelector('#precios-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Obtener datos del formulario
      const formData = new FormData(form);
      const nombre = formData.get('nombre') || '';
      const carrera = formData.get('carrera') || '';
      const tipo = formData.get('tipo') || '';
      // Guardar en localStorage que ya se desbloquearon los precios
      localStorage.setItem('preciosDesbloqueados', 'true');
      // También guardamos algunos datos para generar el enlace de WhatsApp más tarde
      localStorage.setItem('lastNombre', nombre);
      localStorage.setItem('lastCarrera', carrera);
      localStorage.setItem('lastTipo', tipo);
      // Cerrar modal
      closeModal();
      // Actualizar tarjetas y botones
      updatePriceCards();
    });

    // Define la lógica para actualizar el estado de las tarjetas según localStorage
    function updatePriceCards() {
      const unlocked = localStorage.getItem('preciosDesbloqueados') === 'true';
      const cards = preciosSection.querySelectorAll('.price-card');
      cards.forEach(card => {
        const priceDetails = card.querySelector('.price-details');
        const button = card.querySelector('.unlock-btn');
        if (unlocked) {
          // Mostrar precios
          priceDetails.style.display = '';
          // Cambiar texto y funcionalidad del botón
          button.textContent = 'Cotiza ahora por WhatsApp';
          // Definir enlace dinámico al hacer clic
          button.addEventListener('click', function (e) {
            e.preventDefault();
            const nombre = encodeURIComponent(localStorage.getItem('lastNombre') || '');
            const carrera = encodeURIComponent(localStorage.getItem('lastCarrera') || card.dataset.service);
            const tipo = encodeURIComponent(localStorage.getItem('lastTipo') || '');
            const message = `Hola,%20quiero%20cotizar%20una%20tesis%20de%20${carrera}%20(${tipo})`;
            window.open(`https://wa.me/51949236795?text=${message}`, '_blank');
          }, { once: true });
        } else {
          // Ocultar precios y restaurar botón para abrir la encuesta
          priceDetails.style.display = 'none';
          button.textContent = 'Desbloquear precio';
          button.addEventListener('click', function (e) {
            e.preventDefault();
            openModal();
          }, { once: true });
        }
      });
    }

    // Al cargar la página, actualiza las tarjetas según el estado almacenado
    updatePriceCards();

    // Estilos específicos para la sección de precios y el modal
    const pricingStyle = document.createElement('style');
    pricingStyle.textContent = `
      /* Zona de tarjetas de precios */
      #precios {
        padding: 2rem 0;
      }
      .pricing-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
      }
      .price-card {
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        padding: 2rem;
        margin-bottom: 2rem;
        color: #1B2A4E;
        font-family: 'Aptos', sans-serif;
      }
      .price-card .icon-container {
        margin-bottom: 1rem;
      }
      .price-card h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
        color: #1B2A4E;
      }
      .price-card .service-desc {
        margin-bottom: 1rem;
        font-size: 0.95rem;
        color: #1B2A4E;
      }
      .price-card .price-details p {
        margin: 0.25rem 0;
        font-size: 0.9rem;
        color: #1B2A4E;
      }
      .price-card .unlock-btn {
        display: inline-block;
        margin-top: 1rem;
        background-color: #C9A13B;
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        text-decoration: none;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .price-card .unlock-btn:hover {
        background-color: #b38b33;
      }
      /* Modal y lógica del formulario */
      .modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 10000;
        justify-content: center;
        align-items: center;
        padding: 1rem;
      }
      .modal-content {
        background-color: rgba(255, 255, 255, 0.95);
        border-radius: 16px;
        padding: 2rem;
        max-width: 600px;
        width: 100%;
        position: relative;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      }
      .modal-content h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        color: #1B2A4E;
      }
      .modal-content form input,
      .modal-content form select {
        width: 100%;
        margin-bottom: 0.75rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 0.9rem;
      }
      .modal-content .submit-form {
        width: 100%;
        background-color: #C9A13B;
        color: #fff;
        padding: 0.6rem 1rem;
        border: none;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
      }
      .modal-content .submit-form:hover {
        background-color: #b38b33;
      }
      .modal-content .close-modal {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #1B2A4E;
        cursor: pointer;
      }
      /* Responsive ajustes para tarjetas en pantallas pequeñas */
      @media (max-width: 600px) {
        .pricing-grid {
          grid-template-columns: 1fr;
        }
        .price-card {
          padding: 1.5rem;
        }
      }
    `;
    document.head.appendChild(pricingStyle);
  })();

  /**
   * Inicializa la sección de servicios con tarjetas tipo glassmorphism, animaciones suaves
   * y modal para solicitar cada servicio con integración a WhatsApp.
   * Remplaza el contenido existente de la sección #servicios.
   */
  (function initServicesSection() {
    const serviciosSection = document.getElementById('servicios');
    if (!serviciosSection) return;
    // Limpia el contenido existente
    serviciosSection.innerHTML = '';
    // Añade título
    const title = document.createElement('h2');
    title.className = 'servicios-title';
    title.textContent = 'Servicios que ofrece';
    serviciosSection.appendChild(title);
    // Datos de los servicios
    const services = [
      {
        title: 'Asesoría completa de tesis',
        description: 'Desde el planteamiento del problema hasta la defensa final. Guía paso a paso con metodología propia.',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14"></path><path d="M4 15a2 2 0 0 1 2-2h10"></path></svg>'
      },
      {
        title: 'Informes de prácticas',
        description: 'Elaboración de informes de prácticas preprofesionales y suficiencia profesional con formato y rigor académico.',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4"></path><rect x="9" y="2" width="6" height="4" rx="1"></rect></svg>'
      },
      {
        title: 'Artículos y monografías',
        description: 'Redacción y publicación de artículos científicos y monografías en revistas indexadas.',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2h12l6 6v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>'
      },
      {
        title: 'Corrección de estilo',
        description: 'Revisión de redacción académica, citación, detección de similitud y ajuste a normas internacionales.',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5l4 4L7 21H3v-4l13.5-13.5z"></path></svg>'
      },
      {
        title: 'Presentaciones para sustentación',
        description: 'Diseño de diapositivas en PowerPoint o Canva para exponer y defender tu tesis con impacto visual.',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"></rect><path d="M12 17v4"></path><path d="M8 21h8"></path></svg>'
      },
      {
        title: 'Entrenamiento y defensa',
        description: 'Preparación para la exposición oral de tesis, con técnicas de oratoria y estrategias de defensa.',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>'
      },
      {
        title: 'Tablas y gráficos estadísticos',
        description: 'Análisis y visualización de datos en SPSS, Excel y Power BI para sustentar tus resultados.',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><rect x="7" y="10" width="3" height="7"></rect><rect x="12" y="6" width="3" height="11"></rect><rect x="17" y="13" width="3" height="4"></rect></svg>'
      },
      {
        title: 'Servicio express',
        description: 'Revisión y mejora de trabajos académicos en menos de 48 horas. Ideal para entregas urgentes.',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z"></path></svg>'
      }
    ];
    // Crear grid contenedor
    const grid = document.createElement('div');
    grid.className = 'services-grid';
    services.forEach(service => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.dataset.service = service.title;
      const iconDiv = document.createElement('div');
      iconDiv.className = 'icon-container';
      iconDiv.innerHTML = service.icon;
      const h3 = document.createElement('h3');
      h3.textContent = service.title;
      const desc = document.createElement('p');
      desc.textContent = service.description;
      const btn = document.createElement('a');
      btn.href = '#';
      btn.className = 'btn-servicio';
      btn.setAttribute('aria-label', 'Solicitar ' + service.title);
      btn.textContent = 'Solicitar este servicio';
      card.appendChild(iconDiv);
      card.appendChild(h3);
      card.appendChild(desc);
      card.appendChild(btn);
      grid.appendChild(card);
    });
    serviciosSection.appendChild(grid);
    // Crear modal si no existe
    let modal = document.getElementById('services-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'services-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content">
          <h3 id="services-modal-title">Solicitar servicio</h3>
          <form id="services-form">
            <input type="text" name="nombre" placeholder="Nombre completo" required />
            <input type="email" name="correo" placeholder="Correo electrónico" required />
            <textarea name="mensaje" placeholder="Describe brevemente tu necesidad" rows="3" required></textarea>
            <button type="submit">Enviar</button>
          </form>
          <button type="button" class="close-modal">&times;</button>
        </div>
      `;
      document.body.appendChild(modal);
    }
    // Función para cerrar modal
    function closeModal() {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      const form = modal.querySelector('#services-form');
      if (form) form.reset();
    }
    // Manejo de botones de servicio
    const serviceButtons = serviciosSection.querySelectorAll('.btn-servicio');
    serviceButtons.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const card = this.closest('.service-card');
        const serviceName = card ? card.dataset.service : '';
        const modalTitleEl = modal.querySelector('#services-modal-title');
        if (modalTitleEl) modalTitleEl.textContent = 'Solicitar ' + serviceName;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        modal.dataset.service = serviceName;
      });
    });
    // Botón cerrar modal
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn && !closeBtn.dataset.listener) {
      closeBtn.dataset.listener = 'true';
      closeBtn.addEventListener('click', function () {
        closeModal();
      });
    }
    // Cerrar al hacer clic fuera del contenido
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    // Manejo del envío del formulario
    const form = modal.querySelector('#services-form');
    if (form && !form.dataset.listener) {
      form.dataset.listener = 'true';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = encodeURIComponent(form.nombre.value.trim());
        const correo = encodeURIComponent(form.correo.value.trim());
        const mensaje = encodeURIComponent(form.mensaje.value.trim());
        const servicio = encodeURIComponent(modal.dataset.service || '');
        const whatsappText = `Hola, soy ${nombre} (${correo}). Necesito ayuda con ${servicio}. ${mensaje}`;
        window.open(`https://wa.me/51949236795?text=${whatsappText}`, '_blank');
        closeModal();
        alert('Gracias por tu interés. Te contactaremos pronto.');
      });
    }
    // Estilos para la sección de servicios y el modal
    const servStyle = document.createElement('style');
    servStyle.textContent = `
      /* Zona de tarjetas de servicios */
      #servicios {
        padding: 2rem 0;
        max-width: 1200px;
        margin: 0 auto;
      }
      #servicios .servicios-title {
        text-align: center;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 2rem;
        color: #FFFFFF;
        font-family: 'Aptos', sans-serif;
      }
      #servicios .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
      }
      #servicios .service-card {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: 20px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        transition: transform 0.3s ease-in-out;
        color: #1B2A4E;
        font-family: 'Aptos', sans-serif;
      }
      #servicios .service-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      }
      #servicios .service-card .icon-container {
        margin-bottom: 1rem;
      }
      #servicios .service-card h3 {
        margin: 0 0 0.5rem;
        font-size: 1.25rem;
        font-weight: 700;
        color: #1B2A4E;
      }
      #servicios .service-card p {
        margin: 0 0 1rem;
        font-size: 1rem;
        color: #1B2A4E;
      }
      #servicios .service-card .btn-servicio {
        background-color: #C9A13B;
        color: #1B2A4E;
        border: none;
        border-radius: 8px;
        padding: 0.75rem 1.5rem;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.3s ease;
        text-decoration: none;
        display: inline-block;
      }
      #servicios .service-card .btn-servicio:hover {
        background-color: #b38b33;
      }
      /* Modal para servicios */
      #services-modal.modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.6);
        z-index: 10000;
        padding: 1rem;
      }
      #services-modal .modal-content {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        max-width: 500px;
        width: 100%;
        color: #1B2A4E;
        position: relative;
      }
      #services-modal .modal-content h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-weight: 700;
        color: #1B2A4E;
      }
      #services-modal .modal-content form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      #services-modal .modal-content input,
      #services-modal .modal-content textarea {
        border: none;
        border-radius: 8px;
        padding: 0.75rem;
        font-size: 1rem;
        width: 100%;
        font-family: 'Aptos', sans-serif;
      }
      #services-modal .modal-content button[type="submit"] {
        background-color: #C9A13B;
        color: #1B2A4E;
        font-weight: 700;
        border: none;
        border-radius: 8px;
        padding: 0.75rem 1.5rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      #services-modal .modal-content button[type="submit"]:hover {
        background-color: #b38b33;
      }
      #services-modal .close-modal {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #1B2A4E;
      }
      @media (max-width: 768px) {
        #servicios .services-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
      @media (max-width: 480px) {
        #servicios .services-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(servStyle);
  })();

  /**
   * Inicializa la sección Sobre El Profesor G con diseño moderno y glassmorphism.
   * Reemplaza el contenido de la sección #sobre para mostrar misión, visión,
   * objetivos SMART y valores institucionales.
   */
  (function initAboutSection() {
    const aboutSection = document.getElementById('sobre');
    if (!aboutSection) return;
    // Limpiar contenido existente
    aboutSection.innerHTML = '';
    aboutSection.className = 'sobre-section';
    // Definir iconos para misión, visión, objetivos y valores
    const missionIcon = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>';
    const visionIcon = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    const smartIcon = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.5-3.7 6l-.3.3c-.3.3-.5.7-.5 1.1V19h-6v-2.6c0-.4-.2-.8-.5-1.1l-.3-.3C6.5 13.5 5 11.5 5 9a7 7 0 0 1 7-7z"></path><line x1="9" y1="22" x2="15" y2="22"></line></svg>';
    const valuesIcon = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C9A13B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18 21.3 12 17.9 6 21.3 7 14.1 2 9.3 9 8.5 12 2"></polygon></svg>';
    // Construir contenido HTML
    aboutSection.innerHTML = `
      <div class="contenedor">
        <h2>Sobre El Profesor G</h2>
        <p>El Profesor G nació como un proyecto educativo en 2018, cuando su fundador —ingeniero industrial y apasionado por la investigación— comenzó a impartir asesorías informales a compañeros de la Universidad Privada Antenor Orrego (UPAO) en Trujillo. En aquella época, muchos estudiantes afrontaban solos la elaboración de sus primeras tesis y proyectos académicos, sin saber cómo estructurar un marco teórico, diseñar una metodología rigurosa o redactar de forma adecuada. Gianfranco, conocido entre sus colegas como “el Profe G”, entendió que podía aportar su experiencia y su formación técnica para guiar a otros.</p>
        <p>Las primeras asesorías se centraron en tesis de pregrado de Ingeniería Industrial y Administración, revisando capítulos, corrigiendo bibliografías y preparando presentaciones de sustentación. Con el tiempo, la demanda creció: estudiantes de otras facultades y universidades comenzaron a solicitar su ayuda, lo que lo llevó a formalizar el proyecto y a consolidar un equipo multidisciplinar de colaboradores. A partir de 2020, “El Profesor G” amplió sus servicios para abarcar informes de prácticas, artículos científicos, monografías y proyectos de titulación, siempre con un enfoque personalizado y ético.</p>
        <p>Hoy, la marca “El Profesor G” es sinónimo de confianza y excelencia académica. El equipo utiliza herramientas modernas de gestión y análisis y mantiene un acompañamiento cercano con cada estudiante, desde la definición del tema hasta la defensa final. El compromiso principal es que ningún estudiante se quede sin apoyo: el equipo se organiza para cubrir toda la demanda mensual, adaptándose a los tiempos de cada universidad y asegurando la entrega puntual de cada proyecto.</p>
        <h3>Objetivos</h3>
        <ul class="objetivos">
          <li><strong>Asesoría integral:</strong> Acompañar a estudiantes de pregrado, titulación y posgrado en la elaboración de sus tesis y proyectos, ofreciendo orientación por capítulos, corrección de estilo y apoyo metodológico conforme a normativas APA, Vancouver o Scopus.</li>
          <li><strong>Cobertura de la demanda:</strong> Organizar el trabajo del equipo para atender todos los proyectos solicitados cada mes, sin importar el área académica o la complejidad del tema.</li>
          <li><strong>Personalización:</strong> Ajustar cada asesoría al perfil del estudiante (universidad, carrera, modalidad individual o en grupo) y al avance de su investigación, con reuniones periódicas y seguimiento continuo.</li>
          <li><strong>Calidad y ética:</strong> Promover la originalidad, el respeto por los derechos de autor y el uso responsable de fuentes; utilizar software de detección de similitud para garantizar la autenticidad de los trabajos.</li>
          <li><strong>Innovación y mejora continua:</strong> Incorporar nuevas metodologías y herramientas tecnológicas que optimicen la investigación académica y la comunicación con los estudiantes.</li>
        </ul>
        <h3>Valores institucionales</h3>
        <ul class="valores-lista">
          <li><strong>Compromiso:</strong> Nos involucramos con cada estudiante hasta alcanzar su meta académica.</li>
          <li><strong>Ética:</strong> Promovemos la originalidad, el respeto por los derechos de autor y el uso legítimo de fuentes.</li>
          <li><strong>Excelencia:</strong> Aplicamos las mejores prácticas académicas, tecnológicas y pedagógicas.</li>
          <li><strong>Puntualidad:</strong> Cumplimos estrictamente los cronogramas de entrega acordados.</li>
        </ul>
      </div>
    `;
    // Estilos para la sección Sobre El Profesor G
    const aboutStyle = document.createElement('style');
    aboutStyle.textContent = `
      .sobre-section {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        max-width: 1100px;
        margin: 2rem auto;
        color: #1B2A4E;
        font-family: 'Aptos', sans-serif;
      }
      .sobre-section h2 {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      .sobre-section p {
        font-size: 16px;
        margin-bottom: 1.5rem;
      }
      .sobre-section .grid-mv {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 2rem;
      }
      .sobre-section .bloque {
        flex: 1 1 45%;
        min-width: 280px;
      }
      .sobre-section .icon-container {
        width: 40px;
        height: 40px;
        margin-bottom: 0.5rem;
      }
      .sobre-section h3 {
        font-size: 20px;
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: #1B2A4E;
      }
      .sobre-section .bloque p {
        font-size: 0.95rem;
        margin-bottom: 0.75rem;
        color: #1B2A4E;
      }
      .sobre-section .bloque-smart ul,
      .sobre-section .bloque-valores ul {
        margin-top: 0.5rem;
        padding-left: 1.5rem;
      }
      .sobre-section .valores-lista li {
        margin-bottom: 0.5rem;
        list-style: none;
      }
      .sobre-section .valores-lista li::before {
        content: '✔️ ';
        margin-right: 0.3rem;
        color: #C9A13B;
      }
      .sobre-section ul {
        color: #1B2A4E;
        font-size: 0.95rem;
      }
      @media (max-width: 768px) {
        .sobre-section .grid-mv {
          flex-direction: column;
        }
        .sobre-section .bloque {
          flex: 1 1 100%;
        }
      }
    `;
    document.head.appendChild(aboutStyle);
  })();

});