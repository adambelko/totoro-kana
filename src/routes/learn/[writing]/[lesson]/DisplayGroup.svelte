<script lang="ts">
	import { onMount } from "svelte"

	export let selectedGroup: Kana[]
	export let groupName: string
	export let currentIndex: number
	export let setCurrentCharacters: (index: number) => void
	export let startQuiz: () => void

	onMount(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				event.preventDefault()
				startQuiz()
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
			setCurrentCharacters(currentIndex - 1)
		}
	}

	const navigateRight = () => {
		if (currentIndex < selectedGroup.length - 1) {
			setCurrentCharacters(currentIndex + 1)
		}
	}
</script>

<div class="flex justify-center gap-4 p-6">
	<div class="flex flex-col gap-6">
		<div class="text-center text-4xl font-bold">{groupName}</div>
		<div class="flex gap-4">
			{#each selectedGroup as groupItem, index}
				<button
					class="flex min-w-16 justify-center bg-surface-300 p-3 text-2xl rounded-container-token {currentIndex ===
					index
						? 'border-2 border-blue-500'
						: ''}"
					on:click={() => {
						setCurrentCharacters(index)
					}}
				>
					{groupItem.japanese}
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	*:focus {
		outline: 0 !important;
	}
</style>
