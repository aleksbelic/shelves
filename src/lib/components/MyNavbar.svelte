<script lang="ts">
	import { Button, DarkMode } from 'flowbite-svelte';
	import { ChartPieOutline } from 'flowbite-svelte-icons';
</script>

<div class="mb-4 flex items-start justify-between">
	<span></span>
	<img
		src="/images/shelves-logo.png"
		class="mr-2 h-24 w-auto sm:h-24 md:h-26 lg:h-30"
		alt="Shelves logo"
	/>
	<div>
		<Button
			class="bg-0 border border-primary-500 p-2.5 hover:bg-gray-100 focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
		>
			<ChartPieOutline class="text-primary-500 dark:text-primary-600" />
		</Button>
		<DarkMode class="border text-primary-500 dark:border-gray-600 dark:text-primary-600" />
	</div>
</div>
