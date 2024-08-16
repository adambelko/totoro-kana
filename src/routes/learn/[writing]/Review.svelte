<script lang="ts">
  import {getGroupsToReview} from "$lib/utils/kana"

  export let writingProgressData: WritingProgress[]
  const groupsToReview = getGroupsToReview(writingProgressData)
</script>

<div class="flex-1 variant-soft-surface p-4 rounded-container-token">
    <h4 class="h4">Review</h4>
    <div class="flex flex-col gap-2">
        <p class="mt-2">You currently have {groupsToReview.length} groups to review</p>
        <div>
            <button class="variant-filled-tertiary btn">Show review</button>
        </div>
    </div>
</div>
