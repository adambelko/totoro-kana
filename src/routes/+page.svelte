<script lang="ts">
	import SelectKana from "$lib/components/SelectKana.svelte"
	import Practice from "$lib/components/Practice.svelte"
	import { AppBar } from "@skeletonlabs/skeleton"
	import { hiragana } from "$lib/data/hiragana"
	import { katakana } from "$lib/data/katakana"

	interface KanaGroup {
		category: string
		groupName: string
		romaji: string
		japanese: string
		characters: { [key: string]: string[] }
	}

	let hiraganaGroups: KanaGroup[] = []
	let katakanaGroups: KanaGroup[] = []
	$: selectedGroups = [...hiraganaGroups, ...katakanaGroups]

	let showPractice = false

	const togglePractice = () => {
		selectedGroups.length >= 1 ? (showPractice = !showPractice) : false
	}
</script>

{#if showPractice === false}
	<AppBar class="mt-4 p-5 rounded-container-token" background="variant-ghost">
		Welcome back user!
		<br />Select at least one of the groups, you can scroll down too!
	</AppBar>

	<div class="mt-4 flex gap-4 bg-white/30 p-5 rounded-container-token dark:bg-black/30">
		<div class="flex-1">
			<SelectKana
				title="Hiragana / ひらがな"
				data={hiragana}
				bind:selectedGroups={hiraganaGroups}
			/>
		</div>
		<div class="flex-1">
			<SelectKana
				title="Katakana / カタカナ"
				data={katakana}
				bind:selectedGroups={katakanaGroups}
			/>
		</div>
	</div>
	<button class="variant-filled-primary btn mx-auto mb-10 mt-4 block" on:click={togglePractice}>
		Start practice
	</button>
{:else}
	<Practice {selectedGroups} />
{/if}
