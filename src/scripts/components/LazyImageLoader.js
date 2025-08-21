export class LazyImageLoader {
  constructor() {
    this.observer = null;
    this.images = [];
    this.init();
  }

  init() {
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      this.loadAllImages();
      return;
    }

    this.setupObserver();
    this.observeImages();
  }

  setupObserver() {
    const options = {
      root: null,
      rootMargin: '50px 0px',
      threshold: 0.01,
    };

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, options);
  }

  observeImages() {
    // Find all images with data-src attribute
    this.images = document.querySelectorAll('img[data-src]');

    this.images.forEach(img => {
      // Add loading placeholder
      this.addPlaceholder(img);
      this.observer.observe(img);
    });
  }

  addPlaceholder(img) {
    // Create a low-quality placeholder or loading animation
    const placeholder = this.createPlaceholder(
      img.dataset.width,
      img.dataset.height
    );
    img.src = placeholder;
    img.classList.add('lazy-loading');
  }

  createPlaceholder(width = 400, height = 300) {
    // Create a simple SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">
          Cargando...
        </text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  loadImage(img) {
    return new Promise((resolve, reject) => {
      const imageLoader = new Image();

      imageLoader.onload = () => {
        // Check if WebP is supported and we have a WebP version
        if (this.supportsWebP() && img.dataset.srcWebp) {
          img.src = img.dataset.srcWebp;
        } else {
          img.src = img.dataset.src;
        }

        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');

        // Add fade-in animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';

        setTimeout(() => {
          img.style.opacity = '1';
        }, 10);

        resolve();
      };

      imageLoader.onerror = () => {
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-error');
        reject(new Error(`Failed to load image: ${img.dataset.src}`));
      };

      // Start loading the image
      if (this.supportsWebP() && img.dataset.srcWebp) {
        imageLoader.src = img.dataset.srcWebp;
      } else {
        imageLoader.src = img.dataset.src;
      }
    });
  }

  supportsWebP() {
    // Check if browser supports WebP
    if (this._webpSupport !== undefined) {
      return this._webpSupport;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    this._webpSupport =
      canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    return this._webpSupport;
  }

  loadAllImages() {
    // Fallback for browsers without IntersectionObserver
    this.images = document.querySelectorAll('img[data-src]');

    this.images.forEach(img => {
      this.loadImage(img);
    });
  }

  // Public method to manually load specific images
  loadImageById(imageId) {
    const img = document.getElementById(imageId);
    if (img && img.dataset.src) {
      this.loadImage(img);
    }
  }

  // Clean up observer
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
