<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import { AppBar, TabGroup, Tab } from "@skeletonlabs/skeleton"
	import { getFullName } from "$lib/helpers/accountDetails"
	import Dashboard from "../Dashboard.svelte"

	export let data

	const hiragana = data.hiragana
	const katakana = data.katakana
	const hiraganaProgress = data.hiraganaProgress
	const katakanaProgress = data.hiraganaProgress
	let tabValue = $page.url.pathname.includes("hiragana") ? "hiragana" : "katakana"

	const startLesson = (groupName: string) => {
		const param = groupName.toLowerCase().split(" ").join("_")

		if (tabValue === "hiragana") {
			goto(`/learn/hiragana/${param}`)
		} else {
			goto(`/learn/katakana/${param}`)
		}
	}
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
		<Tab
			bind:group={tabValue}
			name="hiragana"
			value={"hiragana"}
			on:click={() => goto("/learn/hiragana")}>Hiragana</Tab
		>
		<Tab
			bind:group={tabValue}
			name="katakana"
			value={"katakana"}
			on:click={() => goto("/learn/katakana")}>Katakana</Tab
		>

		<svelte:fragment slot="panel">
			{#if tabValue === "hiragana"}
				<Dashboard
					userId={data?.user?.id}
					writingData={hiragana}
					writingProgressData={hiraganaProgress}
					on:startLesson={(e) => startLesson(e.detail.groupName)}
				/>
			{:else}
				<Dashboard
					userId={data?.user?.id}
					writingData={katakana}
					writingProgressData={katakanaProgress}
					on:startLesson={(e) => startLesson(e.detail.groupName)}
				/>
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
