<script lang="ts">
	import { useKeyDownHandler } from "$lib/utils/keydown"

	interface Props {
		selectedGroup: Kana[]
		groupName: string
		currentIndex: number
		setCurrentCharacters: (index: number) => void
		startQuiz: () => void
	}

	let { selectedGroup, groupName, currentIndex, setCurrentCharacters, startQuiz }: Props = $props()

	useKeyDownHandler((event) => {
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
					class="btn text-2xl {currentIndex === index
						? 'variant-ghost-secondary'
						: 'variant-ghost-surface'}"
					onclick={() => {
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
