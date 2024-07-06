CREATE TABLE IF NOT EXISTS "hiragana" (
	"id" serial PRIMARY KEY NOT NULL,
	"kana" varchar NOT NULL,
	"group_name" varchar NOT NULL,
	"japanese" varchar NOT NULL,
	"romaji" varchar NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hiragana_progress" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"hiragana_id" integer,
	"progress" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
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
 ALTER TABLE "hiragana_progress" ADD CONSTRAINT "hiragana_progress_hiragana_id_hiragana_id_fk" FOREIGN KEY ("hiragana_id") REFERENCES "public"."hiragana"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
