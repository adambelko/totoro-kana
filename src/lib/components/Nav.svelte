<script lang="ts">
	import { page } from "$app/stores"
	import { Avatar } from "@skeletonlabs/skeleton"
	import { getInitials } from "$lib/helpers/accountDetails"

	export let data
	$: ({ session, supabase } = data)

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? "!variant-filled-primary" : ""
</script>

<nav class="bg-surface-100-800-token flex h-20 shadow-2xl">
	<div class="mx-auto flex w-full max-w-[980px] items-center justify-between">
		<a class="mr-8 text-lg font-bold" href="/">Learn KANA</a>
		<div class="flex items-center space-x-4">
			<a href="/study">
				<div class="btn cursor-pointer hover:variant-soft-primary {classesActive('/study')}">
					Study
				</div>
			</a>
			<a href="/practice">
				<div class="btn cursor-pointer hover:variant-soft-primary {classesActive('/practice')}">
					Practice
				</div>
			</a>

			{#if data.session}
				<a href="/account">
					<Avatar
						initials={getInitials(session)}
						background="bg-primary-500 hover:bg-primary-400"
						width="w-14"
					/>
				</a>
			{/if}
		</div>
		<!--		<ul class="flex space-x-4">-->
		<!--			<li class="btn cursor-pointer hover:variant-soft-primary">ABOUT</li>-->
		<!--			<li class="btn cursor-pointer hover:variant-soft-primary">OUR METHOD</li>-->
		<!--		</ul>-->
	</div>
</nav>
