import { hiraganaProgress, katakanaProgress } from "$lib/db/schema"
import { eq } from "drizzle-orm"
import { db } from "$lib/db"
import { redirect } from "@sveltejs/kit"

type UserProgressTable = typeof hiraganaProgress | typeof katakanaProgress

export const load = async ({ locals }) => {
	const { session } = await locals.safeGetSession()
	if (!session) throw redirect(302, "/login")

	const userId = session.user.id
	const hiraganaUserProgress = await loadUserProgress(hiraganaProgress, userId)
	const katakanaUserProgress = await loadUserProgress(katakanaProgress, userId)

	return { hiraganaUserProgress, katakanaUserProgress }
}

const loadUserProgress = (table: UserProgressTable, userId: string) => {
	return db.select().from(table).where(eq(table.userId, userId))
}
