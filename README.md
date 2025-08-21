# El Profesor G - Website Modernization

[![CI/CD Pipeline](https://github.com/profesorg/website/actions/workflows/ci.yml/badge.svg)](https://github.com/profesorg/website/actions/workflows/ci.yml)
[![Lighthouse Score](https://img.shields.io/badge/lighthouse-90%2B-brightgreen)](https://github.com/profesorg/website)

Sitio web moderno, rápido y accesible para El Profesor G - Servicios de asesoría de tesis y trabajos académicos en Perú.

## 🚀 Características

- **Rendimiento Optimizado**: Lighthouse scores ≥ 90 en todas las categorías
- **Totalmente Responsive**: Diseño mobile-first que funciona en todos los dispositivos
- **Accesible**: Cumple con estándares WCAG 2.1 AA
- **SEO Optimizado**: Meta tags, structured data, sitemap y robots.txt
- **Moderno**: Construido con Vite, TailwindCSS y JavaScript modular
- **Seguro**: CSP headers, input sanitization y rate limiting
- **Probado**: Tests unitarios y e2e con Vitest y Playwright

## 🛠️ Stack Tecnológico

- **Build Tool**: Vite
- **CSS Framework**: TailwindCSS
- **JavaScript**: ES6+ Modules
- **Testing**: Vitest (unit) + Playwright (e2e)
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel
- **Quality**: ESLint + Prettier
- **Performance**: Lighthouse CI

## 📁 Estructura del Proyecto

```
├── src/
│   ├── scripts/
│   │   ├── components/          # Componentes JavaScript modulares
│   │   │   ├── Navigation.js
│   │   │   ├── ContactForm.js
│   │   │   └── CookieBanner.js
│   │   └── utils/               # Utilidades
│   │       └── AnimationController.js
│   └── styles/
│       └── globals.css          # Estilos globales con TailwindCSS
├── public/                      # Archivos estáticos
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── tests/
│   ├── unit/                    # Tests unitarios
│   └── e2e/                     # Tests end-to-end
├── .github/workflows/           # CI/CD workflows
└── docs/                        # Documentación adicional
```

## 🚦 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/profesorg/website.git
   cd website
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   ```bash
   cp .env.example .env
   # Editar .env con tus valores
   ```

4. **Iniciar servidor de desarrollo**

   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📜 Scripts Disponibles

### Desarrollo

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
```

### Testing

```bash
npm run test         # Tests unitarios
npm run test:coverage # Tests con coverage
npm run test:e2e     # Tests end-to-end
```

### Calidad de Código

```bash
npm run lint         # Linting con ESLint
npm run format       # Formateo con Prettier
npm run lighthouse   # Auditoría de rendimiento
```

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
:root {
  --primary: #1b2a4e; /* Azul institucional */
  --secondary: #c9a13b; /* Dorado */
  --background: #f7f8fc; /* Fondo claro */
  --text-dark: #1b2a4e; /* Texto principal */
  --text-muted: #6b7280; /* Texto secundario */
}
```

### Tipografía

- **Fuente Principal**: Inter (Google Fonts)
- **Fallback**: system-ui, -apple-system, sans-serif
- **Escalas**: xs (12px) → 4xl (36px)

### Espaciado

Sistema basado en incrementos de 4px:

- `space-1` = 4px
- `space-2` = 8px
- `space-4` = 16px
- `space-8` = 32px

### Breakpoints

```css
sm: 640px    /* Móvil grande */
md: 768px    /* Tablet */
lg: 1024px   /* Desktop */
xl: 1280px   /* Desktop grande */
```

## 🧪 Testing

### Tests Unitarios

```bash
# Ejecutar todos los tests
npm run test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test -- --watch
```

### Tests E2E

```bash
# Ejecutar tests e2e
npm run test:e2e

# Tests e2e en modo headed
npm run test:e2e -- --headed

# Tests e2e en navegador específico
npm run test:e2e -- --project=chromium
```

### Coverage Objetivo

- **Líneas**: ≥ 80%
- **Funciones**: ≥ 80%
- **Branches**: ≥ 75%

## 🚀 Deployment

### Vercel (Recomendado)

1. **Conectar repositorio a Vercel**
2. **Configurar variables de entorno**
3. **Deploy automático en push a main**

### Manual

```bash
# Build para producción
npm run build

# Los archivos están en /dist
# Subir contenido de /dist a tu servidor
```

### Variables de Entorno Requeridas

```bash
# Producción
VITE_API_URL=https://api.profesorg.com
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
SMTP_HOST=smtp.gmail.com
SMTP_USER=contacto@profesorg.com
SMTP_PASS=your-app-password
```

## 📊 Métricas de Rendimiento

### Objetivos Lighthouse

- **Performance**: ≥ 90
- **Accessibility**: ≥ 90
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

### Core Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Optimizaciones Implementadas

- ✅ Imágenes optimizadas (WebP + lazy loading)
- ✅ Code splitting y tree shaking
- ✅ CSS crítico inline
- ✅ Preconnect a dominios externos
- ✅ Service Worker para caching
- ✅ Compresión gzip/brotli

## ♿ Accesibilidad

### Características Implementadas

- ✅ Navegación por teclado completa
- ✅ Skip links para contenido principal
- ✅ ARIA labels y roles apropiados
- ✅ Contraste de color AA/AAA
- ✅ Texto alternativo en imágenes
- ✅ Jerarquía de headings correcta
- ✅ Focus management en modales
- ✅ Soporte para lectores de pantalla

### Testing de Accesibilidad

```bash
# Tests automatizados con axe-core
npm run test:a11y

# Lighthouse accessibility audit
npm run lighthouse
```

## 🔒 Seguridad

### Medidas Implementadas

- ✅ Content Security Policy (CSP)
- ✅ Input sanitization
- ✅ Rate limiting en formularios
- ✅ HTTPS enforcement
- ✅ Secure headers
- ✅ Environment variables para secrets

### Configuración CSP

```javascript
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://trusted-domains.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https:;
```

## 🤝 Contribución

### Workflow de Desarrollo

1. **Fork del repositorio**
2. **Crear rama feature**: `git checkout -b feature/nueva-funcionalidad`
3. **Commit cambios**: `git commit -m 'feat: agregar nueva funcionalidad'`
4. **Push a la rama**: `git push origin feature/nueva-funcionalidad`
5. **Crear Pull Request**

### Convenciones de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato
refactor: refactoring de código
test: agregar o modificar tests
chore: tareas de mantenimiento
```

### Code Review Checklist

- [ ] Tests pasan
- [ ] Lighthouse score ≥ 90
- [ ] Accesibilidad verificada
- [ ] Responsive design
- [ ] Performance optimizado
- [ ] Documentación actualizada

## 📈 Monitoreo y Analytics

### Métricas Tracked

- **Performance**: Core Web Vitals
- **User Engagement**: Form submissions, CTA clicks
- **Errors**: JavaScript errors, failed requests
- **Accessibility**: Screen reader usage

### Herramientas

- **Google Analytics 4**: User behavior
- **Lighthouse CI**: Performance monitoring
- **Sentry**: Error tracking
- **Vercel Analytics**: Core Web Vitals

## 🆘 Troubleshooting

### Problemas Comunes

**Build falla**

```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

**Tests fallan**

```bash
# Actualizar snapshots
npm run test -- --update-snapshots

# Ejecutar tests específicos
npm run test ContactForm.test.js
```

**Lighthouse score bajo**

```bash
# Analizar bundle
npm run build -- --analyze

# Verificar imágenes optimizadas
npm run optimize-images
```

## 📞 Soporte

### Contacto

- **Email**: dev@profesorg.com
- **Issues**: [GitHub Issues](https://github.com/profesorg/website/issues)
- **Documentación**: [Wiki](https://github.com/profesorg/website/wiki)

### Recursos Útiles

- [Guía de Contribución](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [Roadmap](ROADMAP.md)
- [API Documentation](docs/api.md)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

**Desarrollado con ❤️ para El Profesor G**

_Ayudando a estudiantes a alcanzar sus metas académicas desde 2020_
