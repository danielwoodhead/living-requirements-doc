import { test, expect } from "@playwright/test";

test(
  "has title",
  {
    annotation: {
      type: "requirement",
      description: "1.1",
    },
  },
  async ({ page }) => {
    await page.goto("https://playwright.dev/");

    await expect(page).toHaveTitle(/Playwright/);
  }
);

test(
  "get started link",
  {
    annotation: {
      type: "requirement",
      description: "1.2",
    },
  },
  async ({ page }) => {
    await page.goto("https://playwright.dev/");

    await page.getByRole("link", { name: "Get started" }).click();

    await expect(
      page.getByRole("heading", {
        name: "This is the wrong heading to make the test fail",
      })
    ).toBeVisible();
  }
);
