<script>
	import { goto, invalidate } from "$app/navigation"
	import { onMount } from "svelte"

	import "../app.css"
	import "$lib/styles/main.css"
	import Nav from "$lib/components/Nav.svelte"

	export let data
	$: ({ session, supabase } = data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				/**
				 * Queue this as a task so the navigation won't prevent the
				 * triggering function from completing
				 */
				setTimeout(() => {
					goto("/", { invalidateAll: true })
				})
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth")
			}
		})

		return () => data.subscription.unsubscribe()
	})
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
