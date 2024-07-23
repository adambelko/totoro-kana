<script lang="ts">
	import { page } from "$app/stores"
	import { AppBar, ProgressBar } from "@skeletonlabs/skeleton"
	import DisplayGroup from "./DisplayGroup.svelte"
	import LessonPractice from "./LessonPractice.svelte"

	export let data
	const hiragana = $page.url.pathname.includes("hiragana")
	let selectedGroup: KanaGroup[] = []

	const formatParam = (param: string): string => {
		return param
			.split("_")
			.map((section) => section.charAt(0).toUpperCase() + section.slice(1))
			.join(" ")
	}

	const lastParam = $page.url.pathname.split("/").pop()

	if (lastParam) {
		const groupName = formatParam(lastParam)

		if (hiragana && data?.hiragana) {
			selectedGroup = data.hiragana.filter((kana) => kana.groupName === groupName)
		} else if (!hiragana && data?.katakana) {
			selectedGroup = data?.katakana.filter((kana) => kana.groupName === groupName)
		}
	}

	let practice = false
	let currentIndex = 0
	let currentJapaneseCharacter = selectedGroup[currentIndex].japanese
	let currentRomajiCharacter = selectedGroup[currentIndex].romaji

	const setCurrentCharacter = (index: number) => {
		currentIndex = index
		currentJapaneseCharacter = selectedGroup[currentIndex].japanese
		currentRomajiCharacter = selectedGroup[currentIndex].romaji
	}

	const startPractice = () => (practice = true)
</script>

{#if practice === false}
	<AppBar class="mt-4 p-5 rounded-container-token" background="variant-ghost">
		Navigate in between characters and memorise them
	</AppBar>
	<div class="mt-4 flex flex-col bg-white/30 rounded-container-token dark:bg-black/30">
		<DisplayGroup {selectedGroup} {currentIndex} {setCurrentCharacter} {startPractice} />
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
	<LessonPractice {selectedGroup} {currentIndex} on:resetPractice={() => (practice = false)} />
{/if}
