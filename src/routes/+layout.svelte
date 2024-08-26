<script lang="ts">
	import { invalidate } from "$app/navigation"
	import { onMount } from "svelte"
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import Nav from "$lib/components/Nav.svelte"
	import Footer from "$lib/components/Footer.svelte"
	import "../app.css"

	export let data
	$: ({ session, supabase } = data)

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth")
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<Nav {data} />

<main>
	<slot />
</main>

<Footer />

<style>
	main {
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 100%;
		max-width: 980px;
		margin: 0 auto;
	}
</style>
