import type { LayoutServerLoad } from "./$types"
import { db } from "$lib/db"

export const load: LayoutServerLoad = async ({ locals }) => {
	const { session } = await locals.safeGetSession()
	const hiragana = await db.query.hiragana.findMany()
	const katakana = await db.query.katakana.findMany()

	return { hiragana, katakana, session }
}
