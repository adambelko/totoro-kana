<script lang="ts">
	import { page } from "$app/stores"
	import { AppBar } from "@skeletonlabs/skeleton"
	import { getFirstRomaji } from "$lib/utils/kana"
	import DisplayGroup from "./DisplayGroup.svelte"
	import Quiz from "./Quiz.svelte"

	export let data

	let quiz = false
	let currentIndex = 0
	let currentJapaneseCharacter: string
	let currentRomajiCharacter: string
	let selectedGroup: Kana[] = []
	const hiragana = $page.url.pathname.includes("hiragana")
	const lastUrlParam = $page.url.pathname.split("/").pop()
	let groupName = ""

	const formatParam = (param: string): string => {
		return param
			.split("_")
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
			.join(" ")
	}

	const getSelectedGroup = (): Kana[] => {
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
		currentRomajiCharacter = getFirstRomaji(selectedGroup[currentIndex].romaji)
	}

	const init = () => {
		if (!lastUrlParam) return
		groupName = formatParam(lastUrlParam)
		selectedGroup = getSelectedGroup()
		setCurrentCharacters(currentIndex)
	}

	const startQuiz = () => {
		// quiz = true
		console.log("hey")
	}

	init()
</script>

{#if quiz === false}
	<AppBar class="mt-4 p-5 rounded-container-token" background="variant-ghost">
		Navigate in between characters and memorise them
	</AppBar>
	<div class="mt-4 flex flex-col bg-white/30 rounded-container-token dark:bg-black/30">
		<DisplayGroup {selectedGroup} {groupName} {currentIndex} {setCurrentCharacters} {startQuiz} />
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
	<Quiz {data} {selectedGroup} {groupName} {hiragana} bind:quiz />
{/if}
