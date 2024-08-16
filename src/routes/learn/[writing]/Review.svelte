<script lang="ts">
  export let writingProgressData: WritingProgress[]

  console.log(writingProgressData)

  const getGroupsToReview = (): WritingProgress[] => {
    const today = new Date()
    const groupsToReview = writingProgressData.filter((progress) => {
      const completionDate = new Date(progress.completionDate)
      const daysSinceCompletion = Math.floor(
          (today.getTime() - completionDate.getTime()) / (1000 * 60 * 60 * 24)
      )
      return daysSinceCompletion >= progress.reviewInterval
    })
    return groupsToReview
  }

  const groupsToReview = getGroupsToReview()
</script>

<div class="flex-1 variant-soft-surface p-4 rounded-container-token">
    <h4 class="h4">Review</h4>
    <div class="flex flex-col gap-2">
        <p class="mt-2">You currently have {groupsToReview.length} groups to review</p>
        <div>
            <button class="variant-filled-tertiary btn">Review all</button>
        </div>
    </div>
</div>
