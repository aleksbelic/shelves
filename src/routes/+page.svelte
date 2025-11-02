<script lang="ts">
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { BookSolid, ChartPieSolid, BarcodeOutline } from 'flowbite-svelte-icons';
	import BookTable from '$lib/components/BookTable.svelte';
	import CountByPublisherChart from '$lib/components/CountByPublisherChart.svelte';
	import CountByReadingStatusChart from '$lib/components/CountByReadingStatusChart.svelte';
	import type { Book } from '$lib/types/Book';
	import CountByAuthorChart from '$lib/components/CountByAuthorChart.svelte';
	import IsbnConverter from '$lib/components/IsbnConverter.svelte';

	export let data: { books: Book[] };
</script>

<Tabs tabStyle="underline">
	<TabItem open>
		{#snippet titleSlot()}
			<div class="flex cursor-pointer items-center gap-2">
				<BookSolid size="md" />
				Library
			</div>
		{/snippet}
		<BookTable books={data.books} />
	</TabItem>
	<TabItem>
		{#snippet titleSlot()}
			<div class="flex cursor-pointer items-center gap-2">
				<ChartPieSolid size="md" />
				Stats
			</div>
		{/snippet}

		<div class="flex w-full flex-col items-start justify-center gap-4 md:flex-row">
			<CountByReadingStatusChart books={data.books} />
			<CountByAuthorChart books={data.books} />
			<CountByPublisherChart books={data.books} />
		</div>
	</TabItem>
	<TabItem>
		{#snippet titleSlot()}
			<div class="flex cursor-pointer items-center gap-2">
				<BarcodeOutline size="md" />
				ISBN Converter
			</div>
		{/snippet}
		<IsbnConverter />
	</TabItem>
</Tabs>
