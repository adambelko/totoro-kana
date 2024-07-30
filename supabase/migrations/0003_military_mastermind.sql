ALTER TABLE "hiragana_progress" DROP CONSTRAINT "hiragana_progress_hiragana_id_hiragana_id_fk";
--> statement-breakpoint
ALTER TABLE "katakana_progress" DROP CONSTRAINT "katakana_progress_katakana_id_katakana_id_fk";
--> statement-breakpoint
ALTER TABLE "hiragana_progress" ADD COLUMN "completed_group" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "hiragana_progress" ADD COLUMN "completion_date" date DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "katakana_progress" ADD COLUMN "completed_group" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "katakana_progress" ADD COLUMN "completion_date" date DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "hiragana" DROP COLUMN IF EXISTS "order";--> statement-breakpoint
ALTER TABLE "hiragana_progress" DROP COLUMN IF EXISTS "hiragana_id";--> statement-breakpoint
ALTER TABLE "hiragana_progress" DROP COLUMN IF EXISTS "progress";--> statement-breakpoint
ALTER TABLE "katakana" DROP COLUMN IF EXISTS "order";--> statement-breakpoint
ALTER TABLE "katakana_progress" DROP COLUMN IF EXISTS "katakana_id";--> statement-breakpoint
ALTER TABLE "katakana_progress" DROP COLUMN IF EXISTS "progress";