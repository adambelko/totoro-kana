<script lang="ts">
	interface Kana {
		japanese: string
		romaji: string
	}

	export let currentJapaneseCharacter: string
	export let currentRomajiCharacter: string
	export let currentIndex: number
	export let quizPart: number
	export let shuffledKanaList: Kana[]
	export let handleRestudy: () => void
	export let saveUserProgress: () => void

	let userRomajiInput = ""
	let inputErrorClass = ""

	const cleanupInput = () => {
		userRomajiInput = ""
		inputErrorClass = ""
	}

	const setNextKanaPair = () => {
		const { japanese, romaji } = shuffledKanaList[currentIndex]
		currentJapaneseCharacter = japanese
		currentRomajiCharacter = romaji
		currentIndex++
	}

	const nextCharacter = () => {
		if (currentIndex < shuffledKanaList.length) {
			setNextKanaPair()
		} else {
			cleanupInput()
			quizPart += 1
		}
	}

	const checkInputCharacter = () => {
		const romajiOptions = currentRomajiCharacter.split(", ").map((romaji) => romaji.trim())

		if (romajiOptions.includes(userRomajiInput.toLowerCase().trim())) {
			cleanupInput()
			saveUserProgress()
			nextCharacter()
		} else {
			inputErrorClass = "input-error"
		}
	}

	const restudy = () => {
		cleanupInput()
		handleRestudy()
	}

	setNextKanaPair()
</script>

<div class="flex justify-center p-8 text-6xl">{currentJapaneseCharacter}</div>
<input class="input h-8 pl-3 {inputErrorClass}" type="text" bind:value={userRomajiInput} />
<div class="flex justify-center gap-4">
	<button class="variant-filled-tertiary btn" on:click={restudy}>Restudy</button>
	<button class="variant-filled-primary btn" on:click={checkInputCharacter}>Next</button>
</div>
