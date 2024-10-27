<script lang="ts">
	import { TabGroup, Tab } from "@skeletonlabs/skeleton"
	import { getKanaOrder } from "$lib/utils/kana"
	import DisplayKana from "./DisplayKana.svelte"
	import Practice from "./Practice.svelte"

	interface SelectedKana {
		hiragana: KanaData[]
		katakana: KanaData[]
	}

	interface Props {
		hiraganaData: Kana[]
		katakanaData: Kana[]
		correctKanaCount: number
		skippedKanaCount: number
		skippedKanaList: string[][]
		selectedKana: SelectedKana
	}

	let {
		hiraganaData,
		katakanaData,
		correctKanaCount,
		skippedKanaCount,
		skippedKanaList,
		selectedKana
	}: Props = $props()

	const totalKanaCount = correctKanaCount + skippedKanaCount
	const successPercentage = ((correctKanaCount / totalKanaCount) * 100).toFixed(2)
	let tabValue = $state(selectedKana.hiragana.length ? "hiragana" : "katakana")
	let showPractice = $state(false)

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
	<div class="mb-6 mt-4 bg-white/30 p-4 rounded-container-token">
		<div class="mt-6 flex flex-col items-center">
			<h2 class="h2">Your Results</h2>
			<h4 class="h4 mt-8">
				Total Correct Answers: {correctKanaCount}/{totalKanaCount} ({successPercentage}%)
			</h4>
		</div>
		<div class="px-10">
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
			class="variant-filled-primary btn mx-auto mt-4 flex justify-center"
			onclick={() => (showPractice = true)}
		>
			Repeat
		</button>
	</div>
{:else}
	<Practice {selectedKana} />
{/if}
