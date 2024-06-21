import { redirect } from "@sveltejs/kit"

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event
	const code = url.searchParams.get("code")
	const next = url.searchParams.get("next") ?? "/"

	if (code) {
		const { data, error } = await supabase.auth.exchangeCodeForSession(code)
		if (error) {
			console.log(error)
			throw redirect(303, "/")
		} else {
			event.locals.session = data.session // Ensure the session is stored in locals
			throw redirect(303, next)
		}
	} else {
		throw redirect(303, "/")
	}
}
