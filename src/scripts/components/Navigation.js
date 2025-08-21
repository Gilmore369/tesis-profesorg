export class Navigation {
  constructor() {
    this.nav = document.querySelector('nav');
    this.mobileToggle = null;
    this.mobileMenu = null;
    this.isOpen = false;

    if (this.nav) {
      this.init();
    }
  }

  init() {
    this.createMobileToggle();
    this.setupEventListeners();
    this.setupKeyboardNavigation();
    this.setupScrollBehavior();
  }

  createMobileToggle() {
    // Create mobile menu toggle button
    this.mobileToggle = document.createElement('button');
    this.mobileToggle.className =
      'md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-primary-600 focus:bg-primary-600 transition-colors';
    this.mobileToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.mobileToggle.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    `;

    // Add mobile toggle to navigation
    const logo = this.nav.querySelector('.logo');
    if (logo) {
      logo.parentNode.insertBefore(this.mobileToggle, logo.nextSibling);
    }

    // Make navigation menu mobile-responsive
    this.mobileMenu = this.nav.querySelector('ul');
    if (this.mobileMenu) {
      this.mobileMenu.className =
        'hidden md:flex md:items-center md:space-x-8 absolute md:relative top-full md:top-auto left-0 right-0 bg-primary md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none';
    }
  }

  setupEventListeners() {
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () =>
        this.toggleMobileMenu()
      );
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', e => {
      if (this.isOpen && !this.nav.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMobileMenu();
        this.mobileToggle.focus();
      }
    });

    // Close mobile menu when clicking on a link
    if (this.mobileMenu) {
      this.mobileMenu.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
          this.closeMobileMenu();
        }
      });
    }
  }

  setupKeyboardNavigation() {
    // Ensure all navigation links are keyboard accessible
    const navLinks = this.nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    });
  }

  setupScrollBehavior() {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      // Add shadow when scrolled
      if (currentScrollY > 10) {
        this.nav.classList.add('shadow-md');
      } else {
        this.nav.classList.remove('shadow-md');
      }
    });
  }

  toggleMobileMenu() {
    if (this.isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.isOpen = true;
    this.mobileMenu.classList.remove('hidden');
    this.mobileMenu.classList.add('flex', 'flex-col', 'space-y-4');
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    this.mobileToggle.setAttribute('aria-label', 'Cerrar menú de navegación');

    // Update toggle icon
    this.mobileToggle.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    `;

    // Focus first menu item
    const firstLink = this.mobileMenu.querySelector('a');
    if (firstLink) {
      firstLink.focus();
    }
  }

  closeMobileMenu() {
    this.isOpen = false;
    this.mobileMenu.classList.add('hidden');
    this.mobileMenu.classList.remove('flex', 'flex-col', 'space-y-4');
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.mobileToggle.setAttribute('aria-label', 'Abrir menú de navegación');

    // Update toggle icon
    this.mobileToggle.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    `;
  }

  // Public method to highlight active navigation item
  setActiveItem(href) {
    const navLinks = this.nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.classList.remove('text-secondary', 'font-bold');
      if (link.getAttribute('href') === href) {
        link.classList.add('text-secondary', 'font-bold');
      }
    });
  }
}
