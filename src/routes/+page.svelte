<script lang="ts">
	import BookTable from '$lib/components/BookTable.svelte';
	import type { Book } from '$lib/types/Book';
	export let data: { books: Book[] };
</script>

<BookTable books={data.books} />
