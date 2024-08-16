<script lang="ts">
  import {ProgressBar} from "@skeletonlabs/skeleton"
  import {getUserCompletedGroups, getUserKanaLearnedCount} from "$lib/utils/kana"

  export let writingData: Kana[]
  export let writingProgressData: WritingProgress[]

  const userCompletedGroups = getUserCompletedGroups(writingProgressData)
  const learnedKanaCount = getUserKanaLearnedCount(userCompletedGroups, writingData)
  $: progressBarValue = (learnedKanaCount / writingData.length) * 100
</script>

<div class="flex-1 variant-soft-surface p-4 rounded-container-token">
    <h4 class="h4">Stats</h4>
    <div class="mt-2 flex justify-between">
        <div class="flex flex-col gap-2 flex-1">
            <span>{learnedKanaCount}/{writingData.length} kana learned - {progressBarValue.toFixed(0)}%</span>
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