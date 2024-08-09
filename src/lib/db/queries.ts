import { hiraganaProgress, katakanaProgress, users } from "$lib/db/schema"
import type { Session } from "@supabase/supabase-js"
import { db } from "$lib/db/index"
import { eq } from "drizzle-orm"

type UserProgressTable = typeof hiraganaProgress | typeof katakanaProgress

export const loadUserProgress = (table: UserProgressTable, userId: string) => {
	return db.select().from(table).where(eq(table.userId, userId))
}

export const addUser = async (session: Session, email: string | any) => {
	const id = session?.user?.id
	const joinDate = new Date().toISOString().split("T")[0]

	return db.insert(users).values({ id, email, joinDate }).returning()
}
