<script lang="ts">
	import { TabGroup, Tab } from "@skeletonlabs/skeleton"
	import { hiragana } from "$lib/data/hiragana"
	import { katakana } from "$lib/data/katakana"
	import DisplayKanaGroups from "./DisplayKanaGroups.svelte"
	import Practice from "./Practice.svelte"

	export let correctAnswerCount: number
	export let skippedAnswerCount: number
	export let skippedAnswerList: string[][]
	export let selectedGroups: SelectedGroups

	const totalAnswerCount = correctAnswerCount + skippedAnswerCount
	const successPercentage = ((correctAnswerCount / totalAnswerCount) * 100).toFixed(2)
	let tabValue = selectedGroups.hiragana.length ? "hiragana" : "katakana"

	interface SelectedGroups {
		hiragana: KanaGroup[]
		katakana: KanaGroup[]
	}

	console.log(selectedGroups)

	const isCharacterSkipped = (japanese: string, romaji: string[]): boolean => {
		return skippedAnswerList.some(([skipJapanese, skipRomaji]) => {
			return skipJapanese === japanese && romaji.includes(skipRomaji)
		})
	}

	const extractCharacterGroups = (data: KanaData): string[] => {
		return Object.keys(data).flatMap((kanaGroup) => Object.keys(data[kanaGroup]))
	}

	const hiraganaOrder = extractCharacterGroups(hiragana)
	const katakanaOrder = extractCharacterGroups(katakana)

	// Sort selectedGroups based on the order in the hiragana/katakana object
	const sortKanaGroups = (groups: KanaGroup[], order: string[]): KanaGroup[] => {
		return groups.sort((a, b) => {
			return order.indexOf(a.groupName) - order.indexOf(b.groupName)
		})
	}

	const sortedHiraganaGroups = sortKanaGroups(selectedGroups.hiragana, hiraganaOrder)
	const sortedKatakanaGroups = sortKanaGroups(selectedGroups.katakana, katakanaOrder)

	const categoriseGroups = (groups: KanaGroup[]) => {
		const categories = {
			mainKana: [] as KanaGroup[],
			dakutenKana: [] as KanaGroup[],
			combinationKana: [] as KanaGroup[]
		}

		for (const group of groups) {
			switch (group.category) {
				case "mainKana":
					categories.mainKana.push(group)
					break
				case "dakutenKana":
					categories.dakutenKana.push(group)
					break
				case "combinationKana":
					categories.combinationKana.push(group)
					break
			}
		}

		return categories
	}

	const categorisedHiraganaGroups = categoriseGroups(sortedHiraganaGroups)
	const categorisedKatakanaGroups = categoriseGroups(sortedKatakanaGroups)

	let showPractice = false
	const togglePractice = () => {
		if (selectedGroups.hiragana.length || selectedGroups.katakana.length) {
			showPractice = !showPractice
		}
	}
</script>

{#if showPractice === false}
	<div class="mt-4 bg-white/30 p-12 rounded-container-token dark:bg-black/30">
		<div class="flex flex-col items-center">
			<h2 class="h2">Your Results</h2>
			<h4 class="h4 mt-8">
				Total Correct Answers: {correctAnswerCount}/{totalAnswerCount} ({successPercentage}%)
			</h4>
		</div>

		<TabGroup justify="justify-center mt-8">
			<Tab bind:group={tabValue} name="hiragana" value={"hiragana"}>Hiragana</Tab>
			<Tab bind:group={tabValue} name="katakana" value={"katakana"}>Katakana</Tab>

			<svelte:fragment slot="panel">
				{#if tabValue === "hiragana"}
					<DisplayKanaGroups {isCharacterSkipped} kanaGroups={categorisedHiraganaGroups} />
				{:else}
					<DisplayKanaGroups {isCharacterSkipped} kanaGroups={categorisedKatakanaGroups} />
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
	<button class="variant-filled-primary btn mx-auto mb-10 mt-4 block" on:click={togglePractice}>
		Repeat
	</button>
{:else}
	<Practice {selectedGroups} />
{/if}
