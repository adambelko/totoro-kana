import type { Provider } from "@supabase/supabase-js"
import { redirect } from "@sveltejs/kit"

export const GET = async ({ locals, url }) => {
	const provider = url.searchParams.get("provider") as Provider
	if (!provider) throw redirect(307, "/login")

	const { data } = await locals.supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: url.origin + "/auth/callback"
		}
	})

	if (data.url) {
		throw redirect(307, data.url)
	}

	throw redirect(307, "/login")
}
