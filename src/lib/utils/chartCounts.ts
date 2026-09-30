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
