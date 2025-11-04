import { Page, Locator } from '@playwright/test';

export class LibraryTab {
	readonly page: Page;
	readonly searchInput: Locator;
	readonly table: Locator;
	readonly perPageSelect: Locator;

	constructor(page: Page) {
		this.page = page;
		// Prefer data-testid attributes in the app for stable selectors:
		// <input data-testid="search-input" .../>
		// <table data-testid="books-table">...</table>
		this.searchInput = page.locator('[data-testid="search-input"]');
		this.table = page.locator('[data-testid="books-table"]');
		this.perPageSelect = page.locator('[data-testid="per-page-select"]'); // optional
	}

	async waitForLoad(timeout = 5000) {
		await this.table.waitFor({ state: 'visible', timeout });
	}

	async search(query: string) {
		await this.searchInput.fill(query);
		// If search triggers automatically, remove Enter; else:
		await this.searchInput.press('Enter');
		await this.page.waitForTimeout(300);
	}

	async firstRowTitle(): Promise<string> {
		return this.page
			.locator('[data-testid="books-table"] tbody tr')
			.first()
			.locator('td:nth-child(2)')
			.innerText();
	}

	async setPerPage(count: string) {
		// expects <select data-testid="per-page-select"> with options like '10','20'
		await this.perPageSelect.selectOption(count);
		await this.page.waitForTimeout(300);
	}
}
