<script lang="ts">
	import type { User } from "@supabase/supabase-js"
	import { getGroupsToReview } from "$lib/utils/kana"

	interface Props {
		user: User | null
		writingProgressData: WritingProgress[]
		tabValue: string
	}

	let { user, writingProgressData, tabValue }: Props = $props()

	const groupsToReview = getGroupsToReview(writingProgressData)
	const reviewKanaOrder = groupsToReview.map((progress) => progress.completedGroup)

	const navigate = (groupName: string) => {
		const param = groupName.toLowerCase().split(" ").join("_")
		if (tabValue === "hiragana") {
			window.location.href = `/learn/hiragana/${param}?review=true`
		} else {
			window.location.href = `/learn/katakana/${param}?review=true`
		}
	}

	const startReview = () => {
		if (groupsToReview.length > 0) {
			navigate(reviewKanaOrder[0])
		}
	}
</script>

<div class="variant-soft-surface flex-1 p-4 rounded-container-token">
	<h4 class="h4">Review</h4>
	<div class="flex flex-col gap-2">
		<p class="mt-2">You currently have {groupsToReview.length} groups to review</p>
		<div>
			<button class="variant-filled-tertiary btn" disabled="{!user}" onclick={startReview}>
				Start reviews
			</button>
		</div>
	</div>
</div>
