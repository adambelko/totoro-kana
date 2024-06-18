<script lang="ts">
	import { page } from "$app/stores"

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? "!variant-filled-primary" : ""
</script>

<nav class="bg-surface-100-800-token flex h-20 shadow-2xl">
	<div class="mx-auto flex w-full max-w-[980px] items-center justify-between">
		<a class="mr-8 text-lg font-bold" href="/learn">Learn KANA</a>
		<ul class="flex space-x-4">
			<li class="btn cursor-pointer hover:variant-soft-primary {classesActive('/study')}">
				<a href="/study">Study</a>
			</li>
			<li class="btn cursor-pointer hover:variant-soft-primary {classesActive('/practice')}">
				<a href="/practice">Practice</a>
			</li>
		</ul>
		<!--		<ul class="flex space-x-4">-->
		<!--			<li class="btn cursor-pointer hover:variant-soft-primary">ABOUT</li>-->
		<!--			<li class="btn cursor-pointer hover:variant-soft-primary">OUR METHOD</li>-->
		<!--		</ul>-->
	</div>
</nav>
