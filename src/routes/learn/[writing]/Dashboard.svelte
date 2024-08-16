<script lang="ts">
  import Stats from "./Stats.svelte"
  import GroupList from "./GroupList.svelte"
  import Review from "./Review.svelte"

  export let tabValue: string
  export let userId: string | undefined
  export let writingData: Kana[]
  export let writingProgressData: WritingProgress[]
</script>

<div class="flex flex-col gap-4">
    <div class="flex gap-4">
        <Stats {writingData} {writingProgressData} />
        <Review {writingProgressData} />
    </div>
    <GroupList user={userId} {tabValue} {writingData} {writingProgressData} />
</div>
