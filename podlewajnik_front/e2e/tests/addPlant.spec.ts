import { expect } from '@playwright/test';
import { generateRandomString, test } from '@helpers/helpers';

const modalSelector = '.modal';
const errorMessageSelector = '.error-message';

const plantName = generateRandomString(6, 12);

test.describe('New Plant Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/main-page');
  });

  // Test Case TC01
  test('Open and Close Modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await expect(page.locator(modalSelector)).toBeVisible();
    await page.click('.modal .close');
    await expect(page.locator(modalSelector)).not.toBeVisible();
  });

  // Test Case TC02
  test('Submit Empty Form', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Name is required',
    );
  });

  // Test Case TC03
  test('Submit Form with Only Name Filled', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.fill('input#name', plantName);
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const plantTileSelector = `.tile:has(.tile-content:has-text("${plantName}"))`;
    await page.waitForSelector(plantTileSelector);

    const plantTile = page.locator(plantTileSelector);
    await expect(plantTile).toBeVisible();
  });

  // Test Case TC04
  test('Submit Form with Valid Data', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.fill('input#name', plantName);
    await page.fill('input#location', 'Living Room');
    await page.fill('input#description', 'A beautiful green fern');
    await page.fill('input#watering', 'Once a week');
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const plantTileSelector = `.tile:has(.tile-content:has-text("${plantName}"))`;
    await page.waitForSelector(plantTileSelector);

    const plantTile = page.locator(plantTileSelector);
    await expect(plantTile).toBeVisible();
  });

  // Test Case TC05 
  test('Submit Form with Duplicate Name', async ({ page }) => {
    const duplicateName = plantName;

    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.fill('input#name', plantName);
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const plantTileSelector = `.tile:has(.tile-content:has-text("${duplicateName}"))`;
    await page.waitForSelector(plantTileSelector);

    const plantTile = page.locator(plantTileSelector);
    await expect(plantTile).toBeVisible();

    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.fill('input#name', duplicateName);
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    await expect(page.locator(errorMessageSelector)).toHaveText('Name must be unique');
  });

  // Test Case TC06
  test('Submit Form with Name Exceeding Maximum Length', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    const longName = generateRandomString(44, 55);
    await page.fill('input#name', longName);
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Name exceeds maximum length of 40 characters',
    );
  });

  // Test Case TC07
  test('Submit Form with Name Field Containing Only Spaces', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.fill('input#name', '    ');
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Name is required',
    );
  });

  // Test Case TC08
  test('Submit Form with Location Exceeding Maximum Length', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.fill('input#name', plantName);
    const longLocation = 'a'.repeat(1001);
    await page.fill('input#location', longLocation);
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Location exceeds maximum length',
    );
  });

  // Test Case TC09
  test('Submit Form with Description Exceeding Maximum Length', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.fill('input#name', plantName);
    const longDescription = 'a'.repeat(1001);
    await page.fill('input#description', longDescription);
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Description exceeds maximum length',
    );
  });

  // Test Case TC10
  test('Submit Form with Watering Exceeding Maximum Length', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.fill('input#name', plantName);
    const longWatering = 'a'.repeat(1001);
    await page.fill('input#watering', longWatering);
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Watering instructions exceed maximum length',
    );
  });

  // Test Case TC11
  test('Check if Form Resets After Closing Modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.fill('input#name', 'Fern');
    await page.fill('input#location', 'Living Room');
    await page.fill('input#description', 'A beautiful green fern');
    await page.fill('input#watering', 'Once a week');
    await page.click('.modal .close');
    await page.click('button:has-text("Add plant")');
    await expect(page.locator('input#name')).toBeEmpty();
    await expect(page.locator('input#location')).toBeEmpty();
    await expect(page.locator('input#description')).toBeEmpty();
    await expect(page.locator('input#watering')).toBeEmpty();
  });

  // Test Case TC12
  test('Check Error Message Display Logic', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Name is required',
    );
    await page.fill('input#name', plantName);
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.locator(errorMessageSelector)).not.toBeVisible();
  });

  // Test Case TC13
  test('Simulate Backend Failure', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.fill('input#name', plantName);

    // Simulating backend failure by intercepting the request
    await page.route('**/plaants', (route) => {
      route.fulfill({
        status: 500,
        body: 'Internal Server Error',
      });
    });

    await page.click('button:has-text("Add")');
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Failed to add plant. Please try again.',
    );
  });
});
