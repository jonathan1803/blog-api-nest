import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewFiels1790704617065 implements MigrationInterface {
  name = 'NewFiels1790704617065';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "description" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "cover_image" character varying(255)`,
    );
    //con la migracion del comando que genera typeorm hace un Drop column y
    //  borraria hasta los dato por eso
    // se cambio a alter column para que no se pierdan los datos de la columna cover_image
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "cover_image" TYPE character varying(900)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "cover_image" TYPE character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "cover_image"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "description"`,
    );
  }
}
