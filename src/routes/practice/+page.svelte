<script lang="ts">
	import SelectKana from "./SelectKana.svelte"
	import Practice from "./Practice.svelte"
	import { AppBar } from "@skeletonlabs/skeleton"
	import { getFullName } from "$lib/helpers/accountDetails"

	export let data
	const { user, hiragana, katakana } = data

	let hiraganaGroups: KanaData[] = []
	let katakanaGroups: KanaData[] = []
	$: selectedGroups = { hiragana: hiraganaGroups, katakana: katakanaGroups }

	let showPractice = false

	const togglePractice = () => {
		if (selectedGroups.hiragana.length || selectedGroups.katakana.length) {
			showPractice = true
		}
	}
</script>

{#if showPractice === false}
	<AppBar class="mt-4 p-5 rounded-container-token" background="variant-ghost">
		{#if user}
			Welcome back, {getFullName(user)}!
		{/if}
		<p>Select at least one of the groups to start the practice.</p>
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
