import { test, expect } from '@playwright/test';
import { selectors, errorSelectors, errorMessages } from '@pages/register.page';
import { registerData } from '@test_data/register.data';

const userName = registerData.userName;
const userMail = registerData.userMail;
const userLogin = registerData.userLogin;
const userPassword = registerData.userPassword;
const confirmPassword = registerData.confirmPassword;

test.describe('Actions on register page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register-page');
  });

  test('Check Successful Registration', async ({ page }) => {
    await page.getByLabel(selectors.name).fill(userName);
    await page.getByLabel(selectors.email).fill(userMail);
    await page.getByLabel(selectors.login).fill(userLogin);
    await page
      .getByLabel(selectors.password, { exact: true })
      .fill(userPassword);
    await page.getByLabel(selectors.confirmPassword).fill(confirmPassword);
    await page.getByRole('button', { name: selectors.confirmButton }).click();

    await expect(page).toHaveURL('/main-page');
  });

  test('Check Empty Form Submission', async ({ page }) => {
    await page.getByRole('button', { name: selectors.confirmButton }).click();

    const nameError = await page.locator(errorSelectors.name);
    const emailError = await page.locator(errorSelectors.email);
    const loginError = await page.locator(errorSelectors.login);
    const passwordError = await page.locator(errorSelectors.password);
    const confirmPasswordError = await page.locator(
      errorSelectors.confirmPassword,
    );

    await expect(nameError).toBeVisible();
    await expect(emailError).toBeVisible();
    await expect(loginError).toBeVisible();
    await expect(passwordError).toBeVisible();
    await expect(confirmPasswordError).toBeVisible();
  });

  test('Check Some Empty Required Fields', async ({ page }) => {
    await page.getByLabel(selectors.name).fill(userName);
    await page.getByLabel(selectors.email).fill(userMail);
    await page.getByRole('button', { name: selectors.confirmButton }).click();
    await page.getByLabel(selectors.login).click();

    const loginError = await page.locator(errorSelectors.login);
    const passwordError = await page.locator(errorSelectors.password);
    const confirmPasswordError = await page.locator(
      errorSelectors.confirmPassword,
    );

    await expect(loginError).toBeVisible();
    await expect(passwordError).toBeVisible();
    await expect(confirmPasswordError).toBeVisible();
  });

  test('Check Invalid Email Format', async ({ page }) => {
    await page.getByLabel(selectors.name).fill(userName);
    await page.getByLabel(selectors.email).fill('jahn.john.john');
    await page.getByLabel(selectors.login).fill(userLogin);
    await page
      .getByLabel(selectors.password, { exact: true })
      .fill(userPassword);
    await page.getByLabel(selectors.confirmPassword).fill(confirmPassword);
    await page.getByRole('button', { name: selectors.confirmButton }).click();

    const emailError = await page.locator(
      `${errorSelectors.email}:has-text("${errorMessages.invalidEmail}")`,
    );
    await expect(emailError).toBeVisible();
    await expect(emailError).toHaveText(errorMessages.invalidEmail);
  });

  test('Check Password and Confirm Password Match', async ({ page }) => {
    await page.getByLabel(selectors.name).fill(userName);
    await page.getByLabel(selectors.email).fill(userMail);
    await page.getByLabel(selectors.login).fill(userLogin);
    await page
      .getByLabel(selectors.password, { exact: true })
      .fill(userPassword);
    await page.getByLabel(selectors.confirmPassword).fill('Test1234');
    await page.getByRole('button', { name: selectors.confirmButton }).click();

    const passwordError = await page.locator(errorSelectors.confirmPassword);
    await expect(passwordError).toHaveText(errorMessages.passwordMismatch);
  });

  test('Check Minimum Password Length', async ({ page }) => {
    await page.getByLabel(selectors.name).fill(userName);
    await page.getByLabel(selectors.email).fill(userMail);
    await page.getByLabel(selectors.login).fill(userLogin);
    await page.getByLabel(selectors.password, { exact: true }).fill('1234');
    await page.getByLabel(selectors.confirmPassword).fill('1234');
    await page.getByRole('button', { name: selectors.confirmButton }).click();

    const passwordError = await page.locator(
      errorSelectors.passwordErrorAdjacent,
    );
    await expect(passwordError).toHaveText(errorMessages.passwordLength);
  });

  test('Check Maximum Password Length', async ({ page }) => {
    await page.getByLabel(selectors.name).fill(userName);
    await page.getByLabel(selectors.email).fill(userMail);
    await page.getByLabel(selectors.login).fill(userLogin);
    await page
      .getByLabel(selectors.password, { exact: true })
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      );
    await page
      .getByLabel(selectors.confirmPassword)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      );
    await page.getByRole('button', { name: selectors.confirmButton }).click();

    const passwordError = await page.locator(
      errorSelectors.passwordErrorAdjacent,
    );
    await expect(passwordError).toHaveText(errorMessages.passwordLength);
  });

  test('Check Space As A Character', async ({ page }) => {
    await page.getByLabel(selectors.name).fill(' ');
    await page.getByLabel(selectors.email).fill(' ');
    await page.getByLabel(selectors.login).fill(' ');
    await page.getByLabel(selectors.password, { exact: true }).fill(' ');
    await page.getByLabel(selectors.confirmPassword).fill(' ');
    await page.getByRole('button', { name: selectors.confirmButton }).click();

    const nameError = await page.locator(errorSelectors.name);
    const emailError = await page.locator(errorSelectors.email);
    const loginError = await page.locator(errorSelectors.login);
    const passwordError = await page.locator(errorSelectors.password);
    const confirmPasswordError = await page.locator(
      errorSelectors.confirmPassword,
    );

    await expect(nameError).toBeVisible();
    await expect(emailError).toBeVisible();
    await expect(loginError).toBeVisible();
    await expect(passwordError).toBeVisible();
    await expect(confirmPasswordError).toBeVisible();
  });
});

//   test('Check The Navigation', async ({ page }) => {
//     await page.getByRole('img', { name: 'Back' }).click();
//     await page.waitForURL('/');
//     await expect(page).toHaveURL('/');
//   });
// });
