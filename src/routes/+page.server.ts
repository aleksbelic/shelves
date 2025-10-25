import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data } = await supabase.from('books_full_view').select('*').order('title');
	return {
		books: data ?? []
	};
}
