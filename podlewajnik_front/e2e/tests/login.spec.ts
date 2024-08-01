import { test, expect } from '@playwright/test';
import { loginData } from '@test_data/login.data';
import { errorMessages, errorMessageSelector } from '@pages/login.page';

const userLogin = loginData.userLogin;
const userPassword = loginData.userPassword;

test.describe('Actions on login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login-page');
  });

  test('Check Successful Login', async ({ page }) => {
    await page.getByLabel('Login:').fill(userLogin);
    await page.getByLabel('Password:').fill(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('/main-page');
  });

  test('Check Empty Form Submission', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = await page.locator(errorMessageSelector);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(errorMessages.emptyFields);
  });

  test('Check login in with Incorrect Login', async ({ page }) => {
    await page.getByLabel('Login:').fill('Mark1');
    await page.getByLabel('Password:').fill(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = await page.locator(errorMessageSelector);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(errorMessages.incorrectPassword);
  });

  test('Check Empty Login Field', async ({ page }) => {
    await page.getByLabel('Password:').fill(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = await page.locator(errorMessageSelector);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(errorMessages.emptyFields);
  });

  test('Check Empty Password Field', async ({ page }) => {
    await page.getByLabel('Login:').fill(userLogin);
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = await page.locator(errorMessageSelector);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(errorMessages.emptyFields);
  });
  test('Check Login with Incorrect Password', async ({ page }) => {
    await page.getByLabel('Login:').fill(userLogin);
    await page.getByLabel('Password:').fill('Test1234');
    await page.getByRole('button', { name: 'Login' }).dblclick();

    const errorMessage = await page.locator(errorMessageSelector);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(errorMessages.loginFailed);
  });

  // TO CHECK why test dosn't work like manual test
    test.skip('Check The Navigation', async ({ page }) => {
      await page.getByRole('img', { name: 'Back' }).click();
      await page.waitForURL('/');
      await expect(page).toHaveURL('/');
    });
});
