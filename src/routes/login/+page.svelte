<script lang="ts">
    import {goto} from "$app/navigation"
    import {onMount} from "svelte"
    import Icon from "@iconify/svelte"

    export let data

    onMount(() => {
        if (data.user) goto("/")
    })
</script>

<svelte:head>
    <title>Log in</title>
</svelte:head>

<div class="mt-4 flex flex-col bg-white/30 pt-6 pb-10 rounded-container-token">
    <h2 class="h2 p-4 text-center">Log in</h2>
    <div class="flex flex-col gap-4 items-center">
        <a href="/auth/login?provider=google">
            <button class="bg-tertiary-400 btn">
                <Icon icon="ri:google-fill" width="1.3em" height="1.3em"  style="color: black" />
                <div class="pr-2">
                    Continue with &nbsp;<span class="font-bold">Google</span>
                </div>
            </button>
        </a>
        <a href="/auth/login?provider=spotify">
            <button class="bg-primary-400 btn">
                <Icon icon="mdi:spotify" width="1.3em" height="1.3em" style="color: black" />
                <div class="pr-2">
                    Continue with &nbsp;<span class="font-bold">Spotify</span>
                </div>
            </button>
        </a>
        <a href="/auth/login?provider=github">
            <button class="variant-filled btn">
                <Icon icon="mdi:github" width="1.3em" height="1.3em" style="color: white" />
                <div class="pr-2">
                    Continue with &nbsp;<span class="font-bold">GitHub</span>
                </div>
            </button>
        </a>
    </div>
</div>
