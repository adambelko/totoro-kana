<script lang="ts">
	import Stats from "./Stats.svelte"
	import GroupList from "./GroupList.svelte"

	interface WritingProgress {
		id: string
		userId: string | null
		completedGroup: string
		completionDate: string
	}

	export let tabValue: string
	export let userId: string | undefined
	export let writingData: Kana[]
	export let writingProgressData: WritingProgress[]
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4">
		<Stats {writingData} {writingProgressData} />

		<div class="flex-1 bg-surface-200 p-4 rounded-container-token">
			<h4 class="h4">Review</h4>
			<div class="flex items-center justify-center">
				<button class="variant-filled-primary btn">Start review</button>
			</div>
		</div>
	</div>

	<GroupList user={userId} {tabValue} {writingData} />
</div>
