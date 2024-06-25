import { db } from "$lib/db"

export const load = async () => {
	const users = await db.query.users.findMany()
	return { users }
}
