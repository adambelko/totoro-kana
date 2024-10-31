<script lang="ts">
	import { goto } from "$app/navigation"
	import type {User} from "@supabase/supabase-js"
	import { getGroupsToReview, getKanaOrder } from "$lib/utils/kana.js"
	import GroupCard from "./GroupCard.svelte"
	import { isGroupListExpanded } from "$lib/stores"

	interface Props {
		user: User | null
		tabValue: string
		writingData: Kana[]
		writingProgressData: WritingProgress[]
	}

	let { user, tabValue, writingData, writingProgressData }: Props = $props()

	const groupNames = getKanaOrder(writingData)

	const toggleGroupList = () => {
		isGroupListExpanded.update((state) => !state)
	}

	const isCompleted = (groupName: string): boolean => {
		return writingProgressData.some((progress) => progress.completedGroup === groupName)
	}

	const isReadyForReview = (groupName: string): boolean => {
		const groupsToReview = getGroupsToReview(writingProgressData)
		return groupsToReview.some((progress) => progress.completedGroup === groupName)
	}

	const isNextToLearn = (groupName: string): boolean => {
		const firstIncompleteGroup = groupNames.find((group) => !isCompleted(group))
		return firstIncompleteGroup === groupName
	}

	const startLesson = (groupName: string, review: boolean) => {
		const param = groupName.toLowerCase().split(" ").join("_")
		goto(`/learn/${tabValue}/${param}?review=${review}`)
	}
</script>

<div class="flex-1 bg-surface-200 p-4 rounded-container-token">
	{#if $isGroupListExpanded}
		<div class="flex justify-center">
			<button class="anchor pb-4" onclick={toggleGroupList}>Hide lessons</button>
		</div>
	{/if}
	<div class="flex flex-col gap-4">
		{#each groupNames as groupName, index}
			{#if !$isGroupListExpanded && isNextToLearn(groupName)}
				<GroupCard
					{groupName}
					{index}
					{user}
					{writingData}
					isNextToLearn={isNextToLearn(groupName)}
					{startLesson}
				/>
				<button class="anchor" onclick={toggleGroupList}>Show all lessons</button>
			{:else if $isGroupListExpanded}
				<GroupCard
					{groupName}
					{index}
					{user}
					{writingData}
					isCompleted={isCompleted(groupName)}
					isReadyForReview={isReadyForReview(groupName)}
					isNextToLearn={isNextToLearn(groupName)}
					{startLesson}
				/>
			{/if}
		{/each}
	</div>
</div>
