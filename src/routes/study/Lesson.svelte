<script lang="ts">
	import { AppBar, ProgressBar } from "@skeletonlabs/skeleton"
	import KanaNavigation from "./KanaNavigation.svelte"
	import LessonPractice from "./LessonPractice.svelte"

	interface KanaGroup {
		id: number
		kanaCategory: string
		groupName: string
		japanese: string
		romaji: string
		order: number
		progress: number
	}

	export let selectedGroup: KanaGroup[]

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
		<KanaNavigation {selectedGroup} {currentIndex} {setCurrentCharacter} {startPractice} />
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
