CREATE TABLE IF NOT EXISTS "katakana" (
	"id" serial PRIMARY KEY NOT NULL,
	"kana_category" varchar NOT NULL,
	"group_name" varchar NOT NULL,
	"japanese" varchar NOT NULL,
	"romaji" varchar NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "katakana_progress" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"katakana_id" integer,
	"progress" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "katakana_progress" ADD CONSTRAINT "katakana_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "katakana_progress" ADD CONSTRAINT "katakana_progress_katakana_id_katakana_id_fk" FOREIGN KEY ("katakana_id") REFERENCES "public"."katakana"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
