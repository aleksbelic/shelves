<script lang="ts">
	import type { ApexOptions } from 'apexcharts';
	import { Chart } from '@flowbite-svelte-plugins/chart';
	import { Card } from 'flowbite-svelte';
	import type { Book } from '$lib/types';
	import { barChartHeight, createBarOptions, topNSorted } from '$lib/utils/chartCounts';

	let { books = [] }: { books: Book[] } = $props();

	const bookCountByAuthor = $derived(
		books.reduce(
			(acc, book) => {
				book.author?.forEach((name) => {
					if (name) acc[name] = (acc[name] || 0) + 1;
				});
				return acc;
			},
			{} as Record<string, number>
		)
	);

	const topAuthors = $derived(topNSorted(bookCountByAuthor));

	const options: ApexOptions = $derived(
		createBarOptions({
			categories: topAuthors.entries.map(([name]) => name),
			data: topAuthors.entries.map(([, count]) => count),
			height: barChartHeight(topAuthors.entries.length)
		})
	);
</script>

<Card class="p-4 md:p-6">
	<div class="flex justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
		<dl>
			<dt class="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">Authors</dt>
			<dd class="text-3xl leading-none font-bold text-gray-900 dark:text-white">
				{Object.keys(bookCountByAuthor).length}
			</dd>
			{#if topAuthors.hidden > 0}
				<dd class="pt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
					Showing top {topAuthors.entries.length} of {topAuthors.total}
				</dd>
			{/if}
		</dl>
	</div>

	<Chart {options} />
</Card>
