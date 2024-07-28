<script lang="ts">
	import { shuffleArray } from "$lib/helpers/shuffleArray"

	interface Kana {
		japanese: string
		romaji: string
		errorClass: boolean
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
			populateButtonOptions()
			setNextKanaPair()
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
		const buttonOptions = [...shuffledKanaList]
		currentKanaButtonOptions = shuffleArray(buttonOptions)
		currentKanaButtonOptions.map((button) => (button.errorClass = false))
	}

	const showIncorrectButtonOutline = (japaneseCharacter: string) => {
		const incorrectKanaIndex = currentKanaButtonOptions.findIndex(
			(kana) => kana.japanese === japaneseCharacter
		)

		currentKanaButtonOptions[incorrectKanaIndex].errorClass = true
		setTimeout(() => {
			currentKanaButtonOptions[incorrectKanaIndex].errorClass = false
		}, 500)
	}

	const checkButtonCharacter = (japaneseCharacter: string) => {
		if (japaneseCharacter === currentJapaneseCharacter) {
			saveUserProgress()
			nextCharacter()
		} else {
			showIncorrectButtonOutline(japaneseCharacter)
		}
	}

	const init = () => {
		shuffledKanaList = shuffleArray(shuffledKanaList)
		nextCharacter()
	}

	init()
</script>

<div class="flex justify-center p-8 text-6xl">{currentRomajiCharacter}</div>
<div class="flex justify-center gap-4">
	{#each currentKanaButtonOptions as kana}
		<button
			on:click={() => checkButtonCharacter(kana.japanese)}
			class="flex min-w-16 justify-center bg-surface-300 p-3 text-2xl rounded-container-token {kana.errorClass
				? 'error-outline'
				: ''}"
		>
			{kana.japanese}
		</button>
	{/each}
</div>
<div class="flex justify-center gap-4">
	<button class="variant-filled-tertiary btn" on:click={handleRestudy}>Restudy</button>
</div>

<style>
	.error-outline {
		outline: 2px solid red;
		transition: border 100ms ease-in-out;
	}
</style>
