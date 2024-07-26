import { test, expect } from '@playwright/test';
// import { generateRandomString } from '@helpers/helpers';

function generateRandomString(minLength: number, maxLength: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const nameErrorSelector = '.form-group:nth-child(1) .error';
const emailErrorSelector = '.form-group:nth-child(2) .error';
const loginErrorSelector = '.form-group:nth-child(3) .error';
const passwordErrorSelector = '.form-group:nth-child(4) .error';
const confirmPasswordErrorSelector = '.form-group:nth-child(5) .error';

test.describe('Actions on register page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register-page');
  });

  test('Check Successful Registration', async ({ page }) => {
    const randomLogin = generateRandomString(6, 12);

    await page.getByLabel('Name:').fill('Jan');
    await page.getByLabel('Email:').fill('jan2@jan.ioo');
    await page.getByLabel('Login:').fill(randomLogin);
    await page.getByLabel('Password:', { exact: true }).fill('Test1234!');
    await page.getByLabel('Confirm Password:').fill('Test1234!');
    await page.getByRole('button', { name: 'Confirm' }).click();

    await expect(page).toHaveURL('/main-page');
  });

  test('Check Empty Form Submission', async ({ page }) => {
    await page.getByRole('button', { name: 'Confirm' }).click();

    const nameError = await page.locator(nameErrorSelector);
    const emailError = await page.locator(emailErrorSelector);
    const loginError = await page.locator(loginErrorSelector);
    const passwordError = await page.locator(passwordErrorSelector);
    const confirmPasswordError = await page.locator(
      confirmPasswordErrorSelector,
    );

    await expect(nameError).toBeVisible();
    await expect(emailError).toBeVisible();
    await expect(loginError).toBeVisible();
    await expect(passwordError).toBeVisible();
    await expect(confirmPasswordError).toBeVisible();
  });

  test('Check Some Empty Required Fields', async ({ page }) => {
    await page.getByLabel('Name:').fill('Andy');
    await page.getByLabel('Email:').fill('andy@andy.ol');
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.getByLabel('Login:').click();

    const loginError = await page.locator('.form-group:nth-child(3) .error');
    const passwordError = await page.locator('.form-group:nth-child(4) .error');
    const confirmPasswordError = await page.locator(
      '.form-group:nth-child(5) .error',
    );

    await expect(loginError).toBeVisible();
    await expect(passwordError).toBeVisible();
    await expect(confirmPasswordError).toBeVisible();
  });

  test('Check Invalid Email Format', async ({ page }) => {
    await page.getByLabel('Name:').fill('Mary');
    await page.getByLabel('Email:').fill('mary1mary.io');
    await page.getByLabel('Login:').fill('Mary27');
    await page.getByLabel('Password:', { exact: true }).fill('Test1234!');
    await page.getByLabel('Confirm Password:').fill('Test1234!');
    await page.getByRole('button', { name: 'Confirm' }).click();

   const emailError = await page.locator(emailErrorSelector);
  await expect(emailError).toBeVisible();
  await expect(emailError).toHaveText('Invalid email address.');
  });

  test('Check Password and Confirm Password Match', async ({ page }) => {
    await page.getByLabel('Name:').fill('Jan');
    await page.getByLabel('Email:').fill('jan@jan.lop');
    await page.getByLabel('Login:').fill('Jan1234');
    await page.getByLabel('Password:', { exact: true }).fill('Test1234!');
    await page.getByLabel('Confirm Password:').fill('Test1234');
    await page.getByRole('button', { name: 'Confirm' }).click();

    const passwordError = await page.locator('.form-group:nth-child(5) .error');
    await expect(passwordError).toHaveText('Passwords do not match.');
  });

  test('Check Minimum Password Length', async ({ page }) => {
    await page.getByLabel('Name:').fill('Jan');
    await page.getByLabel('Email:').fill('jan@jan.ioo');
    await page.getByLabel('Login:').fill('Janek18');
    await page.getByLabel('Password:', { exact: true }).fill('1234');
    await page.getByLabel('Confirm Password:').fill('1234');
    await page.getByRole('button', { name: 'Confirm' }).click();

    const passwordError = await page.locator('#registerPassword + .error');
    await expect(passwordError).toHaveText(
      'Password must be between 6 and 20 characters.',
    );
  });

  test('Check Maximum Password Length', async ({ page }) => {
    await page.getByLabel('Name:').fill('Jan');
    await page.getByLabel('Email:').fill('jan@jan.ioo');
    await page.getByLabel('Login:').fill('Janek18');
    await page
      .getByLabel('Password:', { exact: true })
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      );
    await page.getByLabel('Confirm Password:').click();
    await page
      .getByLabel('Confirm Password:')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      );
    await page.getByRole('button', { name: 'Confirm' }).click();

    const passwordError = await page.locator('#registerPassword + .error');
    await expect(passwordError).toHaveText(
      'Password must be between 6 and 20 characters.',
    );
  });

  test('Check Space As A Character', async ({ page }) => {
    await page.getByLabel('Name:').fill(' ');
    await page.getByLabel('Email:').fill(' ');
    await page.getByLabel('Login:').fill(' ');
    await page.getByLabel('Password:', { exact: true }).fill(' ');
    await page.getByLabel('Confirm Password:').fill(' ');
    await page.getByRole('button', { name: 'Confirm' }).click();

    const nameError = await page.locator(nameErrorSelector);
    const emailError = await page.locator(emailErrorSelector);
    const loginError = await page.locator(loginErrorSelector);
    const passwordError = await page.locator(passwordErrorSelector);
    const confirmPasswordError = await page.locator(
      confirmPasswordErrorSelector,
    );

    await expect(nameError).toBeVisible();
    await expect(emailError).toBeVisible();
    await expect(loginError).toBeVisible();
    await expect(passwordError).toBeVisible();
    await expect(confirmPasswordError).toBeVisible();
  });

  //   test('Check The Navigation', async ({ page }) => {
  //     await page.getByRole('img', { name: 'Back' }).click();
  //     await page.waitForURL('/');
  //     await expect(page).toHaveURL('/');
  //   });
});
