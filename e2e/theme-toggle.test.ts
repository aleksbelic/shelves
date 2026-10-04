import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';

test('Theme toggle switches dark/light mode', async ({ page }) => {
	const homePage = new HomePage(page);
	await homePage.goto();

	await homePage.navbar.expectDarkMode();
	await expect(homePage.navbar.themeToggleButton).toHaveAttribute('aria-label', 'Toggle theme');

	await homePage.navbar.toggleTheme();
	await homePage.navbar.expectLightMode();
	await expect(homePage.navbar.themeToggleButton).toHaveAttribute('aria-label', 'Toggle theme');

	await homePage.navbar.toggleTheme();
	await homePage.navbar.expectDarkMode();
	await expect(homePage.navbar.themeToggleButton).toHaveAttribute('aria-label', 'Toggle theme');
});
