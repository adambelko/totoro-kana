<script lang="ts">
	import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton"
	import { formatData } from "$lib/helpers/formatKanaCharacters"

	interface KanaGroup {
		category: string
		groupName: string
		romaji: string
		japanese: string
	}

	export let selectedGroups: KanaGroup[]
	export let title: string
	export let data

	const listBoxData = formatData(data)

	let allChecked = false
	let mainChecked = false
	let dakutenChecked = false
	let combinationChecked = false

	function handleAllChecked() {
		if (allChecked) {
			mainChecked = true
			dakutenChecked = true
			combinationChecked = true
			selectedGroups = listBoxData.slice()
		} else {
			mainChecked = false
			dakutenChecked = false
			combinationChecked = false
			selectedGroups = []
		}
	}

	function handleMainChecked() {
		const mainGroups = listBoxData.filter((kanaGroup) => kanaGroup.category === "mainKana")
		if (mainChecked) {
			selectedGroups = Array.from(new Set([...selectedGroups, ...mainGroups]))
		} else {
			selectedGroups = selectedGroups.filter((group) => !mainGroups.includes(group))
		}
		updateAllChecked()
	}

	function handleDakutenChecked() {
		const dakutenGroups = listBoxData.filter((kanaGroup) => kanaGroup.category === "dakutenKana")
		if (dakutenChecked) {
			selectedGroups = Array.from(new Set([...selectedGroups, ...dakutenGroups]))
		} else {
			selectedGroups = selectedGroups.filter((group) => !dakutenGroups.includes(group))
		}
		updateAllChecked()
	}

	function handleCombinationChecked() {
		const combinationGroups = listBoxData.filter(
			(kanaGroup) => kanaGroup.category === "combinationKana"
		)
		if (combinationChecked) {
			selectedGroups = Array.from(new Set([...selectedGroups, ...combinationGroups]))
		} else {
			selectedGroups = selectedGroups.filter((group) => !combinationGroups.includes(group))
		}
		updateAllChecked()
	}

	function updateAllChecked() {
		allChecked = mainChecked && dakutenChecked && combinationChecked
	}
</script>

<h3 class="h3 mb-2 text-center">{title}</h3>

<ListBox
	multiple
	spacing="space-y-1 p-2"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	class="flex-1 bg-surface-200"
>
	{#each listBoxData as kanaGroup}
		<ListBoxItem bind:group={selectedGroups} name="medium" value={kanaGroup}>
			{kanaGroup.romaji} / {kanaGroup.japanese}
		</ListBoxItem>
	{/each}
</ListBox>

<div class="mt-2 flex justify-center gap-4">
	<label class="flex items-center space-x-2">
		<input
			class="checkbox"
			type="checkbox"
			bind:checked={allChecked}
			on:change={handleAllChecked}
		/>
		<span>All</span>
	</label>
	<label class="flex items-center space-x-2">
		<input
			class="checkbox"
			type="checkbox"
			bind:checked={mainChecked}
			on:change={handleMainChecked}
		/>
		<span>Main</span>
	</label>
	<label class="flex items-center space-x-2">
		<input
			class="checkbox"
			type="checkbox"
			bind:checked={dakutenChecked}
			on:change={handleDakutenChecked}
		/>
		<span>Dakuten</span>
	</label>
	<label class="flex items-center space-x-2">
		<input
			class="checkbox"
			type="checkbox"
			bind:checked={combinationChecked}
			on:change={handleCombinationChecked}
		/>
		<span>Combination</span>
	</label>
</div>
