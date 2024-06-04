<script lang="ts">
	import SelectKanaGroupListBox from "$lib/components/SelectKanaGroupListBox.svelte"
	import { AppBar } from "@skeletonlabs/skeleton"
	import { hiragana } from "$lib/data/hiragana"
	import { katakana } from "$lib/data/katakana"

	interface KanaGroup {
		category: string
		groupName: string
		romaji: string
		japanese: string
	}

	let hiraganaGroups: KanaGroup[] = []
	let katakanaGroups: KanaGroup[] = []
	$: selectedGroups = [{ hiragana: [...hiraganaGroups] }, { katakana: [...katakanaGroups] }]
	$: console.log(selectedGroups)
</script>

<AppBar class="mt-6 p-6 rounded-container-token" background="variant-ghost"
	>Welcome back user!</AppBar
>

<div class="mt-6 flex gap-4 bg-white/30 p-8 rounded-container-token dark:bg-black/30">
	<div class="flex-1">
		<SelectKanaGroupListBox
			title="Hiragana / ひらがな"
			data={hiragana}
			bind:selectedGroups={hiraganaGroups}
		/>
	</div>
	<div class="flex-1">
		<SelectKanaGroupListBox
			title="Katakana / カタカナ"
			data={katakana}
			bind:selectedGroups={katakanaGroups}
		/>
	</div>
</div>
<button class="variant-filled-primary btn mx-auto mb-10 mt-4 block">Start practice</button>
