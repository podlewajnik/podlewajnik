import { test, expect } from "@playwright/test";

test.describe("Actions on landing page", () => {
  const landingURL = "http://localhost:5173";

  test.beforeEach(async ({ page }) => {
    await page.goto(landingURL);
  });

  test("Click on button Register", async ({ page }) => {
    await page.getByRole("button", { name: "Register" }).click();
    // await page.waitForNavigation();
    await expect(page).toHaveURL("http://localhost:5173/register-page");
  });

  test("Click on button Login", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL("http://localhost:5173/login-page");
  });
});
