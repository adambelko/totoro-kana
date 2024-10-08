import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public"
import { createBrowserClient, createServerClient, isBrowser, parse } from "@supabase/ssr"
import { dev } from "$app/environment"
import { inject } from "@vercel/analytics"

inject({ mode: dev ? "development" : "production" })

export const load = async ({ data, depends, fetch }) => {
	depends("supabase:auth")

	const supabase = isBrowser()
		? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					get(key) {
						const cookie = parse(document.cookie)
						return cookie[key]
					}
				}
			})
		: createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					get() {
						return JSON.stringify(data.session)
					}
				}
			})

	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutData`, which
	 * safely checked the session using `safeGetSession`.
	 */
	const {
		data: { session }
	} = await supabase.auth.getSession()

	const {
		data: { user }
	} = await supabase.auth.getUser()

	const { hiragana, katakana } = data

	return { session, supabase, user, hiragana, katakana }
}
