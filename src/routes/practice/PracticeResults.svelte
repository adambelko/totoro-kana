<script lang="ts">
	import { TabGroup, Tab } from "@skeletonlabs/skeleton"
	import { getKanaOrder } from "$lib/utils/kana"
	import DisplayKana from "./DisplayKana.svelte"
	import Practice from "./Practice.svelte"

	interface SelectedKana {
		hiragana: KanaData[]
		katakana: KanaData[]
	}

	export let hiraganaData: Kana[]
	export let katakanaData: Kana[]
	export let correctKanaCount: number
	export let skippedKanaCount: number
	export let skippedKanaList: string[][]
	export let selectedKana: SelectedKana

	const totalKanaCount = correctKanaCount + skippedKanaCount
	const successPercentage = ((correctKanaCount / totalKanaCount) * 100).toFixed(2)
	let tabValue = selectedKana.hiragana.length ? "hiragana" : "katakana"
	let showPractice = false

	const isCharacterSkipped = (japanese: string, romaji: string[]): boolean => {
		return skippedKanaList.some(([skipJapanese, skipRomaji]) => {
			return skipJapanese === japanese && romaji.includes(skipRomaji)
		})
	}

	const hiraganaOrder = getKanaOrder(hiraganaData)
	const katakanaOrder = getKanaOrder(katakanaData)

	const sortKanaGroups = (groups: KanaData[], order: string[]) => {
		return groups.sort((a, b) => {
			return order.indexOf(a.groupName) - order.indexOf(b.groupName)
		})
	}

	const sortedHiragana = sortKanaGroups(selectedKana.hiragana, hiraganaOrder)
	const sortedKatakana = sortKanaGroups(selectedKana.katakana, katakanaOrder)

	const categoriseKana = (characters: KanaData[]) => {
		const categories = {
			main: [] as KanaData[],
			dakuten: [] as KanaData[],
			combination: [] as KanaData[]
		}

		for (const kana of characters) {
			switch (kana.category) {
				case "main":
					categories.main.push(kana)
					break
				case "dakuten":
					categories.dakuten.push(kana)
					break
				case "combination":
					categories.combination.push(kana)
					break
			}
		}

		return categories
	}

	const categorisedHiragana = categoriseKana(sortedHiragana)
	const categorisedKatakana = categoriseKana(sortedKatakana)
</script>

{#if showPractice === false}
	<div class="mt-4 bg-white/30 p-12 rounded-container-token dark:bg-black/30">
		<div class="flex flex-col items-center">
			<h2 class="h2">Your Results</h2>
			<h4 class="h4 mt-8">
				Total Correct Answers: {correctKanaCount}/{totalKanaCount} ({successPercentage}%)
			</h4>
		</div>

		<TabGroup justify="justify-center mt-8">
			<Tab bind:group={tabValue} name="hiragana" value={"hiragana"}>Hiragana</Tab>
			<Tab bind:group={tabValue} name="katakana" value={"katakana"}>Katakana</Tab>

			<svelte:fragment slot="panel">
				{#if tabValue === "hiragana"}
					<DisplayKana {isCharacterSkipped} kanaGroups={categorisedHiragana} />
				{:else}
					<DisplayKana {isCharacterSkipped} kanaGroups={categorisedKatakana} />
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
	<button
		class="variant-filled-primary btn mx-auto mb-10 mt-4 block"
		on:click={() => (showPractice = true)}
	>
		Repeat
	</button>
{:else}
	<Practice {selectedKana} />
{/if}
