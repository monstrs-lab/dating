import { Migration } from '@mikro-orm/migrations'

export class Migration20240218160842 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table "likes" ("id" uuid not null, "profile_id" uuid not null, "target_id" uuid not null, "created_at" timestamptz not null, constraint "likes_pkey" primary key ("id"));'
    )

    this.addSql(
      'alter table "likes" add constraint "likes_profile_id_foreign" foreign key ("profile_id") references "profiles" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "likes" add constraint "likes_target_id_foreign" foreign key ("target_id") references "profiles" ("id") on update cascade;'
    )
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "likes" cascade;')
  }
}
