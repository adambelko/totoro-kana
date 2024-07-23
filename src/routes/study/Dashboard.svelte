<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { ProgressRadial } from "@skeletonlabs/skeleton"

	const dispatch = createEventDispatcher()
	export let data: Kana[]

	const groupNames = data.map((item) => item.groupName)
	const uniqueGroupNames = [...new Set(groupNames)]

	const filterHiragana = (groupName: string) => {
		return data.filter((item) => item.groupName === groupName)
	}

	const getFirstRomaji = (romaji: string) => {
		return romaji.split(",")[0].trim()
	}

	const startLesson = (groupName: string) => {
		dispatch("startLesson", { groupName })
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4">
		<div class="flex-1 bg-surface-200 p-4 rounded-container-token">
			<h4 class="h4">Study</h4>
			<div class="mt-2 flex justify-between">
				<div class="flex flex-col items-center">
					<span>0/{data.length} kana completed</span>
					<ProgressRadial
						value={0}
						stroke={90}
						font={60}
						meter="stroke-primary-500"
						track="stroke-primary-500/30"
						strokeLinecap="round"
						class="mt-2"
						>0%
					</ProgressRadial>
				</div>
				<div class="flex flex-col justify-center">
					<button class="variant-filled-primary btn">Start lesson</button>
				</div>
			</div>
		</div>

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
								{#each filterHiragana(kanaGroup) as { japanese, romaji }}
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
