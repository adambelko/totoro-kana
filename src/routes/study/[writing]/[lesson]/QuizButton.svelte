<script lang="ts">
	import { shuffleArray } from "$lib/helpers/shuffleArray"

	interface Kana {
		japanese: string
		romaji: string
		errorClass?: boolean
	}

	export let romajiToJapanese: boolean
	export let currentRomajiCharacter: string
	export let currentJapaneseCharacter: string
	export let currentIndex: number
	export let quizStage: number
	export let shuffledKanaList: Kana[]
	export let handleRestudy: () => void
	export let saveUserProgress: () => void

	let currentKanaButtonOptions: Kana[] = []

	const nextKana = () => {
		if (currentIndex < shuffledKanaList.length) {
			populateButtonOptions()
			setNextKanaPair()
		} else {
			quizStage += 1
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
		currentKanaButtonOptions.forEach((button) => (button.errorClass = false))
	}

	const checkButtonCharacter = (character: string) => {
		if (
			(romajiToJapanese && character === currentJapaneseCharacter) ||
			(!romajiToJapanese && character === currentRomajiCharacter)
		) {
			saveUserProgress()
			nextKana()
		} else {
			showIncorrectButtonOutline(character)
		}
	}

	const showIncorrectButtonOutline = (character: string) => {
		let incorrectKanaIndex: number
		if (romajiToJapanese) {
			incorrectKanaIndex = currentKanaButtonOptions.findIndex((kana) => kana.japanese === character)
		} else {
			console.log(currentKanaButtonOptions)
			incorrectKanaIndex = currentKanaButtonOptions.findIndex((kana) => kana.romaji === character)
		}

		currentKanaButtonOptions[incorrectKanaIndex].errorClass = true
		setTimeout(() => {
			currentKanaButtonOptions[incorrectKanaIndex].errorClass = false
		}, 500)
	}

	const init = () => {
		shuffledKanaList = shuffleArray(shuffledKanaList)
		nextKana()
	}

	init()
</script>

<div class="flex justify-center p-8 text-6xl">
	{romajiToJapanese ? currentRomajiCharacter : currentJapaneseCharacter}
</div>
<div class="flex justify-center gap-4">
	{#each currentKanaButtonOptions as kana}
		<button
			on:click={() => checkButtonCharacter(romajiToJapanese ? kana.japanese : kana.romaji)}
			class="flex min-w-16 justify-center bg-surface-300 p-3 text-2xl rounded-container-token {kana.errorClass
				? 'error-outline'
				: ''}"
		>
			{romajiToJapanese ? kana.japanese : kana.romaji}
		</button>
	{/each}
</div>
<div class="flex justify-center gap-4">
	<button class="variant-filled-tertiary btn" on:click={handleRestudy}>Restudy</button>
</div>

<style>
	.error-outline {
		outline: 3px solid #d41976;
		transition: border 100ms ease-in-out;
	}
</style>
