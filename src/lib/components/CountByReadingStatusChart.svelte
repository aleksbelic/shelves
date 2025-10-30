<script lang="ts">
	import type { ApexOptions } from 'apexcharts';
	import { Chart } from '@flowbite-svelte-plugins/chart';
	import { Card } from 'flowbite-svelte';
	import type { Book } from '$lib/types/Book';

	export let books: Book[] = [];

	const bookCountByReadingStatus = books.reduce(
		(acc, book) => {
			const status = book.readingStatus;
			if (status != null) {
				acc[status] = (acc[status] || 0) + 1;
			} else {
				acc['unknown'] = (acc['unknown'] || 0) + 1;
			}

			return acc;
		},
		{} as Record<string, number>
	);

	const options: ApexOptions = {
		series: [
			bookCountByReadingStatus['finished'],
			bookCountByReadingStatus['in progress'],
			bookCountByReadingStatus['unknown']
		],
		colors: ['#2E3844', '#5B717F', '#9DA3A3'],
		chart: {
			height: 320,
			width: '100%',
			type: 'donut'
		},
		stroke: {
			colors: ['transparent']
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						name: {
							show: true,
							fontFamily: 'Inter, sans-serif',
							offsetY: 20
						},
						total: {
							showAlways: true,
							show: true,
							label: 'Books in library',
							fontFamily: 'Inter, sans-serif'
						},
						value: {
							show: true,
							fontFamily: 'Inter, sans-serif',
							offsetY: -20
						}
					},
					size: '80%'
				}
			}
		},
		grid: {
			padding: {
				top: -2
			}
		},
		labels: ['Finished', 'In progress', 'Unknown'],
		dataLabels: {
			enabled: false
		},
		legend: {
			position: 'bottom',
			fontFamily: 'Inter, sans-serif'
		},
		yaxis: {
			labels: {
				formatter: function (value) {
					return value;
				}
			}
		},
		xaxis: {
			labels: {
				formatter: function (value) {
					return value;
				}
			},
			axisTicks: {
				show: false
			},
			axisBorder: {
				show: false
			}
		}
	};
</script>

<Card class="p-4 md:p-6">
	<div class="flex w-full items-start justify-between">
		<div class="flex-col items-center">
			<div class="mb-1 flex items-center">
				<h5 class="me-1 text-xl leading-none font-bold text-gray-900 dark:text-white">
					Reading status
				</h5>
			</div>
		</div>
	</div>

	<Chart {options} />
</Card>
