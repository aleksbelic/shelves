<script lang="ts">
	import type { ApexOptions } from 'apexcharts';
	import { Chart } from '@flowbite-svelte-plugins/chart';
	import { Card } from 'flowbite-svelte';
	import type { Book } from '#lib/types/index.js';

	let { books = [] }: { books: Book[] } = $props();

	// Track Flowbite dark mode (`dark` class on <html>) so ApexCharts SVG
	// colors follow the theme toggle. The Chart wrapper forwards derived
	// option changes via chart.updateOptions.
	let dark = $state(false);

	$effect(() => {
		if (typeof document === 'undefined') return;
		const root = document.documentElement;
		const sync = () => {
			dark = root.classList.contains('dark');
		};
		sync();
		const observer = new MutationObserver(sync);
		observer.observe(root, { attributes: true, attributeFilter: ['class'] });
		return () => observer.disconnect();
	});

	const textColor = $derived(dark ? '#E5E7EB' : '#111827');
	const palette = $derived(
		dark ? ['#E5E7EB', '#9CA3AF', '#6B7280'] : ['#2E3844', '#5B717F', '#9DA3A3']
	);

	const bookCountByReadingStatus = $derived(
		books.reduce(
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
		)
	);

	const options: ApexOptions = $derived({
		series: [
			bookCountByReadingStatus['finished'] ?? 0,
			bookCountByReadingStatus['in progress'] ?? 0,
			bookCountByReadingStatus['unknown'] ?? 0
		],
		colors: palette,
		theme: { mode: dark ? 'dark' : 'light' },
		chart: {
			height: 320,
			width: '100%',
			type: 'donut',
			background: 'transparent',
			foreColor: textColor
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
							offsetY: 20,
							color: textColor
						},
						total: {
							showAlways: true,
							show: true,
							label: 'Books in library',
							fontFamily: 'Inter, sans-serif',
							color: textColor
						},
						value: {
							show: true,
							fontFamily: 'Inter, sans-serif',
							offsetY: -20,
							color: textColor
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
			fontFamily: 'Inter, sans-serif',
			labels: {
				colors: textColor
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
	});
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
