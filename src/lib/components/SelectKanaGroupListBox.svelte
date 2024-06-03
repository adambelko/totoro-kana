<script lang="ts">
	import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton"
	import { formatData } from "$lib/helpers/formatKanaCharacters.js"

	export let selectedGroups: string[]
	export let title: string
	export let data

	const formattedData = formatData(data)

	$: {
		console.log(formattedData)
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
	{#each formattedData as kanaGroup}
		<ListBoxItem bind:group={selectedGroups} name="medium" value={kanaGroup}>
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
