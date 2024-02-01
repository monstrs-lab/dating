import { Migration } from '@mikro-orm/migrations'

export class Migration20240201080910 extends Migration {
  override async up(): Promise<void> {
    this.addSql('alter table "profiles" rename column "point" to "geoposition";')
  }

  override async down(): Promise<void> {
    this.addSql('alter table "profiles" rename column "geoposition" to "point";')
  }
}
