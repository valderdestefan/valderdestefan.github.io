import { test, expect } from "@playwright/test";
import { locconfig } from "./utilis/config_local.app";
import {
  listerUrl,
  listerTableSelector,
  docItemSelector,
  documentText,
  threeDotsSelector,
  menusSelector,
} from "./utilis/locators";

// Extend the Window interface
declare global {
  interface Window {
    globalConfig: typeof locconfig;
  }
}

test.only("has remove doc operation", async ({ page }) => {
  const mock = {}; // Define mock as an empty object or with necessary properties

  await page.addInitScript((mock) => {
    window.globalConfig = { ...locconfig };
  }, mock);

  await page.goto(listerUrl);

  // Wait for 3 seconds
  await page.waitForTimeout(3000);

  // Use page.locator() to interact with the element
  const listerTable = page.locator(listerTableSelector);
  await expect(listerTable).toBeVisible();

  const docItem = page
    .locator(docItemSelector)
    .filter({ hasText: documentText });
  await docItem.hover();

  const tableActions = page.locator(`[data-testid="${threeDotsSelector}"]`);
  await tableActions.click();

  const menu = page.locator(menusSelector);
  await menu.isVisible();
});
