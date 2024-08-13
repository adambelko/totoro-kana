import { pgTable, uuid, varchar, serial, date, integer } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
	id: uuid("id").primaryKey(),
	email: varchar("email").unique().notNull(),
	joinDate: date("join_date").defaultNow().notNull()
})

export const hiragana = pgTable("hiragana", {
	id: serial("id").primaryKey(),
	kanaCategory: varchar("kana_category").notNull(),
	groupName: varchar("group_name").notNull(),
	japanese: varchar("japanese").notNull(),
	romaji: varchar("romaji").notNull()
})

export const hiraganaProgress = pgTable("hiragana_progress", {
	id: uuid("id").primaryKey(),
	userId: uuid("user_id").references(() => users.id),
	completedGroup: varchar("completed_group").notNull(),
	completionDate: date("completion_date").defaultNow().notNull()
	// reviewInterval: integer("review_interval").notNull()
})

export const katakana = pgTable("katakana", {
	id: serial("id").primaryKey(),
	kanaCategory: varchar("kana_category").notNull(),
	groupName: varchar("group_name").notNull(),
	japanese: varchar("japanese").notNull(),
	romaji: varchar("romaji").notNull()
})

export const katakanaProgress = pgTable("katakana_progress", {
	id: uuid("id").primaryKey(),
	userId: uuid("user_id").references(() => users.id),
	completedGroup: varchar("completed_group").notNull(),
	completionDate: date("completion_date").defaultNow().notNull()
	// reviewInterval: integer("review_interval").notNull()
})
