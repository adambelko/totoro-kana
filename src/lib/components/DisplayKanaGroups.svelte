<script lang="ts">
	export let isCharacterSkipped: (japanese: string, romaji: string[]) => boolean
	export let kanaGroups: {
		mainKana: KanaGroup[]
		dakutenKana: KanaGroup[]
		combinationKana: KanaGroup[]
	}

	interface KanaGroup {
		category: string
		groupName: string
		romaji: string
		japanese: string
		characters: { [key: string]: string[] }
	}
</script>

{#if kanaGroups.mainKana.length > 0}
	<div class="table-container mt-8">
		<h3 class="h3 mb-1">Main Kana</h3>
		<table class="table">
			<tbody>
				{#each kanaGroups.mainKana as kanaGroup}
					<tr>
						{#each Object.entries(kanaGroup.characters) as [japanese, romaji]}
							<td class:bg-warning-200={isCharacterSkipped(japanese, romaji)}>
								<span class="pr-2 text-2xl">{japanese}</span>
								{romaji[0]}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

{#if kanaGroups.dakutenKana.length > 0}
	<div class="table-container mt-8">
		<h3 class="h3 mb-1">Dakuten Kana</h3>
		<table class="table">
			<tbody>
				{#each kanaGroups.dakutenKana as kanaGroup}
					<tr>
						{#each Object.entries(kanaGroup.characters) as [japanese, romaji]}
							<td class:bg-warning-200={isCharacterSkipped(japanese, romaji)}>
								<span class="pr-2 text-2xl">{japanese}</span>
								{romaji[0]}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

{#if kanaGroups.combinationKana.length > 0}
	<div class="table-container mt-8">
		<h3 class="h3 mb-1">Combination Kana</h3>
		<table class="table">
			<tbody>
				{#each kanaGroups.combinationKana as kanaGroup}
					<tr>
						{#each Object.entries(kanaGroup.characters) as [japanese, romaji]}
							<td class:bg-warning-200={isCharacterSkipped(japanese, romaji)}>
								<span class="pr-2 text-2xl">{japanese}</span>
								{romaji[0]}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
