CREATE TABLE IF NOT EXISTS "hiragana" (
	"id" serial PRIMARY KEY NOT NULL,
	"kana_category" varchar NOT NULL,
	"group_name" varchar NOT NULL,
	"japanese" varchar NOT NULL,
	"romaji" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hiragana_progress" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"completed_group" varchar NOT NULL,
	"completion_date" date DEFAULT now() NOT NULL,
	"review_interval" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "katakana" (
	"id" serial PRIMARY KEY NOT NULL,
	"kana_category" varchar NOT NULL,
	"group_name" varchar NOT NULL,
	"japanese" varchar NOT NULL,
	"romaji" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "katakana_progress" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"completed_group" varchar NOT NULL,
	"completion_date" date DEFAULT now() NOT NULL,
	"review_interval" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"join_date" date DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hiragana_progress" ADD CONSTRAINT "hiragana_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "katakana_progress" ADD CONSTRAINT "katakana_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
