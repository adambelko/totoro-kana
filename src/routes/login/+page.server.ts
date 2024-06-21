import { supabase } from "$lib/supabase/supabaseClient"
import { redirect } from "@sveltejs/kit"

async function signInWithGithub() {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo: "/auth/callback"
		}
	})

	if (data.url) {
		redirect(302, data.url)
	}
}
