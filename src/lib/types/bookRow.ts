export type BookRow = {
	id: number;
	title: string;
	author: string[] | null;
	genre: string[] | null;
	publisher_name: string | null;
	isbn_13: string | null;
	publish_year: number | null;
	edition: string | null;
	language_name: string | null;
	reading_status_name: string | null;
};

export const BOOK_COLUMNS = [
	'id',
	'title',
	'author',
	'genre',
	'publisher_name',
	'isbn_13',
	'publish_year',
	'edition',
	'language_name',
	'reading_status_name'
];
