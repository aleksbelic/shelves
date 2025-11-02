<script lang="ts">
	import { Input } from 'flowbite-svelte';

	let isbn13: string = '';
	let isbn10: string = '';
	let error: string = '';

	function isbn13To10(isbn13: string): string {
		if (!/^[0-9-]+$/.test(isbn13)) {
			throw new Error('ISBN 13 invalid format: only digits and hyphens are allowed');
		} else if (isbn13.split('-').length - 1 !== 4) {
			throw new Error('ISBN 13 invalid format: must contain 13 digits and 4 hyphens');
		} else if (!isbn13.startsWith('978')) {
			throw new Error('ISBN 13 invalid format: must start with "978" to be convertible to ISBN 10');
		}

		const isbn13Core: string = isbn13.slice(4, -1); // removing "978-" prefix and check digit ath the end

		const isbn13CoreSum: number = isbn13Core
			.replace(/-/g, '')
			.split('')
			.map(Number)
			.reduce((acc, digit, index) => acc + digit * (index + 1), 0);

		const isbn13CoreSumReminder: number = isbn13CoreSum % 11;

		const isbn10CheckDigit: string =
			isbn13CoreSumReminder === 10 ? 'X' : isbn13CoreSumReminder.toString();

		return isbn13Core + isbn10CheckDigit;
	}

	function toIsbn13(isbn10: string): string {
		const digits = isbn10.replace(/-/g, '').toUpperCase();
		if (!/^\d{9}[\dX]$/.test(digits)) {
			throw new Error('Invalid ISBN-10 format');
		}

		const core = `978${digits.slice(0, 9)}`;
		const sum: number = core
			.split('')
			.map(Number)
			.reduce((acc, digit, i) => acc + digit * (i % 2 === 0 ? 1 : 3), 0);
		const check: number = (10 - (sum % 10)) % 10;

		return `${core}${check}`;
	}

	function convert13to10(): void {
		try {
			error = '';
			isbn10 = isbn13To10(isbn13);
		} catch (e) {
			error = (e as Error).message;
			isbn10 = '';
		}
	}

	function convert10to13(): void {
		try {
			error = '';
			isbn13 = toIsbn13(isbn10);
		} catch (e) {
			error = (e as Error).message;
			isbn13 = '';
		}
	}
</script>

<div>
	<div class="flex flex-col space-y-2 space-x-4 sm:flex-row sm:space-y-0">
		<Input bind:value={isbn13} placeholder="Enter ISBN 13, e.g. 978-86-6361-196-2" size="lg" />
		<button
			on:click={convert13to10}
			class="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
		>
			Convert to ISBN-10
		</button>
	</div>

	<hr class="my-4" />

	<div class="flex flex-col space-y-2 space-x-4 sm:flex-row sm:space-y-0">
		<Input bind:value={isbn10} placeholder="Enter ISBN 10, e.g. 86-6361-196-X" size="lg" />
		<button
			on:click={convert10to13}
			class="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
		>
			Convert to ISBN-13
		</button>
	</div>

	{#if error}
		<p class="mt-4 font-medium text-red-600">{error}</p>
	{/if}
</div>
