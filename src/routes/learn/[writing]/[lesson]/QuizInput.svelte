<script lang="ts">
    import {useKeyDownHandler} from "$lib/utils/keydown"
    import {onMount} from "svelte"

    interface Kana {
        japanese: string
        romaji: string
    }

    export let currentJapaneseCharacter: string
    export let currentRomajiCharacter: string
    export let currentIndex: number
    export let incorrectKanaCount: number
    export let quizStage: number
    export let shuffledKanaList: Kana[]
    export let handleRestudy: () => void
    export let saveUserProgress: () => void

    let userRomajiInput = ""
    let inputErrorClass = ""

    useKeyDownHandler((event) => {
        if (event.key === "Enter") {
            checkInputCharacter()
        }
    })

    let inputElement: HTMLInputElement

    onMount(() => {
        if (inputElement) {
            inputElement.focus()
        }
    })

    const cleanupInput = () => {
        userRomajiInput = ""
        inputErrorClass = ""
    }

    const setNextKanaPair = () => {
        const {japanese, romaji} = shuffledKanaList[currentIndex]
        currentJapaneseCharacter = japanese
        currentRomajiCharacter = romaji
        currentIndex++
    }

    const nextKana = () => {
        if (currentIndex < shuffledKanaList.length) {
            setNextKanaPair()
        } else {
            cleanupInput()
            quizStage++
        }
    }

    const checkInputCharacter = () => {
        const romajiOptions = currentRomajiCharacter.split(", ").map((romaji) => romaji.trim())

        if (romajiOptions.includes(userRomajiInput.toLowerCase().trim())) {
            cleanupInput()
            saveUserProgress()
            nextKana()
        } else {
            incorrectKanaCount++
            inputErrorClass = "input-error"
            setTimeout(() => {
                cleanupInput()
            }, 500)
        }
    }

    const restudy = () => {
        cleanupInput()
        handleRestudy()
    }

    setNextKanaPair()
</script>

<div class="flex flex-col items-center justify-center gap-4">
    <div class="text-6xl">{currentJapaneseCharacter}</div>
    <input
            class="input h-8 w-1/2 pl-3 {inputErrorClass}"
            type="text"
            bind:value={userRomajiInput}
            bind:this={inputElement}
    />
</div>
<div class="flex justify-center gap-4">
    <button class="variant-filled-tertiary btn" on:click={restudy}>Restudy</button>
    <button class="variant-filled-primary btn" on:click={checkInputCharacter}>Next</button>
</div>
<div class="mb-4 mt-10 flex flex-col gap-4">
    <div class="flex justify-center">
        Press<kbd class="kbd ml-1.5 mr-1.5">SHIFT</kbd>+<kbd class="kbd ml-1.5 mr-1.5">R</kbd> to restudy
    </div>
    <div class="flex justify-center">
        Press<kbd class="kbd ml-1.5 mr-1.5">ENTER</kbd> to submit the answer
    </div>
</div>
