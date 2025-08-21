export class ContactForm {
  constructor() {
    this.form = document.querySelector('#contact-form');
    this.submitButton = null;
    this.isSubmitting = false;

    if (this.form) {
      this.init();
    }
  }

  init() {
    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.setupValidation();
    this.setupSubmission();
    this.setupAccessibility();
  }

  setupValidation() {
    const inputs = this.form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      // Real-time validation
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    this.clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Este campo es obligatorio';
    }

    // Email validation
    if (fieldName === 'correo' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Por favor, ingresa un email válido';
      }
    }

    // Name validation
    if (fieldName === 'nombre' && value && value.length < 2) {
      isValid = false;
      errorMessage = 'El nombre debe tener al menos 2 caracteres';
    }

    // Message validation
    if (fieldName === 'mensaje' && value && value.length < 10) {
      isValid = false;
      errorMessage = 'El mensaje debe tener al menos 10 caracteres';
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('border-red-500', 'bg-red-50');
    field.setAttribute('aria-invalid', 'true');

    // Create or update error message
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message text-red-600 text-sm mt-1';
      errorElement.setAttribute('role', 'alert');
      field.parentNode.appendChild(errorElement);
    }

    errorElement.textContent = message;
    field.setAttribute(
      'aria-describedby',
      errorElement.id || 'error-' + field.name
    );
  }

  clearFieldError(field) {
    field.classList.remove('border-red-500', 'bg-red-50');
    field.removeAttribute('aria-invalid');

    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  setupSubmission() {
    this.form.addEventListener('submit', async e => {
      e.preventDefault();

      if (this.isSubmitting) return;

      await this.handleSubmit();
    });
  }

  async handleSubmit() {
    // Validate all fields
    const inputs = this.form.querySelectorAll('input, select, textarea');
    let isFormValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      this.showFormError('Por favor, corrige los errores antes de enviar');
      return;
    }

    // Show loading state
    this.setLoadingState(true);

    try {
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());

      // Add timestamp and source tracking
      data.timestamp = new Date().toISOString();
      data.source = 'website_contact_form';

      // Submit to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        this.showSuccessMessage();
        this.form.reset();

        // Track successful submission
        this.trackFormSubmission('success');
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showFormError(
        'Hubo un error al enviar el formulario. Por favor, intenta nuevamente o contáctanos por WhatsApp.'
      );
      this.trackFormSubmission('error');
    } finally {
      this.setLoadingState(false);
    }
  }

  setLoadingState(isLoading) {
    this.isSubmitting = isLoading;

    if (this.submitButton) {
      this.submitButton.disabled = isLoading;
      this.submitButton.innerHTML = isLoading
        ? `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
             <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
             <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
           Enviando...`
        : 'Enviar mensaje';
    }
  }

  showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className =
      'bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4';
    successDiv.setAttribute('role', 'alert');
    successDiv.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <span>¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.</span>
      </div>
    `;

    this.form.parentNode.insertBefore(successDiv, this.form);

    // Remove success message after 5 seconds
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }

  showFormError(message) {
    // Remove existing error messages
    const existingError = this.form.parentNode.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className =
      'form-error bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4';
    errorDiv.setAttribute('role', 'alert');
    errorDiv.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;

    this.form.parentNode.insertBefore(errorDiv, this.form);
  }

  setupAccessibility() {
    // Add proper labels and ARIA attributes
    const inputs = this.form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      // Ensure each input has a label
      const label = this.form.querySelector(`label[for="${input.id}"]`);
      if (!label && input.placeholder) {
        input.setAttribute('aria-label', input.placeholder);
      }

      // Add required indicator for screen readers
      if (input.hasAttribute('required')) {
        input.setAttribute('aria-required', 'true');
      }
    });
  }

  trackFormSubmission(status) {
    // Track form submission for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        event_category: 'contact',
        event_label: status,
        value: status === 'success' ? 1 : 0,
      });
    }
  }
}
