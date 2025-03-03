import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page.locator(".logo")).toHaveText("Giphy");
});

test("has dislike button", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Click the get started link.
  await page.locator(".gifContainer").nth(0).click();

  // Expects gif detailed view.

  // Expects page to have a heading with the name of Installation.
  const buttonLike = page.locator("button.button-like");
  await buttonLike.click();

  // Check that dislike button is visible
  const buttonDislike = page.locator("button.button-dislike");
  await expect(buttonDislike).toBeVisible();
});

test("Verify search results", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Fill data into the search field
  await page.fill(".search", "hello");

  // Click on search button
  const searchButton = page.locator(".button");
  await searchButton.click();

  // Verify that results are shown
  await page.waitForSelector(".resultsContainer");
  const gifsCount = await page.locator(".gifContainer").count();
  expect(gifsCount).toBeGreaterThan(0);
});
