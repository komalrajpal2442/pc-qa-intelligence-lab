const { test, expect } = require('@playwright/test');

test('user can search Playwright documentation', async ({ page }) => {

    await page.goto('https://playwright.dev/');

    await page.getByRole('link', { name: 'Get started' }).click();

    await expect(page).toHaveTitle(/Installation/);

});