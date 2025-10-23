<script>
	import { onMount } from 'svelte';
	import { Grid, h } from 'gridjs';
	import 'gridjs/dist/theme/mermaid.css';

	export let books = [];

	let bookTableWrapper;

	onMount(() => {
		new Grid({
			columns: [
				'#',
				'Title',
				'Author',
				'Publisher',
				'Category',
				'ISBN',
				{ id: 'publish-year', name: 'Publish year' },
				'Edition',
				'Language',
				{ id: 'reading-status', name: 'Reading status' }
			],
			search: true,
			sort: true,
			pagination: {
				enabled: true,
				limit: 15
			},
			data: (books || []).map((book, index) => [
				index + 1,
				book.title,
				(book.authors || []).join(', '),
				book.publisher_name,
				(book.categories || []).join(', '),
				book.isbn,
				book.publish_year,
				book.edition,
				book.language_name,
				book.reading_status_name
			]),
			style: {
				th: {
					'text-align': 'center'
				}
			}
		}).render(bookTableWrapper);
	});
</script>

<div bind:this={bookTableWrapper}></div>
