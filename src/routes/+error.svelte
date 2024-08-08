<script>
	import { page } from "$app/stores"
	import { goto } from "$app/navigation"
	import { onMount } from "svelte"

	export let data
	const { session } = data

	onMount(() => {
		setTimeout(() => {
			session ? goto("/learn/hiragana") : goto("/")
		}, 2000)
	})
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<div class="mt-4 flex justify-center bg-white/30 p-6 rounded-container-token">
	{#if $page.status === 404}
		<h2 class="h2">Not found</h2>
	{:else}
		<h2 class="h2">Something went wrong</h2>
	{/if}
</div>
