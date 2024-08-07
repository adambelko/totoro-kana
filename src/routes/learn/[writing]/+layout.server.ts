import { users } from "$lib/db/schema"
import { eq } from "drizzle-orm"
import { db } from "$lib/db"
import type { Session } from "@supabase/supabase-js"

export const load = async ({ locals }) => {
	const { session } = await locals.safeGetSession()
	if (!session) return

	const userEmail = session?.user?.email
	const userData = userEmail && (await db.select().from(users).where(eq(users.email, userEmail)))

	if (!userData || userData.length === 0) {
		await addUser(session, userEmail)
	}
}

const addUser = async (session: Session, email: string | any) => {
	const id = session?.user?.id
	const joinDate = new Date().toISOString().split("T")[0]

	await db.insert(users).values({ id, email, joinDate }).returning()
}
