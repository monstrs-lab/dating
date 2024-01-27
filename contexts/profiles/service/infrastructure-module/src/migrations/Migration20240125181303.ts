import { Migration } from '@mikro-orm/migrations'

export class Migration20240125181303 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "profiles" ("id" uuid not null, "created_at" timestamptz not null, constraint "profiles_pkey" primary key ("id"));'
    )
  }
}
