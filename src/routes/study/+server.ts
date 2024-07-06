import { db } from "$lib/db"
import { json } from "@sveltejs/kit"
import { hiraganaProgress } from "$lib/db/schema"

export const POST = async (event) => {
	const { userId, hiraganaId } = await event.request.json()
	console.log(userId)

	const add = await db
		.insert(hiraganaProgress)
		.values({ id: crypto.randomUUID(), userId, hiraganaId, progress: 1 })
		.returning()
	return json(add)
}
