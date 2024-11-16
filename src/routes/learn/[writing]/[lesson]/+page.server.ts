import { redirect } from "@sveltejs/kit"

export const load = async ({ locals, url }) => {
	const { session } = await locals.safeGetSession()
	if (!session) throw redirect(302, `/login?next=${url.pathname}`)
}
