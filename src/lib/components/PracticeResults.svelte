<script lang="ts">
	import { hiragana } from "$lib/data/hiragana"
	import { katakana } from "$lib/data/katakana"

	export let correctAnswerCount: number
	export let skippedAnswerCount: number
	export let skippedAnswerList: string[][]
	export let selectedGroups: SelectedGroups

	const totalAnswerCount = correctAnswerCount + skippedAnswerCount
	const successPercentage = ((correctAnswerCount / totalAnswerCount) * 100).toFixed(2)

	interface KanaData {
		[kanaGroup: string]: {
			[characterGroup: string]: {
				[character: string]: string[]
			}
		}
	}

	interface KanaGroup {
		category: string
		groupName: string
		romaji: string
		japanese: string
		characters: { [key: string]: string[] }
	}

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

	// Sort selectedGroups based on the order in the data
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
</script>

<div class="mt-4 bg-white/30 p-8 rounded-container-token dark:bg-black/30">
	<div class="flex flex-col items-center">
		<h2 class="h2">Your Results</h2>
		<h3 class="h3 mt-8">
			Total Correct Answers: {correctAnswerCount}/{totalAnswerCount} ({successPercentage}%)
		</h3>
	</div>

	{#if categorisedHiraganaGroups.mainKana.length > 0}
		<div class="table-container mt-8">
			<h3 class="h3 mb-1">Main Kana</h3>
			<table class="table">
				<tbody>
					{#each categorisedHiraganaGroups.mainKana as kanaGroup}
						<tr>
							{#each Object.entries(kanaGroup.characters) as [japanese, romaji]}
								<td class:bg-warning-200={isCharacterSkipped(japanese, romaji)}>
									<span class="pr-2 text-2xl">{japanese}</span>
									{romaji[0]}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	{#if categorisedHiraganaGroups.dakutenKana.length > 0}
		<div class="table-container mt-8">
			<h3 class="h3 mb-1">Dakuten Kana</h3>
			<table class="table">
				<tbody>
					{#each categorisedHiraganaGroups.dakutenKana as kanaGroup}
						<tr>
							{#each Object.entries(kanaGroup.characters) as [japanese, romaji]}
								<td class:bg-warning-200={isCharacterSkipped(japanese, romaji)}>
									<span class="pr-2 text-2xl">{japanese}</span>
									{romaji[0]}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	{#if categorisedHiraganaGroups.combinationKana.length > 0}
		<div class="table-container mt-8">
			<h3 class="h3 mb-1">Combination Kana</h3>
			<table class="table">
				<tbody>
					{#each categorisedHiraganaGroups.combinationKana as kanaGroup}
						<tr>
							{#each Object.entries(kanaGroup.characters) as [japanese, romaji]}
								<td class:bg-warning-200={isCharacterSkipped(japanese, romaji)}>
									<span class="pr-2 text-2xl">{japanese}</span>
									{romaji[0]}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
