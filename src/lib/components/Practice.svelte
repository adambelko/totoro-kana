<script lang="ts">
	import { ProgressBar } from "@skeletonlabs/skeleton"

	export let selectedGroups: any
	console.log(selectedGroups)
</script>

<div class="mt-6 flex flex-col bg-white/30 rounded-container-token dark:bg-black/30">
	<div class="flex justify-center">
		<div class="flex w-1/2 flex-col gap-4 p-20">
			<div class=" flex justify-center p-8 text-6xl">ひ</div>
			<input class="input h-8 pl-3" type="text" />
			<div class="flex justify-center gap-4">
				<button class="variant-filled-tertiary btn">Skip</button>
				<button class="variant-filled-primary btn">Next</button>
			</div>
		</div>
	</div>
	<span class="mb-1 flex justify-center">14/26</span>
	<ProgressBar value={40} max={100} />
</div>
