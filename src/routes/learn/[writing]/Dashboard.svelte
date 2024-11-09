<script lang="ts">
	import type {User} from "@supabase/supabase-js"
	import Stats from "./Stats.svelte"
	import GroupList from "./GroupList.svelte"
	import Review from "./Review.svelte"

	interface Props {
		user: User | null
		tabValue: string
		writingData: Kana[]
		writingProgressData: WritingProgress[]
	}

	let { user, tabValue, writingData, writingProgressData }: Props = $props()
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-4 sm:flex-row">
		<Stats {user} {writingData} {writingProgressData} />
		<Review {user} {writingProgressData} {tabValue} />
	</div>
	<GroupList {user} {tabValue} {writingData} {writingProgressData} />
</div>
