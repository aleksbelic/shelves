import { expect, test } from '@playwright/test';

test('home page has correct title', async ({ page }) => {
    await page.goto('/');
    expect(await page.title()).toBe('Shelves');
});
