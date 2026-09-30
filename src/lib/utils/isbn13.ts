/**
 * Validates an ISBN-13: 13 digits (hyphens allowed) plus a valid mod-10 checksum.
 * Empty/missing values return false — callers should treat empty as neutral
 * (no warning icon), not as invalid.
 * @param isbn string | number
 * @returns boolean
 */
export function isIsbn13Valid(isbn: string | number): boolean {
	const isbnNormalized = isbn.toString().replace(/-/g, '');
	if (!/^[0-9]{13}$/.test(isbnNormalized)) return false;

	let sum = 0;
	for (let i = 0; i < 13; i++) {
		const digit = Number(isbnNormalized[i]);
		sum += i % 2 === 0 ? digit : digit * 3;
	}
	return sum % 10 === 0;
}
