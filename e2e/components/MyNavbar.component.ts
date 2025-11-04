import { Page, Locator } from '@playwright/test';

export default class MyNavBar {
	readonly page: Page;
	readonly logo: Locator;
	readonly themeToggleButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.logo = page.getByTestId('library-tab-btn');
		this.themeToggleButton = page.getByTestId('theme-toggle-btn');
	}

	async shouldHaveLogoVisible() {
		return this.logo.isVisible();
	}

	async shouldHaveThemeToggleButtonVisible() {
		return this.themeToggleButton.isVisible();
	}
}
