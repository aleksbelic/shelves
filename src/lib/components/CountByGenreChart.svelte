<script lang="ts">
	import type { ApexOptions } from 'apexcharts';
	import { Chart } from '@flowbite-svelte-plugins/chart';
	import { Card, Popover } from 'flowbite-svelte';
	import type { Book } from '$lib/types/Book';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	export let books: Book[] = [];

	const bookCountByGenre = books.reduce(
		(acc, book) => {
			const genre = book.genre;
			genre?.forEach((genreName) => {
				if (genreName !== null) {
					acc[genreName] = (acc[genreName] || 0) + 1;
				}
			});

			return acc;
		},
		{} as Record<string, number>
	);

	const bookCountByGenreSorted = Object.fromEntries(
		Object.entries(bookCountByGenre).sort(([, a], [, b]) => b - a)
	);

	const options: ApexOptions = {
		series: [
			{
				name: 'book count',
				color: '#9DA3A3',
				data: bookCountByGenreSorted ? Object.values(bookCountByGenreSorted) : []
			}
		],
		chart: {
			sparkline: {
				enabled: false
			},
			type: 'bar',
			width: '100%',
			height: '1000px',
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
			categories: bookCountByGenreSorted ? Object.keys(bookCountByGenreSorted) : [],
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
				{bookCountByGenre ? Object.keys(bookCountByGenre).length : 0}
			</dd>
		</dl>
	</div>

	<Chart {options} />
</Card>
