import { Migration } from '@mikro-orm/migrations'

export class Migration20240217155906 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table "skips" ("id" uuid not null, "profile_id" uuid not null, "target_id" uuid not null, "created_at" timestamptz not null, constraint "skips_pkey" primary key ("id"));'
    )

    this.addSql(
      'alter table "skips" add constraint "skips_profile_id_foreign" foreign key ("profile_id") references "profiles" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "skips" add constraint "skips_target_id_foreign" foreign key ("target_id") references "profiles" ("id") on update cascade;'
    )
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "skips" cascade;')
  }
}
