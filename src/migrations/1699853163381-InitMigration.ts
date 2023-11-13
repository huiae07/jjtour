import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1699853163381 implements MigrationInterface {
  name = 'InitMigration1699853163381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`reservation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`account_id\` int NOT NULL, \`product_id\` int NOT NULL, \`token\` varchar(32) NOT NULL, \`date\` int NOT NULL, \`status\` enum ('pending', 'approved', 'rejected', 'canceled') NOT NULL, INDEX \`IDX_3feaefd7a55e1d5b2052bc3866\` (\`created_at\`), INDEX \`IDX_8d50e21bc2ac13e92bddb62451\` (\`product_id\`), INDEX \`IDX_0be729d3cfce25f3f075286a11\` (\`token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(64) NOT NULL, \`email\` varchar(64) NOT NULL, \`salt\` varchar(128) NOT NULL DEFAULT '', \`password\` varchar(128) NOT NULL, INDEX \`IDX_2740156ea8742b8df1ad9d9774\` (\`created_at\`), INDEX \`IDX_4c8f96ccf523e9a3faefd5bdd4\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`holiday_week\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`product_id\` int NOT NULL, \`week\` int NOT NULL, INDEX \`IDX_c236e8112d9fc00c3b928f7afe\` (\`created_at\`), INDEX \`IDX_dbc5c087fb15ad782d00a44c01\` (\`product_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`account_id\` int NOT NULL, \`name\` varchar(64) NOT NULL, INDEX \`IDX_91b4f645f7fe267179af692bf0\` (\`created_at\`), INDEX \`IDX_6675123e3d543e03467fd38985\` (\`account_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`holiday\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`product_id\` int NOT NULL, \`date\` int NOT NULL, INDEX \`IDX_87c733679fb21d9c157cacc7f4\` (\`created_at\`), INDEX \`IDX_fc64e7fcd09987977c3d2040ab\` (\`product_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_8d50e21bc2ac13e92bddb624513\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_5f6547251f5c3fa14f5e3c8a008\` FOREIGN KEY (\`account_id\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`holiday_week\` ADD CONSTRAINT \`FK_dbc5c087fb15ad782d00a44c019\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_6675123e3d543e03467fd389858\` FOREIGN KEY (\`account_id\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`holiday\` ADD CONSTRAINT \`FK_fc64e7fcd09987977c3d2040ab8\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`holiday\` DROP FOREIGN KEY \`FK_fc64e7fcd09987977c3d2040ab8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_6675123e3d543e03467fd389858\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`holiday_week\` DROP FOREIGN KEY \`FK_dbc5c087fb15ad782d00a44c019\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_5f6547251f5c3fa14f5e3c8a008\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_8d50e21bc2ac13e92bddb624513\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fc64e7fcd09987977c3d2040ab\` ON \`holiday\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_87c733679fb21d9c157cacc7f4\` ON \`holiday\``,
    );
    await queryRunner.query(`DROP TABLE \`holiday\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_6675123e3d543e03467fd38985\` ON \`product\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_91b4f645f7fe267179af692bf0\` ON \`product\``,
    );
    await queryRunner.query(`DROP TABLE \`product\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_dbc5c087fb15ad782d00a44c01\` ON \`holiday_week\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c236e8112d9fc00c3b928f7afe\` ON \`holiday_week\``,
    );
    await queryRunner.query(`DROP TABLE \`holiday_week\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_4c8f96ccf523e9a3faefd5bdd4\` ON \`account\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_2740156ea8742b8df1ad9d9774\` ON \`account\``,
    );
    await queryRunner.query(`DROP TABLE \`account\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_0be729d3cfce25f3f075286a11\` ON \`reservation\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8d50e21bc2ac13e92bddb62451\` ON \`reservation\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3feaefd7a55e1d5b2052bc3866\` ON \`reservation\``,
    );
    await queryRunner.query(`DROP TABLE \`reservation\``);
  }
}
