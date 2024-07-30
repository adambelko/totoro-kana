<script lang="ts">
	import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton"

	export let selectedKana: KanaData[]
	export let title: string
	export let data: Kana[]

	interface KanaDataGroup {
		romaji: string[]
		japanese: string[]
		category: string
		characters: { [character: string]: string[] }
	}

	const createKanaGroup = (kana: Kana): KanaDataGroup => {
		return {
			romaji: [],
			japanese: [],
			category: kana.kanaCategory,
			characters: {}
		}
	}

	const updateKanaGroup = (group: KanaDataGroup, kana: Kana) => {
		const firstRomaji = kana.romaji.split(",")[0].trim()
		group.romaji.push(firstRomaji)
		group.japanese.push(kana.japanese)
		if (!group.characters[kana.japanese]) {
			group.characters[kana.japanese] = []
		}
		group.characters[kana.japanese].push(firstRomaji)
	}

	const mapKanaGroups = (data: Kana[]): Map<string, KanaDataGroup> => {
		const groups = new Map<string, KanaDataGroup>()
		data.forEach((kana) => {
			if (!groups.has(kana.groupName)) {
				groups.set(kana.groupName, createKanaGroup(kana))
			}
			const group = groups.get(kana.groupName)
			updateKanaGroup(group!, kana)
		})
		return groups
	}

	const formatKana = (data: Kana[]): KanaData[] => {
		const groups = mapKanaGroups(data)
		return Array.from(groups.entries()).map(
			([groupName, { romaji, japanese, category, characters }]) => ({
				groupName,
				romaji: romaji.join(" · "),
				japanese: japanese.join(" · "),
				category,
				characters
			})
		)
	}

	const listBoxData = formatKana(data)

	let allChecked = false
	let mainChecked = false
	let dakutenChecked = false
	let combinationChecked = false

	const handleAllChecked = () => {
		if (allChecked) {
			mainChecked = true
			dakutenChecked = true
			combinationChecked = true
			selectedKana = listBoxData.slice()
		} else {
			mainChecked = false
			dakutenChecked = false
			combinationChecked = false
			selectedKana = []
		}
	}

	const handleMainChecked = () => {
		const mainKana = listBoxData.filter((kana) => kana.category === "main")
		if (mainChecked) {
			selectedKana = Array.from(new Set([...selectedKana, ...mainKana]))
		} else {
			selectedKana = selectedKana.filter((kana) => !mainKana.includes(kana))
		}
		updateAllChecked()
	}

	const handleDakutenChecked = () => {
		const dakutenKana = listBoxData.filter((kana) => kana.category === "dakuten")
		if (dakutenChecked) {
			selectedKana = Array.from(new Set([...selectedKana, ...dakutenKana]))
		} else {
			selectedKana = selectedKana.filter((kana) => !dakutenKana.includes(kana))
		}
		updateAllChecked()
	}

	const handleCombinationChecked = () => {
		const combinationKana = listBoxData.filter((kana) => kana.category === "combination")
		if (combinationChecked) {
			selectedKana = Array.from(new Set([...selectedKana, ...combinationKana]))
		} else {
			selectedKana = selectedKana.filter((kana) => !combinationKana.includes(kana))
		}
		updateAllChecked()
	}

	const updateAllChecked = () => {
		allChecked = mainChecked && dakutenChecked && combinationChecked
	}
</script>

<h3 class="h3 mb-2 text-center">{title}</h3>

<div class="scrollable">
	<ListBox
		multiple
		spacing="space-y-1 p-2"
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		class="flex-1 bg-surface-200"
	>
		{#each listBoxData as kana}
			<ListBoxItem bind:group={selectedKana} name="medium" value={kana}>
				{kana.japanese} / {kana.romaji}
			</ListBoxItem>
		{/each}
	</ListBox>
</div>

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

<style>
	.scrollable {
		max-height: 50vh;
		border-radius: 20px;
		overflow-y: scroll;
	}
</style>
