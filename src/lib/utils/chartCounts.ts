export const CHART_TOP_N = 30;
export const CHART_MIN_HEIGHT = 220;
export const CHART_MAX_HEIGHT = 960;
export const CHART_ROW_HEIGHT = 24;

/** Sort counts desc, keep top N. Returns entries + hidden count. */
export function topNSorted(
	counts: Record<string, number>,
	n: number = CHART_TOP_N
): { entries: [string, number][]; total: number; hidden: number } {
	const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
	return {
		entries: sorted.slice(0, n),
		total: sorted.length,
		hidden: Math.max(0, sorted.length - n)
	};
}

/** Clamped bar-chart height so 500 categories can't create a 10k-px canvas. */
export function barChartHeight(items: number): number {
	return Math.max(CHART_MIN_HEIGHT, Math.min(items * CHART_ROW_HEIGHT, CHART_MAX_HEIGHT));
}

type BarChartInput = {
	categories: string[];
	data: number[];
	height: number;
};

/** Shared horizontal bar-chart options (ApexCharts). */
export function createBarOptions({
	categories,
	data,
	height
}: BarChartInput): import('apexcharts').ApexOptions {
	return {
		series: [
			{
				name: 'book count',
				color: '#9DA3A3',
				data
			}
		],
		chart: {
			sparkline: {
				enabled: false
			},
			type: 'bar',
			width: '100%',
			height: `${height}px`,
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
			categories,
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
}
