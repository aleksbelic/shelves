/**
 * Validates if the given ISBN-13 is valid in format (13 digits, optional hyphens).
 * @param isbn string | number
 * @returns boolean
 */
export function isIsbn13Valid(isbn: string | number): boolean {
	const isbnNormalized = isbn.toString().replace(/-/g, '');
	return /^[0-9]{13}$/.test(isbnNormalized);
}
