CREATE TABLE "public"."impact" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "indicator" text NOT NULL, "value" numeric NOT NULL, "prefix" text, "suffix" text, PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
