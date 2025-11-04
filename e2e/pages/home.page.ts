import { Page } from '@playwright/test';
import { LibraryTab } from './tabs/library.tab';
import { StatsTab } from './tabs/stats.tab';
import MyNavbar from '../components/MyNavbar.component';

export class HomePage {
	readonly page: Page;
	readonly library: LibraryTab;
	readonly stats: StatsTab;
	readonly libraryTabBtn;
	readonly statsTabBtn;
	readonly navbar: MyNavbar;

	constructor(page: Page) {
		this.page = page;
		this.navbar = new MyNavbar(page);
		this.library = new LibraryTab(page);
		this.stats = new StatsTab(page);
		this.libraryTabBtn = page.getByTestId('library-tab-btn');
		this.statsTabBtn = page.getByTestId('stats-tab-btn');
	}

	async goto() {
		await this.page.goto('/');
		return this;
	}

	async openLibrary() {
		await this.libraryTabBtn.click();
		await this.library.waitForLoad();
	}

	async openStats() {
		await this.statsTabBtn.click();
		await this.stats.waitForCharts();
	}
}
