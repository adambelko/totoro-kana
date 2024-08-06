<script lang="ts">
	import { goto } from "$app/navigation"

	export let data
	$: ({ supabase } = data)

	const signOut = async () => {
		await supabase.auth.signOut()
	}
</script>

<button class="variant-filled-primary btn mt-4" on:click={signOut}>Log Out</button>
