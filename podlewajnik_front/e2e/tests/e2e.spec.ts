import { test, expect } from '@playwright/test';
import { plantData } from '@test_data/plant.data';
import { registerData } from '@test_data/register.data';

let userLogin: string;
let userPassword: string;

//As a registered user I want add, edit and delete the plant
test.describe('Podlewajnik E2E Tests', () => {
    const userName = registerData.userName;
    const userMail = registerData.userMail;
    const confirmPassword = registerData.confirmPassword;
    const plantName = plantData.plantName;
    const plantLocation = plantData.plantLocation;
    const plantDescription = plantData.plantDescription;
    const plantWatering = plantData.plantWatering;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    userLogin = registerData.userLogin;
    userPassword = registerData.userPassword;
    await page.goto('/');
    await page.getByRole('button', { name: 'Register' }).click();
    await page.getByLabel('Name:').fill(userName);
    await page.getByLabel('Email:').fill(userMail);
    await page.getByLabel('Login:').fill(userLogin);
    await page.getByLabel('Password:', { exact: true }).fill(userPassword);
    await page.getByLabel('Confirm Password:').fill(confirmPassword);
    await page.getByRole('button', { name: 'Confirm' }).click();
    await expect(page).toHaveURL('/main-page');
    await page.close();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/login-page');
    await page.getByLabel('Login:').fill(userLogin);
    await page.getByLabel('Password:').fill(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('/main-page');
  });

  test('Add a New Plant and Verify Details', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();

    await page.getByLabel('Name').fill(plantName);
    await page.getByLabel('Location').fill(plantLocation);
    await page.getByLabel('Description').fill(plantDescription);
    await page.getByLabel('Watering').fill(plantWatering);
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const plantTileSelector = `.tile:has(.tile-content:has-text("${plantName}"))`;
    await page.waitForSelector(plantTileSelector);

    const plantTile = page.locator(plantTileSelector);
    await expect(plantTile).toBeVisible();

    await plantTile.click();
    await expect(
      page.locator(`.tile-content:has-text("${plantName}")`),
    ).toBeVisible();
    await expect(
      page.locator(`.tile-content:has-text("${plantLocation}")`),
    ).toBeVisible();
    await expect(
      page.locator(`.tile-content:has-text("${plantDescription}")`),
    ).toBeVisible();
    await expect(
      page.locator(`.tile-content:has-text("${plantWatering}")`),
    ).toBeVisible();
  });

  // Edit Plant Test (TODO backend change)
  test.skip('Edit an Existing Plant', async ({ page }) => {
    await page.locator('.tiles > div:nth-child(1)').click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Name').fill('Pothos');
    await page.getByLabel('Location').fill('Balcony');
    await page.getByLabel('Description').fill('My favourite plant');
    await page.getByLabel('Watering').fill('Wednesdays');
    await page.getByRole('button', { name: 'Save' }).click();

    const plantTileSelector = `.tile:has(.tile-content:has-text("Pothos"))`;
    await page.waitForSelector(plantTileSelector);

    const plantTile = page.locator(plantTileSelector);
    await expect(plantTile).toBeVisible();
  });

  // Delete Plant Test
  test.skip('Delete an Existing Plant', async ({ page }) => {
    await page.locator('.tiles > div:nth-child(1)').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    const plantTile = page.locator(`.tile:has-text("Pothos")`);
    await expect(plantTile).not.toBeVisible();
  });

  // Login Test
  test('User Logout and Login', async ({ page }) => {
    await page.getByRole('button', { name: 'Logout' }).click();

    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Login:').fill(userLogin);
    await page.getByLabel('Password:').fill(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/main-page');
  });

  // Verify UI Elements Presence
  test('Verify UI Elements Presence', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Add plant' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    await expect(page.locator('.tiles')).toBeVisible();
  });

  test('Registration Validation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Register' }).click();
    await page.getByLabel('Name:').fill('');
    await page.getByLabel('Email:').fill('invalid-email');
    await page.getByLabel('Login:').fill('');
    await page.getByLabel('Password:', { exact: true }).fill('short');
    await page.getByLabel('Confirm Password:').fill('mismatch');
    await page.getByRole('button', { name: 'Confirm' }).click();

    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Invalid email')).toBeVisible();
    await expect(page.getByText('Login is required')).toBeVisible();
    await expect(
      page.getByText('Password must be between 6 and 20 characters.'),
    ).toBeVisible();
    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });

  // Login Validation Test
  test('Login Validation', async ({ page }) => {
    await page.goto('/login-page');
    await page.getByLabel('Login:').fill('invalid_login');
    await page.getByLabel('Password:').fill('invalid_password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Login failed.')).toBeVisible();
  });

  // Add Plant Validation Test
  test('Add Plant Validation', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.fill('input#name', '');
    await page.fill('input#location', '');
    await page.fill('input#description', '');
    await page.fill('input#watering', '');
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    await expect(page.getByText('Name is required')).toBeVisible();
  });
});
