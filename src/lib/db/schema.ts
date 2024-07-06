import { pgTable, uuid, varchar, integer, serial } from "drizzle-orm/pg-core"

export const hiragana = pgTable("hiragana", {
	id: serial("id").primaryKey(),
	kana: varchar("kana").notNull(),
	group_name: varchar("group_name").notNull(),
	japanese: varchar("japanese").notNull(),
	romaji: varchar("romaji").notNull(),
	order: integer("order").notNull()
})

export const users = pgTable("users", {
	id: uuid("id").primaryKey(),
	email: varchar("email").unique().notNull()
})

export const hiraganaProgress = pgTable("hiragana_progress", {
	id: uuid("id").primaryKey(),
	userId: uuid("user_id").references(() => users.id),
	hiraganaId: integer("hiragana_id").references(() => hiragana.id),
	progress: integer("progress")
})
