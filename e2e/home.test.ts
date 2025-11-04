import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';

test('Home Page is displayed correctly', async ({ page }) => {
	const homePage = new HomePage(page);
	await homePage.goto();

	await homePage.navbar.shouldHaveLogoVisible();
	await homePage.navbar.shouldHaveThemeToggleButtonVisible();

	await expect(homePage.libraryTabBtn).toBeVisible();
	await expect(homePage.statsTabBtn).toBeVisible();
});
