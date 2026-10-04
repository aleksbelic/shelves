import { Page, Locator, expect } from '@playwright/test';

export default class MyNavBar {
	readonly page: Page;
	readonly logo: Locator;
	readonly themeToggleButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.logo = page.getByTestId('shelves-logo');
		this.themeToggleButton = page.getByTestId('theme-toggle-btn');
	}

	async shouldHaveLogoVisible() {
		await expect(this.logo).toBeVisible();
	}

	async shouldHaveThemeToggleButtonVisible() {
		await expect(this.themeToggleButton).toBeVisible();
	}

	async toggleTheme() {
		await this.themeToggleButton.click();
	}

	async expectDarkMode() {
		await expect(this.page.locator('html'), 'html should have "dark" class').toHaveClass(
			/.*\bdark\b.*/
		);
	}

	async expectLightMode() {
		await expect(this.page.locator('html'), 'html should NOT have "dark" class').not.toHaveClass(
			/.*\bdark\b.*/
		);
	}
}
