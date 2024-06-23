<script lang="ts">
	export let data
	$: ({ supabase } = data)

	async function signOut() {
		const { error } = await supabase.auth.signOut()
	}
</script>

<button class="variant-filled-primary btn mt-4" on:click={signOut}>Log Out</button>
