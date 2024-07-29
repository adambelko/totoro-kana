<script lang="ts">
	import { page } from "$app/stores"
	import { AppBar } from "@skeletonlabs/skeleton"
	import DisplayGroup from "./DisplayGroup.svelte"
	import Quiz from "./Quiz.svelte"

	export let data

	let quiz = false
	let currentIndex = 0
	let currentJapaneseCharacter: string
	let currentRomajiCharacter: string
	let selectedGroup: KanaGroup[] = []
	const hiragana = $page.url.pathname.includes("hiragana")
	const lastUrlParam = $page.url.pathname.split("/").pop()

	const formatParam = (param: string): string => {
		return param
			.split("_")
			.map((section) => section.charAt(0).toUpperCase() + section.slice(1))
			.join(" ")
	}

	const getSelectedGroup = (): KanaGroup[] => {
		if (!lastUrlParam) return []
		const groupName = formatParam(lastUrlParam)

		if (hiragana && data?.hiragana) {
			return data.hiragana.filter((kana) => kana.groupName === groupName)
		} else if (!hiragana && data?.katakana) {
			return data.katakana.filter((kana) => kana.groupName === groupName)
		}

		return []
	}

	const setCurrentCharacters = (index: number) => {
		currentIndex = index
		currentJapaneseCharacter = selectedGroup[currentIndex].japanese
		currentRomajiCharacter = selectedGroup[currentIndex].romaji
	}

	const init = () => {
		selectedGroup = getSelectedGroup()
		setCurrentCharacters(currentIndex)
	}

	const startQuiz = () => (quiz = true)

	init()
</script>

{#if quiz === false}
	<AppBar class="mt-4 p-5 rounded-container-token" background="variant-ghost">
		Navigate in between characters and memorise them
	</AppBar>
	<div class="mt-4 flex flex-col bg-white/30 rounded-container-token dark:bg-black/30">
		<DisplayGroup {selectedGroup} {currentIndex} {setCurrentCharacters} {startQuiz} />
		<div class="mt-4 flex justify-center gap-4 text-6xl">{currentJapaneseCharacter}</div>
		<div class="mb-10 flex justify-center gap-4 p-6 text-4xl">{currentRomajiCharacter}</div>
		<div class="flex flex-col gap-4">
			<div class="flex justify-center">
				Press<kbd class="kbd ml-1.5 mr-1.5">←</kbd> or
				<kbd class="kbd ml-1.5 mr-1.5">→</kbd> to navigate
			</div>
			<div class="flex justify-center">
				Press<kbd class="kbd ml-1.5 mr-1.5">ENTER</kbd> to start the quiz
			</div>
		</div>
		<div class="flex justify-center">
			<button class="variant-filled-primary btn mb-4 mt-10" on:click={startQuiz}>Start Quiz</button>
		</div>
	</div>
{:else}
	<Quiz {selectedGroup} bind:quiz />
{/if}
