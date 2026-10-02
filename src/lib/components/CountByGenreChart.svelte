<script lang="ts">
	import type { ApexOptions } from 'apexcharts';
	import { Chart } from '@flowbite-svelte-plugins/chart';
	import { Card, Popover } from 'flowbite-svelte';
	import type { Book } from '#lib/types/index.js';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import { barChartHeight, createBarOptions, topNSorted } from '#lib/utils/chartCounts.js';

	let { books = [] }: { books: Book[] } = $props();

	const bookCountByGenre = $derived(
		books.reduce(
			(acc, book) => {
				book.genre?.forEach((genreName) => {
					if (genreName) {
						acc[genreName] = (acc[genreName] || 0) + 1;
					}
				});

				return acc;
			},
			{} as Record<string, number>
		)
	);

	const topGenres = $derived(topNSorted(bookCountByGenre));

	const options: ApexOptions = $derived(
		createBarOptions({
			categories: topGenres.entries.map(([name]) => name),
			data: topGenres.entries.map(([, count]) => count),
			height: barChartHeight(topGenres.entries.length)
		})
	);
</script>

<Card class="p-4 md:p-6">
	<div class="flex justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
		<dl>
			<dt
				class="inline-flex items-center pb-1 text-base font-normal text-gray-500 dark:text-gray-400"
			>
				Genres <InfoCircleSolid
					id="genres-info"
					class="ms-1 h-3.5 w-3.5 cursor-pointer text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
				/>
			</dt>

			<Popover
				triggeredBy="#genres-info"
				class="z-10 w-72 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 shadow-xs dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
			>
				<div class="space-y-2 p-3">
					<p>
						Each book may belong to multiple genres or none. Books without a genre are excluded from
						this count.
					</p>
				</div>
			</Popover>
			<dd class="text-3xl leading-none font-bold text-gray-900 dark:text-white">
				{Object.keys(bookCountByGenre).length}
			</dd>
			{#if topGenres.hidden > 0}
				<dd class="pt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
					Showing top {topGenres.entries.length} of {topGenres.total}
				</dd>
			{/if}
		</dl>
	</div>

	<Chart {options} />
</Card>
