import { Page, Locator, expect } from '@playwright/test';

export class LibraryTab {
	readonly page: Page;
	readonly searchInput: Locator;
	readonly bookTable: Locator;
	readonly perPageSelect: Locator;

	constructor(page: Page) {
		this.page = page;
		this.searchInput = page.getByRole('searchbox', { name: 'Search within table' });
		this.bookTable = page.getByTestId('books-table');
		this.perPageSelect = page.getByRole('combobox', { name: 'entries per page' });
	}

	rows() {
		return this.page.locator('[data-testid="books-table"] tbody tr');
	}

	async waitForLoad(timeout = 5000) {
		await this.bookTable.waitFor({ state: 'visible', timeout });
	}

	async expectVisible() {
		await expect(this.searchInput).toBeVisible();
		await expect(this.bookTable).toBeVisible();
	}

	async expectHidden() {
		await expect(this.searchInput).toHaveCount(0);
	}

	async search(query: string) {
		await this.searchInput.fill(query);
		await this.searchInput.press('Enter');
		await expect(this.searchInput).toHaveValue(query);
	}

	async firstRowTitle(): Promise<string> {
		return this.rows().first().locator('td:nth-child(1)').innerText();
	}

	async setPerPage(count: number) {
		await this.perPageSelect.selectOption(count.toString());
		await expect(this.perPageSelect).toHaveValue(count.toString());
		await expect
			.poll(async () => await this.rows().filter({ visible: true }).count(), {
				timeout: 5000
			})
			.toBeLessThanOrEqual(count);
	}
}
