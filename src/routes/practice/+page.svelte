<script lang="ts">
	import SelectKana from "./SelectKana.svelte"
	import Practice from "./Practice.svelte"
	import { AppBar } from "@skeletonlabs/skeleton"

	let { data } = $props()
	const { hiragana, katakana } = data

	let hiraganaCharacters: KanaData[] = $state([])
	let katakanaCharacters: KanaData[] = $state([])
	let selectedKana = $derived({ hiragana: hiraganaCharacters, katakana: katakanaCharacters })

	let showPractice = $state(false)

	const togglePractice = () => {
		if (selectedKana.hiragana.length || selectedKana.katakana.length) {
			showPractice = true
		}
	}
</script>

<svelte:head>
	<title>Practice Hiragana and Katakana</title>
	<meta
		name="description"
		content="Test your Hiragana and Katakana skill with our interactive quiz"
	/>
</svelte:head>

{#if showPractice === false}
	<div class="m-2 sm:m-4 flex flex-col gap-4 bg-white/30 p-4 sm:p-5 rounded-container-token">
		<AppBar class="p-5 rounded-container-token" background="variant-ghost">
			Choose at least one group to start the practice.
		</AppBar>
		<div class="flex flex-col gap-6 md:flex-row mt-4 md:gap-4">
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
		<button class="variant-filled-primary btn mx-auto" onclick={togglePractice}>
			Start practice
		</button>
	</div>
{:else}
	<Practice {selectedKana} hiraganaData={hiragana} katakanaData={katakana} />
{/if}
