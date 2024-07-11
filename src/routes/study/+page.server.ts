import type { ServerLoad } from "@sveltejs/kit"
import type { Session } from "@supabase/supabase-js"
import { db } from "$lib/db"
import { users } from "$lib/db/schema"
import { eq } from "drizzle-orm"

export const load: ServerLoad = async ({ locals }) => {
	const { session } = await locals.safeGetSession()
	if (!session) return

	const email = session?.user?.email
	const userData = email && (await db.select().from(users).where(eq(users.email, email)))

	if (!userData || userData.length === 0) {
		await saveUser(session)
	}

	const hiragana = await db.query.hiragana.findMany()
	const katakana = await db.query.katakana.findMany()
	return { hiragana, katakana }
}

const saveUser = async (session: Session) => {
	const email = session?.user?.email

	if (!email) {
		throw new Error("User email is undefined")
	}

	await db
		.insert(users)
		.values({
			id: crypto.randomUUID(),
			email: email
		})
		.returning()
}
