<script lang="ts">
	import { ProgressBar } from "@skeletonlabs/skeleton"

	interface KanaGroup {
		category: string
		groupName: string
		romaji: string
		japanese: string
		characters: { [key: string]: string[] }
	}

	export let selectedGroups: KanaGroup[]
	console.log(selectedGroups)

	let currentCharacter = ""
	let currentRomaji: string[] = []
	let userInput = ""
	let currentIndex: number = 0
	let correctAnswers = 0
	let skippedAnswers = 0
	let inputError = ""
	$: progress = ((correctAnswers + skippedAnswers) / allKana.length) * 100

	let allKana: [string, string[]][] = []
	console.log(allKana)

	const shuffleArray = (array: any) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	const initKana = () => {
		selectedGroups.forEach((kanaGroup) => {
			Object.entries(kanaGroup.characters).forEach(([japanese, romaji]) => {
				allKana.push([japanese, romaji])
			})
		})
		allKana = shuffleArray(allKana)
	}
	const setNextKanaPair = () => {
		;[currentCharacter, currentRomaji] = allKana[currentIndex]
	}

	initKana()
	setNextKanaPair()

	const nextCharacter = () => {
		currentIndex++
		if (currentIndex < allKana.length) {
			setNextKanaPair()
		} else {
			console.log("Quiz completed")
		}
	}

	const checkCharacter = () => {
		if (currentRomaji.some((romaji) => userInput.toLowerCase() === romaji.toLowerCase())) {
			correctAnswers++
			userInput = ""
			nextCharacter()
		} else {
			inputError = "input-error"
			return
		}
	}

	const skipCharacter = () => {
		skippedAnswers++
		currentIndex++
		if (currentIndex < allKana.length) {
			setNextKanaPair()
			userInput = ""
			inputError = ""
		} else {
			console.log("Quiz completed")
		}
	}
</script>

<div class="mt-6 flex flex-col bg-white/30 rounded-container-token dark:bg-black/30">
	<div class="flex justify-center">
		<div class="flex w-1/2 flex-col gap-4 p-20">
			<div class="flex justify-center p-8 text-6xl">{currentCharacter}</div>
			<input class="input h-8 pl-3 {inputError}" type="text" bind:value={userInput} />
			<div class="flex justify-center gap-4">
				<button class="variant-filled-tertiary btn" on:click={skipCharacter}>Skip</button>
				<button class="variant-filled-primary btn" on:click={checkCharacter}>Next</button>
			</div>
		</div>
	</div>
	<span class="mb-1 flex justify-center">
		{correctAnswers + skippedAnswers}/{allKana.length}
	</span>
	<ProgressBar value={progress} max={100} />
</div>
