import type { ServerLoad } from "@sveltejs/kit"
import { db } from "$lib/db"
import { users } from "$lib/db/schema"
import { eq } from "drizzle-orm"

export const load: ServerLoad = async ({ locals }) => {
	const { session } = await locals.safeGetSession()
	if (!session) return

	const userEmail = session?.user?.email
	const userId = session?.user?.id
	const userData = userEmail && (await db.select().from(users).where(eq(users.email, userEmail)))

	if (!userData || userData.length === 0) {
		await saveUser(userId, userEmail)
	}
}

const saveUser = async (id: string | any, email: string | any) => {
	await db.insert(users).values({ id, email }).returning()
}
