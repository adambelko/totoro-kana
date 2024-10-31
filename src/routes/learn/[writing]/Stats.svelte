<script lang="ts">
	import { ProgressBar } from "@skeletonlabs/skeleton"
	import type { User } from "@supabase/supabase-js"
	import { getUserCompletedGroups, getUserKanaLearnedCount } from "$lib/utils/kana"

	interface Props {
		user: User | null
		writingData: Kana[]
		writingProgressData: WritingProgress[]
	}

	let { user, writingData, writingProgressData }: Props = $props()

	const userCompletedGroups = getUserCompletedGroups(writingProgressData)
	const learnedKanaCount = getUserKanaLearnedCount(userCompletedGroups, writingData)
	let progressBarValue = $derived((learnedKanaCount / writingData.length) * 100)
</script>

<div class="variant-soft-surface flex-1 p-4 rounded-container-token">
	<h4 class="h4">Stats</h4>
	<div class="mt-2 flex justify-between">
		<div class="flex flex-1 flex-col gap-2">
			{#if !user}
				<div class="space-y-4 p-4">
					<div class="grid w-1/2 grid-cols-3 gap-2">
						<div class="placeholder"></div>
						<div class="placeholder"></div>
						<div class="placeholder"></div>
					</div>
					<div class="placeholder w-3/4"></div>
				</div>
			{:else}
				<span>
					{learnedKanaCount}/{writingData.length} kana learned - {progressBarValue.toFixed(
						0
					)}%</span
				>
			{/if}
			<div class="flex h-[42px] items-center">
				<ProgressBar
					value={progressBarValue}
					max={100}
					height="h-6"
					track="variant-soft-secondary"
					meter="bg-primary-500"
				/>
			</div>
		</div>
	</div>
</div>
