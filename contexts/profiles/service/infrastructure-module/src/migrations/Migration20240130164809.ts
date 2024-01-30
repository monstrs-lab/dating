import { Migration } from '@mikro-orm/migrations'

export class Migration20240130164809 extends Migration {
  override async up(): Promise<void> {
    this.addSql('alter table "profiles" add column "photos" jsonb not null default \'[]\';')
  }

  override async down(): Promise<void> {
    this.addSql('alter table "profiles" drop column "photos";')
  }
}
