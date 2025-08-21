export class AnimationController {
  constructor() {
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    this.observers = new Map();

    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupHoverAnimations();
  }

  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      return; // Fallback for older browsers
    }

    // Animate elements when they come into view
    const animateOnScrollObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
            animateOnScrollObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe elements that should animate on scroll
    const animatableElements = document.querySelectorAll(
      '.service-card, .testimonial-card, .precio-card, .visual-item, .mission-vision > div'
    );

    animatableElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transitionDelay = `${index * 100}ms`;
      animateOnScrollObserver.observe(element);
    });

    this.observers.set('scroll', animateOnScrollObserver);
  }

  animateElement(element) {
    if (this.prefersReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }

  setupScrollAnimations() {
    // Parallax effect for hero section (if not reduced motion)
    if (!this.prefersReducedMotion) {
      const heroImage = document.querySelector('.hero .image img');
      if (heroImage) {
        window.addEventListener('scroll', () => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * -0.5;
          heroImage.style.transform = `translateY(${rate}px)`;
        });
      }
    }

    // Navigation background opacity on scroll
    const nav = document.querySelector('nav');
    if (nav) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled > 50) {
          nav.classList.add('bg-opacity-95', 'backdrop-blur-sm');
        } else {
          nav.classList.remove('bg-opacity-95', 'backdrop-blur-sm');
        }
      });
    }
  }

  setupHoverAnimations() {
    if (this.prefersReducedMotion) {
      return; // Skip hover animations if user prefers reduced motion
    }

    // Enhanced hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
      });
    });

    // Button hover animations
    const buttons = document.querySelectorAll('.btn, .cta-button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
      });
    });

    // Testimonial card hover effects
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      });
    });
  }

  // Public method to animate specific elements
  animateElementById(elementId, animationType = 'fadeIn') {
    const element = document.getElementById(elementId);
    if (!element || this.prefersReducedMotion) return;

    switch (animationType) {
      case 'fadeIn':
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s ease-in-out';
        setTimeout(() => {
          element.style.opacity = '1';
        }, 10);
        break;

      case 'slideUp':
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
        element.style.transition =
          'transform 0.5s ease-out, opacity 0.5s ease-out';
        setTimeout(() => {
          element.style.transform = 'translateY(0)';
          element.style.opacity = '1';
        }, 10);
        break;

      case 'scaleIn':
        element.style.transform = 'scale(0.9)';
        element.style.opacity = '0';
        element.style.transition =
          'transform 0.3s ease-out, opacity 0.3s ease-out';
        setTimeout(() => {
          element.style.transform = 'scale(1)';
          element.style.opacity = '1';
        }, 10);
        break;
    }
  }

  // Clean up observers when needed
  destroy() {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();
  }
}
