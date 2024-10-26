<script lang="ts">
	import { AppBar, ProgressBar } from "@skeletonlabs/skeleton"
	import { useKeyDownHandler } from "$lib/utils/keydown"
	import { shuffleArray } from "$lib/utils/kana"
	import { get, post } from "$lib/utils/api"
	import QuizInput from "./QuizInput.svelte"
	import QuizButton from "./QuizButton.svelte"
	import QuizLessonResults from "./QuizLessonResults.svelte"
	import QuizReviewResults from "./QuizReviewResults.svelte"

	interface KanaList {
		japanese: string
		romaji: string
	}

	interface GroupCompletionResponse {
		isGroupCompleted: boolean
		reviewInterval: number
	}

	interface Props {
		data: any;
		quiz: boolean;
		isHiragana: boolean;
		isReview: boolean;
		groupName: string;
		selectedGroup: Kana[];
	}

	let {
		data,
		quiz = $bindable(),
		isHiragana,
		isReview,
		groupName,
		selectedGroup
	}: Props = $props();

	let currentJapaneseCharacter = $state("")
	let currentRomajiCharacter = $state("")
	let quizStage = $state(1)
	let currentIndex = 0
	let correctKanaCount = $state(0)
	let incorrectKanaCount = $state(0)
	let shuffledKanaList: KanaList[] = $state([])
	let userProgress: WritingProgress[] = $state()
	let isReviewDataReady = $state(false)
	let progressBarValue = $derived((correctKanaCount / (shuffledKanaList.length * 3)) * 100)

	const checkGroupCompletion = async (): Promise<GroupCompletionResponse> => {
		return await get(`/learn?userId=${data.user.id}&groupName=${groupName}&hiragana=${isHiragana}`)
	}

	useKeyDownHandler((event) => {
		if (event.key.toLowerCase() === "r" && event.shiftKey) {
			event.preventDefault()
			handleRestudy()
		}
	})

	const init = () => {
		const kanaList = selectedGroup.map((kana) => ({
			japanese: kana.japanese,
			romaji: kana.romaji
		}))

		shuffledKanaList = shuffleArray(kanaList)
	}

	const submitProgress = async () => {
		const { isGroupCompleted, reviewInterval } = await checkGroupCompletion()
		const requestData = {
			userId: data.user.id,
			groupName,
			isHiragana,
			reviewInterval
		}

		if (isGroupCompleted) {
			const { tableUserProgress } = await post("/review", requestData)
			userProgress = tableUserProgress
			isReviewDataReady = true
		} else {
			await post("/learn", requestData)
		}
	}

	const saveUserProgress = () => {
		quizStage <= 3 ? correctKanaCount++ : submitProgress()
	}

	const handleRestudy = () => {
		quiz = false
	}

	init()
</script>

<div class="mb-6 mt-4 flex min-h-[580px] flex-col bg-white/30 rounded-container-token justify-between">
	<div>
		<AppBar class="ml-4 mr-4 mt-4 flex p-5 rounded-container-token" background="variant-ghost">
			<p class="mb-1">Correctly answer each syllable 3 times in order to pass the lesson.</p>
			<p>You're allowed to make one mistake.</p>
		</AppBar>
		<div class="flex justify-center">
			<div class="mt-20 flex w-1/2 flex-col gap-4">
				{#if quizStage === 1}
					<QuizButton
						romajiToJapanese={false}
						bind:currentJapaneseCharacter
						{currentRomajiCharacter}
						{currentIndex}
						bind:incorrectKanaCount
						bind:quizStage
						{shuffledKanaList}
						{handleRestudy}
						{saveUserProgress}
					/>
				{:else if quizStage === 2}
					<QuizInput
						bind:currentJapaneseCharacter
						{currentRomajiCharacter}
						{currentIndex}
						bind:incorrectKanaCount
						bind:quizStage
						{shuffledKanaList}
						{handleRestudy}
						{saveUserProgress}
					/>
				{:else if quizStage === 3}
					<QuizButton
						romajiToJapanese={true}
						{currentJapaneseCharacter}
						bind:currentRomajiCharacter
						{currentIndex}
						bind:correctKanaCount
						bind:incorrectKanaCount
						bind:quizStage
						{shuffledKanaList}
						{handleRestudy}
						{saveUserProgress}
					/>
				{:else if !isReview}
					<QuizLessonResults {data} {isHiragana} {incorrectKanaCount} {groupName} {handleRestudy} />
				{:else if isReviewDataReady}
					<QuizReviewResults
						{isHiragana}
						{isReview}
						{incorrectKanaCount}
						{groupName}
						{userProgress}
						{handleRestudy}
					/>
				{/if}
			</div>
		</div>
	</div>
	<div>
		<span class="mb-1 flex justify-center">
			{correctKanaCount}/{shuffledKanaList.length * 3}
		</span>
		<ProgressBar value={progressBarValue} max={100} />
	</div>
</div>
