<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { DarkMode } from 'flowbite-svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Shelves</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="m-4 flex justify-end-safe">
	<DarkMode class="border" />
</div>

{@render children?.()}
