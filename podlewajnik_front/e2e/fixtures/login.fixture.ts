import { test as base, expect } from '@playwright/test';
import { loginData } from '@test_data/login.data';

const userLogin = loginData.userLogin;
const userPassword = loginData.userPassword;

const test = base.extend<{
  login: () => Promise<void>;
}>({
  login: async ({ page }, use) => {
    await page.goto('/login-page');
    await page.getByLabel('Login:').fill(userLogin);
    await page.getByLabel('Password:').fill(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/main-page');
    await use(async () => {});
  },
});

export { test, expect };
