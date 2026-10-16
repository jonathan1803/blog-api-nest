import { MigrationInterface, QueryRunner } from 'typeorm';

//migracion generada manualmente para cambiar el tamaño de la columna
// cover_image de 800 a 900 y asi no borrar los datos de la columna cover_image de la tabla posts
// con el comando de typeorm migration:generate se genera un drop column y eso borra los datos de la columna cover_image
// por eso se hace una migracion manual para cambiar el tamaño de la columna cover_image de 800 a 900 y asi no borrar los datos de la columna
// cover_image de la tabla posts con un ALTER COLUMN
export class ManualMigration1790706010920 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "cover_image" TYPE character varying(900)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "cover_image" TYPE character varying(800)`,
    );
  }
}
