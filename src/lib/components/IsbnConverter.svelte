<script lang="ts">
	import { Label, Input, Helper } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';

	let isbn13 = '';
	let isbn10 = '';
	let errorIsbn13 = '';
    let errorIsbn10 = '';

	function isbn13To10(isbn13: string): string {
        isbn13 = isbn13.trim();
        
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
			errorIsbn13 = '';
			isbn10 = isbn13To10(isbn13);
		} catch (e) {
			errorIsbn13 = (e as Error).message;
			isbn10 = '';
		}
	}

	function convert10to13(): void {
		try {
			errorIsbn10 = '';
			isbn13 = toIsbn13(isbn10);
		} catch (e) {
			errorIsbn10 = (e as Error).message;
			isbn13 = '';
		}
	}
</script>

<div class="mb-6 width-full sm:w-[400px]">
    <Label for="isbn13" class="mb-2 text-lg font-bold" color={errorIsbn13 ? 'red' : undefined}>ISBN 13</Label>
	<div class="flex flex-row space-x-4">
		<Input id="isbn13" bind:value={isbn13} placeholder="e.g. 978-86-6361-196-2" />
		<button
			on:click={convert13to10}
			class="rounded px-8 py-2 font-bold text-white bg-primary-600 hover:bg-primary-700 cursor-pointer whitespace-nowrap"
		><ArrowRightOutline />ISBN-10</button>
	</div>
    {#if errorIsbn13}
        <Helper class="mt-2 text-sm font-bold" color="red">{errorIsbn13}</Helper>
	{/if}
</div>

<div class="mb-6 width-full sm:w-[400px]">
    <Label for="isbn10" class="mb-2 text-lg font-bold" color={errorIsbn10 ? 'red' : undefined}>ISBN 10</Label>
	<div class="flex flex-col space-y-2 space-x-4 sm:flex-row sm:space-y-0">
		<Input id="isbn10" bind:value={isbn10} placeholder="e.g. 86-6361-196-X" />
		<button
			on:click={convert10to13}
			class="rounded px-8 py-2 font-bold text-white bg-primary-600 hover:bg-primary-700 cursor-pointer"
		><ArrowRightOutline />ISBN-13</button>
	</div>
    {#if errorIsbn10}
        <Helper class="mt-2 text-sm font-bold" color="red">{errorIsbn10}</Helper>
	{/if}
</div>
