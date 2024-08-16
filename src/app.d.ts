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

	interface Kana {
		id: number
		kanaCategory: string
		groupName: string
		japanese: string
		romaji: string
	}

	interface KanaData {
		category: string
		groupName: string
		romaji: string
		japanese: string
		characters: { [character: string]: string[] }
	}

	interface WritingProgress {
		id: string
		userId: string | null
		completedGroup: string
		completionDate: string
		reviewInterval: number
	}
}

export {}
