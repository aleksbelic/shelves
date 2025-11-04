<script lang="ts">
	import { DarkMode } from 'flowbite-svelte';
</script>

<div class="relative flex items-center justify-center">
	<img
		src="/images/shelves-logo.png"
		class="h-24 w-auto sm:h-24 md:h-26 lg:h-30"
		alt="Shelves logo"
		data-testid="shelves-logo"
	/>
	<div class="absolute top-0 right-0">
		<DarkMode
			class="cursor-pointer border text-primary-500 dark:border-gray-600 dark:text-primary-600"
			data-testid="theme-toggle-btn"
		/>
	</div>
</div>
