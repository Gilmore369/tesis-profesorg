export class Analytics {
  constructor() {
    this.isEnabled = false;
    this.trackingId = import.meta.env.VITE_GA_TRACKING_ID;
    this.debugMode = import.meta.env.DEV;

    this.init();
  }

  init() {
    // Only initialize if user has consented to cookies
    if (this.hasConsent()) {
      this.loadGoogleAnalytics();
    }

    // Listen for consent changes
    window.addEventListener('cookieConsentGranted', () => {
      this.loadGoogleAnalytics();
    });
  }

  hasConsent() {
    try {
      return localStorage.getItem('cookiesAccepted') === 'true';
    } catch {
      return false;
    }
  }

  loadGoogleAnalytics() {
    if (!this.trackingId || this.isEnabled) return;

    try {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingId}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };

      window.gtag('js', new Date());
      window.gtag('config', this.trackingId, {
        page_title: document.title,
        page_location: window.location.href,
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });

      this.isEnabled = true;

      if (this.debugMode) {
        console.log('✅ Google Analytics initialized');
      }
    } catch (error) {
      console.error('❌ Error loading Google Analytics:', error);
    }
  }

  // Track page views
  trackPageView(path, title) {
    if (!this.isEnabled) return;

    try {
      window.gtag('config', this.trackingId, {
        page_path: path,
        page_title: title,
      });

      if (this.debugMode) {
        console.log('📊 Page view tracked:', { path, title });
      }
    } catch (error) {
      console.error('❌ Error tracking page view:', error);
    }
  }

  // Track events
  trackEvent(eventName, parameters = {}) {
    if (!this.isEnabled) return;

    try {
      window.gtag('event', eventName, {
        event_category: parameters.category || 'engagement',
        event_label: parameters.label,
        value: parameters.value,
        custom_parameter: parameters.custom,
        ...parameters,
      });

      if (this.debugMode) {
        console.log('📊 Event tracked:', eventName, parameters);
      }
    } catch (error) {
      console.error('❌ Error tracking event:', error);
    }
  }

  // Track form submissions
  trackFormSubmission(formName, success = true) {
    this.trackEvent('form_submit', {
      category: 'form',
      label: formName,
      value: success ? 1 : 0,
      success: success,
    });
  }

  // Track CTA clicks
  trackCTAClick(ctaName, location) {
    this.trackEvent('cta_click', {
      category: 'cta',
      label: ctaName,
      location: location,
    });
  }

  // Track WhatsApp clicks
  trackWhatsAppClick(location) {
    this.trackEvent('whatsapp_click', {
      category: 'contact',
      label: 'whatsapp',
      location: location,
    });
  }

  // Track service interest
  trackServiceInterest(serviceName) {
    this.trackEvent('service_interest', {
      category: 'services',
      label: serviceName,
    });
  }

  // Track scroll depth
  trackScrollDepth(percentage) {
    // Only track at 25%, 50%, 75%, 100%
    const milestones = [25, 50, 75, 100];
    if (milestones.includes(percentage)) {
      this.trackEvent('scroll_depth', {
        category: 'engagement',
        label: `${percentage}%`,
        value: percentage,
      });
    }
  }

  // Track time on page
  trackTimeOnPage() {
    const startTime = Date.now();

    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);

      // Only track if user spent more than 10 seconds
      if (timeSpent > 10) {
        this.trackEvent('time_on_page', {
          category: 'engagement',
          value: timeSpent,
          label: this.getTimeCategory(timeSpent),
        });
      }
    });
  }

  getTimeCategory(seconds) {
    if (seconds < 30) return '0-30s';
    if (seconds < 60) return '30-60s';
    if (seconds < 180) return '1-3min';
    if (seconds < 300) return '3-5min';
    return '5min+';
  }

  // Track Core Web Vitals
  trackWebVitals() {
    if (!this.isEnabled) return;

    try {
      // Track LCP (Largest Contentful Paint)
      new PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];

        this.trackEvent('web_vitals', {
          category: 'performance',
          label: 'LCP',
          value: Math.round(lastEntry.startTime),
        });
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Track FID (First Input Delay)
      new PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          this.trackEvent('web_vitals', {
            category: 'performance',
            label: 'FID',
            value: Math.round(entry.processingStart - entry.startTime),
          });
        });
      }).observe({ entryTypes: ['first-input'] });

      // Track CLS (Cumulative Layout Shift)
      let clsValue = 0;
      new PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        // Send CLS when page is about to unload
        window.addEventListener('beforeunload', () => {
          this.trackEvent('web_vitals', {
            category: 'performance',
            label: 'CLS',
            value: Math.round(clsValue * 1000) / 1000,
          });
        });
      }).observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.error('❌ Error setting up Web Vitals tracking:', error);
    }
  }

  // Setup automatic tracking
  setupAutoTracking() {
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        this.trackScrollDepth(scrollPercent);
      }
    });

    // Track time on page
    this.trackTimeOnPage();

    // Track Web Vitals
    this.trackWebVitals();

    // Track CTA clicks
    document.addEventListener('click', e => {
      const target = e.target.closest('a, button');
      if (!target) return;

      // WhatsApp links
      if (target.href && target.href.includes('wa.me')) {
        const location = target.closest('section')?.id || 'unknown';
        this.trackWhatsAppClick(location);
      }

      // Service contact buttons
      if (target.textContent?.toLowerCase().includes('contactar')) {
        const serviceCard = target.closest('.service-card');
        const serviceName =
          serviceCard?.querySelector('h3')?.textContent || 'unknown';
        this.trackServiceInterest(serviceName);
      }

      // General CTA buttons
      if (
        target.classList.contains('btn') ||
        target.classList.contains('cta-button')
      ) {
        const ctaText = target.textContent?.trim() || 'unknown';
        const location = target.closest('section')?.id || 'unknown';
        this.trackCTAClick(ctaText, location);
      }
    });
  }

  // Disable tracking (for privacy compliance)
  disable() {
    this.isEnabled = false;

    // Disable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }

    if (this.debugMode) {
      console.log('📊 Analytics disabled');
    }
  }
}
