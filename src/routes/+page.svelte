<script lang="ts">
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { BookSolid, ChartPieSolid } from 'flowbite-svelte-icons';
	import BookTable from '$lib/components/BookTable.svelte';
	import CountByPublisherChart from '$lib/components/CountByPublisherChart.svelte';
	import CountByReadingStatusChart from '$lib/components/CountByReadingStatusChart.svelte';
	import type { Book } from '$lib/types/Book';

	export let data: { books: Book[] };
</script>

<Tabs tabStyle="underline">
	<TabItem open>
		{#snippet titleSlot()}
			<div class="flex items-center gap-2">
				<BookSolid size="md" />
				Library
			</div>
		{/snippet}
		<BookTable books={data.books} />
	</TabItem>
	<TabItem>
		{#snippet titleSlot()}
			<div class="flex items-center gap-2">
				<ChartPieSolid size="md" />
				Stats
			</div>
		{/snippet}

		<div class="flex w-full flex-col items-start justify-center gap-4 md:flex-row">
			<CountByPublisherChart books={data.books} />
			<CountByReadingStatusChart books={data.books} />
		</div>
	</TabItem>
</Tabs>
