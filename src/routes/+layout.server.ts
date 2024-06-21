import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
	const { session } = await locals.safeGetSession() // Make sure to use safeGetSession

	return {
		session
	}
}
