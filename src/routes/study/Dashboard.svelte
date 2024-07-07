<script>
	import { ProgressRadial, ProgressBar } from "@skeletonlabs/skeleton"

	export let hiragana
	console.log(hiragana)

	const groupNames = hiragana.map((item) => item.groupName)
	const uniqueGroupNames = [...new Set(groupNames)]

	const filterHiragana = (groupName) => {
		return hiragana.filter((item) => item.groupName === groupName)
	}

	const getFirstRomaji = (romaji) => {
		return romaji.split(",")[0].trim()
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4">
		<div class="flex-1 bg-surface-200 p-4 rounded-container-token">
			<h4 class="h4">Study</h4>
			<div class="mt-2 flex justify-between">
				<div class="flex flex-col items-center">
					<span>0/{hiragana.length} kana completed</span>
					<ProgressRadial
						value={0}
						stroke={90}
						font={60}
						meter="stroke-primary-500"
						track="stroke-primary-500/30"
						strokeLinecap="round"
						class="mt-2"
						>0%
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
			{#each uniqueGroupNames as kanaGroup, index}
				<div class="flex flex-col gap-4 bg-surface-100 p-4 rounded-container-token">
					<div class="flex justify-between">
						<h4 class="h4">Lesson {index + 1} - {kanaGroup}</h4>
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
					<div class="flex flex-col gap-4 p-4 rounded-container-token">
						<div class="flex justify-between">
							<div class="flex flex-wrap gap-4">
								{#each filterHiragana(kanaGroup) as { japanese, romaji }}
									<div
										class="flex min-w-16 justify-center bg-surface-300 p-3 rounded-container-token"
									>
										{japanese} / {getFirstRomaji(romaji)}
									</div>
								{/each}
							</div>
							<div>
								<button class="variant-filled-primary btn">Start study</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
