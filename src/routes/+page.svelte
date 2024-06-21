<script>
	export let data
	console.log(data)
</script>

{#if data.session}
	<p>Welcome, {data.session.user.email}</p>
{:else}
	<p>Let's learn how to register and login users!</p>
	<div class="auth-buttons">
		<a href="/login" class="btn-primary btn">Login</a>
	</div>
{/if}
