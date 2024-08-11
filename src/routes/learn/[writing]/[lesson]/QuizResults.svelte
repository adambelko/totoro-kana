<script lang="ts">
	import { getKanaOrder } from "$lib/utils/kana"

	export let data
	export let hiragana: boolean
	export let incorrectKanaCount: number
	export let groupName: string
	export let handleRestudy: () => void
	let lastLesson = false

	const kanaOrder = hiragana ? getKanaOrder(data.hiragana) : getKanaOrder(data.katakana)
	const groupNameIndex = kanaOrder.findIndex((item) => item === groupName)

	const navigate = (groupName: string) => {
		const param = groupName.toLowerCase().split(" ").join("_")
		window.location.href = hiragana ? `/learn/hiragana/${param}` : `/learn/katakana/${param}`
	}

	const startNextLesson = () => {
		const nextLessonGroupName = kanaOrder[groupNameIndex + 1]
		navigate(nextLessonGroupName)
	}

	const checkForLastLesson = () => {
		if (groupNameIndex === kanaOrder.length - 1) {
			lastLesson = true
		}
	}

	checkForLastLesson()
</script>

<div class="flex justify-center gap-4">
	<div class="flex flex-col gap-4 text-center">
		{#if lastLesson}
			<span class="text-4xl font-bold">Woohoo!</span>
			<span class="text-2xl font-bold">You passed the last lesson.</span>
			<span class="text-2xl font-bold">
				Continue to learn <a href="/learn/katakana">Katakana</a>.
			</span>
		{:else if incorrectKanaCount <= 1}
			<span class="text-4xl font-bold">Well done!</span>
			<span class="text-2xl font-bold">You passed the lesson.</span>
			<div>
				<button class="variant-filled-tertiary btn" on:click={startNextLesson}>Next Lesson</button>
			</div>
		{:else}
			<span class="text-4xl font-bold">Lesson not passed...</span>
			<span class="text-2xl font-bold">You've made {incorrectKanaCount} mistakes.</span>
			<div>
				<button class="variant-filled-tertiary btn" on:click={handleRestudy}>Restudy</button>
			</div>
		{/if}
	</div>
</div>
