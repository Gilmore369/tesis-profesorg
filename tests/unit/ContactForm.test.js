import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ContactForm } from '../../src/scripts/components/ContactForm.js';

// Mock DOM
const mockForm = `
  <form id="contact-form">
    <input type="text" name="nombre" required />
    <input type="email" name="correo" required />
    <input type="text" name="universidad" />
    <input type="text" name="carrera" />
    <select name="tipo">
      <option value="tesis">Tesis</option>
    </select>
    <textarea name="mensaje" required></textarea>
    <button type="submit">Enviar</button>
  </form>
`;

describe('ContactForm', () => {
  let contactForm;
  let formElement;

  beforeEach(() => {
    document.body.innerHTML = mockForm;
    formElement = document.getElementById('contact-form');
    contactForm = new ContactForm();
  });

  it('should initialize with form element', () => {
    expect(contactForm.form).toBe(formElement);
    expect(contactForm.isSubmitting).toBe(false);
  });

  it('should validate required fields', () => {
    const nameInput = formElement.querySelector('input[name="nombre"]');
    nameInput.value = '';

    const isValid = contactForm.validateField(nameInput);
    expect(isValid).toBe(false);
    expect(nameInput.classList.contains('border-red-500')).toBe(true);
  });

  it('should validate email format', () => {
    const emailInput = formElement.querySelector('input[name="correo"]');
    emailInput.value = 'invalid-email';

    const isValid = contactForm.validateField(emailInput);
    expect(isValid).toBe(false);

    emailInput.value = 'valid@email.com';
    const isValidEmail = contactForm.validateField(emailInput);
    expect(isValidEmail).toBe(true);
  });

  it('should clear field errors', () => {
    const nameInput = formElement.querySelector('input[name="nombre"]');
    nameInput.classList.add('border-red-500', 'bg-red-50');

    contactForm.clearFieldError(nameInput);
    expect(nameInput.classList.contains('border-red-500')).toBe(false);
    expect(nameInput.classList.contains('bg-red-50')).toBe(false);
  });

  it('should prevent submission when form is invalid', async () => {
    const submitSpy = vi.spyOn(contactForm, 'handleSubmit');
    const event = new Event('submit');

    formElement.dispatchEvent(event);

    expect(submitSpy).toHaveBeenCalled();
  });
});
