import type { PageServerLoad } from "./$types"
import { db } from "$lib/db"

export const load: PageServerLoad = async () => {
	const hiraganaProgress = await db.query.hiraganaProgress.findMany()
	const katakanaProgress = await db.query.katakanaProgress.findMany()

	return { hiraganaProgress, katakanaProgress }
}
