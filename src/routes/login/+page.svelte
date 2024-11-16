<script lang="ts">
	import { goto } from "$app/navigation"
	import { onMount } from "svelte"
	import Icon from "@iconify/svelte"
	import {page} from "$app/stores"

	let { data } = $props()

	onMount(() => {
		if (data.user) goto("/")
	})

	const next = $page.url.searchParams.get("next") ?? "/"
	console.log(next)
</script>

<svelte:head>
	<title>Log in</title>
</svelte:head>

<div class="m-4 flex flex-col bg-white/30 pb-10 pt-6 rounded-container-token">
	<h2 class="h2 p-4 text-center">Log in</h2>
	<div class="flex flex-col items-center gap-4">
		<a href={`/auth/login?provider=google&next=${next}`}>
			<button class="btn bg-tertiary-400">
				<Icon icon="ri:google-fill" width="1.3em" height="1.3em" style="color: black" />
				<div class="pr-2">
					Continue with &nbsp;<span class="font-bold">Google</span>
				</div>
			</button>
		</a>
		<a href={`/auth/login?provider=spotify&next=${next}`}>
			<button class="btn bg-primary-400">
				<Icon icon="mdi:spotify" width="1.3em" height="1.3em" style="color: black" />
				<div class="pr-2">
					Continue with &nbsp;<span class="font-bold">Spotify</span>
				</div>
			</button>
		</a>
		<a href={`/auth/login?provider=github&next=${next}`}>
			<button class="variant-filled btn">
				<Icon icon="mdi:github" width="1.3em" height="1.3em" style="color: white" />
				<div class="pr-2">
					Continue with &nbsp;<span class="font-bold">GitHub</span>
				</div>
			</button>
		</a>
	</div>
</div>
