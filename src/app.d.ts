import type { Session, SupabaseClient, User } from "@supabase/supabase-js"

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
			session: Session | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface KanaGroup {
		category: string
		groupName: string
		romaji: string
		japanese: string
		characters: { [key: string]: string[] }
	}

	interface KanaData {
		[kanaGroup: string]: {
			[characterGroup: string]: {
				[character: string]: string[]
			}
		}
	}
}

export {}
