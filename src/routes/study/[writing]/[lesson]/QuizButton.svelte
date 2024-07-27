<script lang="ts">
	import { shuffleArray } from "$lib/helpers/shuffleArray"

	interface Kana {
		japanese: string
		romaji: string
	}

	export let currentRomajiCharacter: string
	export let currentJapaneseCharacter: string
	export let currentIndex: number
	export let quizPart: number
	export let shuffledKanaList: Kana[]
	export let handleRestudy: () => void
	export let saveUserProgress: () => void

	let currentKanaButtonOptions: Kana[] = []

	const nextCharacter = () => {
		if (currentIndex < shuffledKanaList.length) {
			setNextKanaPair()
			populateButtonOptions()
		} else {
			quizPart += 1
		}
	}

	const setNextKanaPair = () => {
		const { japanese, romaji } = shuffledKanaList[currentIndex]
		currentJapaneseCharacter = japanese
		currentRomajiCharacter = romaji
		currentIndex++
	}

	const populateButtonOptions = () => {
		currentKanaButtonOptions = shuffleArray(shuffledKanaList)
	}

	const checkButtonCharacter = (japaneseCharacter: string) => {
		if (japaneseCharacter === currentJapaneseCharacter) {
			saveUserProgress()
			nextCharacter()
		} else {
			console.log("incorrect")
		}
	}

	const init = () => {
		shuffledKanaList = shuffleArray(shuffledKanaList)
		populateButtonOptions()
		setNextKanaPair()
	}

	init()
</script>

<div class="flex justify-center p-8 text-6xl">{currentRomajiCharacter}</div>
<div class="flex justify-center gap-4">
	{#each currentKanaButtonOptions as kana}
		<button
			on:click={() => checkButtonCharacter(kana.japanese)}
			class="flex min-w-16 justify-center bg-surface-300 p-3 text-2xl rounded-container-token"
		>
			{kana.japanese}
		</button>
	{/each}
</div>
<div class="flex justify-center gap-4">
	<button class="variant-filled-tertiary btn" on:click={handleRestudy}>Restudy</button>
</div>
