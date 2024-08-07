<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import { AppBar, TabGroup, Tab } from "@skeletonlabs/skeleton"
	import { getFullName } from "$lib/utils/profileDetails"
	import Dashboard from "./Dashboard.svelte"

	export let data
	const { hiragana, katakana, hiraganaUserProgress = [], katakanaUserProgress = [], user } = data
	let tabValue = $page.url.pathname.includes("hiragana") ? "hiragana" : "katakana"

	const handleTabClick = (tab: string) => {
		tabValue = tab
		goto(`/learn/${tab}`)
	}
</script>

<AppBar class="mt-4 p-5 rounded-container-token" background="variant-ghost">
	{#if user}
		<p>Welcome back, {getFullName(user)}!</p>
	{:else}
		<p>Please <a href="/login" class="anchor">Login</a> to continue!</p>
	{/if}
</AppBar>

<div class="mt-4 flex gap-4 bg-white/30 p-5 rounded-container-token dark:bg-black/30">
	<TabGroup justify="justify-center" class="w-full">
		<Tab
			bind:group={tabValue}
			name="hiragana"
			value={"hiragana"}
			on:click={() => handleTabClick("hiragana")}>Hiragana</Tab
		>
		<Tab
			bind:group={tabValue}
			name="katakana"
			value={"katakana"}
			on:click={() => handleTabClick("katakana")}>Katakana</Tab
		>

		<svelte:fragment slot="panel">
			{#if tabValue === "hiragana"}
				<Dashboard
					{tabValue}
					userId={user?.id}
					writingData={hiragana}
					writingProgressData={hiraganaUserProgress}
				/>
			{:else}
				<Dashboard
					{tabValue}
					userId={user?.id}
					writingData={katakana}
					writingProgressData={katakanaUserProgress}
				/>
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
