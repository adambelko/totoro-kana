<script lang="ts">
	import { page } from "$app/stores"
	import { type PopupSettings } from "@skeletonlabs/skeleton"
	import type {SupabaseClient, User} from "@supabase/supabase-js"
	import Icon from "@iconify/svelte"
	import { getFullName } from "$lib/utils/profileDetails"
	import { goto } from "$app/navigation"

	interface Props {
		supabase: SupabaseClient
		user: User | null
		popupProfile: PopupSettings
	}

	let { supabase, user, popupProfile }: Props = $props()

	let classesActive = $derived((href: string) =>
		$page.url.pathname.startsWith(href) ? "!variant-filled-primary" : ""
	)

	const signOut = async () => {
		await supabase.auth.signOut()
		await goto("/")
	}
</script>

<div
	class="card min-w-52 cursor-default bg-surface-100 p-4 shadow-xl"
	data-popup={popupProfile.target}
>
	<div class="flex justify-center">{getFullName(user)}</div>
	<hr class="mb-4 mt-4" />
	<ul class="space-y-1">
		<li>
			<a href="/profile" class="block">
				<div
					class="btn flex items-center justify-start text-left hover:variant-soft-primary {classesActive(
						'/profile'
					)}"
				>
					<Icon
						icon="iconamoon:profile-duotone"
						width="1.2em"
						height="1.2em"
						style="color: black"
					/>
					<span>Profile</span>
				</div>
			</a>
		</li>
		<li>
			<button onclick={signOut} class="block w-full">
				<div class="btn flex items-center justify-start text-left hover:variant-soft-primary">
					<Icon icon="material-symbols:logout" width="1.2em" height="1.2em" style="color: black" />
					<span>Log Out</span>
				</div>
			</button>
		</li>
	</ul>
</div>
