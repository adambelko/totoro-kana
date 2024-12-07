<script lang="ts">
	import { page } from "$app/stores"
	import {goto} from "$app/navigation"
	import {Avatar, type DrawerSettings, popup, type PopupSettings} from "@skeletonlabs/skeleton"
	import type { SupabaseClient, User } from "@supabase/supabase-js"
	import Icon from "@iconify/svelte"
	import ProfileModal from "$lib/components/ProfileModal.svelte"
	import totoroLogo from "$lib/assets/totoroLogo.webp"
	import totoroAvatar from "$lib/assets/totoroAvatar.webp"
	import { getDrawerStore } from "@skeletonlabs/skeleton"

	interface Props {
		supabase: SupabaseClient
		user: User | null
	}

	const drawerStore = getDrawerStore()

	let { supabase, user }: Props = $props()

	let listItemActive = $derived((href: string) =>
		$page.url.pathname.startsWith(href) ? "bg-primary-active-token" : ""
	)

	const openSidebar = () => {
		drawerStore.open(drawerSettings)
	}

	const signOut = async () => {
		await supabase.auth.signOut()
		await goto("/")
	}

	const popupProfile: PopupSettings = {
		event: "click",
		target: "popupProfile",
		placement: "bottom"
	}

	const popupMore: PopupSettings = {
		event: "click",
		target: "popupMore",
		placement: "bottom"
	}

	const drawerSettings: DrawerSettings = {
		id: "mobile-drawer",
		position: "right",
		width: "w-[85%]",
	}
</script>

<nav class="flex min-h-20 bg-surface-100 shadow-2xl">
	<div class="mx-auto flex w-full max-w-[980px] items-center justify-between p-4">
		<a class="flex items-center text-2xl font-bold" href="/">
			<span class="hidden md:inline">Totoro</span>
			<img class="h-7 max-h-7 w-auto min-w-[88px] px-1" src={totoroLogo} alt="totoro" />
			<span class="hidden md:inline">Kana</span>
		</a>

		<!-- Smaller devices hamburger icon -->
		<Icon
			icon="quill:hamburger"
			width="2.1em"
			height="2.1em"
			style="color: black"
			class="md:hidden"
			onclick={openSidebar}
		/>

		<!-- Standard menu -->
		<div class="hidden items-center md:flex md:space-x-2">
			<a href="/learn/hiragana">
				<div class="btn cursor-pointer hover:variant-soft-primary {listItemActive('/learn')}">
					Learn
				</div>
			</a>
			<a href="/practice">
				<div class="btn cursor-pointer hover:variant-soft-primary {listItemActive('/practice')}">
					Practice
				</div>
			</a>
			<div
				use:popup={popupMore}
				class="btn flex cursor-pointer items-center gap-1 hover:variant-soft-primary"
			>
				More
				<Icon
					icon="iconamoon:arrow-down-2-fill"
					width="1.3em"
					height="1.3em"
					style="color: black"
					class="opacity-50"
				/>
			</div>
			{#if user}
				<div use:popup={popupProfile} class="cursor-pointer">
					<Avatar src={totoroAvatar} width="w-14" background="bg-white" />
					<ProfileModal {user} {popupProfile} {signOut} {listItemActive} />
				</div>
			{:else}
				<a href="/login">
					<div class="btn cursor-pointer hover:variant-soft-primary {listItemActive('/login')}">
						Log In
					</div>
				</a>
			{/if}
		</div>
	</div>
</nav>

<!--Nav "More" popup-->
<div class="card w-52 bg-surface-100 p-4 shadow-xl" data-popup="popupMore">
	<ul class="space-y-1">
		<li>
			<a href="/about" class="block">
				<div
					class="btn flex items-center justify-start text-left hover:variant-soft-primary {listItemActive(
						'/about'
					)}"
				>
					<Icon icon="gridicons:info-outline" width="1.2em" height="1.2em"  style="color: black" />
					<span class="ml-2">About</span>
				</div>
			</a>
		</li>
		<li>
			<a href="/contribution" class="block">
				<div
					class="btn flex items-center justify-start text-left hover:variant-soft-primary {listItemActive(
						'/contribution'
					)}"
				>
					<Icon icon="icon-park-twotone:star" width="1.2em" height="1.2em"  style="color: black" />
					<span class="ml-2">Contribution</span>
				</div>
			</a>
		</li>
	</ul>
</div>
