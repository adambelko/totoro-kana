<script lang="ts">
	import SelectKana from "./SelectKana.svelte"
	import Practice from "./Practice.svelte"
	import { AppBar } from "@skeletonlabs/skeleton"

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

<svelte:head>
	<title>Practice Hiragana and Katakana</title>
	<meta name="description" content="Test your Hiragana and Katakana skill with our interactive quiz" />
</svelte:head>

{#if showPractice === false}
	<div class="mb-6 mt-4 flex flex-col gap-4 bg-white/30 p-5 rounded-container-token">
		<AppBar class="p-5 rounded-container-token" background="variant-ghost">
			Choose at least one group to start the practice.
		</AppBar>
		<div class="mt-4 flex gap-4">
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
		<button class="variant-filled-primary btn mx-auto" on:click={togglePractice}>
			Start practice
		</button>
	</div>
{:else}
	<Practice {selectedKana} hiraganaData={hiragana} katakanaData={katakana} />
{/if}
