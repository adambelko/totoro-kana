<script lang="ts">
	export let data
	$: ({ session, supabase } = data)

	async function signInWithGithub() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: `/auth/callback`
			}
		})

		if (data?.url) {
			window.location.href = data.url
		} else {
			console.error(error)
		}
	}
</script>

<main>
	<h3 class="h3 p-4">Login</h3>
	<button
		formaction="?/login&provider=github"
		class="variant-filled-primary btn"
		on:click={signInWithGithub}>Github</button
	>
</main>
