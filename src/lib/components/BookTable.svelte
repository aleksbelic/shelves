<script lang="ts">
	import { P } from 'flowbite-svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from '@flowbite-svelte-plugins/datatable';
	import { formatISBN13 } from '$lib/utils/isbn';

	export let books: any[] = [] as any[];
</script>

<Table dataTableOptions={{ searchable: true, sortable: true, perPageSelect: [10, 20, 30] }}>
	<TableHead>
		<TableHeadCell>#</TableHeadCell>
		<TableHeadCell>Title</TableHeadCell>
		<TableHeadCell>Author</TableHeadCell>
		<TableHeadCell>Category</TableHeadCell>
		<TableHeadCell>Publisher</TableHeadCell>
		<TableHeadCell>ISBN</TableHeadCell>
		<TableHeadCell>Publish year</TableHeadCell>
		<TableHeadCell>Edition</TableHeadCell>
		<TableHeadCell>Language</TableHeadCell>
		<TableHeadCell>Reading status</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each books as book, index}
			<TableBodyRow
				class="border-b bg-white last:border-b-0 odd:bg-white even:bg-gray-50 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-600"
			>
				<TableBodyCell>{index + 1}</TableBodyCell>
				<TableBodyCell><P weight="medium">{book.title}</P></TableBodyCell>
				<TableBodyCell>{book.authors.join(', ')}</TableBodyCell>
				<TableBodyCell>{book.categories.join(', ')}</TableBodyCell>
				<TableBodyCell>{book.publisher_name}</TableBodyCell>
				<TableBodyCell>{formatISBN13(book.isbn)}</TableBodyCell>
				<TableBodyCell>{book.publish_year}</TableBodyCell>
				<TableBodyCell>{book.edition}</TableBodyCell>
				<TableBodyCell>{book.language_name}</TableBodyCell>
				<TableBodyCell>{book.reading_status_name}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
