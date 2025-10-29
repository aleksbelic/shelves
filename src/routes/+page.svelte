<script lang="ts">
	import BookTable from '$lib/components/BookTable.svelte';
	import type { Book } from '$lib/types/Book';
	import CountByPublisherChart from '$lib/components/CountByPublisherChart.svelte';
	import CountByReadingStatusChart from '$lib/components/CountByReadingStatusChart.svelte';
	export let data: { books: Book[] };
</script>

<div class="flex flex-col md:flex-row gap-4 justify-center items-start w-full">
	<CountByPublisherChart books={data.books} />
	<CountByReadingStatusChart books={data.books} />
</div>
<BookTable books={data.books} />
