import { Migration } from '@mikro-orm/migrations'

export class Migration20240127100418 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'alter table "profiles" add column "gender" smallint null, add column "name" varchar(255) null;'
    )
  }

  override async down(): Promise<void> {
    this.addSql('alter table "profiles" drop column "gender";')
    this.addSql('alter table "profiles" drop column "name";')
  }
}
