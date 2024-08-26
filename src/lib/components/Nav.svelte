<script lang="ts">
    import {page} from "$app/stores"
    import {Avatar, popup, type PopupSettings} from "@skeletonlabs/skeleton"
    import ProfileModal from "$lib/components/ProfileModal.svelte"
    import totoroLogo from "$lib/assets/totoroLogo.webp"
    import totoroAvatar from "$lib/assets/totoroAvatar.webp"

    export let data
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
        <a class="mr-8 flex text-2xl font-bold" href="/">
            Totoro<img class="h-7 max-h-7 w-auto px-1" src={totoroLogo} alt="totoro" />Kana
        </a>
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
                    <Avatar src={totoroAvatar} width="w-14" background="bg-white" />
                    <ProfileModal {data} {popupProfile} />
                </div>
            {:else}
                <a href="/login">
                    <div class="btn cursor-pointer hover:variant-soft-primary {classesActive('/login')}">
                        Log In
                    </div>
                </a>
            {/if}
        </div>
    </div>
</nav>