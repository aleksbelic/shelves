import { error } from '@sveltejs/kit';
import { supabase } from '#lib/supabaseClient.js';
import { BOOK_COLUMNS, type Book, type BookRow } from '#lib/types/index.js';

export async function load() {
	const { data, error: sbError } = await supabase
		.from('books_full_view')
		.select(BOOK_COLUMNS.join(','))
		.order('title');

	if (sbError) throw error(500, `Failed to load books: ${sbError.message}`);

	const books: Book[] = ((data ?? []) as unknown as BookRow[]).map((book) => ({
		id: book.id,
		title: book.title,
		author: book.author ?? [],
		genre: book.genre ?? [],
		publisher: book.publisher_name ?? '',
		isbn13: book.isbn_13 ?? '',
		publishYear: book.publish_year ?? null,
		edition: book.edition ?? null,
		language: book.language_name ?? '',
		readingStatus: book.reading_status_name ?? null
	}));

	return { books };
}
