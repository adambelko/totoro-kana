<script>
	import { goto } from "$app/navigation"
	import Icon from "@iconify/svelte"
	import totoroLogo from "$lib/assets/totoroLogo.webp"
</script>

<svelte:head>
	<title>Totoro Kana - Learn Japanese Hiragana and Katakana</title>
	<meta
		name="description"
		content="Unlock the world of Japanese with Totoro Kana! Dive into our interactive platform to learn, practice and truly remember Japanese characters."
	/>
</svelte:head>

<div class="p-4">
	<section>
		<div
			class="mt-12 flex flex-col items-center gap-4 text-center md:mt-24 md:items-start md:text-left"
		>
			<img class="w-40 md:w-60" src={totoroLogo} alt="Totoro Logo" />
			<h1 class="h1 text-4xl md:text-6xl">Learn Japanese <br />Hiragana and Katakana.</h1>
			<p class="max-w-xs text-lg md:max-w-[460px] md:text-xl">
				Unlock the world of Japanese with Totoro Kana! Dive into our interactive platform to learn,
				practice, and truly remember Japanese characters.
			</p>
			<div>
				<button
					class="variant-filled-primary btn flex items-center gap-2"
					onclick={() => goto("/learn/hiragana")}
				>
					Get Started
					<Icon
						icon="teenyicons:arrow-right-solid"
						width="1.3em"
						height="1.3em"
						style="color: black"
					/>
				</button>
			</div>
		</div>
		<div
			class="variant-soft-secondary mb-24 mt-12 p-6 text-center text-lg rounded-container-token md:mt-24 md:p-8 md:text-xl"
		>
			You can also try our <a href="/practice" class="anchor">practice</a> page without any account required.
		</div>
	</section>

	<section>
		<div class="mb-12 mt-12 flex flex-col items-center gap-8 md:mb-24 md:mt-24 md:gap-10">
			<h2 class="h2 text-center text-2xl md:text-3xl">Here are some of our features.</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div class="variant-glass space-y-4 p-6 text-center shadow-lg rounded-container-token">
					<span class="variant-soft-primary btn-icon btn-icon-xl">
						<Icon
							icon="material-symbols:quiz-rounded"
							width="1.3em"
							height="1.3em"
							style="color: #119F6E"
						/>
					</span>
					<h3 class="h3">Interactive Quiz</h3>
					<p>
						Put your memory to the test with interactive quizzes and challenge yourself with a
						variety of question types, including multiple choices and typing.
					</p>
				</div>
				<div class="variant-glass space-y-4 p-6 text-center shadow-lg rounded-container-token">
					<span class="variant-soft-primary btn-icon btn-icon-xl">
						<Icon icon="ri:numbers-fill" width="1.3em" height="1.3em" style="color: #119F6E" />
					</span>
					<h3 class="h3">Statistics</h3>
					<p>
						Stay motivated by tracking your learning statistics! We offer insights into your
						progress with hiragana and katakana, including how many kana you've mastered.
					</p>
				</div>
				<div class="variant-glass space-y-4 p-6 text-center shadow-lg rounded-container-token">
					<span class="variant-soft-primary btn-icon btn-icon-xl">
						<Icon
							icon="fluent-mdl2:issue-tracking-mirrored"
							width="1.3em"
							height="1.3em"
							style="color: #119F6E"
						/>
					</span>
					<h3 class="h3">Track Progress</h3>
					<p>
						After each completed lesson, your progress is automatically saved. You can continue
						learning from where you left off!
					</p>
				</div>
			</div>
		</div>
	</section>

	<section>
		<div
			class="mb-12 mt-24 flex flex-col items-center justify-center gap-8 text-center md:mb-24 md:flex-row md:gap-16 md:text-left"
		>
			<div class="flex items-center">
				<a href="https://www.adambelko.com/" target="_blank">
					<span class="variant-soft-primary btn-icon w-32 text-4xl font-bold md:w-48 md:text-5xl"
						>AB</span
					>
				</a>
			</div>
			<div class="flex max-w-sm flex-col gap-4 md:max-w-md">
				<h2 class="h2 text-2xl md:text-3xl">Support the project.</h2>
				<p>
					Totoro Kana is an open-source project that benefits from your support. The best way to
					support me is by starring the <a
						class="anchor"
						href="https://github.com/adambelko/totoro-kana"
						target="_blank">GitHub</a
					>
					repo. You can also support me through
					<a class="anchor" href="https://ko-fi.com/totorokana" target="_blank">Ko-Fi</a>. Your
					donations help cover essential costs like hosting and domain services.
				</p>
				<div class="flex justify-center gap-4 md:justify-start">
					<a href="https://ko-fi.com/totorokana" target="_blank">
						<button class="variant-filled btn">Ko-Fi</button>
					</a>
					<a href="https://github.com/adambelko/totoro-kana" target="_blank">
						<button class="variant-filled btn">GitHub</button>
					</a>
				</div>
			</div>
		</div>
	</section>
</div>
