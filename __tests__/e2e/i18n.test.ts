import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Language Switching', () => {
    test('should switch language from English to Nepali using dropdown and verify text on the homepage', async ({
      page,
    }) => {
      // Go to homepage in English
      await page.goto('/');

      // Verify text in English (Updated to reflect the new English translations)
      await expect(
        page.getByRole('heading', {
          name: 'Welcome to SmartYatra',
        })
      ).toBeVisible();

      await expect(
        page.getByText(
          'SmartYatra is an innovative Public Transport Digitization System. Track your journey with QR codes, automatic fare deduction, and seamless bus management.'
        )
      ).toBeVisible();

      // Open the language selector dropdown
      await page.locator('[aria-label="Language"]').click();

      // Wait for the dropdown options to be visible
      const dropdown = page.locator('[role="listbox"]');
      await expect(dropdown).toBeVisible();

      // Wait for the Nepali option to appear and be visible
      const nepaliOption = page.locator('text="Nepali"');
      await expect(nepaliOption).toBeVisible();

      // Select Nepali (Assuming 'ne' is the value for Nepali)
      await nepaliOption.click();

      // Verify text in Nepali (Updated to reflect the new Nepali translations)
      await expect(
        page.getByRole('heading', {
          name: 'SmartYatra मा स्वागत छ',
        })
      ).toBeVisible();

      await expect(
        page.getByText(
          'SmartYatra एक नवीन सार्वजनिक यातायात डिजिटलीकरण प्रणाली हो। QR कोडहरू, स्वत: भाडा कटौती, र सहज बस व्यवस्थापनसँग तपाईंको यात्रा ट्र्याक गर्नुहोस्।'
        )
      ).toBeVisible();
    });
  });
});
