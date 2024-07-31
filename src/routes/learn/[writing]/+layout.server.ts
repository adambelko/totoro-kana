import type { LayoutServerLoad } from "./$types"
import { db } from "$lib/db"
import { eq } from "drizzle-orm"
import { users } from "$lib/db/schema"

export const load: LayoutServerLoad = async ({ locals }) => {
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
