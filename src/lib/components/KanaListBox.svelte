<script lang="ts">
	import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton"

	let valueMultiple: string[] = []
</script>

<div class="mt-6 flex gap-4 bg-white/30 p-8 rounded-container-token dark:bg-black/30">
	<div class="flex-1">
		<h3 class="h3 mb-2 text-center">Hiragana · ひらがな</h3>
		<ListBox
			multiple
			spacing="space-y-1 p-2"
			active="variant-filled-primary"
			hover="hover:variant-soft-primary"
			class="flex-1 bg-surface-200"
		>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="a"
				>a · i · u · e · o (あ · い · う · え · お)</ListBoxItem
			>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="ka">ka</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="sa">sa</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="ta">ta</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="na">na</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="ha">ha</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="ma">ma</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="ya">ya</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="ra">ra</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="wa">wa</ListBoxItem>
		</ListBox>
	</div>
	<div class="flex-1">
		<h3 class="h3 mb-2 text-center">Katakana · カタカナ</h3>
		<ListBox
			multiple
			spacing="space-y-1 p-2"
			active="variant-filled-primary"
			hover="hover:variant-soft-primary"
			class="bg-surface-200"
		>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="a">a</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="ka">ka</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="sa">sa</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="ta">ta</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="na">na</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="ha">ha</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="ma">ma</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="ya">ya</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="ra">ra</ListBoxItem>
			<ListBoxItem bind:group={valueMultiple} name="medium" value="wa">wa</ListBoxItem>
		</ListBox>
	</div>
</div>
