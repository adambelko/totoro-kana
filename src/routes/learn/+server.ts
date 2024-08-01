import { hiraganaProgress, katakanaProgress } from "$lib/db/schema"
import { json } from "@sveltejs/kit"
import { db } from "$lib/db"

export const POST = async ({ request }) => {
	const { userId, groupName, hiragana } = await request.json()

	const table = hiragana ? hiraganaProgress : katakanaProgress
	const completionDate = new Date().toISOString().split("T")[0]

	const userProgress = await db
		.insert(table)
		.values({
			id: crypto.randomUUID(),
			userId,
			completedGroup: groupName,
			completionDate
		})
		.returning()
	return json(userProgress)
}
