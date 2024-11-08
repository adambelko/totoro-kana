<script lang="ts">
	import { page } from "$app/stores"
	import type { SupabaseClient, User } from "@supabase/supabase-js"
	import { getDrawerStore } from "@skeletonlabs/skeleton"
	import Icon from "@iconify/svelte"
	import { goto } from "$app/navigation"

	interface Props {
		user: User | null
		supabase: SupabaseClient
	}

	let { user, supabase }: Props = $props()

	const drawerStore = getDrawerStore()

	let listItemActive = $derived((href: string) =>
		$page.url.pathname.startsWith(href) ? "bg-primary-active-token" : ""
	)

	const signOut = async () => {
		await supabase.auth.signOut()
		closeSidebar()
		await goto("/")
	}

	const closeSidebar = () => {
		drawerStore.close()
	}
</script>

<div class="p-4">
	<p class="pl-6 pt-6 text-2xl font-bold">Core</p>
	<nav>
		<ul class="space-y-1 p-2">
			<li>
				<a href="/learn/hiragana" class="block" onclick={closeSidebar}>
					<div
						class="btn flex items-center justify-start text-left hover:variant-soft-primary {listItemActive(
							'/learn/hiragana'
						)}"
					>
						<Icon icon="iconoir:learning" width="1.2em" height="1.2em"  style="color: black" />
						<span>Learn</span>
					</div>
				</a>
			</li>
			<li>
				<a href="/practice" class="block" onclick={closeSidebar}>
					<div
						class="btn flex items-center justify-start text-left hover:variant-soft-primary {listItemActive(
							'/practice'
						)}"
					>
						<Icon icon="ic:twotone-refresh" width="1.2em" height="1.2em"  style="color: black" />
						<span>Practice</span>
					</div>
				</a>
			</li>
		</ul>
	</nav>

	<hr class="!my-4 opacity-50" />
	<p class="pl-6 text-2xl font-bold">More</p>
	<nav>
		<ul class="space-y-1 p-2">
			<li>
				<a href="/about" class="block" onclick={closeSidebar}>
					<div
						class="btn flex items-center justify-start text-left hover:variant-soft-primary {listItemActive(
							'/about'
						)}"
					>
						<Icon icon="gridicons:info-outline" width="1.2em" height="1.2em"  style="color: black" />
						<span>About</span>
					</div>
				</a>
			</li>
			<li>
				<a href="/contribution" class="block" onclick={closeSidebar}>
					<div
						class="btn flex items-center justify-start text-left hover:variant-soft-primary {listItemActive(
							'/contribution'
						)}"
					>
						<Icon icon="icon-park-twotone:star" width="1.2em" height="1.2em"  style="color: black" />
						<span>Contribution</span>
					</div>
				</a>
			</li>
		</ul>
	</nav>

	{#if user}
		<hr class="!my-4 opacity-50" />
		<p class="pl-6 text-2xl font-bold">Profile</p>
		<nav>
			<ul class="space-y-1 p-2">
				<li>
					<a href="/profile" class="block" onclick={closeSidebar}>
						<div
							class="btn flex items-center justify-start text-left hover:variant-soft-primary {listItemActive(
								'/profile'
							)}"
						>
							<Icon
								icon="iconamoon:profile-duotone"
								width="1.2em"
								height="1.2em"
								style="color: black"
							/>
							<span>Profile details</span>
						</div>
					</a>
				</li>
				<li>
					<button onclick={signOut} class="block w-full">
						<div class="btn flex items-center justify-start text-left hover:variant-soft-primary">
							<Icon
								icon="material-symbols:logout"
								width="1.2em"
								height="1.2em"
								style="color: black"
							/>
							<span>Log Out</span>
						</div>
					</button>
				</li>
			</ul>
		</nav>
	{/if}
</div>
