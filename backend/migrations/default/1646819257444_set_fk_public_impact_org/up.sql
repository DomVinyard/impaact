alter table "public"."impact"
  add constraint "impact_org_fkey"
  foreign key ("org")
  references "public"."orgs"
  ("id") on update restrict on delete restrict;
