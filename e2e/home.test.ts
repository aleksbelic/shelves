import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';

test('Home Page is displayed correctly', async ({ page }) => {
	const homePage = new HomePage(page);
	await homePage.goto();

	await homePage.navbar.shouldHaveLogoVisible();
	await homePage.navbar.shouldHaveThemeToggleButtonVisible();
	await homePage.navbar.expectDarkMode();
	await expect(homePage.navbar.themeToggleButton).toHaveAttribute('aria-label', 'Toggle theme');

	await expect(homePage.libraryTabBtn).toBeVisible();
	await expect(homePage.statsTabBtn).toBeVisible();

	await homePage.expectLibraryDisplayed();

	await expect(homePage.library.searchInput).toBeVisible();
	await expect(homePage.library.searchInput).toHaveValue('');
	await expect(homePage.library.searchInput).toHaveAttribute('placeholder', 'Search...');

	await expect(homePage.library.perPageSelect).toBeVisible();
	await expect(homePage.library.perPageSelect).toHaveValue('10');
});
