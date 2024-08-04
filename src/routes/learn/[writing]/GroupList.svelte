<script lang="ts">
	import { goto } from "$app/navigation"
	import { getFirstRomaji, getKanaOrder } from "$lib/utils/kana.js"

	export let user: string | undefined
	export let tabValue: string
	export let writingData: Kana[]
	export let writingProgressData: WritingProgress[]

	const groupNames = getKanaOrder(writingData)

	const getGroupCharacters = (groupName: string) => {
		return writingData.filter((kana) => kana.groupName === groupName)
	}

	const isCompleted = (groupName: string): boolean => {
		return writingProgressData.some((progress) => progress.completedGroup === groupName)
	}

	const isNextToLearn = (groupName: string): boolean => {
		const firstIncompleteGroup = groupNames.find((group) => !isCompleted(group))
		return firstIncompleteGroup === groupName
	}

	const startLesson = (groupName: string) => {
		const param = groupName.toLowerCase().split(" ").join("_")
		goto(`/learn/${tabValue}/${param}`)
	}
</script>

<div class="flex-1 bg-surface-200 p-4 rounded-container-token">
	<div class="flex flex-col gap-4">
		{#each groupNames as groupName, index}
			<div class="flex flex-col bg-surface-100 p-4 rounded-container-token">
				<h4 class="h4 mb-4">Lesson {index + 1} - {groupName}</h4>
				<div class="flex flex-col gap-4 rounded-container-token">
					<div class="flex justify-between">
						<div class="flex flex-wrap gap-4">
							{#each getGroupCharacters(groupName) as { japanese, romaji }}
								<div
									class="flex min-w-16 justify-center bg-surface-300 p-3 rounded-container-token"
								>
									{japanese} / {getFirstRomaji(romaji)}
								</div>
							{/each}
						</div>
						<div>
							{#if isCompleted(groupName)}
								<button
									class="variant-filled-tertiary btn"
									disabled={!user}
									on:click={() => startLesson(groupName)}>Review</button
								>
							{:else if isNextToLearn(groupName)}
								<button
									class="variant-filled-primary btn"
									disabled={!user}
									on:click={() => startLesson(groupName)}>Start lesson</button
								>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
