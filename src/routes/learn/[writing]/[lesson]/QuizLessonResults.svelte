<script lang="ts">
	import { getKanaOrder } from "$lib/utils/kana"

	interface Props {
		data: any
		isHiragana: boolean
		incorrectKanaCount: number
		groupName: string
		handleRestudy: () => void
	}

	let { data, isHiragana, incorrectKanaCount, groupName, handleRestudy }: Props = $props()

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
</script>

<div class="flex justify-center gap-4">
	<div class="flex flex-col gap-4 text-center">
		{#if checkForLastLesson()}
			<p class="text-4xl font-bold">Woohoo!</p>
			<p class="text-2xl font-bold">You passed the last lesson.</p>
			<div class="mb-4 text-2xl font-bold">
				{#if isHiragana}
					<p class="mb-4">
						Continue to learn <a class="anchor" href="/learn/katakana">katakana</a>.
					</p>
				{/if}
			</div>
		{:else if incorrectKanaCount <= 1}
			<p class="text-4xl font-bold">Well done!</p>
			<p class="mb-4 text-2xl font-bold">You passed the lesson.</p>
			<div class="mb-4">
				<button class="variant-filled-tertiary btn" onclick={startNextLesson}>Next lesson</button>
			</div>
		{:else}
			<p class="text-4xl font-bold">Lesson not passed...</p>
			<p class="mb-4 text-2xl font-bold">You've made {incorrectKanaCount} mistakes.</p>
			<div class="mb-4">
				<button class="variant-filled-tertiary btn mb-4" onclick={handleRestudy}>Restudy</button>
			</div>
		{/if}
	</div>
</div>
