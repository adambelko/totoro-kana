<script>
	import { AppBar, TabGroup, Tab } from "@skeletonlabs/skeleton"
	import Dashboard from "./Dashboard.svelte"

	export let data
	let { supabase } = data
	$: ({ supabase } = data)
	console.log(data)

	let tabValue = "hiragana"
</script>

<AppBar class="mt-4 p-5 rounded-container-token" background="variant-ghost">
	Welcome back user!
</AppBar>

<div class="mt-4 flex gap-4 bg-white/30 p-5 rounded-container-token dark:bg-black/30">
	<TabGroup justify="justify-center" class="w-full">
		<Tab bind:group={tabValue} name="hiragana" value={"hiragana"}>Hiragana</Tab>
		<Tab bind:group={tabValue} name="katakana" value={"katakana"}>Katakana</Tab>

		<svelte:fragment slot="panel">
			{#if tabValue === "hiragana"}
				<Dashboard />
			{:else if tabValue === "katakana"}
				<Dashboard />
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
