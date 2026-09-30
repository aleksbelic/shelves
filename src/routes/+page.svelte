<script lang="ts">
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { BookSolid, ChartPieSolid } from 'flowbite-svelte-icons';
	import BookTable from '$lib/components/BookTable.svelte';
	import type { Book } from '$lib/types';
	import CountByPublisherChart from '$lib/components/CountByPublisherChart.svelte';
	import CountByReadingStatusChart from '$lib/components/CountByReadingStatusChart.svelte';
	import CountByAuthorChart from '$lib/components/CountByAuthorChart.svelte';
	import CountByGenreChart from '$lib/components/CountByGenreChart.svelte';

	let { data }: { data: { books: Book[] } } = $props();
	let statsOpen = $state(false);
</script>

<Tabs tabStyle="underline">
	<TabItem data-testid="library-tab-btn" open>
		{#snippet titleSlot()}
			<div class="flex cursor-pointer items-center gap-2">
				<BookSolid size="md" />
				Library
			</div>
		{/snippet}
		<BookTable books={data.books} />
	</TabItem>
	<TabItem data-testid="stats-tab-btn" bind:open={statsOpen}>
		{#snippet titleSlot()}
			<div class="flex cursor-pointer items-center gap-2">
				<ChartPieSolid size="md" />
				Stats
			</div>
		{/snippet}

		{#if statsOpen}
			<div class="flex w-full flex-col items-start justify-center gap-4 md:flex-row">
				<CountByReadingStatusChart books={data.books} />
				<CountByGenreChart books={data.books} />
				<CountByAuthorChart books={data.books} />
				<CountByPublisherChart books={data.books} />
			</div>
		{/if}
	</TabItem>
</Tabs>
