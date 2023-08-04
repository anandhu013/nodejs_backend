import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordColumn1691125751191 implements MigrationInterface {
    name = 'AddPasswordColumn1691125751191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
