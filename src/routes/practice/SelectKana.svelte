<script lang="ts">
	import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton"

	export let selectedGroups: KanaData[]
	export let title: string
	export let data: Kana[]

	const formatKana = (data: Kana[]): KanaData[] => {
		const groups = new Map<
			string,
			{
				romaji: string[]
				japanese: string[]
				category: string
				characters: { [character: string]: string[] }
			}
		>()

		data.forEach((kana) => {
			if (!groups.has(kana.groupName)) {
				groups.set(kana.groupName, {
					romaji: [],
					japanese: [],
					category: kana.kanaCategory,
					characters: {}
				})
			}

			const group = groups.get(kana.groupName)
			const firstRomaji = kana.romaji.split(",")[0].trim()
			group!.romaji.push(firstRomaji)
			group!.japanese.push(kana.japanese)
			if (!group!.characters[kana.japanese]) {
				group!.characters[kana.japanese] = []
			}
			group!.characters[kana.japanese].push(firstRomaji)
		})

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
			selectedGroups = listBoxData.slice()
		} else {
			mainChecked = false
			dakutenChecked = false
			combinationChecked = false
			selectedGroups = []
		}
	}

	const handleMainChecked = () => {
		const mainGroups = listBoxData.filter((kanaGroup) => kanaGroup.category === "main")
		if (mainChecked) {
			selectedGroups = Array.from(new Set([...selectedGroups, ...mainGroups]))
		} else {
			selectedGroups = selectedGroups.filter((group) => !mainGroups.includes(group))
		}
		updateAllChecked()
	}

	const handleDakutenChecked = () => {
		const dakutenGroups = listBoxData.filter((kanaGroup) => kanaGroup.category === "dakuten")
		if (dakutenChecked) {
			selectedGroups = Array.from(new Set([...selectedGroups, ...dakutenGroups]))
		} else {
			selectedGroups = selectedGroups.filter((group) => !dakutenGroups.includes(group))
		}
		updateAllChecked()
	}

	const handleCombinationChecked = () => {
		const combinationGroups = listBoxData.filter(
			(kanaGroup) => kanaGroup.category === "combination"
		)
		if (combinationChecked) {
			selectedGroups = Array.from(new Set([...selectedGroups, ...combinationGroups]))
		} else {
			selectedGroups = selectedGroups.filter((group) => !combinationGroups.includes(group))
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
		{#each listBoxData as kanaGroup}
			<ListBoxItem bind:group={selectedGroups} name="medium" value={kanaGroup}>
				{kanaGroup.romaji} / {kanaGroup.japanese}
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
