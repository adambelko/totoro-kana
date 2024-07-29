<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import { AppBar, TabGroup, Tab } from "@skeletonlabs/skeleton"
	import { getFullName } from "$lib/helpers/accountDetails"
	import Dashboard from "../Dashboard.svelte"

	export let data
	const hiragana = data?.hiragana ?? []
	const katakana = data?.katakana ?? []
	let tabValue = $page.url.pathname.includes("hiragana") ? "hiragana" : "katakana"

	const startLesson = (groupName: string) => {
		const param = groupName.toLowerCase().split(" ").join("_")

		if (tabValue === "hiragana") {
			goto(`/study/hiragana/${param}`)
		} else {
			goto(`/study/katakana/${param}`)
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
			on:click={() => goto("/study/hiragana")}>Hiragana</Tab
		>
		<Tab
			bind:group={tabValue}
			name="katakana"
			value={"katakana"}
			on:click={() => goto("/study/katakana")}>Katakana</Tab
		>

		<svelte:fragment slot="panel">
			{#if tabValue === "hiragana"}
				<Dashboard data={hiragana} on:startLesson={(e) => startLesson(e.detail.groupName)} />
			{:else}
				<Dashboard data={katakana} on:startLesson={(e) => startLesson(e.detail.groupName)} />
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
