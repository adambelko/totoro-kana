<script lang="ts">
	import { useKeyDownHandler } from "$lib/utils/keydown"
	import { shuffleArray } from "$lib/utils/kana"

	interface Kana {
		japanese: string
		romaji: string
		errorClass?: boolean
	}

	export let romajiToJapanese: boolean
	export let currentRomajiCharacter: string
	export let currentJapaneseCharacter: string
	export let currentIndex: number
	export let incorrectKanaCount: number
	export let quizStage: number
	export let shuffledKanaList: Kana[]
	export let handleRestudy: () => void
	export let saveUserProgress: () => void

	let currentKanaButtonOptions: Kana[] = []

	useKeyDownHandler((event) => {
		if (!isNaN(parseInt(event.key))) {
			event.preventDefault()
			const index = parseInt(event.key) - 1
			if (index >= 0 && index < currentKanaButtonOptions.length) {
				checkButtonCharacter(
					romajiToJapanese
						? currentKanaButtonOptions[index].japanese
						: currentKanaButtonOptions[index].romaji
				)
			}
		}
	})

	const nextKana = () => {
		if (currentIndex < shuffledKanaList.length) {
			populateButtonOptions()
			setNextKanaPair()
		} else {
			quizStage++
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
			nextKana()
			saveUserProgress()
		} else {
			incorrectKanaCount++
			showIncorrectButtonOutline(character)
		}
	}

	const showIncorrectButtonOutline = (character: string) => {
		let incorrectKanaIndex: number
		if (romajiToJapanese) {
			incorrectKanaIndex = currentKanaButtonOptions.findIndex((kana) => kana.japanese === character)
		} else {
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

<div class="flex justify-center text-6xl">
	{romajiToJapanese ? currentRomajiCharacter : currentJapaneseCharacter}
</div>
<div class="flex justify-center gap-4">
	{#each currentKanaButtonOptions as kana, index}
		<button
			on:click={() => checkButtonCharacter(romajiToJapanese ? kana.japanese : kana.romaji)}
			class="relative flex min-w-16 items-center justify-center bg-surface-300 p-3 text-2xl rounded-container-token {kana.errorClass
				? 'error-outline'
				: ''}"
		>
			<div class="absolute left-1 top-0.5 text-xs">
				{index + 1}
			</div>
			<div class="text-center">
				{romajiToJapanese ? kana.japanese : kana.romaji}
			</div>
		</button>
	{/each}
</div>
<div class="flex justify-center gap-4">
	<button class="variant-filled-tertiary btn" on:click={handleRestudy}>Restudy</button>
</div>
<div class="mb-4 mt-10 mt-10 flex flex-col gap-4">
	<div class="flex justify-center">
		Press<kbd class="kbd ml-1.5 mr-1.5">NUMBER</kbd> to submit the answer
	</div>
	<div class="flex justify-center">
		Press<kbd class="kbd ml-1.5 mr-1.5">SHIFT</kbd>+<kbd class="kbd ml-1.5 mr-1.5">R</kbd> to restudy
	</div>
</div>

<style>
	.error-outline {
		outline: 3px solid #d41976;
		transition: border 100ms ease-in-out;
	}
</style>
