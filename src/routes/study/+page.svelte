<script lang="ts">
	import { AppBar, TabGroup, Tab } from "@skeletonlabs/skeleton"
	import Dashboard from "./Dashboard.svelte"
	import { getFullName } from "$lib/helpers/accountDetails"

	export let data
	$: ({ user } = data)

	let tabValue = "hiragana"
</script>

<AppBar class="mt-4 p-5 rounded-container-token" background="variant-ghost">
	{#if data.user}
		<p>Welcome back, {getFullName(data.user)}!</p>
	{:else}
		<p>Please <a href="/login" class="anchor">Login</a> to continue!</p>
	{/if}
</AppBar>

<div class="mt-4 flex gap-4 bg-white/30 p-5 rounded-container-token dark:bg-black/30">
	<TabGroup justify="justify-center" class="w-full">
		<Tab bind:group={tabValue} name="hiragana" value={"hiragana"}>Hiragana</Tab>
		<Tab bind:group={tabValue} name="katakana" value={"katakana"}>Katakana</Tab>

		<svelte:fragment slot="panel">
			{#if tabValue === "hiragana"}
				<Dashboard />
			{:else}
				<Dashboard />
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
