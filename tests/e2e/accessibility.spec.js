import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();

    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check heading order
    let previousLevel = 0;
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const currentLevel = parseInt(tagName.charAt(1));

      if (previousLevel > 0) {
        // Heading levels should not skip (e.g., h2 to h4)
        expect(currentLevel - previousLevel).toBeLessThanOrEqual(1);
      }

      previousLevel = currentLevel;
    }
  });

  test('should have proper alt text for images', async ({ page }) => {
    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');

      // All images should have alt text (can be empty for decorative images)
      expect(alt).not.toBeNull();

      // Non-decorative images should have meaningful alt text
      if (!src?.includes('placeholder') && !src?.includes('decoration')) {
        expect(alt.length).toBeGreaterThan(0);
      }
    }
  });

  test('should have proper form labels', async ({ page }) => {
    const inputs = await page.locator('input, select, textarea').all();

    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledby = await input.getAttribute('aria-labelledby');

      if (id) {
        // Check if there's a label with for attribute
        const label = await page.locator(`label[for="${id}"]`).count();
        const hasLabel = label > 0 || ariaLabel || ariaLabelledby;

        expect(hasLabel).toBeTruthy();
      }
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Test tab navigation through interactive elements
    const interactiveElements = await page
      .locator('a, button, input, select, textarea, [tabindex]')
      .all();

    // Start from the first focusable element
    await page.keyboard.press('Tab');

    let focusedElement = await page.locator(':focus').first();
    expect(await focusedElement.count()).toBe(1);

    // Test that we can navigate through several elements
    for (let i = 0; i < Math.min(5, interactiveElements.length - 1); i++) {
      await page.keyboard.press('Tab');
      focusedElement = await page.locator(':focus').first();
      expect(await focusedElement.count()).toBe(1);
    }
  });

  test('should have proper focus indicators', async ({ page }) => {
    const focusableElements = await page
      .locator('a, button, input, select, textarea')
      .all();

    for (let i = 0; i < Math.min(3, focusableElements.length); i++) {
      const element = focusableElements[i];
      await element.focus();

      // Check if element has visible focus indicator
      const focusStyles = await element.evaluate(el => {
        const styles = window.getComputedStyle(el, ':focus');
        return {
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
          boxShadow: styles.boxShadow,
        };
      });

      // Should have either outline or box-shadow for focus
      const hasFocusIndicator =
        focusStyles.outline !== 'none' ||
        focusStyles.outlineWidth !== '0px' ||
        focusStyles.boxShadow !== 'none';

      expect(hasFocusIndicator).toBeTruthy();
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    // Run axe-core specifically for color contrast
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const colorContrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );

    expect(colorContrastViolations).toEqual([]);
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    // Test navigation landmarks
    const nav = await page.locator('nav[role="navigation"], nav').first();
    expect(await nav.count()).toBe(1);

    // Test main content landmark
    const main = await page.locator('main, [role="main"]').first();
    expect(await main.count()).toBe(1);

    // Test that buttons have accessible names
    const buttons = await page.locator('button').all();
    for (const button of buttons) {
      const accessibleName = await button.evaluate(el => {
        return (
          el.textContent?.trim() ||
          el.getAttribute('aria-label') ||
          el.getAttribute('aria-labelledby') ||
          el.getAttribute('title')
        );
      });

      expect(accessibleName).toBeTruthy();
    }
  });

  test('should handle reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();

    // Check that animations are disabled or reduced
    const animatedElements = await page
      .locator(
        '[class*="animate"], [style*="animation"], [style*="transition"]'
      )
      .all();

    for (const element of animatedElements) {
      const styles = await element.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          animationDuration: computed.animationDuration,
          transitionDuration: computed.transitionDuration,
        };
      });

      // Animations should be very short or disabled
      if (
        styles.animationDuration !== 'none' &&
        styles.animationDuration !== '0s'
      ) {
        const duration = parseFloat(styles.animationDuration);
        expect(duration).toBeLessThanOrEqual(0.01); // 10ms or less
      }
    }
  });

  test('should have skip links', async ({ page }) => {
    // Test skip link functionality
    const skipLink = await page
      .locator('.skip-link, a[href="#main-content"]')
      .first();

    if ((await skipLink.count()) > 0) {
      // Focus the skip link
      await page.keyboard.press('Tab');

      // Should be visible when focused
      const isVisible = await skipLink.isVisible();
      expect(isVisible).toBeTruthy();

      // Should navigate to main content when clicked
      await skipLink.click();
      const mainContent = await page.locator('#main-content, main').first();
      expect(await mainContent.count()).toBe(1);
    }
  });

  test('should work with screen reader simulation', async ({ page }) => {
    // Test that important content has proper semantic structure
    const sections = await page.locator('section').all();

    for (const section of sections) {
      const hasHeading =
        (await section.locator('h1, h2, h3, h4, h5, h6').count()) > 0;
      const hasAriaLabel =
        (await section.getAttribute('aria-labelledby')) ||
        (await section.getAttribute('aria-label'));

      // Each section should have either a heading or aria-label
      expect(hasHeading || hasAriaLabel).toBeTruthy();
    }
  });
});
