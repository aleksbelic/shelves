<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
	<h1 class="text-4xl font-bold text-gray-900 dark:text-white">
		{page.status}: {page.error?.message ?? 'Something went wrong'}
	</h1>
	<p class="text-gray-500 dark:text-gray-400">
		{#if page.status === 404}
			The page you are looking for does not exist.
		{:else}
			Please try again or return to the library.
		{/if}
	</p>
	<a
		href="/"
		class="rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
	>
		Back to library
	</a>
</div>
