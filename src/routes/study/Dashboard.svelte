<script>
	import { ProgressRadial, ProgressBar } from "@skeletonlabs/skeleton"
	import ElementProgress from "./ElementProgress.svelte"
</script>

<div class="flex flex-col gap-4">
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
				<button class="variant-filled-primary btn">Start review</button>
			</div>
		</div>
	</div>

	<div class="flex-1 bg-surface-200 p-4 rounded-container-token">
		<div class="flex flex-col gap-4">
			<div class="flex justify-between">
				<h4 class="h4">Level 1 Progress - 40%</h4>
				<h5 class="h5 flex items-center">2/5 kana completed</h5>
			</div>
			<div>
				<ProgressBar
					value={40}
					max={100}
					height="h-4"
					meter="variant-filled-primary"
					track="bg-primary-500/30"
				/>
			</div>
			<div class="flex flex-col gap-4 bg-surface-100 p-4 rounded-container-token">
				<div>
					<h4 class="h4">Group K</h4>
					<hr class="!border-t-1 mt-1" />
				</div>
				<div class="flex flex-wrap gap-4">
					<ElementProgress />
					<ElementProgress />
					<ElementProgress />
					<ElementProgress />
					<ElementProgress />
				</div>
			</div>
		</div>
	</div>
</div>
