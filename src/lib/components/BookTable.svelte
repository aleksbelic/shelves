<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let books: any[] = [] as any[];

	// TODO: use only {items} object and not books directly: https://flowbite-svelte.com/docs/components/table#table-from-data
</script>

<Table striped={true} hoverable={true}>
	<TableHead>
		<TableHeadCell>#</TableHeadCell>
		<TableHeadCell>Title</TableHeadCell>
		<TableHeadCell>Author</TableHeadCell>
		<TableHeadCell>Publisher</TableHeadCell>
		<TableHeadCell>ISBN</TableHeadCell>
		<TableHeadCell>Publish year</TableHeadCell>
		<TableHeadCell>Edition</TableHeadCell>
		<TableHeadCell>Language</TableHeadCell>
		<TableHeadCell>Reading status</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each books as book, index}
			<TableBodyRow>
				<TableBodyCell>{index + 1}</TableBodyCell>
				<TableBodyCell>{book.title}</TableBodyCell>
				<TableBodyCell>{book.authors.join(', ')}</TableBodyCell>
				<TableBodyCell>{book.publisher_name}</TableBodyCell>
				<TableBodyCell>{book.isbn}</TableBodyCell>
				<TableBodyCell>{book.publish_year}</TableBodyCell>
				<TableBodyCell>{book.edition}</TableBodyCell>
				<TableBodyCell>{book.language_name}</TableBodyCell>
				<TableBodyCell>{book.reading_status_name}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
