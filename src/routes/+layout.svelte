<script>
	import "../app.css"
	import "$lib/styles/main.css"

	import Nav from "$lib/components/Nav.svelte"
</script>

<Nav />

<main>
	<slot />
</main>

<style>
	main {
		max-width: 980px;
		width: 100%;
		margin: auto;
	}
</style>
