<script lang="ts">
    import {getKanaOrder} from "$lib/utils/kana"

    export let data
    export let isHiragana: boolean
    export let isReview: boolean
    export let incorrectKanaCount: number
    export let groupName: string
    export let userProgress: WritingProgress[]
    export let handleRestudy: () => void

    const kanaOrder = isHiragana ? getKanaOrder(data.hiragana) : getKanaOrder(data.katakana)
    const groupNameIndex = kanaOrder.findIndex((item) => item === groupName)

    const navigate = (groupName: string) => {
        const param = groupName.toLowerCase().split(" ").join("_")
        window.location.href = isHiragana ? `/learn/hiragana/${param}` : `/learn/katakana/${param}`
    }

    const startNextLesson = () => {
        const nextLessonGroupName = kanaOrder[groupNameIndex + 1]
        navigate(nextLessonGroupName)
    }

    const checkForLastLesson = () => {
        return groupNameIndex === kanaOrder.length - 1
    }

    // Review

    const reviewKanaOrder = userProgress.map(progress => progress.completedGroup)
    console.log(reviewKanaOrder)

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
        {#if !isReview}
            {#if checkForLastLesson()}
                <p class="text-4xl font-bold">Woohoo!</p>
                <p class="text-2xl font-bold">You passed the last lesson.</p>
                <p class="text-2xl font-bold mb-10">
                    {#if isHiragana}
                        Continue to learn <a href="/learn/katakana">Katakana</a>.
                    {/if}
                </p>
            {:else if incorrectKanaCount <= 1}
                <p class="text-4xl font-bold">Well done!</p>
                <p class="text-2xl font-bold mb-10">You passed the lesson.</p>
                <div class="mb-4">
                    <button class="variant-filled-tertiary btn" on:click={startNextLesson}>Next lesson</button>
                </div>
            {:else}
                <p class="text-4xl font-bold">Lesson not passed...</p>
                <p class="text-2xl font-bold mb-10">You've made {incorrectKanaCount} mistakes.</p>
                <div>
                    <button class="variant-filled-tertiary btn mb-4" on:click={handleRestudy}>Restudy</button>
                </div>
            {/if}
        {:else}
            {#if checkForLastReview()}
                <p class="text-4xl font-bold">Woohoo!</p>
                <p class="text-2xl font-bold">You passed the last lesson.</p>
            {:else if incorrectKanaCount <= 1}
                <p class="text-4xl font-bold">Good job!</p>
                <p class="text-2xl font-bold mb-10">You passed the review.</p>
                <div class="mb-4">
                    <button class="variant-filled-tertiary btn" on:click={startNextReview}>Next review</button>
                </div>
            {:else}
                <p class="text-4xl font-bold">Review not passed...</p>
                <p class="text-2xl font-bold mb-10">You've made {incorrectKanaCount} mistakes.</p>
                <div>
                    <button class="variant-filled-tertiary btn mb-4" on:click={handleRestudy}>Restudy</button>
                </div>
            {/if}
        {/if}
    </div>
</div>
