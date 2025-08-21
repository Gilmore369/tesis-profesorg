export class CookieBanner {
  constructor() {
    this.banner = document.getElementById('cookie-banner');
    this.acceptButton = document.getElementById('accept-cookies');
    this.storageKey = 'cookiesAccepted';

    if (this.banner) {
      this.init();
    }
  }

  init() {
    // Check if cookies were already accepted
    if (this.getCookieConsent()) {
      this.hideBanner();
    } else {
      this.showBanner();
    }

    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.acceptButton) {
      this.acceptButton.addEventListener('click', () => {
        this.acceptCookies();
      });
    }

    // Handle keyboard navigation
    if (this.banner) {
      this.banner.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          this.acceptCookies(); // Accept on escape for better UX
        }
      });
    }
  }

  showBanner() {
    if (this.banner) {
      this.banner.style.display = 'flex';
      this.banner.classList.add('animate-slide-up');

      // Focus the accept button for accessibility
      setTimeout(() => {
        if (this.acceptButton) {
          this.acceptButton.focus();
        }
      }, 100);
    }
  }

  hideBanner() {
    if (this.banner) {
      this.banner.style.display = 'none';
    }
  }

  acceptCookies() {
    // Store consent
    this.setCookieConsent(true);

    // Hide banner with animation
    if (this.banner) {
      this.banner.classList.add('animate-fade-out');
      setTimeout(() => {
        this.hideBanner();
      }, 300);
    }

    // Initialize analytics or other cookie-dependent services
    this.initializeCookieServices();

    // Dispatch consent event for other components
    window.dispatchEvent(new CustomEvent('cookieConsentGranted'));
  }

  getCookieConsent() {
    try {
      return localStorage.getItem(this.storageKey) === 'true';
    } catch (error) {
      console.warn('LocalStorage not available:', error);
      return false;
    }
  }

  setCookieConsent(accepted) {
    try {
      localStorage.setItem(this.storageKey, accepted.toString());
    } catch (error) {
      console.warn('Could not save cookie consent:', error);
    }
  }

  initializeCookieServices() {
    // Initialize Google Analytics or other services that require consent
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }

    // Track cookie acceptance
    this.trackCookieAcceptance();
  }

  trackCookieAcceptance() {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'cookie_consent', {
        event_category: 'engagement',
        event_label: 'accepted',
      });
    }
  }

  // Public method to revoke consent (for privacy policy page)
  revokeCookies() {
    this.setCookieConsent(false);
    this.showBanner();

    // Disable analytics
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }
  }
}
