import { Migration } from '@mikro-orm/migrations'

export class Migration20240201080803 extends Migration {
  override async up(): Promise<void> {
    this.addSql('alter table "profiles" drop column "geoposition_latitude";')
    this.addSql('alter table "profiles" drop column "geoposition_longitude";')

    this.addSql('alter table "profiles" add column "point" point null;')
  }

  override async down(): Promise<void> {
    this.addSql('alter table "profiles" drop column "point";')

    this.addSql(
      'alter table "profiles" add column "geoposition_latitude" int null, add column "geoposition_longitude" int null;'
    )
  }
}
