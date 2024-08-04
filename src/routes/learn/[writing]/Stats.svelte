<script lang="ts">
	import { ProgressRadial } from "@skeletonlabs/skeleton"

	interface WritingProgress {
		id: string
		userId: string | null
		completedGroup: string
		completionDate: string
	}

	export let writingData: Kana[]
	export let writingProgressData: WritingProgress[]

	const userCompletedGroups = writingProgressData.map((item) => item.completedGroup)

	const learnedKana = userCompletedGroups.flatMap((groupName) =>
		writingData.filter((item) => item.groupName === groupName)
	)

	$: progressRadialValue = (learnedKana.length / writingData.length) * 100
</script>

<div class="flex-1 bg-surface-200 p-4 rounded-container-token">
	<h4 class="h4">Stats</h4>
	<div class="mt-2 flex justify-between">
		<div class="flex flex-col items-center">
			<span>{learnedKana.length}/{writingData.length} kana learned</span>
			<ProgressRadial
				value={progressRadialValue}
				stroke={90}
				font={60}
				meter="stroke-primary-500"
				track="stroke-primary-500/30"
				strokeLinecap="butt"
				class="mt-2"
				>{progressRadialValue.toFixed(0)}%
			</ProgressRadial>
		</div>
		<div class="flex flex-col justify-center">
			<button class="variant-filled-primary btn">Start lesson</button>
		</div>
	</div>
</div>
