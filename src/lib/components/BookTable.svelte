<script lang="ts">
	import { P, Spinner } from 'flowbite-svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from '@flowbite-svelte-plugins/datatable';
	import type { Book } from '$lib/types';
	import { isIsbn13Valid } from '$lib/utils/isbn13';
	import { ExclamationCircleOutline, ExclamationCircleSolid } from 'flowbite-svelte-icons';

	let { books = [] }: { books: Book[] } = $props();

	let tableReady = $state(false);
	// Validate ISBNs once per data change (not per render): empty ISBNs are
	// neutral and show no warning icon.
	const rows = $derived(
		books.map((book) => ({
			...book,
			isbnValid: !book.isbn13 || isIsbn13Valid(book.isbn13)
		}))
	);
</script>

{#if !tableReady}
	<div
		data-testid="books-table-loader"
		class="flex h-64 flex-row items-center justify-center space-x-3"
	>
		<Spinner size="10" color="primary" />
		<span class="text-xl dark:text-white">Loading ...</span>
	</div>
{/if}
<div class:hidden={!tableReady}>
	<Table
		dataTableOptions={{ searchable: true, sortable: true, perPageSelect: [10, 20, 30, 50, 100] }}
		data-testid="books-table"
		onInitComplete={() => (tableReady = true)}
		onInitError={() => (tableReady = true)}
	>
		<TableHead>
			<TableHeadCell>#</TableHeadCell>
			<TableHeadCell>Title</TableHeadCell>
			<TableHeadCell>Author</TableHeadCell>
			<TableHeadCell>Genre</TableHeadCell>
			<TableHeadCell>Publisher</TableHeadCell>
			<TableHeadCell>ISBN 13</TableHeadCell>
			<TableHeadCell>Publish year</TableHeadCell>
			<TableHeadCell>Edition</TableHeadCell>
			<TableHeadCell>Language</TableHeadCell>
			<TableHeadCell>Reading status</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each rows as book, index (book.id)}
				<TableBodyRow
					class="border-b bg-white last:border-b-0 odd:bg-white even:bg-gray-50 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-600"
				>
					<TableBodyCell>{index + 1}</TableBodyCell>
					<TableBodyCell><P weight="medium">{book.title}</P></TableBodyCell>
					<TableBodyCell>{book.author.join(', ')}</TableBodyCell>
					<TableBodyCell>{(book.genre ?? []).join(', ')}</TableBodyCell>
					<TableBodyCell>{book.publisher}</TableBodyCell>
					<TableBodyCell>
						{book.isbn13}
						{#if !book.isbnValid}
							<ExclamationCircleSolid
								id="invalid-isbn13-icon-light"
								class="ml-1 h-6 w-6 text-yellow-500 dark:hidden"
							/>
							<ExclamationCircleOutline
								id="invalid-isbn13-icon-dark"
								class="ml-1 hidden h-6 w-6 text-yellow-500 dark:inline"
							/>
						{/if}
					</TableBodyCell>
					<TableBodyCell class="text-center">{book.publishYear}</TableBodyCell>
					<TableBodyCell class="text-center">{book.edition}</TableBodyCell>
					<TableBodyCell>{book.language}</TableBodyCell>
					<TableBodyCell class="text-center">{book.readingStatus}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>

<style>
	:global(.datatable-pagination button) {
		cursor: pointer;
	}
</style>
