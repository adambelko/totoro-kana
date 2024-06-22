<script lang="ts">
	export let data
	$: ({ session, supabase } = data)

	async function signInWithGithub() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: "http://localhost:5173/study"
			}
		})
	}
</script>

<main>
	<h3 class="h3 p-4">Login</h3>
	<button class="variant-filled-primary btn" on:click={signInWithGithub}>Github</button>
</main>
