<script lang="ts">
	import { useKeyDownHandler } from "$lib/utils/keydown"
	import { getFirstCharacter, shuffleArray } from "$lib/utils/kana"

	interface Kana {
		japanese: string
		romaji: string
		errorClass?: boolean
	}

	interface Props {
		romajiToJapanese: boolean
		currentRomajiCharacter: string
		currentJapaneseCharacter: string
		currentIndex: number
		correctKanaCount?: number
		incorrectKanaCount: number
		quizStage: number
		shuffledKanaList: Kana[]
		handleRestudy: () => void
		saveUserProgress: () => void
	}

	let {
		romajiToJapanese,
		currentRomajiCharacter = $bindable(),
		currentJapaneseCharacter = $bindable(),
		currentIndex,
		incorrectKanaCount = $bindable(),
		quizStage = $bindable(),
		shuffledKanaList,
		handleRestudy,
		saveUserProgress
	}: Props = $props()

	let currentKanaButtonOptions: Kana[] = $state([])

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
	{romajiToJapanese
		? getFirstCharacter(currentRomajiCharacter)
		: getFirstCharacter(currentJapaneseCharacter)}
</div>
<div class="flex justify-center gap-3 flex-wrap w-full">
	{#each currentKanaButtonOptions as kana}
		<button
			onclick={() => checkButtonCharacter(romajiToJapanese ? kana.japanese : kana.romaji)}
			class="variant-ghost-surface btn flex min-w-16 items-center justify-center text-xl sm:text-2xl {kana.errorClass
				? 'error-outline'
				: ''}"
		>
			{romajiToJapanese ? getFirstCharacter(kana.japanese) : getFirstCharacter(kana.romaji)}
		</button>
	{/each}
</div>
<div class="flex justify-center gap-4">
	<button class="variant-filled-tertiary btn" onclick={handleRestudy}>Restudy</button>
</div>
<div class="hidden md:flex mb-4 mt-10 flex-col gap-4">
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
