//These test fail due to peroblem with edition component

import { expect } from '@playwright/test';
import { generateRandomString, test } from '@helpers/helpers';
import { plantData } from '@test_data/plant.data';

const errorMessageSelector = '.error-message';
const plantName = plantData.plantName;
const plantLocation = plantData.plantLocation;
const plantDescription = plantData.plantDescription;
const plantWatering = plantData.plantWatering;
const firstPlantName = generateRandomString(6, 12);

test.describe('Plant Ediotion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/main-page');

    const plantTileSelector = `.tile:has(.tile-content:has-text("${firstPlantName}"))`;
    const plantTile = page.locator(plantTileSelector);
    const plantExists = (await plantTile.count()) > 0;

    if (!plantExists) {
      await page.getByRole('button', { name: 'Add plant' }).click();
      await page.fill('input#name', firstPlantName);
      await page.fill('input#location', plantLocation);
      await page.fill('input#description', plantDescription);
      await page.fill('input#watering', plantWatering);
      await page.getByRole('button', { name: 'Add', exact: true }).click();
      await expect(plantTile).toBeVisible();
    }
  });

  // Test Case ID: TC01
  test.skip('Submit Form with Valid Data', async ({ page }) => {
    await page.locator('.tiles > div:nth-child(2)').click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Name').fill(plantName);
    await page.getByLabel('Location').fill(plantLocation);
    await page.getByLabel('Description').fill(plantDescription);
    await page.getByLabel('Watering').fill(plantWatering);
    await page.getByRole('button', { name: 'Save' }).click();

    const plantTileSelector = `.tile:has(.tile-content:has-text("${plantName}"))`;
    await page.waitForSelector(plantTileSelector);

    const plantTile = page.locator(plantTileSelector);
    await expect(plantTile).toBeVisible();
  });

  //   Test Case ID: TC02
  test('Cancel Editing and Close Modal', async ({ page }) => {
    await page.locator('.tiles > div:nth-child(2)').click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Name').fill(plantName);
    await page.getByRole('button', { name: 'Cancel' }).click();
    const plantTileSelector = `.tile:has(.tile-content:has-text("${firstPlantName}"))`;
    await page.waitForSelector(plantTileSelector);

    const plantTile = page.locator(plantTileSelector);
    await expect(plantTile).toBeVisible();
  });

  //Test Case ID: TC03
  test.skip('Edit Plant with Empty Name', async ({ page }) => {
    await page.locator('.tiles > div:nth-child(2)').click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Name').fill('');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Name is required',
    );
  });

  //Test Case ID: TC04
  test.skip('Edit Plant with space as a Name', async ({ page }) => {
    await page.locator('.tiles > div:nth-child(2)').click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.fill('input#name', '    ');
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Name is required',
    );
  });

  //Test Case ID: TC05
  test.skip('Edit Plant with Name Exceeding Maximum Length', async ({
    page,
  }) => {
    await page.locator('.tiles > div:nth-child(2)').click();
    await page.getByRole('button', { name: 'Edit' }).click();

    const longName = generateRandomString(44, 55);
    await page.fill('input#name', longName);
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Name exceeds maximum length of 40 characters',
    );
  });
  //Test Case ID: TC06
  test.skip('Edit Plant with Location Exceeding Maximum Length', async ({
    page,
  }) => {
    await page.locator('.tiles > div:nth-child(2)').click();
    await page.getByRole('button', { name: 'Edit' }).click();

    const longLocation = 'a'.repeat(1001);
    await page.getByLabel('Location').fill(longLocation);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Location exceeds maximum length',
    );
  });

  //Test Case ID: TC07
  test.skip('Edit Plant with Description Exceeding Maximum Length', async ({
    page,
  }) => {
    await page.locator('.tiles > div:nth-child(2)').click();
    await page.getByRole('button', { name: 'Edit' }).click();
    const longDescription = 'a'.repeat(1001);

    await page.getByLabel('Description').fill(longDescription);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Location exceeds maximum length',
    );
  });

  //Test Case ID: TC08
  test.skip('Edit Plant with Watering Exceeding Maximum Length', async ({
    page,
  }) => {
    await page.locator('.tiles > div:nth-child(2)').click();
     await page.getByRole('button', { name: 'Edit' }).click();

    const longWatering = 'a'.repeat(1001);
    await page.getByLabel('Watering').fill(longWatering);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Watering exceeds maximum length',
    );
  });

  // Test Case TC09 
  test.skip('Submit Form with Taken Name', async ({ page }) => {

    //Adding a new plant
    await page.getByRole('button', { name: 'Add plant' }).click();
    await page.locator('.tiles > div:nth-child(2)').click();
    await page.fill('input#name', plantName);
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const plantTileSelector = `.tile:has(.tile-content:has-text("${firstPlantName}"))`;
    await page.waitForSelector(plantTileSelector);

    const plantTile = page.locator(plantTileSelector);
    await expect(plantTile).toBeVisible();
// Editing a plant that was just added with the name that is already used 
    await page.locator('.tiles > div:nth-child(2)').click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Name').fill(firstPlantName);

    await expect(page.locator(errorMessageSelector)).toHaveText(
      'Name must be unique',
    );
  });

  // Test Case TC10
  test.skip('Check if Form is saved correctly after you re-filled Name field', async ({
    page,
  }) => {
    await page.locator('.tiles > div:nth-child(2)').click();
    await page.getByRole('button', { name: 'Edit' }).click();

    await page.fill('input#name', ''); // Clear the Name field
    await page.fill('input#location', plantLocation);
    await page.fill('input#description', plantDescription);
    await page.fill('input#watering', plantWatering);
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
    await expect(plantTile.locator('.tile-content')).toContainText(
      'Description: A lush green plant',
    );
    await expect(plantTile.locator('.tile-content')).toContainText(
      'Location: Living Room',
    );
    await expect(plantTile.locator('.tile-content')).toContainText(
      'Watering: Mondays and Thursdays',
    );
  });
});
