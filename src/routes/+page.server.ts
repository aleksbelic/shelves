import { supabase } from '$lib/supabaseClient';
import type { Book } from '$lib/types/Book';

export async function load() {
	const { data } = await supabase.from('books_full_view').select('*').order('title');

	const books: Book[] = (data ?? []).map((book: any) => ({
		id: book.id,
		title: book.title,
		author: book.author ?? [],
		genre: book.genre ?? [],
		publisherName: book.publisher_name ?? '',
		isbn: book.isbn ?? '',
		publishYear: book.publish_year ?? null,
		edition: book.edition ?? null,
		languageName: book.language_name ?? '',
		readingStatus: book.reading_status_name ?? null
	}));

	return { books };
}
