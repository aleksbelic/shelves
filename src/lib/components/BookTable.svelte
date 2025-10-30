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
	import type { Book } from '$lib/types/Book';

	export let books: Book[] = [];
</script>

<Table dataTableOptions={{ searchable: true, sortable: true, perPageSelect: [10, 20, 30] }}>
	<TableHead>
		<TableHeadCell>#</TableHeadCell>
		<TableHeadCell>Title</TableHeadCell>
		<TableHeadCell>Author</TableHeadCell>
		<TableHeadCell>Genre</TableHeadCell>
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
				<TableBodyCell>{book.author.join(', ')}</TableBodyCell>
				<TableBodyCell>{(book.genre ?? []).join(', ')}</TableBodyCell>
				<TableBodyCell>{book.publisher}</TableBodyCell>
				<TableBodyCell>{book.isbn}</TableBodyCell>
				<TableBodyCell>{book.publishYear}</TableBodyCell>
				<TableBodyCell>{book.edition}</TableBodyCell>
				<TableBodyCell>{book.language}</TableBodyCell>
				<TableBodyCell>{book.readingStatus}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<style>
	:global(.datatable-pagination button) {
		cursor: pointer;
	}
</style>
