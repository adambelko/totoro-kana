<script lang="ts">
	import { page } from "$app/stores"
	import { Avatar, popup, type PopupSettings } from "@skeletonlabs/skeleton"
	import ProfileModal from "$lib/components/ProfileModal.svelte"
	import totoroLogo from "$lib/assets/totoroLogo.webp"
	import avatar from "$lib/assets/totoroAvatar.webp"

	export let data
	;("")
	$: classesActive = (href: string) =>
		$page.url.pathname.startsWith(href) ? "!variant-filled-primary" : ""

	const popupProfile: PopupSettings = {
		event: "click",
		target: "popupProfile",
		placement: "bottom"
	}
</script>

<nav class="bg-surface-100-800-token flex min-h-20 shadow-2xl">
	<div class="mx-auto flex w-full max-w-[980px] items-center justify-between">
		<a class="mr-8 flex text-2xl font-bold" href="/"
			>Totoro<img class="logoImage" src={totoroLogo} alt="totoro" />Kana</a
		>
		<div class="flex items-center space-x-2">
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
				<a href="/contact">
					<div class="btn cursor-pointer hover:variant-soft-primary {classesActive('/contact')}">
						Contact
					</div>
				</a>

				<div use:popup={popupProfile} class="cursor-pointer">
					<Avatar src={avatar} width="w-14" background="bg-white" />
					<ProfileModal {data} {popupProfile} />
				</div>
			{/if}
		</div>
		<!--		<ul class="flex space-x-4">-->
		<!--			<li class="btn cursor-pointer hover:variant-soft-primary">ABOUT</li>-->
		<!--			<li class="btn cursor-pointer hover:variant-soft-primary">OUR METHOD</li>-->
		<!--		</ul>-->
	</div>
</nav>

<style>
	.logoImage {
		mix-blend-mode: multiply;
		max-height: 30px;
		margin: 0 0.3rem;
	}
</style>
