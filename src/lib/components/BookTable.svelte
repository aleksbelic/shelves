<script lang="ts">
	import {
		Badge,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		P
	} from 'flowbite-svelte';

	export let books: any[] = [] as any[];

	function getBadgeColorForGenre(genre: string) {
		switch (genre.toLowerCase()) {
			case 'scy-fi':
				return 'orange';
			case 'horror':
				return 'teal';
			case 'thriller':
				return 'purple';
			case 'romance':
				return 'pink';
			default:
				return 'gray';
		}
	}
</script>

<Table striped={true} hoverable={true}>
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
			<TableBodyRow>
				<TableBodyCell>{index + 1}</TableBodyCell>
				<TableBodyCell><P weight="medium">{book.title}</P></TableBodyCell>
				<TableBodyCell>{book.authors.join(', ')}</TableBodyCell>
				<TableBodyCell>
					{#each book.categories as category}
						{#if category !== null}
							<Badge rounded class="ms-2 font-semibold" color={getBadgeColorForGenre(category)}
								>{category}</Badge
							>
						{/if}
					{/each}
				</TableBodyCell>
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
