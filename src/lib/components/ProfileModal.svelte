<script lang="ts">
	import { Avatar, type PopupSettings } from "@skeletonlabs/skeleton"
	import { getFullName } from "$lib/utils/profileDetails"

	export let data
	export let popupProfile: PopupSettings
	const { supabase, user } = data

	const signOut = async () => {
		await supabase.auth.signOut()
	}
</script>

<div class="card cursor-default bg-surface-200 p-4" data-popup={popupProfile.target}>
	<div class="arrow bg-surface-200" />
	<div class="flex items-center gap-4">
		<Avatar background="bg-primary-500" width="w-14" />
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
