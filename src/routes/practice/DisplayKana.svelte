<script lang="ts">
	interface Props {
		isCharacterSkipped: (japanese: string, romaji: string[]) => boolean
		kanaGroups: {
			main: KanaData[]
			dakuten: KanaData[]
			combination: KanaData[]
		}
	}

	let { isCharacterSkipped, kanaGroups }: Props = $props()
</script>

{#if kanaGroups.main.length > 0}
	<div class="table-container mt-8">
		<h3 class="h3 mb-1">Main Kana</h3>
		<table class="table">
			<tbody>
				{#each kanaGroups.main as kanaGroup}
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

{#if kanaGroups.dakuten.length > 0}
	<div class="table-container mt-8">
		<h3 class="h3 mb-1">Dakuten Kana</h3>
		<table class="table">
			<tbody>
				{#each kanaGroups.dakuten as kanaGroup}
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

{#if kanaGroups.combination.length > 0}
	<div class="table-container mt-8">
		<h3 class="h3 mb-1">Combination Kana</h3>
		<table class="table">
			<tbody>
				{#each kanaGroups.combination as kanaGroup}
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
