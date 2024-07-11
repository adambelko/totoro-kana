import type { Session, SupabaseClient, User } from "@supabase/supabase-js"

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient
			safeGetSession: () => Promise<{ session: Session; user: User }>
			session: Session
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Kana {
		id: number
		kanaCategory: string
		groupName: string
		japanese: string
		romaji: string
		order: number
	}

	interface KanaData {
		category: string
		groupName: string
		romaji: string
		japanese: string
		characters: { [character: string]: string[] }
	}
}

export {}
