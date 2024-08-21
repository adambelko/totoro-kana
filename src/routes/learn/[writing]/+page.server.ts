import {hiraganaProgress, katakanaProgress} from "$lib/db/schema"
import {loadUserProgress} from "$lib/db/queries"

export const load = async ({locals}) => {
    const {session} = await locals.safeGetSession()
    if (!session) return

    const userId = session.user.id
    const hiraganaUserProgress = await loadUserProgress(hiraganaProgress, userId)
    const katakanaUserProgress = await loadUserProgress(katakanaProgress, userId)

    return {hiraganaUserProgress, katakanaUserProgress}
}