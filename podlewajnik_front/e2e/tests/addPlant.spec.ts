import { test, expect } from '@fixtures/login.fixture';
import { generateRandomString } from '@helpers/helpers';
import { plantData } from '@test_data/plant.data';

test.describe('New Plant Modal', () => {
  const modalSelector = '.modal';
  const errorMessageSelector = '.error-message';
  const plantName = plantData.plantName;
  const plantLocation = plantData.plantLocation;
  const plantDescription = plantData.plantDescription;
  const plantWatering = plantData.plantWatering;

  test.beforeEach(async ({ login }) => {
    await login();
  });

  // Test Case TC01 TODO doesn't work with npm
  test('Submit Form with Valid Data', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.fill('input#name', plantName);
    await page.fill('input#location', plantLocation);
    await page.fill('input#description', plantDescription);
    await page.fill('input#watering', plantWatering);
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const plantTileSelector = `.tile:has(.tile-content:has-text("${plantName}"))`;
    await page.waitForSelector(plantTileSelector);

    const plantTile = page.locator(plantTileSelector);
    await expect(plantTile).toBeVisible();
  });

  // Test Case TC02
  test('Open and Close Modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await expect(page.locator(modalSelector)).toBeVisible();
    await page.click('.modal .close');
    await expect(page.locator(modalSelector)).not.toBeVisible();
  });

  // Test Case TC03
  test('Submit Empty Form', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Name is required',
    );
  });

  // Test Case TC04
  test('Submit Form with Only Name Filled', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.fill('input#name', plantName);
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const plantTileSelector = `.tile:has(.tile-content:has-text("${plantName}"))`;
    await page.waitForSelector(plantTileSelector);

    const plantTile = page.locator(plantTileSelector);
    await expect(plantTile).toBeVisible();
  });

  // Test Case TC05 (TO CHECK why it doesn't pass while running by plugin)
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

    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Name must be unique',
    );
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
    await page.fill('input#name', plantName);
    await page.fill('input#location', plantLocation);
    await page.fill('input#description', plantDescription);
    await page.fill('input#watering', plantWatering);
    await page.click('.modal .close');
    await page.click('button:has-text("Add plant")');
    await expect(page.locator('input#name')).toBeEmpty();
    await expect(page.locator('input#location')).toBeEmpty();
    await expect(page.locator('input#description')).toBeEmpty();
    await expect(page.locator('input#watering')).toBeEmpty();
  });

  // Test Case TC12 (fails with npm group tests)
  test('Check if Form is saved correctly after you re-filled Name field', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();

    // Fill all input fields with valid data
    await page.fill('input#name', plantName);
    await page.fill('input#location', plantLocation);
    await page.fill('input#description', plantDescription);
    await page.fill('input#watering', plantWatering);

    await page.fill('input#name', ''); // Clear the Name field
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Name is required',
    );

    // Refill the "Name" field
    await page.fill('input#name', plantName);
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const plantTileSelector = `.tile:has(.tile-content:has-text("${plantName}"))`;
    const plantTile = page.locator(plantTileSelector);

    await expect(plantTile).toBeVisible();
    await expect(plantTile.locator('.tile-content')).toContainText(plantName);
    await expect(plantTile.locator('.tile-content:has-text("Description:")')).toContainText(
      'A lush green plant'
    );
    await expect(plantTile.locator('.tile-content:has-text("Location:")')).toContainText(
      'Living Room'
    );
    await expect(plantTile.locator('.tile-content:has-text("Watering:")')).toContainText(
      'Mondays and Thursdays'
    );
    
  });

  // Test Case TC13 (TO CHECK works when run by playwright plugin but not when run with npm group tests )
  test.skip('Check Error Message Display Logic', async ({ page }) => {
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Name is required',
    );
    await page.fill('input#name', plantName);
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.locator(errorMessageSelector)).not.toBeVisible();
  });

});
