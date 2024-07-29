<script lang="ts">
	import { AppBar, ProgressBar } from "@skeletonlabs/skeleton"
	import { shuffleArray } from "$lib/helpers/Kana"
	import QuizInput from "./QuizInput.svelte"
	import QuizButton from "./QuizButton.svelte"

	interface Kana {
		japanese: string
		romaji: string
	}

	interface UserProgress {
		kanaId: number
		kanaProgress: number
	}

	export let quiz: boolean
	export let selectedGroup: KanaGroup[]

	let currentJapaneseCharacter = ""
	let currentRomajiCharacter = ""
	let quizStage = 1
	let currentIndex = 0
	let correctKanaCount = 0
	let incorrectKanaCount = 0
	let shuffledKanaList: Kana[] = []
	let userProgress: UserProgress[] = []
	$: progressBarValue = (correctKanaCount / (shuffledKanaList.length * 3)) * 100

	const init = () => {
		selectedGroup.map((kana) => {
			userProgress.push({ kanaId: kana.id, kanaProgress: 0 })
		})

		const kanaList = selectedGroup.map((kana) => ({
			japanese: kana.japanese,
			romaji: kana.romaji
		}))

		shuffledKanaList = shuffleArray(kanaList)
	}

	const saveUserProgress = () => {
		const correctKana = selectedGroup.find((kana) => kana.japanese === currentJapaneseCharacter)
		const userProgressIndex = userProgress.findIndex((kana) => kana.kanaId === correctKana?.id)
		userProgress[userProgressIndex].kanaProgress += 1
		correctKanaCount += 1
	}

	const handleRestudy = () => {
		correctKanaCount = 0
		userProgress = []
		quiz = false
	}

	init()
</script>

<AppBar class="mt-4 p-5 rounded-container-token" background="variant-ghost">
	Correctly answer each syllable 3 times in order to pass the lesson
</AppBar>
<div class="mt-4 flex flex-col bg-white/30 rounded-container-token dark:bg-black/30">
	<div class="flex justify-center">
		<div class="flex w-1/2 flex-col gap-4 p-20">
			{#if quizStage === 1}
				<QuizButton
					romajiToJapanese={false}
					bind:currentJapaneseCharacter
					{currentRomajiCharacter}
					bind:quizStage
					{shuffledKanaList}
					{currentIndex}
					bind:incorrectKanaCount
					{handleRestudy}
					{saveUserProgress}
				/>
			{:else if quizStage === 2}
				<QuizInput
					bind:currentJapaneseCharacter
					{currentRomajiCharacter}
					{currentIndex}
					{shuffledKanaList}
					bind:quizStage
					bind:incorrectKanaCount
					{handleRestudy}
					{saveUserProgress}
				/>
			{:else if quizStage === 3}
				<QuizButton
					romajiToJapanese={true}
					{currentJapaneseCharacter}
					bind:currentRomajiCharacter
					bind:quizStage
					{shuffledKanaList}
					{currentIndex}
					bind:incorrectKanaCount
					{handleRestudy}
					{saveUserProgress}
				/>
			{:else}
				<div class="flex justify-center gap-4">
					{#if incorrectKanaCount <= 1}
						<div class="flex flex-col gap-4 text-center">
							<span class="text-4xl font-bold">Good news!</span>
							<span class="text-2xl font-bold">You passed the lesson</span>
						</div>
					{:else}
						<div class="flex flex-col gap-4 text-center">
							<span class="text-4xl font-bold">Lesson not passed</span>
							<span class="text-2xl font-bold">You made {incorrectKanaCount} mistakes</span>
							<div>
								<button class="variant-filled-tertiary btn" on:click={handleRestudy}>Restudy</button
								>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
	<span class="mb-1 flex justify-center">
		{correctKanaCount}/{shuffledKanaList.length * 3}
	</span>
	<ProgressBar value={progressBarValue} max={100} />
</div>
