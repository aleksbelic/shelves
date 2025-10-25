<script>
	import BookTable from '$lib/components/BookTable.svelte';
	export let data;
</script>

<h1 data-testid="title">&#128218; Shelves</h1>

<BookTable books={data.books} />

