export function formatISBN13(isbn13: string): string {
	if (isbn13.length !== 13) {
		throw Error('Invalid ISBN 13: should not be longer than 13 digits!');
	} else if (!/^\d+$/.test(isbn13)) {
		throw Error('Invalid ISBN 13: should contain digits only!');
	}

	return `${isbn13.slice(0, 3)}-${isbn13.slice(3, 5)}-${isbn13.slice(5, 9)}-${isbn13.slice(9, 12)}-${isbn13.slice(12)}`;
}
