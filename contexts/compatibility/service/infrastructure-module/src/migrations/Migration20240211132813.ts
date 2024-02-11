import { Migration } from '@mikro-orm/migrations'

export class Migration20240211132813 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table "questionaires" ("id" uuid not null, "status" smallint not null default 0, "name" varchar(255) not null, "photo_id" uuid null, "questions" jsonb not null default \'[]\', "created_at" timestamptz not null, constraint "questionaires_pkey" primary key ("id"));'
    )

    this.addSql(
      'create table "surveys" ("id" uuid not null, "status" smallint not null default 0, "questionaire_id" uuid not null, "interviewee_id" uuid not null, "answers" jsonb not null default \'{}\', "created_at" timestamptz not null, constraint "surveys_pkey" primary key ("id"));'
    )
    this.addSql(
      'alter table "surveys" add constraint "surveys_questionaire_id_interviewee_id_unique" unique ("questionaire_id", "interviewee_id");'
    )
  }
}
