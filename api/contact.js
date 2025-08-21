// Serverless function for contact form submission
// Compatible with Vercel, Netlify, and other platforms

import nodemailer from 'nodemailer';

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map();

// Input validation and sanitization
function validateAndSanitizeInput(data) {
  const errors = [];
  const sanitized = {};

  // Required fields validation
  if (!data.nombre || data.nombre.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  } else {
    sanitized.nombre = data.nombre.trim().substring(0, 100);
  }

  if (!data.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
    errors.push('Por favor, ingresa un email válido');
  } else {
    sanitized.correo = data.correo.trim().toLowerCase().substring(0, 100);
  }

  if (!data.mensaje || data.mensaje.trim().length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres');
  } else {
    sanitized.mensaje = data.mensaje.trim().substring(0, 1000);
  }

  // Optional fields
  sanitized.universidad = data.universidad
    ? data.universidad.trim().substring(0, 100)
    : '';
  sanitized.carrera = data.carrera ? data.carrera.trim().substring(0, 100) : '';
  sanitized.tipo = ['tesis', 'informe', 'articulo', 'otro'].includes(data.tipo)
    ? data.tipo
    : 'otro';
  sanitized.timestamp = new Date().toISOString();
  sanitized.source = data.source || 'website_contact_form';

  return { errors, sanitized };
}

// Rate limiting check
function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000; // 15 minutes
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5;

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  const record = rateLimitStore.get(ip);

  if (now > record.resetTime) {
    // Reset window
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count };
}

// Email sending function
async function sendEmail(data) {
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const emailContent = `
    Nueva consulta desde el sitio web de El Profesor G
    
    Datos del contacto:
    - Nombre: ${data.nombre}
    - Email: ${data.correo}
    - Universidad: ${data.universidad || 'No especificada'}
    - Carrera: ${data.carrera || 'No especificada'}
    - Tipo de trabajo: ${data.tipo}
    
    Mensaje:
    ${data.mensaje}
    
    ---
    Enviado el: ${new Date(data.timestamp).toLocaleString('es-PE')}
    Fuente: ${data.source}
  `;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || 'contacto@profesorg.com',
    subject: `Nueva consulta de ${data.nombre} - ${data.tipo}`,
    text: emailContent,
    replyTo: data.correo,
  };

  await transporter.sendMail(mailOptions);
}

// Main handler function
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'Método no permitido',
      },
    });
  }

  try {
    // Get client IP for rate limiting
    const clientIP =
      req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.connection.remoteAddress ||
      '127.0.0.1';

    // Check rate limit
    const rateLimit = checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
      return res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Demasiadas solicitudes. Por favor, intenta más tarde.',
          resetTime: rateLimit.resetTime,
        },
      });
    }

    // Validate and sanitize input
    const { errors, sanitized } = validateAndSanitizeInput(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Datos inválidos',
          details: errors,
        },
      });
    }

    // Send email
    await sendEmail(sanitized);

    // Success response
    res.status(200).json({
      success: true,
      message:
        'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.',
      timestamp: sanitized.timestamp,
    });
  } catch (error) {
    console.error('Contact form error:', error);

    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message:
          'Error interno del servidor. Por favor, intenta más tarde o contáctanos por WhatsApp.',
      },
    });
  }
}
