import type { ServerLoad } from "@sveltejs/kit"
import { db } from "$lib/db"

export const load: ServerLoad = async () => {
	const hiragana = await db.query.hiragana.findMany()
	const katakana = await db.query.katakana.findMany()

	return { hiragana, katakana }
}
