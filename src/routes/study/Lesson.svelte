<script lang="ts">
	import { AppBar, ProgressBar } from "@skeletonlabs/skeleton"
	import { onMount } from "svelte"

	export let selectedGroup
	console.log(selectedGroup)

	onMount(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				practice = true
			} else if (event.key === "ArrowLeft") {
				event.preventDefault()
				goLeft()
			} else if (event.key === "ArrowRight") {
				event.preventDefault()
				goRight()
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
	let progress = 0

	const setCurrentCharacter = (index: number) => {
		currentIndex = index
		currentJapaneseCharacter = selectedGroup[currentIndex].japanese
		currentRomajiCharacter = selectedGroup[currentIndex].romaji
	}

	const goLeft = () => {
		if (currentIndex > 0) {
			setCurrentCharacter(currentIndex - 1)
		}
	}

	const goRight = () => {
		if (currentIndex < selectedGroup.length - 1) {
			setCurrentCharacter(currentIndex + 1)
		}
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
			<button class="variant-filled-primary btn mb-4 mt-10" on:click={() => (practice = true)}
				>Practice</button
			>
		</div>
		<ProgressBar value={progress} max={100} />
	</div>
{:else}
	<div class="mt-4 flex flex-col bg-white/30 rounded-container-token dark:bg-black/30">
		<div class="flex justify-center">
			<div class="flex w-1/2 flex-col gap-4 p-20">
				<div class="flex justify-center p-8 text-6xl">{currentJapaneseCharacter}</div>
				<input class="input h-8 pl-3 {inputErrorClass}" type="text" bind:value={userRomajiInput} />
				<div class="flex justify-center gap-4">
					<!--				<button class="variant-filled-tertiary btn" on:click={skipCharacter}>Skip</button>-->
					<!--				<button class="variant-filled-primary btn" on:click={checkCharacter}>Next</button>-->
				</div>
			</div>
		</div>
		<span class="mb-1 flex justify-center">
			<!--{correctAnswerCount + skippedAnswerCount}/{shuffledKanaList.length}-->
		</span>
		<ProgressBar value={progress} max={100} />
	</div>
{/if}

<style>
	*:focus {
		outline: 0 !important;
	}
</style>
