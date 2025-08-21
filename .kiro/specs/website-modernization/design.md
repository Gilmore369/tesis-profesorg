# Design Document

## Overview

The Profesor G website modernization design focuses on transforming the existing website into a modern, performant, and accessible platform while preserving the brand identity and content structure. The design leverages the existing color palette and content organization but introduces modern development practices, improved user experience patterns, and enhanced technical architecture.

The current website already has a solid foundation with a well-defined color scheme (institutional blue #1B2A4E and gold #C9A13B), good content structure, and clear service offerings. The modernization will enhance these strengths while addressing performance, accessibility, and maintainability concerns.

## Architecture

### Technology Stack Decision

**Recommended Approach: Enhanced HTML + TailwindCSS + Modular JavaScript**

Based on the current codebase analysis, the website has a solid HTML structure and well-organized content. Rather than a complete rewrite, we'll enhance the existing foundation:

- **HTML**: Maintain semantic structure, enhance with proper ARIA attributes and accessibility landmarks
- **CSS Framework**: Migrate from custom CSS to TailwindCSS for consistency and maintainability
- **JavaScript**: Refactor existing vanilla JS into modular components
- **Build System**: Implement Vite for development and build optimization
- **Deployment**: Configure for Vercel with automatic deployments

**Alternative Consideration: Next.js**
While Next.js would provide additional benefits (SSR, automatic optimization), the current website's structure and requirements are well-suited for a static approach. Next.js could be considered for future phases if dynamic content or server-side functionality becomes necessary.

### Project Structure

```
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Navigation.js
│   │   ├── Hero.js
│   │   ├── ServiceCard.js
│   │   ├── TestimonialCard.js
│   │   └── ContactForm.js
│   ├── styles/
│   │   ├── globals.css       # Global styles and Tailwind imports
│   │   ├── components.css    # Component-specific styles
│   │   └── utilities.css     # Custom utility classes
│   ├── scripts/
│   │   ├── main.js          # Main application logic
│   │   ├── navigation.js    # Navigation functionality
│   │   ├── forms.js         # Form handling and validation
│   │   └── animations.js    # Animation and interaction logic
│   └── assets/
│       ├── images/          # Optimized images
│       └── icons/           # SVG icons
├── public/
│   ├── index.html
│   ├── sitemap.xml
│   ├── robots.txt
│   └── favicon/             # Complete favicon set
├── tests/
│   ├── e2e/                 # Playwright tests
│   └── unit/                # Vitest unit tests
├── .github/
│   └── workflows/           # CI/CD workflows
└── docs/
    └── deployment.md        # Deployment guide
```

## Components and Interfaces

### Design System

**Color Palette (Preserved from current design)**

```css
:root {
  --primary: #1b2a4e; /* Institutional blue */
  --secondary: #c9a13b; /* Gold accent */
  --light: #ffffff; /* White */
  --background: #f7f8fc; /* Light background */
  --text-dark: #1b2a4e; /* Primary text */
  --text-muted: #6b7280; /* Secondary text */
  --success: #10b981; /* Success states */
  --warning: #f59e0b; /* Warning states */
  --error: #ef4444; /* Error states */
}
```

**Typography System**

- **Primary Font**: Inter (replacing Aptos for better web performance and accessibility)
- **Fallback**: system-ui, -apple-system, sans-serif
- **Scale**:
  - xs: 0.75rem (12px)
  - sm: 0.875rem (14px)
  - base: 1rem (16px)
  - lg: 1.125rem (18px)
  - xl: 1.25rem (20px)
  - 2xl: 1.5rem (24px)
  - 3xl: 1.875rem (30px)
  - 4xl: 2.25rem (36px)

**Spacing System**

- Based on 0.25rem (4px) increments
- Standard spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px

### Core Components

#### 1. Navigation Component

```javascript
// Enhanced navigation with accessibility and mobile responsiveness
class Navigation {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    this.setupMobileToggle();
    this.setupKeyboardNavigation();
    this.setupActiveStates();
  }
}
```

**Features:**

- Sticky positioning with scroll-based styling
- Mobile hamburger menu with smooth animations
- Keyboard navigation support (Tab, Enter, Escape)
- Active page highlighting
- Smooth scroll to anchor links

#### 2. Hero Section Component

```javascript
class HeroSection {
  constructor() {
    this.init();
  }

  init() {
    this.setupAnimations();
    this.setupCTATracking();
  }
}
```

**Features:**

- Responsive two-column layout (content + image)
- Animated text reveal on load
- Optimized hero image with multiple formats
- Clear call-to-action with conversion tracking

#### 3. Service Cards Component

```javascript
class ServiceCard {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.setupHoverEffects();
    this.setupAccessibility();
  }
}
```

**Features:**

- Consistent card design with hover animations
- Icon integration (Lucide icons for consistency)
- Accessible button states
- Responsive grid layout

#### 4. Contact Form Component

```javascript
class ContactForm {
  constructor() {
    this.form = document.querySelector('#contact-form');
    this.init();
  }

  init() {
    this.setupValidation();
    this.setupSubmission();
    this.setupAccessibility();
  }
}
```

**Features:**

- Real-time validation with clear error messages
- Accessible form labels and error announcements
- Rate limiting and spam protection
- Integration with serverless API endpoint

### Responsive Design Strategy

**Breakpoints:**

- Mobile: 360px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+

**Mobile-First Approach:**

1. Design for mobile experience first
2. Progressive enhancement for larger screens
3. Touch-friendly interactive elements (minimum 44px)
4. Optimized images for different screen densities

## Data Models

### Form Data Structure

```javascript
// Contact form data model
const ContactFormData = {
  nombre: String, // Required, min 2 chars
  correo: String, // Required, valid email
  universidad: String, // Optional
  carrera: String, // Optional
  tipo: String, // Enum: tesis, informe, articulo, otro
  mensaje: String, // Required, min 10 chars
  timestamp: Date, // Auto-generated
  source: String, // Tracking parameter
};
```

### Analytics Data Structure

```javascript
// User interaction tracking
const AnalyticsEvent = {
  event: String, // Event name
  category: String, // Event category
  label: String, // Event label
  value: Number, // Event value
  timestamp: Date, // Event timestamp
  sessionId: String, // Session identifier
  userId: String, // Anonymous user identifier
};
```

## Error Handling

### Client-Side Error Handling

**Form Validation Errors:**

- Real-time validation with immediate feedback
- Accessible error announcements for screen readers
- Clear, actionable error messages in Spanish
- Visual error indicators with proper color contrast

**Network Errors:**

- Graceful handling of offline states
- Retry mechanisms for failed requests
- User-friendly error messages
- Fallback contact methods (WhatsApp link)

**JavaScript Errors:**

- Global error boundary to catch unhandled errors
- Error logging to monitoring service
- Graceful degradation for non-critical features

### Server-Side Error Handling

**API Endpoint Error Responses:**

```javascript
// Standardized error response format
{
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Mensaje de error en español',
    details: {
      field: 'correo',
      issue: 'Formato de email inválido'
    }
  },
  timestamp: '2025-01-21T10:30:00Z'
}
```

**Rate Limiting:**

- Implement rate limiting on form submissions
- Clear messaging when limits are exceeded
- Progressive delays for repeated attempts

## Testing Strategy

### Unit Testing

**Framework:** Vitest
**Coverage Target:** 80%+ for critical components

**Test Categories:**

- Component initialization and rendering
- Form validation logic
- Utility functions
- Error handling scenarios

### Integration Testing

**Framework:** Playwright
**Test Scenarios:**

- Complete user journeys (homepage → service → contact)
- Form submission workflows
- Navigation functionality
- Responsive behavior across devices

### Accessibility Testing

**Tools:** axe-core, WAVE, manual testing
**Test Areas:**

- Keyboard navigation completeness
- Screen reader compatibility
- Color contrast compliance
- Focus management

### Performance Testing

**Tools:** Lighthouse CI, WebPageTest
**Metrics:**

- Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Lighthouse scores ≥ 90 across all categories
- Bundle size optimization
- Image optimization effectiveness

### Cross-Browser Testing

**Target Browsers:**

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization Strategy

### Image Optimization

- Convert all images to WebP/AVIF formats with JPEG fallbacks
- Implement responsive images with srcset and sizes attributes
- Lazy loading for below-the-fold images
- Optimize image dimensions for actual display sizes

### Code Optimization

- Tree-shaking to eliminate unused code
- Code splitting for non-critical JavaScript
- CSS purging to remove unused styles
- Minification and compression for production builds

### Loading Strategy

- Critical CSS inlining for above-the-fold content
- Preload key resources (fonts, hero images)
- Preconnect to external domains (Google Fonts, analytics)
- Service worker for caching static assets

### Bundle Optimization

- Separate vendor and application bundles
- Dynamic imports for non-critical features
- Optimize third-party dependencies
- Implement proper caching headers

## Security Considerations

### Input Sanitization

- Server-side validation for all form inputs
- XSS prevention through proper encoding
- SQL injection prevention (if database is used)
- File upload restrictions and validation

### Content Security Policy

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://app-sorteos.com https://assets.calendly.com;
  style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.profesorg.com;
  font-src 'self' https://fonts.gstatic.com;
```

### Environment Variables

- Secure API keys and sensitive configuration
- Separate development and production environments
- No sensitive data in client-side code
- Proper .env file management

## Accessibility Implementation

### WCAG 2.1 AA Compliance

- Semantic HTML structure with proper landmarks
- Sufficient color contrast ratios (4.5:1 for normal text)
- Keyboard navigation for all interactive elements
- Screen reader compatibility with proper ARIA labels

### Focus Management

- Visible focus indicators for all interactive elements
- Logical tab order throughout the page
- Skip links for main content navigation
- Focus trapping in modal dialogs

### Content Accessibility

- Alternative text for all meaningful images
- Proper heading hierarchy (H1 → H2 → H3)
- Descriptive link text and button labels
- Form labels and error associations

## SEO Implementation

### Technical SEO

- Semantic HTML structure with proper schema markup
- Optimized meta titles and descriptions
- Open Graph and Twitter Card tags
- XML sitemap and robots.txt
- Canonical URLs and proper redirects

### Content Optimization

- Proper heading hierarchy for content structure
- Optimized images with descriptive alt text
- Internal linking strategy
- Page loading speed optimization

### Local SEO

- Structured data for business information
- Local business schema markup
- Contact information optimization
- Service area targeting

## Animation and Interaction Design

### Animation Principles

- Respect prefers-reduced-motion user preference
- Smooth transitions with appropriate easing curves
- Consistent animation durations (150-250ms for micro-interactions)
- Performance-optimized animations using CSS transforms

### Micro-interactions

- Button hover and focus states
- Form field focus and validation feedback
- Card hover effects with subtle elevation
- Loading states and progress indicators

### Page Transitions

- Smooth scroll behavior for anchor links
- Fade-in animations for content sections
- Staggered animations for card grids
- Progressive image loading with placeholders

This design document provides a comprehensive foundation for the modernization project while preserving the existing brand identity and content structure of the Profesor G website. The approach balances modern development practices with practical implementation considerations.
