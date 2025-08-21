// Main application entry point
import '../styles/globals.css';
import { Navigation } from './components/Navigation.js';
import { ContactForm } from './components/ContactForm.js';
import { CookieBanner } from './components/CookieBanner.js';
import { LazyImageLoader } from './components/LazyImageLoader.js';
import { AnimationController } from './utils/AnimationController.js';
import { Analytics } from './utils/Analytics.js';

class App {
  constructor() {
    this.components = new Map();
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () =>
        this.initializeComponents()
      );
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize core components
      this.components.set('navigation', new Navigation());
      this.components.set('contactForm', new ContactForm());
      this.components.set('cookieBanner', new CookieBanner());
      this.components.set('lazyLoader', new LazyImageLoader());
      this.components.set('animations', new AnimationController());
      this.components.set('analytics', new Analytics());

      // Initialize smooth scrolling for anchor links
      this.initSmoothScrolling();

      // Setup analytics auto-tracking
      const analytics = this.components.get('analytics');
      if (analytics) {
        analytics.setupAutoTracking();
      }

      console.log('✅ App initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing app:', error);
    }
  }

  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  getComponent(name) {
    return this.components.get(name);
  }
}

// Initialize the application
const app = new App();

// Make app globally available for debugging
window.app = app;

export default app;
