<script lang="ts">
    import {getGroupsToReview} from "$lib/utils/kana"

    interface Props {
        isHiragana: boolean;
        isReview: boolean;
        incorrectKanaCount: number;
        groupName: string;
        userProgress: WritingProgress[];
        handleRestudy: () => void;
    }

    let {
        isHiragana,
        isReview,
        incorrectKanaCount,
        groupName,
        userProgress,
        handleRestudy
    }: Props = $props();

    const navigate = (groupName: string) => {
        const param = groupName.toLowerCase().split(" ").join("_")
        if (isHiragana) {
            window.location.href = `/learn/hiragana/${param}?review=${isReview}`
        } else {
            window.location.href = `/learn/katakana/${param}?review=${isReview}`
        }
    }

    const groupsToReview = getGroupsToReview(userProgress)
    const reviewKanaOrder = groupsToReview.map(progress => progress.completedGroup)
    const reviewGroupNameIndex = reviewKanaOrder.findIndex((item) => item === groupName)

    const startNextReview = () => {
        const nextReviewGroupName = reviewKanaOrder[reviewGroupNameIndex + 1]
        navigate(nextReviewGroupName)
    }

    const checkForLastReview = () => {
        return reviewGroupNameIndex === reviewKanaOrder.length - 1
    }
</script>

<div class="flex justify-center gap-4">
    <div class="flex flex-col gap-4 text-center">
        {#if checkForLastReview()}
            <p class="text-4xl font-bold">Good job!</p>
            <p class="text-2xl font-bold mb-4">No more reviews at this point.</p>
        {:else if incorrectKanaCount <= 1}
            <p class="text-4xl font-bold">Good job!</p>
            <p class="text-2xl font-bold mb-4">You passed the review.</p>
            <div class="mb-4">
                <button class="variant-filled-tertiary btn" onclick={startNextReview}>Next review</button>
            </div>
        {:else}
            <p class="text-4xl font-bold">Review not passed...</p>
            <p class="text-2xl font-bold mb-4">You've made {incorrectKanaCount} mistakes.</p>
            <div class="mb-4">
                <button class="variant-filled-tertiary btn mb-4" onclick={handleRestudy}>Restudy</button>
            </div>
        {/if}
    </div>
</div>
