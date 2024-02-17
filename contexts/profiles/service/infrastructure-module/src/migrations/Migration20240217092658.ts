import { Migration } from '@mikro-orm/migrations'

export class Migration20240217092658 extends Migration {
  override async up(): Promise<void> {
    this.addSql('alter table "compatibilities" alter column "mean" type real using ("mean"::real);')

    this.addSql('alter table "similarities" alter column "value" type real using ("value"::real);')
  }

  override async down(): Promise<void> {
    this.addSql('alter table "compatibilities" alter column "mean" type int using ("mean"::int);')

    this.addSql('alter table "similarities" alter column "value" type int using ("value"::int);')
  }
}
