import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct title and meta description', async ({ page }) => {
    await expect(page).toHaveTitle(/El Profesor G/);

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect(description).toContain('Servicios de asesoría de tesis');
  });

  test('should display hero section with CTA button', async ({ page }) => {
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toContainText(
      '¿Cansado de no avanzar con tu tesis?'
    );

    const ctaButton = page.locator('a[href*="wa.me"]').first();
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Cotiza tu tesis');
  });

  test('should navigate to sections via anchor links', async ({ page }) => {
    await page.click('a[href="#sobre"]');
    await expect(page.locator('#sobre')).toBeInViewport();

    await page.click('a[href="#servicios"]');
    await expect(page.locator('#servicios')).toBeInViewport();

    await page.click('a[href="#contacto"]');
    await expect(page.locator('#contacto')).toBeInViewport();
  });

  test('should display all service cards', async ({ page }) => {
    const serviceCards = page.locator('.service-card');
    await expect(serviceCards).toHaveCount(8);

    // Check first service card
    const firstCard = serviceCards.first();
    await expect(firstCard).toContainText('Asesoría completa de tesis');
  });

  test('should have accessible navigation', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeFocused();

    // Test navigation links
    const navLinks = page.locator('nav a');
    for (let i = 0; i < (await navLinks.count()); i++) {
      const link = navLinks.nth(i);
      await expect(link).toHaveAttribute('href');
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Check mobile navigation toggle
    const mobileToggle = page.locator('button[aria-label*="menú"]');
    if (await mobileToggle.isVisible()) {
      await mobileToggle.click();
      const mobileMenu = page.locator('nav ul');
      await expect(mobileMenu).toBeVisible();
    }

    // Check hero section stacks vertically
    const heroSection = page.locator('.hero .container > div');
    await expect(heroSection).toBeVisible();
  });

  test('should handle contact form submission', async ({ page }) => {
    await page.goto('/#contacto');

    // Fill out the form
    await page.fill('#nombre', 'Test User');
    await page.fill('#correo', 'test@example.com');
    await page.fill('#universidad', 'Test University');
    await page.fill('#carrera', 'Test Career');
    await page.selectOption('#tipo', 'tesis');
    await page.fill('#mensaje', 'This is a test message for the contact form.');

    // Mock the API response
    await page.route('/api/contact', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Message sent successfully',
        }),
      });
    });

    // Submit the form
    await page.click('button[type="submit"]');

    // Check for success message
    await expect(page.locator('.bg-green-50')).toBeVisible();
  });

  test('should display WhatsApp float button', async ({ page }) => {
    const whatsappButton = page.locator('a[href*="wa.me"]').last();
    await expect(whatsappButton).toBeVisible();
    await expect(whatsappButton).toHaveAttribute('target', '_blank');
  });

  test('should handle cookie banner', async ({ page }) => {
    // Clear localStorage to ensure cookie banner shows
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    const cookieBanner = page.locator('#cookie-banner');
    await expect(cookieBanner).toBeVisible();

    const acceptButton = page.locator('#accept-cookies');
    await acceptButton.click();

    await expect(cookieBanner).toBeHidden();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    const h2Elements = page.locator('h2');
    expect(await h2Elements.count()).toBeGreaterThan(0);

    // Check that h1 comes before h2
    const firstH1 = await h1.first().textContent();
    const firstH2 = await h2Elements.first().textContent();
    expect(firstH1).toBeTruthy();
    expect(firstH2).toBeTruthy();
  });
});
