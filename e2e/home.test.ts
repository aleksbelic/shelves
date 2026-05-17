import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';

test('Home Page is displayed correctly', async ({ page }) => {
	const homePage = new HomePage(page);
	await homePage.goto();

	await homePage.navbar.shouldHaveLogoVisible();
	await homePage.navbar.shouldHaveThemeToggleButtonVisible();

	// tabs
	await expect(homePage.libraryTabBtn).toBeVisible();
	await expect(homePage.statsTabBtn).toBeVisible();

	// search input
	await expect(homePage.library.searchInput).toBeVisible();
	await expect(homePage.library.searchInput).toHaveValue('');
	await expect(homePage.library.searchInput).toHaveAttribute('placeholder', 'Search...');

	// entries per page
	await expect(homePage.library.perPageSelect).toBeVisible();
	await expect(homePage.library.perPageSelect).toHaveValue('10');
});
