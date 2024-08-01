import { db } from "$lib/db"

export const load = async () => {
	const hiraganaProgress = await db.query.hiraganaProgress.findMany()
	const katakanaProgress = await db.query.katakanaProgress.findMany()

	return { hiraganaProgress, katakanaProgress }
}
