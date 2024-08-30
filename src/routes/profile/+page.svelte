<script lang="ts">
    import {formatTimestamp} from "$lib/utils/date"
    import {getUserCompletedGroups, getUserKanaLearnedCount} from "$lib/utils/kana"

    export let data
    const {user, hiragana, katakana, hiraganaUserProgress, katakanaUserProgress} = data

    const userHiraganaCompletedGroups = getUserCompletedGroups(hiraganaUserProgress)
    const userKatakanaCompletedGroups = getUserCompletedGroups(katakanaUserProgress)
    const learnedHiraganaCount = getUserKanaLearnedCount(userHiraganaCompletedGroups, hiragana)
    const learnedKatakanaCount = getUserKanaLearnedCount(userKatakanaCompletedGroups, katakana)
</script>

<svelte:head>
    <title>Profile</title>
</svelte:head>

<div class="mb-6 mt-4 flex flex-col bg-white/30 p-6 rounded-container-token">
    <h2 class="h2">My Profile</h2>
    <div class="flex flex-col gap-2">
        <h3 class="h3 mt-6">Profile info</h3>
        <div class="table-container">
            <table class="table table-hover">
                <tbody>
                <tr class="table-row">
                    <th class="w-[130px] p-4 text-left">Name</th>
                    <td class="p-4 text-left">{user?.user_metadata.full_name}</td>
                </tr>
                <tr class="table-row">
                    <th class="w-[130px] p-4 text-left">Email</th>
                    <td class="p-4 text-left">{user?.email}</td>
                </tr>
                <tr class="table-row">
                    <th class="w-[130px] p-4 text-left">Joined</th>
                    <td class="p-4 text-left">{formatTimestamp(user?.created_at)}</td>
                </tr>
                <tr class="table-row">
                    <th class="w-[130px] p-4 text-left">Last login</th>
                    <td class="p-4 text-left">{formatTimestamp(user?.last_sign_in_at)}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <h3 class="h3 mt-6">Kana progress</h3>
        <div class="table-container">
            <table class="table table-hover">
                <tbody>
                <tr class="table-row">
                    <th class="w-[130px] p-4 text-left">Hiragana</th>
                    <td class="p-4 text-left">{learnedHiraganaCount}/{hiragana.length} kana learned</td>
                </tr>
                <tr class="table-row">
                    <th class="w-[130px] p-4 text-left">Katakana</th>
                    <td class="p-4 text-left">{learnedKatakanaCount}/{katakana.length} kana learned</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
