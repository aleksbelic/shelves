import { describe, it, expect } from 'vitest';
import { isIsbn13Valid } from './isbn13.js';

describe('isIsbn13Valid', () => {
	describe('valid ISBNs', () => {
		it.each([
			'9780306406157',
			'9783161484100',
			'9780131103627',
			'9781861972712',
			'978-0-306-40615-7',
			'978-3-16-148410-0',
			'978-0-13-110362-7'
		])('accepts valid ISBN-13 %s', (isbn) => {
			expect(isIsbn13Valid(isbn)).toBe(true);
		});

		it('accepts a numeric ISBN-13', () => {
			expect(isIsbn13Valid(9780306406157)).toBe(true);
		});
	});

	describe('invalid checksums', () => {
		it.each(['9780306406158', '9780131103628', '978-0-306-40615-8'])(
			'rejects %s (bad mod-10 checksum)',
			(isbn) => {
				expect(isIsbn13Valid(isbn)).toBe(false);
			}
		);
	});

	describe('malformed input', () => {
		it.each([
			'',
			'   ',
			'978030640615', // 12 digits
			'97803064061571', // 14 digits
			'978030640615x', // non-digit
			'978 0306406157', // spaces are not stripped, only hyphens
			'not-an-isbn',
			'978-0-306-40615', // too short with hyphens
			'--',
			'-------------' // 13 hyphens -> empty after stripping
		])('rejects malformed input %s', (isbn) => {
			expect(isIsbn13Valid(isbn)).toBe(false);
		});

		it('treats empty input as invalid (false), not throwing', () => {
			expect(isIsbn13Valid('')).toBe(false);
		});
	});
});
