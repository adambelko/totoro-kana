<script lang="ts">
	import SelectKana from "./SelectKana.svelte"
	import Practice from "./Practice.svelte"
	import { hiragana } from "$lib/data/hiragana"
	import { katakana } from "$lib/data/katakana"

	import { AppBar } from "@skeletonlabs/skeleton"
	import { getFullName } from "$lib/helpers/accountDetails"

	export let data
	$: ({ session, supabase } = data)

	let hiraganaGroups: KanaGroup[] = []
	let katakanaGroups: KanaGroup[] = []
	$: selectedGroups = { hiragana: hiraganaGroups, katakana: katakanaGroups }

	let showPractice = false

	const togglePractice = () => {
		if (selectedGroups.hiragana.length || selectedGroups.katakana.length) {
			showPractice = !showPractice
		}
	}
</script>

{#if showPractice === false}
	<AppBar class="mt-4 p-5 rounded-container-token" background="variant-ghost">
		{#if data.session}
			Welcome back, {getFullName(data.session)}!
		{/if}
		<p>Select at least one of the groups, you can scroll down too!</p>
	</AppBar>

	<div class="mt-4 flex gap-4 bg-white/30 p-5 rounded-container-token dark:bg-black/30">
		<div class="flex-1">
			<SelectKana
				title="Hiragana / ひらがな"
				data={hiragana}
				bind:selectedGroups={hiraganaGroups}
			/>
		</div>
		<div class="flex-1">
			<SelectKana
				title="Katakana / カタカナ"
				data={katakana}
				bind:selectedGroups={katakanaGroups}
			/>
		</div>
	</div>
	<button class="variant-filled-primary btn mx-auto mb-10 mt-4 block" on:click={togglePractice}>
		Start practice
	</button>
{:else}
	<Practice {selectedGroups} />
{/if}
