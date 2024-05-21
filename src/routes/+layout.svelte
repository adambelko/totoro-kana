<script>
	import "../app.css"
	// Styles import
	import "$lib/styles/main.css"

	// Svelte component imports
	import Nav from "$lib/components/Nav.svelte"
</script>

<Nav />

<main>
	<slot />
</main>

<style>
	main {
		max-width: 1120px;
		width: 100%;
		margin: 4rem auto;
	}
</style>
