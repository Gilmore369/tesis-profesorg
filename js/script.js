/*
 * script.js
 * Funcionalidades para El Profesor G
 * - Gestión de cookies
 */

document.addEventListener('DOMContentLoaded', function () {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesBtn = document.getElementById('accept-cookies');
  // Verifica si ya se aceptaron cookies
  if (localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'none';
  }
  // Al hacer clic en aceptar
  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', function () {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.style.display = 'none';
    });
  }
});



/* Chatbot de WhatsApp */
document.addEventListener('DOMContentLoaded', function () {
  // Create style for chatbot
  const style = document.createElement('style');
  style.textContent = `
    .chatbot-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #25D366;
      color: white;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      font-size: 32px;
    }
    .chatbot-window {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 300px;
      max-width: 90vw;
      height: 400px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      display: none;
      flex-direction: column;
      z-index: 9999;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      font-family: 'Aptos', sans-serif;
    }
    .chatbot-header {
      background-color: #1B2A4E;
      color: white;
      padding: 10px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .chatbot-messages {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      background-color: #f5f5f5;
    }
    .chatbot-input {
      display: flex;
      border-top: 1px solid #ddd;
    }
    .chatbot-input input {
      flex: 1;
      border: none;
      padding: 10px;
      font-family: inherit;
      font-size: 14px;
      outline: none;
    }
    .chatbot-input button {
      background-color: #1B2A4E;
      color: white;
      border: none;
      padding: 0 15px;
      cursor: pointer;
    }
    .chatbot-message {
      margin-bottom: 10px;
      max-width: 80%;
      padding: 8px 12px;
      border-radius: 12px;
      line-height: 1.4;
      font-size: 14px;
    }
    .chatbot-message.user {
      background-color: #d1e7ff;
      align-self: flex-end;
    }
    .chatbot-message.bot {
      background-color: #e9e9e9;
      align-self: flex-start;
    }
  `;
  document.head.appendChild(style);

  // Create elements
  const button = document.createElement('div');
  button.className = 'chatbot-button';
  button.textContent = '💬';

  const windowDiv = document.createElement('div');
  windowDiv.className = 'chatbot-window';

  const header = document.createElement('div');
  header.className = 'chatbot-header';
  header.textContent = 'Chat con El Profe G';
  const closeBtn = document.createElement('span');
  closeBtn.style.cursor = 'pointer';
  closeBtn.textContent = '✕';
  header.appendChild(closeBtn);

  const messages = document.createElement('div');
  messages.className = 'chatbot-messages';

  const inputArea = document.createElement('div');
  inputArea.className = 'chatbot-input';
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Escribe tu pregunta...';
  const sendBtn = document.createElement('button');
  sendBtn.textContent = 'Enviar';
  inputArea.appendChild(input);
  inputArea.appendChild(sendBtn);

  windowDiv.appendChild(header);
  windowDiv.appendChild(messages);
  windowDiv.appendChild(inputArea);

  document.body.appendChild(button);
  document.body.appendChild(windowDiv);

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chatbot-message ' + sender;
    msgDiv.textContent = text;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  // initial greeting
  appendMessage('Hola, soy el Chatbot de El Profe G. ¿En qué puedo ayudarte?', 'bot');

  function getResponse(query) {
    const text = query.toLowerCase();
    if (text.includes('precio') || text.includes('costo') || text.includes('precios')) {
      return 'Ofrecemos diferentes paquetes según la carrera: Ingeniería Industrial y Administración. Consulta la sección de precios para más detalles.';
    }
    if (text.includes('servicio') || text.includes('servicios')) {
      return 'Brindamos asesorías completas de tesis, redacción por capítulos, informes de prácticas, artículos científicos, corrección de estilo, diseño de presentaciones, y más.';
    }
    if (text.includes('pago') || text.includes('forma de pago') || text.includes('pagos')) {
      return 'Aceptamos pagos a través de Yape, Plin, transferencias y PayPal.';
    }
    if (text.includes('tiempo') || text.includes('entrega')) {
      return 'El tiempo de entrega varía según el servicio. Contáctanos para más detalles.';
    }
    return 'Gracias por tu mensaje. Un asesor se pondrá en contacto contigo pronto.';
  }

  function sendMessage() {
    const userText = input.value.trim();
    if (!userText) return;
    appendMessage(userText, 'user');
    const response = getResponse(userText);
    setTimeout(() => {
      appendMessage(response, 'bot');
    }, 600);
    input.value = '';
  }

  button.addEventListener('click', () => {
    windowDiv.style.display = windowDiv.style.display === 'flex' || windowDiv.style.display === 'block' ? 'none' : 'flex';
  });

  closeBtn.addEventListener('click', () => {
    windowDiv.style.display = 'none';
  });

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});
