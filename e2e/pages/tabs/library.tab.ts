import { Page, Locator } from '@playwright/test';

export class LibraryTab {
	readonly page: Page;
	readonly searchInput: Locator;
	readonly bookTable: Locator;
	readonly perPageSelect: Locator;

	constructor(page: Page) {
		this.page = page;
		this.searchInput = page.locator('.datatable-input[name="search"]');
		this.bookTable = page.getByTestId('books-table');
		this.perPageSelect = page.locator('.datatable-selector[name="per-page"]');
	}

	async waitForLoad(timeout = 5000) {
		await this.bookTable.waitFor({ state: 'visible', timeout });
	}

	async search(query: string) {
		await this.searchInput.fill(query);
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
		await this.perPageSelect.selectOption(count);
		await this.page.waitForTimeout(300);
	}
}
