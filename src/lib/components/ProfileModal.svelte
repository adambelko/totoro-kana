<script lang="ts">
	import { type PopupSettings } from "@skeletonlabs/skeleton"
	import type { User} from "@supabase/supabase-js"
	import Icon from "@iconify/svelte"
	import { getFullName } from "$lib/utils/profileDetails"

	interface Props {
		user: User | null
		popupProfile: PopupSettings
		signOut: () => void
		classesActive: (href:string) => "bg-primary-active-token" | ""
	}

	let { user, popupProfile,  signOut, classesActive }: Props = $props()
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
