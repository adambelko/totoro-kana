<script>
	import { ProgressRadial } from "@skeletonlabs/skeleton"
</script>

<div class="flex gap-4">
	<div class="flex-1 bg-surface-200 p-4 rounded-container-token">
		<h4 class="h4">Study</h4>
		<div class="mt-2 flex justify-between">
			<div class="flex flex-col items-center">
				<span>34/65 kana completed</span>
				<ProgressRadial
					value={30}
					stroke={90}
					font={60}
					meter="stroke-primary-500"
					track="stroke-primary-500/30"
					strokeLinecap="round"
					class="mt-2"
					>30%
				</ProgressRadial>
			</div>
			<div class="flex flex-col justify-center">
				<button class="variant-filled-primary btn">Start study</button>
			</div>
		</div>
	</div>

	<div class="flex-1 bg-surface-200 p-4 rounded-container-token">
		<h4 class="h4">Review</h4>
		<div class="flex items-center justify-center">
			<button class="variant-filled-primary btn">Start study</button>
		</div>
	</div>
</div>
