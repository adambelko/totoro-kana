<script lang="ts">
	import { onMount } from "svelte"
	import { AppBar, ProgressBar } from "@skeletonlabs/skeleton"
	import PracticeResults from "./PracticeResults.svelte"

	interface SelectedGroups {
		hiragana: KanaGroup[]
		katakana: KanaGroup[]
	}

	export let selectedGroups: SelectedGroups

	let currentJapaneseCharacter = ""
	let currentRomajiCharacter: string[] = []
	let userRomajiInput = ""
	let currentCharacterIndex = 0
	let correctAnswerCount = 0
	let skippedAnswerCount = 0
	const skippedAnswerList: string[][] = []
	let inputErrorClass = ""
	let showResults = false
	let shuffledKanaList: [string, string[]][] = []
	$: progress = ((correctAnswerCount + skippedAnswerCount) / shuffledKanaList.length) * 100

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

	const shuffleArray = (array: any) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	const initialiseKana = () => {
		selectedGroups.hiragana.forEach((kanaGroup) => {
			Object.entries(kanaGroup.characters).forEach(([japanese, romaji]) => {
				shuffledKanaList.push([japanese, romaji])
			})
		})
		selectedGroups.katakana.forEach((kanaGroup) => {
			Object.entries(kanaGroup.characters).forEach(([japanese, romaji]) => {
				shuffledKanaList.push([japanese, romaji])
			})
		})

		shuffledKanaList = shuffleArray(shuffledKanaList)
	}

	const setNextKanaPair = () => {
		;[currentJapaneseCharacter, currentRomajiCharacter] = shuffledKanaList[currentCharacterIndex]
	}

	initialiseKana()
	setNextKanaPair()

	const nextCharacter = () => {
		currentCharacterIndex++
		if (currentCharacterIndex < shuffledKanaList.length) {
			setNextKanaPair()
		} else {
			showResults = true
		}
	}

	const checkCharacter = () => {
		if (currentRomajiCharacter.some((romaji) => userRomajiInput.toLowerCase().trim() === romaji)) {
			correctAnswerCount++
			userRomajiInput = ""
			inputErrorClass = ""
			nextCharacter()
		} else {
			inputErrorClass = "input-error"
			return
		}
	}

	const skipCharacter = () => {
		skippedAnswerCount++
		currentCharacterIndex++
		skippedAnswerList.push([currentJapaneseCharacter, currentRomajiCharacter[0]])
		if (currentCharacterIndex < shuffledKanaList.length) {
			setNextKanaPair()
			userRomajiInput = ""
			inputErrorClass = ""
		} else {
			showResults = true
		}
	}
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
					Press<kbd class="kbd ml-1.5 mr-1.5">S</kbd> to skip the answer
				</div>
			</div>
		</div>
		<span class="mb-1 flex justify-center">
			{correctAnswerCount + skippedAnswerCount}/{shuffledKanaList.length}
		</span>
		<ProgressBar value={progress} max={100} />
	</div>
{:else}
	<PracticeResults {correctAnswerCount} {skippedAnswerCount} {skippedAnswerList} {selectedGroups} />
{/if}
