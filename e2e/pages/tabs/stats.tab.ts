import { Page, expect } from '@playwright/test';

export class StatsTab {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	readingStatusHeading() {
		return this.page.getByRole('heading', { name: 'Reading status' });
	}

	async waitForCharts(timeout = 2000) {
		await this.readingStatusHeading().waitFor({ state: 'visible', timeout });
		await this.page.getByText('Authors').waitFor({ state: 'visible', timeout });
		await this.page.getByText('Publishers').waitFor({ state: 'visible', timeout });
	}

	async expectVisible() {
		await expect(this.readingStatusHeading()).toBeVisible();
	}

	async expectHidden() {
		await expect(this.readingStatusHeading()).toHaveCount(0);
	}

	async isChartVisible(title: string) {
		return this.page.getByText(title).isVisible();
	}
}
