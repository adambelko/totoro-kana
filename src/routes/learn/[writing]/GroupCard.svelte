<script lang="ts">
    import {getFirstCharacter} from "$lib/utils/kana"

    export let user: string | undefined = undefined
    export let isCompleted: boolean = false
    export let isReadyForReview: boolean = false
    export let isNextToLearn: boolean = false
    export let groupName: string
    export let index: number
    export let writingData: Kana[]
    export let startLesson: (groupName: string) => void

    const getGroupCharacters = (groupName: string) => {
        return writingData.filter((kana) => kana.groupName === groupName)
    }

    const groupCharacters = getGroupCharacters(groupName)
</script>

<div class="flex flex-col bg-surface-100 p-4 rounded-container-token">
    <h4 class="h4 mb-4">Lesson {index + 1} - {groupName}</h4>
    <div class="flex justify-between">
        <div class="flex flex-wrap gap-3">
            {#each groupCharacters as {japanese, romaji}}
                <div class="variant-ghost-surface cursor-default btn">
                    {japanese} / {getFirstCharacter(romaji)}
                </div>
            {/each}
        </div>
        <div>
            {#if isCompleted && isReadyForReview}
                <button class="variant-filled-tertiary btn" on:click={() => startLesson(groupName)}>
                    Review
                </button>
            {:else if isNextToLearn}
                <button class="variant-filled-primary btn" disabled={!user} on:click={() => startLesson(groupName)}>
                    Start lesson
                </button>
            {/if}
        </div>
    </div>
</div>