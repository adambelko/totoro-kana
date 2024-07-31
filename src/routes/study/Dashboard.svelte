<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { getFirstRomaji } from "$lib/helpers/kana"
	import Stats from "./[writing]/Stats.svelte"

	interface WritingProgress {
		id: string
		userId: string | null
		completedGroup: string
		completionDate: string
	}

	export let userId: string | undefined
	export let writingData: Kana[]
	export let writingProgressData: WritingProgress[]

	const dispatch = createEventDispatcher()
	const groupNames = writingData.map((item) => item.groupName)
	const uniqueGroupNames = [...new Set(groupNames)]

	const getGroupData = (groupName: string) => {
		return writingData.filter((item) => item.groupName === groupName)
	}

	const startLesson = (groupName: string) => {
		dispatch("startLesson", { groupName })
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4">
		<Stats {userId} {writingData} {writingProgressData} />

		<div class="flex-1 bg-surface-200 p-4 rounded-container-token">
			<h4 class="h4">Review</h4>
			<div class="flex items-center justify-center">
				<button class="variant-filled-primary btn">Start review</button>
			</div>
		</div>
	</div>

	<div class="flex-1 bg-surface-200 p-4 rounded-container-token">
		<div class="flex flex-col gap-4">
			{#each uniqueGroupNames as kanaGroup, index}
				<div class="flex flex-col bg-surface-100 p-4 rounded-container-token">
					<h4 class="h4 mb-4">Lesson {index + 1} - {kanaGroup}</h4>
					<div class="flex flex-col gap-4 rounded-container-token">
						<div class="flex justify-between">
							<div class="flex flex-wrap gap-4">
								{#each getGroupData(kanaGroup) as { japanese, romaji }}
									<div
										class="flex min-w-16 justify-center bg-surface-300 p-3 rounded-container-token"
									>
										{japanese} / {getFirstRomaji(romaji)}
									</div>
								{/each}
							</div>
							<div>
								<button class="variant-filled-primary btn" on:click={() => startLesson(kanaGroup)}
									>Start lesson</button
								>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
