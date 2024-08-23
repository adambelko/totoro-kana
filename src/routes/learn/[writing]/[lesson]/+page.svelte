<script lang="ts">
    import {page} from "$app/stores"
    import {AppBar} from "@skeletonlabs/skeleton"
    import {getFirstCharacter} from "$lib/utils/kana"
    import DisplayGroup from "./DisplayGroup.svelte"
    import Quiz from "./Quiz.svelte"

    export let data

    let quiz = false
    let currentIndex = 0
    let currentJapaneseCharacter: string
    let currentRomajiCharacter: string
    let selectedGroup: Kana[] = []
    const lastUrlParam = $page.url.pathname.split("/").pop()
    const isHiragana = $page.url.pathname.includes("hiragana")
    const isReview = $page.url.searchParams.get("review") === "true"
    let groupName = ""

    const formatParam = (param: string): string => {
        return param
            .split("_")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ")
    }

    const getSelectedGroup = (): Kana[] => {
        if (isHiragana && data?.hiragana) {
            return data.hiragana.filter((kana) => kana.groupName === groupName)
        } else if (!isHiragana && data?.katakana) {
            return data.katakana.filter((kana) => kana.groupName === groupName)
        }

        return []
    }

    const setCurrentCharacters = (index: number) => {
        currentIndex = index
        currentJapaneseCharacter = selectedGroup[currentIndex].japanese
        currentRomajiCharacter = getFirstCharacter(selectedGroup[currentIndex].romaji)
    }

    const init = () => {
        if (!lastUrlParam) return
        groupName = formatParam(lastUrlParam)
        selectedGroup = getSelectedGroup()
        setCurrentCharacters(currentIndex)
    }

    const startQuiz = () => {
        quiz = true
    }

    init()
</script>

<svelte:head>
    <title>{groupName}</title>
</svelte:head>

{#if quiz === false}
    <div class="mb-6 mt-4 flex flex-col bg-white/30 rounded-container-token">
        <AppBar class="ml-4 mr-4 mt-4 p-5 rounded-container-token" background="variant-ghost">
            Navigate in between characters and memorise them.
        </AppBar>
        <DisplayGroup {selectedGroup} {groupName} {currentIndex} {setCurrentCharacters} {startQuiz} />
        <div class="mt-4 flex justify-center gap-4 text-6xl">{currentJapaneseCharacter}</div>
        <div class="mb-4 flex justify-center gap-4 p-6 text-4xl">{currentRomajiCharacter}</div>
        <div class="flex flex-col gap-4">
            <div class="flex justify-center">
                Press<kbd class="kbd ml-1.5 mr-1.5">←</kbd>or<kbd class="kbd ml-1.5 mr-1.5">→</kbd> to navigate
            </div>
            <div class="flex justify-center">
                Press<kbd class="kbd ml-1.5 mr-1.5">ENTER</kbd> to start the quiz
            </div>
        </div>
        <div class="flex justify-center">
            <button class="variant-filled-primary btn mb-4 mt-6" on:click={startQuiz}>Start Quiz</button>
        </div>
    </div>
{:else}
    <Quiz {data} {selectedGroup} {groupName} {isHiragana} {isReview} bind:quiz />
{/if}
