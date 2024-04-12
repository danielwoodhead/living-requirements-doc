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
  async () => {
    throw new Error("fail");
  }
);
