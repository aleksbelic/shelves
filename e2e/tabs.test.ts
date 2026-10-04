import { test } from '@playwright/test';
import { HomePage } from './pages/home.page';

test('Switching between Library and Stats tabs', async ({ page }) => {
	const homePage = new HomePage(page);
	await homePage.goto();

	await homePage.expectLibraryDisplayed();

	await homePage.openStats();
	await homePage.expectStatsDisplayed();

	await homePage.openLibrary();
	await homePage.expectLibraryDisplayed();
});
