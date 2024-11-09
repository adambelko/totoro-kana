<script lang="ts">
	import { AppBar, ProgressBar } from "@skeletonlabs/skeleton"
	import PracticeResults from "./PracticeResults.svelte"
	import { useKeyDownHandler } from "$lib/utils/keydown"
	import { shuffleArray } from "$lib/utils/kana"
	import { onMount } from "svelte"

	interface SelectedKana {
		hiragana: KanaData[]
		katakana: KanaData[]
	}

	interface Props {
		hiraganaData?: Kana[]
		katakanaData?: Kana[]
		selectedKana: SelectedKana
	}

	let { hiraganaData = [], katakanaData = [], selectedKana }: Props = $props()

	let currentJapaneseCharacter = $state("")
	let currentRomajiCharacter: string[] = []
	let currentIndex = $state(0)
	let correctKanaCount = $state(0)
	let skippedKanaCount = $state(0)
	let userRomajiInput = $state("")
	let inputErrorClass = $state("")
	const skippedKanaList: string[][] = []
	let shuffledKanaList: [string, string[]][] = $state([])
	let progressBarValue = $derived(
		((correctKanaCount + skippedKanaCount) / shuffledKanaList.length) * 100
	)
	let showResults = $state(false)

	useKeyDownHandler((event) => {
		if (event.key === "Enter") {
			checkCharacter()
		} else if (event.key.toLowerCase() === "s" && event.shiftKey) {
			event.preventDefault()
			skipCharacter()
		}
	})

	let inputElement: HTMLInputElement | undefined = $state()

	onMount(() => {
		if (inputElement) {
			inputElement.focus()
		}
	})

	type KanaCharacter = { [key: string]: string[] }
	type KanaWriting = { characters: KanaCharacter }

	const populateKanaList = (kanaWriting: KanaWriting[], kanaList: [string, string[]][]) => {
		kanaWriting.forEach((kana) => {
			Object.entries(kana.characters).forEach(([japanese, romajiArray]) => {
				kanaList.push([japanese, romajiArray])
			})
		})
	}

	const init = () => {
		let kanaList: [string, string[]][] = []
		populateKanaList(selectedKana.hiragana, kanaList)
		populateKanaList(selectedKana.katakana, kanaList)
		shuffledKanaList = shuffleArray(kanaList)
		setNextKanaPair()
	}

	const setNextKanaPair = () => {
		;[currentJapaneseCharacter, currentRomajiCharacter] = shuffledKanaList[currentIndex]
	}

	const checkProgress = () => {
		currentIndex++
		if (currentIndex < shuffledKanaList.length) {
			setNextKanaPair()
		} else {
			showResults = true
		}
	}

	const cleanupInput = () => {
		userRomajiInput = ""
		inputErrorClass = ""
	}

	const checkCharacter = () => {
		if (currentRomajiCharacter.some((romaji) => userRomajiInput.toLowerCase().trim() === romaji)) {
			correctKanaCount++
			cleanupInput()
			checkProgress()
		} else {
			inputErrorClass = "input-error"
			setTimeout(() => {
				cleanupInput()
			}, 500)
		}
	}

	const skipCharacter = () => {
		skippedKanaCount++
		currentIndex++
		skippedKanaList.push([currentJapaneseCharacter, currentRomajiCharacter[0]])
		if (currentIndex < shuffledKanaList.length) {
			setNextKanaPair()
			cleanupInput()
		} else {
			showResults = true
		}
	}

	init()
</script>

{#if showResults === false}
	<div class="m-4 flex flex-col bg-white/30 rounded-container-token">
		<AppBar class="ml-4 mr-4 mt-4 p-5 rounded-container-token" background="variant-ghost">
			Enter the correct romaji and press "Next". Alternatively "Skip" to the next character.
		</AppBar>
		<div class="flex flex-col items-center justify-center">
			<div class="mb-10 mt-20 flex w-1/2 flex-col items-center justify-between gap-4">
				<div class="text-6xl">{currentJapaneseCharacter}</div>
				<input
					class="input h-8 w-[145px] text-center {inputErrorClass}"
					type="text"
					bind:value={userRomajiInput}
					bind:this={inputElement}
				/>
				<div class="flex justify-center gap-4">
					<button class="variant-filled-tertiary btn" onclick={skipCharacter}>Skip</button>
					<button class="variant-filled-primary btn" onclick={checkCharacter}>Next</button>
				</div>
			</div>
			<div class="hidden md:flex flex-col mb-4 justify-center gap-4">
				<div class="mt-2 flex justify-center">
					Press<kbd class="kbd ml-1.5 mr-1.5">SHIFT</kbd>+<kbd class="kbd ml-1.5 mr-1.5">S</kbd> to skip
					the answer
				</div>
				<div class="flex justify-center">
					Press<kbd class="kbd ml-1.5 mr-1.5">ENTER</kbd> to submit the answer
				</div>
			</div>
		</div>
		<span class="mb-1 flex justify-center">
			{correctKanaCount + skippedKanaCount}/{shuffledKanaList.length}
		</span>
		<ProgressBar value={progressBarValue} max={100} />
	</div>
{:else}
	<PracticeResults
		{correctKanaCount}
		{skippedKanaCount}
		{skippedKanaList}
		{selectedKana}
		{hiraganaData}
		{katakanaData}
	/>
{/if}
