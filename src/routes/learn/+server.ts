import {hiraganaProgress, katakanaProgress} from "$lib/db/schema"
import {json} from "@sveltejs/kit"
import {and, eq} from "drizzle-orm"
import {db} from "$lib/db"

export const GET = async ({url}) => {
    const userId = url.searchParams.get("userId")
    const groupName = url.searchParams.get("groupName")
    const isHiragana = url.searchParams.get("hiragana") === "true"
    const table = isHiragana ? hiraganaProgress : katakanaProgress

    if (!userId || !groupName) {
        return json({error: "Missing required query parameters"}, {status: 400})
    }

    const records = await db
        .select()
        .from(table)
        .where(and(eq(table.userId, userId), eq(table.completedGroup, groupName)))
        .limit(1)

    if (records.length === 0) {
        return json({isGroupCompleted: false, reviewInterval: 3})
    }

    return json({
        isGroupCompleted: true,
        reviewInterval: records[0].reviewInterval
    })
}

export const POST = async ({request}) => {
    const {userId, groupName, isHiragana, reviewInterval} = await request.json()
    const table = isHiragana ? hiraganaProgress : katakanaProgress
    const completionDate = new Date().toLocaleDateString("en-CA")

    const userProgress = await db
        .insert(table)
        .values({
            id: crypto.randomUUID(),
            userId,
            completedGroup: groupName,
            completionDate,
            reviewInterval
        })
        .returning()
    return json(userProgress)
}
