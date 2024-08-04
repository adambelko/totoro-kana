import { db } from "$lib/db"
import { hiraganaProgress, katakanaProgress } from "$lib/db/schema"
import { eq } from "drizzle-orm"

export const load = async ({ locals }) => {
	const { session } = await locals.safeGetSession()
	if (!session) return

	const userId = session.user.id

	const hiraganaUserProgress = await db
		.select()
		.from(hiraganaProgress)
		.where(eq(hiraganaProgress.userId, userId))

	const katakanaUserProgress = await db
		.select()
		.from(katakanaProgress)
		.where(eq(katakanaProgress.userId, userId))

	return { hiraganaUserProgress, katakanaUserProgress }
}
