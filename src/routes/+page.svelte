<script>
	export let data;
</script>

<h1 data-testid="title">&#128218; Shelves</h1>

<table data-testid="books-table">
	<thead>
		<tr>
			<th>#</th>
			<th>Title</th>
			<th>Author</th>
			<th>Publisher</th>
			<th>ISBN</th>
			<th>Publish year</th>
			<th>Edition</th>
			<th>Language</th>
			<th>Reading status</th>
		</tr>
	</thead>
	<tbody>
		{#each data.books as book, index}
			<tr>
				<td>{index + 1}</td>
				<td>{book.title}</td>
				<td>{book.authors.join(', ')}</td>
				<td>{book.publisher_name}</td>
				<td>{book.isbn}</td>
				<td>{book.publish_year}</td>
				<td>{book.edition}</td>
				<td>{book.language_name}</td>
				<td>{book.reading_status}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	:global(body) {
		font-family: Arial, sans-serif;
		margin: 20px;
	}
	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	/* book title */
	td:nth-child(2) {
		font-weight: bold;
	}

	th,
	td:nth-child(1),
	td:nth-child(6),
	td:nth-child(7) {
		text-align: center;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
	}
</style>
