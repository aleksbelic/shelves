import { Page, Locator } from '@playwright/test';

export class StatsTab {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async waitForCharts(timeout = 2000) {
		// Look for chart headings / cards; prefer data-testid like data-testid="chart-reading-status"
		await this.page.getByText('Reading status').waitFor({ state: 'visible', timeout });
		await this.page.getByText('Authors').waitFor({ state: 'visible', timeout });
		await this.page.getByText('Publishers').waitFor({ state: 'visible', timeout });
	}

	async isChartVisible(title: string) {
		return this.page.getByText(title).isVisible();
	}
}
