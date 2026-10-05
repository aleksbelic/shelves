import { describe, it, expect } from 'vitest';
import {
	barChartHeight,
	topNSorted,
	CHART_TOP_N,
	CHART_MIN_HEIGHT,
	CHART_MAX_HEIGHT,
	CHART_ROW_HEIGHT
} from './chartCounts.js';

describe('topNSorted', () => {
	it('returns empty result for empty input', () => {
		expect(topNSorted({})).toEqual({ entries: [], total: 0, hidden: 0 });
	});

	it('sorts counts descending', () => {
		const result = topNSorted({ a: 1, b: 5, c: 3 });
		expect(result.entries).toEqual([
			['b', 5],
			['c', 3],
			['a', 1]
		]);
		expect(result.total).toBe(3);
		expect(result.hidden).toBe(0);
	});

	it('keeps only top N and reports hidden count', () => {
		const result = topNSorted({ a: 1, b: 5, c: 3 }, 2);
		expect(result.entries).toEqual([
			['b', 5],
			['c', 3]
		]);
		expect(result.total).toBe(3);
		expect(result.hidden).toBe(1);
	});

	it('returns hidden 0 when n exceeds total', () => {
		const result = topNSorted({ a: 2, b: 1 }, 10);
		expect(result.entries).toHaveLength(2);
		expect(result.total).toBe(2);
		expect(result.hidden).toBe(0);
	});

	it('returns no entries and hidden === total when n is 0', () => {
		const result = topNSorted({ a: 2, b: 1 }, 0);
		expect(result.entries).toEqual([]);
		expect(result.total).toBe(2);
		expect(result.hidden).toBe(2);
	});

	it('defaults to CHART_TOP_N entries', () => {
		const counts = Object.fromEntries(Array.from({ length: 50 }, (_, i) => [`cat-${i}`, i]));
		const result = topNSorted(counts);
		expect(result.entries).toHaveLength(CHART_TOP_N);
		expect(result.total).toBe(50);
		expect(result.hidden).toBe(50 - CHART_TOP_N);
		// Highest count first
		expect(result.entries[0]).toEqual(['cat-49', 49]);
	});
});

describe('barChartHeight', () => {
	it('clamps small inputs to CHART_MIN_HEIGHT', () => {
		expect(barChartHeight(0)).toBe(CHART_MIN_HEIGHT);
		expect(barChartHeight(1)).toBe(CHART_MIN_HEIGHT);
		expect(barChartHeight(5)).toBe(CHART_MIN_HEIGHT); // 5 * 24 = 120 < 220
	});

	it('scales linearly in the middle range', () => {
		expect(barChartHeight(10)).toBe(10 * CHART_ROW_HEIGHT); // 240
		expect(barChartHeight(30)).toBe(30 * CHART_ROW_HEIGHT); // 720
	});

	it('clamps large inputs to CHART_MAX_HEIGHT', () => {
		expect(barChartHeight(40)).toBe(CHART_MAX_HEIGHT); // 40 * 24 = 960
		expect(barChartHeight(100)).toBe(CHART_MAX_HEIGHT);
		expect(barChartHeight(500)).toBe(CHART_MAX_HEIGHT); // the 10k-px canvas case
	});

	it('clamps negative inputs to CHART_MIN_HEIGHT', () => {
		expect(barChartHeight(-5)).toBe(CHART_MIN_HEIGHT);
	});
});
