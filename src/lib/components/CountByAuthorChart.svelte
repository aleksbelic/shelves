<script lang="ts">
	import type { ApexOptions } from 'apexcharts';
	import { Chart } from '@flowbite-svelte-plugins/chart';
	import { Card } from 'flowbite-svelte';
	import type { Book } from '$lib/types/Book';

	export let books: Book[] = [];

	const bookCountByAuthor = books.reduce(
		(acc, book) => {
			const author = book.author;
			if (author != null && Array.isArray(author) && author.length !== 0) {
				author.forEach((name) => {
					const key = String(name ?? 'unknown');
					acc[key] = (acc[key] || 0) + 1;
				});
			}

			return acc;
		},
		{} as Record<string, number>
	);

	const bookCountByAuthorSorted = Object.fromEntries(
		Object.entries(bookCountByAuthor).sort(([, a], [, b]) => b - a)
	);

	const options: ApexOptions = {
		series: [
			{
				name: 'book count',
				color: '#9DA3A3',
				data: bookCountByAuthorSorted ? Object.values(bookCountByAuthorSorted) : []
			}
		],
		chart: {
			sparkline: {
				enabled: false
			},
			type: 'bar',
			width: '100%',
			height: '700px',
			toolbar: {
				show: false
			}
		},
		fill: {
			opacity: 1
		},
		plotOptions: {
			bar: {
				horizontal: true,
				columnWidth: '100%',
				borderRadiusApplication: 'end',
				borderRadius: 3,
				dataLabels: {
					position: 'top'
				}
			}
		},
		legend: {
			show: true,
			position: 'bottom'
		},
		dataLabels: {
			enabled: false
		},
		tooltip: {
			shared: true,
			intersect: false
		},
		xaxis: {
			labels: {
				show: true,
				style: {
					fontFamily: 'Inter, sans-serif',
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				}
			},
			categories: bookCountByAuthorSorted ? Object.keys(bookCountByAuthorSorted) : [],
			axisTicks: {
				show: false
			},
			axisBorder: {
				show: false
			}
		},
		yaxis: {
			labels: {
				show: true,
				style: {
					fontFamily: 'Inter, sans-serif',
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				}
			}
		},
		grid: {
			show: true,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: -20
			}
		}
	};
</script>

<Card class="p-4 md:p-6">
	<div class="flex justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
		<dl>
			<dt class="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">Authors</dt>
			<dd class="text-3xl leading-none font-bold text-gray-900 dark:text-white">
				{bookCountByAuthor ? Object.keys(bookCountByAuthor).length : 0}
			</dd>
		</dl>
	</div>

	<Chart {options} />
</Card>
