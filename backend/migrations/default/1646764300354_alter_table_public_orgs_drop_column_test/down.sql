alter table "public"."orgs" alter column "test" drop not null;
alter table "public"."orgs" add column "test" text;
