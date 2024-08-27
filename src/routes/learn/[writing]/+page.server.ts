import { hiraganaProgress, katakanaProgress, users } from "$lib/db/schema"
import { addUser, loadUserProgress } from "$lib/db/queries"
import { db } from "$lib/db"
import { eq } from "drizzle-orm"

export const load = async ({ locals }) => {
	const { session } = await locals.safeGetSession()
	if (!session) return

	const userEmail = session.user.email
	const userData = userEmail && (await db.select().from(users).where(eq(users.email, userEmail)))

	if (!userData || userData.length === 0) {
		await addUser(session, userEmail)
	}

	const userId = session.user.id
	const hiraganaUserProgress = await loadUserProgress(hiraganaProgress, userId)
	const katakanaUserProgress = await loadUserProgress(katakanaProgress, userId)

	return { hiraganaUserProgress, katakanaUserProgress }
}
