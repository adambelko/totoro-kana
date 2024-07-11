<script lang="ts">
	import { AppBar, ProgressBar } from "@skeletonlabs/skeleton"
	import { createEventDispatcher, onMount } from "svelte"

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
	export let currentIndex: number
	const dispatch = createEventDispatcher()

	let currentJapaneseCharacter = selectedGroup[currentIndex].japanese
	let currentRomajiCharacter = selectedGroup[currentIndex].romaji
	let inputErrorClass = ""
	let userRomajiInput = ""
	let shuffledKanaList: Kana[] = []
	let userProgress: UserProgress[] = []
	let correctAnswerCount = 0
	$: progressBarValue = (correctAnswerCount / shuffledKanaList.length) * 100

	const shuffleArray = (array: Kana[]) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	const initialiseKana = () => {
		selectedGroup.map((kana) => {
			userProgress.push({ id: kana.id, progress: 0 })
		})

		const kanaList = selectedGroup.map((kana) => ({
			japanese: kana.japanese,
			romaji: kana.romaji
		}))
		shuffledKanaList = shuffleArray(kanaList)
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
			.map((romaji) => romaji.trim().toLowerCase())
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
		dispatch("resetPractice")
	}

	onMount(() => {
		initialiseKana()
		setNextKanaPair()
	})
</script>

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
	<ProgressBar value={progressBarValue} max={100} />
</div>
