import { test, expect } from '@playwright/test';

test.describe('Actions on landing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Click on button Register', async ({ page }) => {
    await page.getByRole('button', { name: 'Register' }).click();
   
    await expect(page).toHaveURL('/register-page');
  });

  test('Click on button Login', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page).toHaveURL('/login-page');
  });
});
