import { test } from '@playwright/test';
import { HomePage } from './pages/home.page';

test('Switching between Library and Stats tabs', async ({ page }) => {
	const homePage = new HomePage(page);
	await homePage.goto();

	// Library is displayed by default.
	await homePage.expectLibraryTabDisplayed();

	// Switch to Stats: stats charts appear, library search disappears.
	await homePage.openStats();
	await homePage.expectStatsTabDisplayed();

	// Switch back to Library: search returns, stats charts disappear.
	await homePage.openLibrary();
	await homePage.expectLibraryTabDisplayed();
});
