import { Migration } from '@mikro-orm/migrations'

export class Migration20240217092525 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table "compatibilities" ("id" uuid not null, "questionaire_id" uuid not null, "interviewee_id" uuid not null, "answers" jsonb not null default \'{}\', "mean" int not null, "created_at" timestamptz not null, constraint "compatibilities_pkey" primary key ("id"));'
    )

    this.addSql(
      'create table "similarities" ("id" uuid not null, "compatibility_id" uuid not null, "from_id" uuid not null, "to_id" uuid not null, "value" int not null, "created_at" timestamptz not null, constraint "similarities_pkey" primary key ("id"));'
    )

    this.addSql(
      'alter table "compatibilities" add constraint "compatibilities_interviewee_id_foreign" foreign key ("interviewee_id") references "profiles" ("id") on update cascade;'
    )

    this.addSql(
      'alter table "similarities" add constraint "similarities_from_id_foreign" foreign key ("from_id") references "profiles" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "similarities" add constraint "similarities_to_id_foreign" foreign key ("to_id") references "profiles" ("id") on update cascade;'
    )
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "compatibilities" cascade;')

    this.addSql('drop table if exists "similarities" cascade;')
  }
}
