# 🚀 Guía de Lanzamiento - El Profesor G

## 📋 Pre-Lanzamiento

### 1. Verificación del Entorno Local

```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm run test
npm run test:e2e
npm run test:a11y

# Verificar linting
npm run lint

# Generar assets optimizados
npm run optimize-images
npm run generate-favicons

# Build de producción
npm run build

# Verificar preview
npm run preview
```

### 2. Configuración de Variables de Entorno

Crear archivo `.env` con las siguientes variables:

```bash
# API Configuration
VITE_API_URL=https://tu-dominio.com
VITE_CONTACT_FORM_ENDPOINT=/api/contact

# Email Configuration (para serverless functions)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password
CONTACT_EMAIL=contacto@profesorg.com

# Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# WhatsApp
VITE_WHATSAPP_NUMBER=51949236795

# Security
RATE_LIMIT_MAX_REQUESTS=5
RATE_LIMIT_WINDOW_MS=900000

# Environment
NODE_ENV=production
```

### 3. Verificación de Rendimiento

```bash
# Ejecutar check de rendimiento
npm run performance-check

# Verificar que todos los scores sean ≥ 90
```

## 🌐 Deployment en Vercel

### Opción 1: Deployment Automático (Recomendado)

1. **Conectar Repositorio**
   - Ir a [vercel.com](https://vercel.com)
   - Conectar cuenta de GitHub
   - Importar repositorio `tesis-profesorg`

2. **Configurar Variables de Entorno**
   - En el dashboard de Vercel → Settings → Environment Variables
   - Agregar todas las variables del archivo `.env`

3. **Deploy**
   - Vercel automáticamente detectará la configuración
   - El deploy se ejecutará automáticamente

### Opción 2: Deployment Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 3. Configuración de Dominio

1. **En Vercel Dashboard**
   - Ir a Settings → Domains
   - Agregar dominio personalizado: `profesorg.com`

2. **Configurar DNS**
   - Agregar registro CNAME: `www` → `cname.vercel-dns.com`
   - Agregar registro A: `@` → `76.76.19.61`

## 📊 Post-Lanzamiento

### 1. Verificación Inmediata

```bash
# Verificar que el sitio esté online
curl -I https://profesorg.com

# Verificar SSL
curl -I https://profesorg.com | grep -i "HTTP/2 200"

# Verificar redirects HTTP → HTTPS
curl -I http://profesorg.com
```

### 2. Tests de Funcionalidad

- [ ] **Navegación**: Todos los enlaces funcionan
- [ ] **Formulario**: Envío de mensajes funciona
- [ ] **WhatsApp**: Botones redirigen correctamente
- [ ] **Responsive**: Funciona en móvil, tablet, desktop
- [ ] **Performance**: Lighthouse scores ≥ 90

### 3. Configurar Monitoreo

#### Google Analytics

1. Verificar que el tracking ID esté configurado
2. Comprobar que los eventos se estén registrando
3. Configurar goals para conversiones

#### Search Console

1. Agregar propiedad en [Google Search Console](https://search.google.com/search-console)
2. Verificar propiedad con meta tag o DNS
3. Enviar sitemap: `https://profesorg.com/sitemap.xml`

#### Uptime Monitoring

1. Configurar monitoring en [UptimeRobot](https://uptimerobot.com) o similar
2. Configurar alertas por email/SMS

### 4. SEO Post-Lanzamiento

```bash
# Verificar indexación
site:profesorg.com

# Verificar sitemap
https://profesorg.com/sitemap.xml

# Verificar robots.txt
https://profesorg.com/robots.txt
```

## 🔧 Mantenimiento

### Actualizaciones Regulares

```bash
# Actualizar dependencias (mensual)
npm update

# Verificar vulnerabilidades
npm audit

# Ejecutar tests después de actualizaciones
npm run test
npm run test:e2e
```

### Monitoreo de Performance

```bash
# Ejecutar auditoría mensual
npm run lighthouse

# Verificar Core Web Vitals en Search Console
```

### Backup y Seguridad

1. **Código**: Respaldado automáticamente en GitHub
2. **Configuración**: Documentar cambios en variables de entorno
3. **Contenido**: Backup regular de imágenes y assets

## 🚨 Troubleshooting

### Problemas Comunes

**Build falla**

```bash
# Limpiar cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Formulario no envía**

- Verificar variables de entorno SMTP
- Revisar logs en Vercel Functions
- Verificar rate limiting

**Performance bajo**

```bash
# Re-optimizar imágenes
npm run optimize-images

# Verificar bundle size
npm run build -- --analyze
```

**SSL/DNS Issues**

- Verificar configuración DNS
- Esperar propagación (24-48 horas)
- Contactar soporte de Vercel si persiste

### Logs y Debugging

```bash
# Ver logs de Vercel
vercel logs

# Ver logs en tiempo real
vercel logs --follow
```

## 📞 Contactos de Emergencia

- **Desarrollador**: [tu-email]
- **Vercel Support**: support@vercel.com
- **DNS Provider**: [proveedor-dns]

## 📈 Métricas de Éxito

### KPIs a Monitorear

1. **Performance**
   - Lighthouse scores ≥ 90
   - Core Web Vitals en verde
   - Tiempo de carga < 3s

2. **Conversiones**
   - Envíos de formulario
   - Clicks en WhatsApp
   - Tiempo en página

3. **SEO**
   - Posiciones en Google
   - Tráfico orgánico
   - CTR en resultados

### Reportes Mensuales

- [ ] Performance report (Lighthouse)
- [ ] Analytics report (GA4)
- [ ] SEO report (Search Console)
- [ ] Uptime report

---

## ✅ Checklist Final de Lanzamiento

- [ ] Tests pasan (unit, e2e, a11y)
- [ ] Performance check ≥ 90
- [ ] Variables de entorno configuradas
- [ ] Dominio configurado y SSL activo
- [ ] Analytics configurado
- [ ] Search Console configurado
- [ ] Monitoreo de uptime configurado
- [ ] Backup y rollback plan documentado
- [ ] Equipo notificado del lanzamiento

**🎉 ¡Listo para lanzar!**
