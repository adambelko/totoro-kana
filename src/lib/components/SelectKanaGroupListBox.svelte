<script lang="ts">
	import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton"

	let valueMultiple: string[] = []
	export let title: string
	export let data: KanaData

	interface KanaGroup {
		[character: string]: string[]
	}
	interface KanaData {
		[groupName: string]: KanaGroup
	}

	const formattedData = Object.entries(data).map(([groupName, groupData]) => {
		const romaji = Object.values(groupData)
			.map((romajiArray) => romajiArray[0])
			.join(" · ")
		const japanese = Object.keys(groupData).join(" · ")
		return { groupName, romaji, japanese }
	})
</script>

<h3 class="h3 mb-2 text-center">{title}</h3>

<ListBox
	multiple
	spacing="space-y-1 p-2"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	class="flex-1 bg-surface-200"
>
	{#each formattedData as kanaGroup}
		<ListBoxItem bind:group={valueMultiple} name="medium" value={kanaGroup.groupName}>
			{kanaGroup.romaji} / {kanaGroup.japanese}
		</ListBoxItem>
	{/each}
</ListBox>

<div class="mt-2 flex justify-center gap-6">
	<label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" />
		<span>All</span>
	</label>
	<label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" />
		<span>Alternative</span>
	</label>
</div>
