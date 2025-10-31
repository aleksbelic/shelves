[![Live demo](https://img.shields.io/badge/demo-live-brightgreen)](https://shelves-three.vercel.app)

# Shelves 📚

A small SvelteKit app for browsing and visualizing a books dataset. It uses PostgreSQL DB for data (hosted on [Supabase](https://supabase.com/)) and [Flowbite-Svelte](https://flowbite-svelte.com) for UI components and charts ().

Please check live demo @ https://shelves-three.vercel.app

![App screenshot](./static/screenshots/demo.png)

## Features

- Server-side data loading from Supabase.
- Interactive table (paginated, searchable, sortable) with `@flowbite-svelte-plugins/datatable`.
- Charts showing counts by author / publisher / reading status etc., built with Flowbite chart plugin `@flowbite-svelte-plugins/chart`.
- Light/Dark mode toggle.
- Responsive layout.
