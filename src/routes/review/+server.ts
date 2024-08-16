import { hiraganaProgress, katakanaProgress } from "$lib/db/schema"
import { json } from "@sveltejs/kit"
import { and, eq } from "drizzle-orm"
import { db } from "$lib/db"

export const POST = async ({ request }) => {
	const { userId, groupName, hiragana, reviewInterval } = await request.json()
	const table = hiragana ? hiraganaProgress : katakanaProgress
	const completionDate = new Date().toLocaleDateString("en-CA")

	const userProgress = await db
		.update(table)
		.set({ completionDate, reviewInterval: reviewInterval * 2 })
		.where(and(eq(table.userId, userId), eq(table.completedGroup, groupName)))
		.returning()
	return json(userProgress)
}
