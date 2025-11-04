<script lang="ts">
	import { Tabs, TabItem, Spinner } from 'flowbite-svelte';
	import { BookSolid, ChartPieSolid, BarcodeOutline } from 'flowbite-svelte-icons';
	import BookTable from '$lib/components/BookTable.svelte';
	import CountByPublisherChart from '$lib/components/CountByPublisherChart.svelte';
	import CountByReadingStatusChart from '$lib/components/CountByReadingStatusChart.svelte';
	import type { Book } from '$lib/types/Book';
	import CountByAuthorChart from '$lib/components/CountByAuthorChart.svelte';
	import { onMount } from 'svelte';

	export let data: { books: Book[] };
	let isLoading = true;

	onMount(() => {
		isLoading = false;
	});
</script>

{#if isLoading}
	<div class="flex h-64 flex-row items-center justify-center space-x-3">
		<Spinner size="10" color="primary" />
		<span class="text-xl dark:text-white">Loading ...</span>
	</div>
{:else}
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
	</Tabs>
{/if}
