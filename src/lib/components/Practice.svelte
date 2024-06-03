<script lang="ts">
	import SelectCharGroupListBox from "$lib/components/SelectKanaGroupListBox.svelte"
	import { hiragana } from "$lib/data/hiragana"
	import { katakana } from "$lib/data/katakana"

	let valueMultiple: string[] = []
</script>

<div class="mt-6 flex gap-4 bg-white/30 p-8 rounded-container-token dark:bg-black/30">
	<div class="flex-1">
		<SelectCharGroupListBox title="Hiragana · ひらがな" data={hiragana} />
	</div>
	<div class="flex-1">
		<SelectCharGroupListBox title="Katakana · カタカナ" data={katakana} />
	</div>
</div>
<button class="variant-filled-primary btn mx-auto mb-10 mt-4 block">Start practice</button>
