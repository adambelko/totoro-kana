<script lang="ts">
	import { onMount } from "svelte"

	export let selectedGroup
	export let currentIndex
	export let setCurrentCharacter
	export let startPractice

	onMount(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				event.preventDefault()
				startPractice()
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
</script>

<div class="flex justify-center gap-4 p-6">
	{#each selectedGroup as groupItem, index}
		<button
			class="flex justify-center bg-surface-300 p-4 rounded-container-token {currentIndex === index
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

<style>
	*:focus {
		outline: 0 !important;
	}
</style>
