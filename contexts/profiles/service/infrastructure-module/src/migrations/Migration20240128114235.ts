import { Migration } from '@mikro-orm/migrations'

export class Migration20240128114235 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'alter table "profiles" add column "location" varchar(255) null, add column "geoposition_latitude" int null, add column "geoposition_longitude" int null;'
    )
  }

  override async down(): Promise<void> {
    this.addSql('alter table "profiles" drop column "location";')
    this.addSql('alter table "profiles" drop column "geoposition_latitude";')
    this.addSql('alter table "profiles" drop column "geoposition_longitude";')
  }
}
