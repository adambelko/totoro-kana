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
	let currentIndex = 0
	let correctAnswers = 0
	let skippedAnswers = 0
	let showError = false

	//--------fix type
	let allKana: any = []

	selectedGroups.forEach((kanaGroup) => {
		Object.entries(kanaGroup.characters).forEach(([japanese, romaji]) => {
			allKana.push([japanese, romaji])
		})
	})

	console.log(allKana)

	// Initialize the first character
	if (allKana.length > 0) {
		;[currentCharacter, currentRomaji] = allKana[currentIndex]
	}

	$: progress = ((correctAnswers + skippedAnswers) / allKana.length) * 100

	function nextCharacter() {
		if (userInput.toLowerCase() === currentRomaji.join(",").toLowerCase()) {
			correctAnswers++
			showError = false
		} else {
			showError = true
			return // Stay on the same character if the answer is incorrect
		}

		currentIndex++
		if (currentIndex < allKana.length) {
			;[currentCharacter, currentRomaji] = allKana[currentIndex]
			userInput = ""
		} else {
			console.log("Quiz completed")
		}
	}

	function skipCharacter() {
		skippedAnswers++
		currentIndex++
		if (currentIndex < allKana.length) {
			;[currentCharacter, currentRomaji] = allKana[currentIndex]
			userInput = ""
			showError = false
		} else {
			console.log("Quiz completed")
		}
	}
</script>

<div class="mt-6 flex flex-col bg-white/30 rounded-container-token dark:bg-black/30">
	<div class="flex justify-center">
		<div class="flex w-1/2 flex-col gap-4 p-20">
			<div class="flex justify-center p-8 text-6xl">{currentCharacter}</div>
			<input class="input h-8 pl-3" type="text" bind:value={userInput} />
			{#if showError}
				<div class="text-red-500">Try again.</div>
			{/if}
			<div class="flex justify-center gap-4">
				<button class="variant-filled-tertiary btn" on:click={skipCharacter}>Skip</button>
				<button class="variant-filled-primary btn" on:click={nextCharacter}>Next</button>
			</div>
		</div>
	</div>
	<span class="mb-1 flex justify-center">
		{correctAnswers + skippedAnswers}/{allKana.length}
	</span>
	<ProgressBar value={progress} max={100} />
</div>
