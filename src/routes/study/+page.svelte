<script lang="ts">
	import { AppBar, TabGroup, Tab } from "@skeletonlabs/skeleton"
	import { getFullName } from "$lib/helpers/accountDetails"
	import Dashboard from "./Dashboard.svelte"
	import Lesson from "./Lesson.svelte"

	interface Kana {
		id: number
		kanaCategory: string
		groupName: string
		japanese: string
		romaji: string
		order: number
	}

	export let data
	const hiragana = data?.hiragana ?? []

	let tabValue = "hiragana"
	let showLesson = false
	let selectedGroup: Kana[] = []

	const startLesson = (groupName: string) => {
		selectedGroup = hiragana.filter((item) => item.groupName === groupName)
		showLesson = !showLesson
	}
</script>

{#if showLesson === false}
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
					<Dashboard {hiragana} on:startLesson={(e) => startLesson(e.detail.groupName)} />
				{:else}
					<Dashboard {hiragana} on:startLesson={(e) => startLesson(e.detail.groupName)} />
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
{:else}
	<Lesson {selectedGroup} />
{/if}
