<script lang="ts">
	import { AppBar, ProgressBar } from "@skeletonlabs/skeleton"
	import { onMount } from "svelte"
	import { users } from "$lib/db/schema"

	interface KanaGroup {
		id: number
		kanaCategory: string
		groupName: string
		japanese: string
		romaji: string
		order: number
		progress: number
	}

	interface Kana {
		japanese: string
		romaji: string
	}

	interface UserProgress {
		id: number
		progress: number
	}

	export let selectedGroup: KanaGroup[]

	onMount(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				practice = true
			} else if (event.key === "ArrowLeft") {
				event.preventDefault()
				navigateLeft()
			} else if (event.key === "ArrowRight") {
				event.preventDefault()
				navigateRight()
			}
		}
		window.addEventListener("keydown", handleKeyDown)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	})

	let practice = false
	let currentIndex = 0
	let currentJapaneseCharacter = selectedGroup[currentIndex].japanese
	let currentRomajiCharacter = selectedGroup[currentIndex].romaji
	let inputErrorClass = ""
	let userRomajiInput = ""
	let shuffledKanaList: Kana[] = []
	let userProgress: UserProgress[] = []
	let correctAnswerCount = 0
	$: progressBarValue = (correctAnswerCount / shuffledKanaList.length) * 100

	const setCurrentCharacter = (index: number) => {
		currentIndex = index
		currentJapaneseCharacter = selectedGroup[currentIndex].japanese
		currentRomajiCharacter = selectedGroup[currentIndex].romaji
	}

	const navigateLeft = () => {
		if (currentIndex > 0) {
			setCurrentCharacter(currentIndex - 1)
		}
	}

	const navigateRight = () => {
		if (currentIndex < selectedGroup.length - 1) {
			setCurrentCharacter(currentIndex + 1)
		}
	}

	const startPractice = () => {
		initialiseKana()
		setNextKanaPair()
		practice = true
	}

	const shuffleArray = (array: any) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	const initialiseKana = () => {
		// init an object for saving user progress
		selectedGroup.map((kana) => {
			userProgress.push({ id: kana.id, progress: 0 })
		})

		// init an array with shuffled kana
		const kanaList = selectedGroup.map((kana: Kana) => ({
			japanese: kana.japanese,
			romaji: kana.romaji
		}))

		return (shuffledKanaList = shuffleArray(kanaList))
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
			console.log("finished")
		}
	}

	const saveProgress = () => {
		const filteredGroup = selectedGroup.filter((kana) => kana.japanese === currentJapaneseCharacter)
		const kanaId = filteredGroup[0].id
		const progressedKana = userProgress.filter((kana) => kana.id === kanaId)
		progressedKana[0].progress += 1
		correctAnswerCount += 1
	}

	const checkCharacter = () => {
		const romajiOptions = currentRomajiCharacter
			.split(", ")
			.map((romaji: string) => romaji.trim().toLowerCase())
		if (romajiOptions.includes(userRomajiInput.toLowerCase().trim())) {
			userRomajiInput = ""
			inputErrorClass = ""
			saveProgress()
			nextCharacter()
		} else {
			inputErrorClass = "input-error"
			return
		}
	}

	const handleRestudy = () => {
		userRomajiInput = ""
		inputErrorClass = ""
		correctAnswerCount = 0
		userProgress = []
		practice = false
	}
</script>

{#if practice === false}
	<AppBar class="mt-4 p-5 rounded-container-token" background="variant-ghost">
		Navigate in between characters and memorise them
	</AppBar>
	<div class="mt-4 flex flex-col bg-white/30 rounded-container-token dark:bg-black/30">
		<div class="flex justify-center gap-4 p-6">
			{#each selectedGroup as groupItem, index}
				<button
					class="flex justify-center bg-surface-300 p-4 rounded-container-token {currentIndex ===
					index
						? 'border-2 border-blue-500'
						: ''}"
					on:click={() => {
						setCurrentCharacter(index)
					}}
				>
					{groupItem.japanese}
				</button>
			{/each}
		</div>
		<div class="mt-4 flex justify-center gap-4 text-6xl">{currentJapaneseCharacter}</div>
		<div class="mb-10 flex justify-center gap-4 p-6 text-4xl">{currentRomajiCharacter}</div>
		<div class="flex flex-col gap-4">
			<div class="flex justify-center">
				Press<kbd class="kbd ml-1.5 mr-1.5">←</kbd> or
				<kbd class="kbd ml-1.5 mr-1.5">→</kbd> to navigate
			</div>
			<div class="flex justify-center">
				Press<kbd class="kbd ml-1.5 mr-1.5">ENTER</kbd> to start practice
			</div>
		</div>
		<div class="flex justify-center">
			<button class="variant-filled-primary btn mb-4 mt-10" on:click={startPractice}
				>Practice</button
			>
		</div>
		<ProgressBar value={0} max={100} />
	</div>
{:else}
	<AppBar class="mt-4 p-5 rounded-container-token" background="variant-ghost">
		Correctly answer each character 4 times in order to pass the lesson
	</AppBar>
	<div class="mt-4 flex flex-col bg-white/30 rounded-container-token dark:bg-black/30">
		<div class="flex justify-center">
			<div class="flex w-1/2 flex-col gap-4 p-20">
				<div class="flex justify-center p-8 text-6xl">{currentJapaneseCharacter}</div>
				<input class="input h-8 pl-3 {inputErrorClass}" type="text" bind:value={userRomajiInput} />
				<div class="flex justify-center gap-4">
					<button class="variant-filled-tertiary btn" on:click={handleRestudy}>Restudy</button>
					<button class="variant-filled-primary btn" on:click={checkCharacter}>Next</button>
				</div>
			</div>
		</div>
		<span class="mb-1 flex justify-center">
			<!--{correctAnswerCount + skippedAnswerCount}/{shuffledKanaList.length}-->
		</span>
		<ProgressBar value={progressBarValue} max={100} />
	</div>
{/if}

<style>
	*:focus {
		outline: 0 !important;
	}
</style>
