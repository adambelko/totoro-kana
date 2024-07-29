<script lang="ts">
	import { onMount } from "svelte"
	import { AppBar, ProgressBar } from "@skeletonlabs/skeleton"
	import PracticeResults from "./PracticeResults.svelte"
	import { shuffleArray } from "$lib/helpers/Kana"

	interface SelectedKana {
		hiragana: KanaData[]
		katakana: KanaData[]
	}

	export let hiraganaData: Kana[] = []
	export let katakanaData: Kana[] = []
	export let selectedKana: SelectedKana

	let currentJapaneseCharacter = ""
	let currentRomajiCharacter: string[] = []
	let currentIndex = 0
	let correctKanaCount = 0
	let skippedKanaCount = 0
	let userRomajiInput = ""
	let inputErrorClass = ""
	const skippedKanaList: string[][] = []
	let shuffledKanaList: [string, string[]][] = []
	$: progressBarValue = ((correctKanaCount + skippedKanaCount) / shuffledKanaList.length) * 100
	let showResults = false

	onMount(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				checkCharacter()
			} else if (event.key.toLowerCase() === "s" && event.shiftKey) {
				event.preventDefault()
				skipCharacter()
			}
		}
		window.addEventListener("keydown", handleKeyDown)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
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
				inputErrorClass = ""
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
	<AppBar class="mt-4 p-5 rounded-container-token" background="variant-ghost">
		Enter the correct romaji and click "Next". If unsure, click "Skip" to move to the next character
	</AppBar>
	<div class="mt-4 flex flex-col bg-white/30 rounded-container-token dark:bg-black/30">
		<div class="flex justify-center">
			<div class="flex w-1/2 flex-col gap-4 p-20">
				<div class="flex justify-center p-8 text-6xl">{currentJapaneseCharacter}</div>
				<input class="input h-8 pl-3 {inputErrorClass}" type="text" bind:value={userRomajiInput} />
				<div class="flex justify-center gap-4">
					<button class="variant-filled-tertiary btn" on:click={skipCharacter}>Skip</button>
					<button class="variant-filled-primary btn" on:click={checkCharacter}>Next</button>
				</div>
				<div class="mt-8 flex justify-center">
					Press<kbd class="kbd ml-1.5 mr-1.5">ENTER</kbd> to submit the answer
				</div>
				<div class="mt-2 flex justify-center">
					Press<kbd class="kbd ml-1.5 mr-1.5">SHIFT</kbd>+<kbd class="kbd ml-1.5 mr-1.5">S</kbd> to skip
					the answer
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
