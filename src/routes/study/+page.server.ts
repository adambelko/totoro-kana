import type { ServerLoad } from "@sveltejs/kit"
import { db } from "$lib/db"
import { users } from "$lib/db/schema"
import { eq } from "drizzle-orm"
import type { Session } from "@supabase/supabase-js"

export const load: ServerLoad = async ({ locals }) => {
	const { session } = await locals.safeGetSession()
	const email = session?.user?.email
	const userData = email && (await db.select().from(users).where(eq(users.email, email)))

	if (!userData || userData.length === 0) {
		await saveUser(session)
	}
}

const saveUser = async (session: Session | null) => {
	const email = session?.user?.email
	const userData = email ? await db.select().from(users).where(eq(users.email, email)) : []

	if (userData.length === 0 && email) {
		await db
			.insert(users)
			.values({
				id: crypto.randomUUID(),
				email: email
			})
			.returning()
	}
}
