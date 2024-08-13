<script lang="ts">
	import { Avatar, type PopupSettings } from "@skeletonlabs/skeleton"
	import { getFullName } from "$lib/utils/profileDetails"
	import { goto } from "$app/navigation"
	import avatar from "$lib/assets/totoroAvatar.webp"

	export let data
	export let popupProfile: PopupSettings
	const { supabase, user } = data

	const signOut = async () => {
		await supabase.auth.signOut()
		await goto("/")
	}
</script>

<div class="card cursor-default bg-white p-4" data-popup={popupProfile.target}>
	<div class="arrow bg-white" />
	<div class="flex items-center">
		<Avatar src={avatar} width="w-14" background="bg-white" />
		<div>{getFullName(user)}</div>
	</div>
	<hr class="mb-2 mt-4" />
	<ul class="list-none text-left">
		<li class="pt-2">
			<a
				href="/profile"
				class="block w-full p-2 text-left text-inherit no-underline rounded-container-token hover:bg-surface-100"
				>Profile</a
			>
		</li>
		<li class="pt-2">
			<button
				on:click={signOut}
				class="w-full p-2 text-left rounded-container-token hover:bg-surface-100"
			>
				Sign Out
			</button>
		</li>
	</ul>
</div>
