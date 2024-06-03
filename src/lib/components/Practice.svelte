<script lang="ts">
	import SelectKanaGroupListBox from "$lib/components/SelectKanaGroupListBox.svelte"
	import { hiragana } from "$lib/data/hiragana"
	import { katakana } from "$lib/data/katakana"

	let selectedGroups: string[] = []
	$: {
		console.log(selectedGroups)
	}
</script>

<div class="mt-6 flex gap-4 bg-white/30 p-8 rounded-container-token dark:bg-black/30">
	<div class="flex-1">
		<SelectKanaGroupListBox title="Hiragana · ひらがな" data={hiragana} bind:selectedGroups />
	</div>
	<div class="flex-1">
		<SelectKanaGroupListBox title="Katakana · カタカナ" data={katakana} bind:selectedGroups />
	</div>
</div>
<button class="variant-filled-primary btn mx-auto mb-10 mt-4 block">Start practice</button>
