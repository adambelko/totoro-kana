<script lang="ts">
	import SelectKana from "./SelectKana.svelte"
	import Practice from "./Practice.svelte"
	import { AppBar } from "@skeletonlabs/skeleton"
	import { getFullName } from "$lib/utils/profileDetails"

	export let data
	const { user, hiragana, katakana } = data

	let hiraganaCharacters: KanaData[] = []
	let katakanaCharacters: KanaData[] = []
	$: selectedKana = { hiragana: hiraganaCharacters, katakana: katakanaCharacters }

	let showPractice = false

	const togglePractice = () => {
		if (selectedKana.hiragana.length || selectedKana.katakana.length) {
			showPractice = true
		}
	}
</script>

{#if showPractice === false}
	{#if user}
		<AppBar class="mt-4 p-5 rounded-container-token" background="variant-ghost">
			Welcome back, {getFullName(user)}!
		</AppBar>
	{/if}

	<div class="mt-4 flex gap-4 bg-white/30 p-5 rounded-container-token dark:bg-black/30">
		<div class="flex-1">
			<SelectKana
				title="Hiragana / ひらがな"
				data={hiragana}
				bind:selectedKana={hiraganaCharacters}
			/>
		</div>
		<div class="flex-1">
			<SelectKana
				title="Katakana / カタカナ"
				data={katakana}
				bind:selectedKana={katakanaCharacters}
			/>
		</div>
	</div>
	<button class="variant-filled-primary btn mx-auto mb-10 mt-4 block" on:click={togglePractice}>
		Start practice
	</button>
{:else}
	<Practice {selectedKana} hiraganaData={hiragana} katakanaData={katakana} />
{/if}
