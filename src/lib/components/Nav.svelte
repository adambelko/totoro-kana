<script lang="ts">
	import { page } from "$app/stores"
	import { Avatar, popup, type PopupSettings } from "@skeletonlabs/skeleton"
	import { getInitials } from "$lib/utils/profileDetails"
	import ProfileModal from "$lib/components/ProfileModal.svelte"

	export let data

	$: classesActive = (href: string) =>
		$page.url.pathname.startsWith(href) ? "!variant-filled-primary" : ""

	const popupProfile: PopupSettings = {
		event: "click",
		target: "popupProfile",
		placement: "bottom"
	}
</script>

<nav class="bg-surface-100-800-token flex h-20 shadow-2xl">
	<div class="mx-auto flex w-full max-w-[980px] items-center justify-between">
		<a class="mr-8 text-lg font-bold" href="/">Learn KANA</a>
		<div class="flex items-center space-x-4">
			<a href="/learn/hiragana">
				<div class="btn cursor-pointer hover:variant-soft-primary {classesActive('/learn')}">
					Learn
				</div>
			</a>
			<a href="/practice">
				<div class="btn cursor-pointer hover:variant-soft-primary {classesActive('/practice')}">
					Practice
				</div>
			</a>

			{#if data.user}
				<button use:popup={popupProfile}>
					<Avatar
						initials={getInitials(data.user)}
						background="bg-primary-500 hover:bg-primary-400"
						width="w-14"
					/>
					<ProfileModal {data} {popupProfile} />
				</button>
			{/if}
		</div>
		<!--		<ul class="flex space-x-4">-->
		<!--			<li class="btn cursor-pointer hover:variant-soft-primary">ABOUT</li>-->
		<!--			<li class="btn cursor-pointer hover:variant-soft-primary">OUR METHOD</li>-->
		<!--		</ul>-->
	</div>
</nav>
