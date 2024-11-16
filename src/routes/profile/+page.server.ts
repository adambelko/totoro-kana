import { redirect } from "@sveltejs/kit"
import { hiraganaProgress, katakanaProgress } from "$lib/db/schema"
import { loadUserProgress } from "$lib/db/queries"

export const load = async ({ locals, url }) => {
	const { session } = await locals.safeGetSession()
	if (!session) throw redirect(302, `/login?next=${url.pathname}`)

	const userId = session.user.id
	const hiraganaUserProgress = await loadUserProgress(hiraganaProgress, userId)
	const katakanaUserProgress = await loadUserProgress(katakanaProgress, userId)

	return { hiraganaUserProgress, katakanaUserProgress }
}
