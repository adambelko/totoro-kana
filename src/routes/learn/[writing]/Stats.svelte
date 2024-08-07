<script lang="ts">
	import { ProgressRadial } from "@skeletonlabs/skeleton"
	import { getUserCompletedGroups, getUserKanaLearnedCount } from "$lib/utils/kana"

	export let writingData: Kana[]
	export let writingProgressData: WritingProgress[]

	const userCompletedGroups = getUserCompletedGroups(writingProgressData)
	const learnedKanaCount = getUserKanaLearnedCount(userCompletedGroups, writingData)
	$: progressRadialValue = (learnedKanaCount / writingData.length) * 100
</script>

<div class="flex-1 bg-surface-200 p-4 rounded-container-token">
	<h4 class="h4">Stats</h4>
	<div class="mt-2 flex justify-between">
		<div class="flex flex-col items-center">
			<span>{learnedKanaCount}/{writingData.length} kana learned</span>
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
	</div>
</div>
