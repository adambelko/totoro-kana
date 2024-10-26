<script lang="ts">
    import {getFirstCharacter} from "$lib/utils/kana"

    interface Props {
        user?: string | undefined;
        isCompleted?: boolean;
        isReadyForReview?: boolean;
        isNextToLearn?: boolean;
        groupName: string;
        index: number;
        writingData: Kana[];
        startLesson: (groupName: string, review: boolean) => void;
    }

    let {
        user = undefined,
        isCompleted = false,
        isReadyForReview = false,
        isNextToLearn = false,
        groupName,
        index,
        writingData,
        startLesson
    }: Props = $props();

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
                <button class="variant-filled-tertiary btn" onclick={() => startLesson(groupName, true)}>
                    Review
                </button>
            {:else if isNextToLearn}
                <button class="variant-filled-primary btn" disabled={!user}
                        onclick={() => startLesson(groupName, false)}>
                    Start lesson
                </button>
            {/if}
        </div>
    </div>
</div>