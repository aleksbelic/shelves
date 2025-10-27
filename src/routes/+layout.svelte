<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import MyNavbar from '$lib/components/MyNavbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Shelves</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<MyNavbar />

{@render children?.()}
