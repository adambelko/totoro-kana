import {hiraganaProgress, katakanaProgress} from "$lib/db/schema"
import {json} from "@sveltejs/kit"
import {and, eq} from "drizzle-orm"
import {db} from "$lib/db"
import {loadUserProgress} from "$lib/db/queries"

export const POST = async ({request}) => {
    const {userId, groupName, isHiragana, reviewInterval} = await request.json()
    const table = isHiragana ? hiraganaProgress : katakanaProgress
    const completionDate = new Date().toLocaleDateString("en-CA")

    await db
        .update(table)
        .set({completionDate, reviewInterval: reviewInterval * 2})
        .where(and(eq(table.userId, userId), eq(table.completedGroup, groupName)))
        .returning()

    const tableUserProgress = await loadUserProgress(table, userId)
    return json({tableUserProgress})
}
