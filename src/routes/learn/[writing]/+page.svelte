<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import { TabGroup, Tab, AppBar } from "@skeletonlabs/skeleton"
	import { getFullName } from "$lib/utils/profileDetails"
	import Dashboard from "./Dashboard.svelte"
	import type { User } from "@supabase/supabase-js"

	interface Props {
		hiragana: Kana[]
		katakana: Kana[]
		hiraganaUserProgress: WritingProgress[]
		katakanaUserProgress: WritingProgress[]
		user: User | null
	}

	let { data }: { data: Props } = $props()
	let { hiragana, katakana, hiraganaUserProgress = [], katakanaUserProgress = [], user } = data

	let tabValue = $state($page.url.pathname.includes("hiragana") ? "hiragana" : "katakana")

	const handleTabClick = (tab: string) => {
		tabValue = tab
		goto(`/learn/${tab}`)
	}
</script>

<svelte:head>
	<title>Learn {tabValue === "hiragana" ? "Hiragana" : "Katakana"}</title>
	<meta name="description" content="Learn and memorise {tabValue} with our interactive platform" />
</svelte:head>

<div class="m-4 flex flex-col gap-4 bg-white/30 p-5 rounded-container-token">
	<AppBar class="p-5 rounded-container-token" background="variant-ghost">
		{#if user}
			<h4 class="h4">Welcome back, {getFullName(user)}!</h4>
		{:else}
			<h4 class="h5">Let's learn something new today!</h4>
		{/if}
	</AppBar>
	<TabGroup justify="justify-center" class="w-full">
		<Tab
			bind:group={tabValue}
			name="hiragana"
			value={"hiragana"}
			on:click={() => handleTabClick("hiragana")}
			>Hiragana
		</Tab>
		<Tab
			bind:group={tabValue}
			name="katakana"
			value={"katakana"}
			on:click={() => handleTabClick("katakana")}
			>Katakana
		</Tab>

		<svelte:fragment slot="panel">
			{#if tabValue === "hiragana"}
				<Dashboard
					{tabValue}
					{user}
					writingData={hiragana}
					writingProgressData={hiraganaUserProgress}
				/>
			{:else}
				<Dashboard
					{tabValue}
					{user}
					writingData={katakana}
					writingProgressData={katakanaUserProgress}
				/>
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
