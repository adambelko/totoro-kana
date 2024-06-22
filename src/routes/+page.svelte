<script>
	export let data
	$: ({ session, supabase } = data)

	console.log(data)

	async function signOut() {
		const { error } = await supabase.auth.signOut()
	}
</script>

{#if data.session}
	<p>Welcome, {data.session.user.email}</p>
	<button class="variant-filled-primary btn" on:click={signOut}>Sing Out</button>
{:else}
	<p>Let's learn how to register and login users!</p>
	<div class="auth-buttons">
		<a href="/login" class="btn-primary btn">Login</a>
	</div>
{/if}
