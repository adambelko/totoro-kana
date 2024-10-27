<script lang="ts">
	import Stats from "./Stats.svelte"
	import GroupList from "./GroupList.svelte"
	import Review from "./Review.svelte"

	interface Props {
		tabValue: string
		userId: string | undefined
		writingData: Kana[]
		writingProgressData: WritingProgress[]
	}

	let { tabValue, userId, writingData, writingProgressData }: Props = $props()
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4">
		<Stats {writingData} {writingProgressData} />
		<Review {writingProgressData} {tabValue} {userId} />
	</div>
	<GroupList user={userId} {tabValue} {writingData} {writingProgressData} />
</div>
