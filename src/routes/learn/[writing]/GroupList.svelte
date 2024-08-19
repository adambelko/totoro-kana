<script lang="ts">
    import {goto} from "$app/navigation"
    import {getGroupsToReview, getKanaOrder} from "$lib/utils/kana.js"
    import GroupCard from "./GroupCard.svelte"

    export let user: string | undefined
    export let tabValue: string
    export let writingData: Kana[]
    export let writingProgressData: WritingProgress[]

    let isGroupListExpanded = false
    const groupNames = getKanaOrder(writingData)

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

    const startLesson = (groupName: string) => {
        const param = groupName.toLowerCase().split(" ").join("_")
        goto(`/learn/${tabValue}/${param}`)
    }
</script>

<div class="flex-1 bg-surface-200 p-4 rounded-container-token">
    {#if isGroupListExpanded}
        <div class="flex justify-center">
            <button class="pb-4 anchor" on:click={() => isGroupListExpanded = false}>Hide lessons</button>
        </div>
    {/if}
    <div class="flex flex-col gap-4">
        {#each groupNames as groupName, index}
            {#if !isGroupListExpanded && isNextToLearn(groupName)}
                <GroupCard {groupName} {index} {startLesson} {writingData} />
                <button class="anchor" on:click={() => isGroupListExpanded = true}>Show all lessons</button>
            {:else if isGroupListExpanded}
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
