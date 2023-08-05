import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedEmployeeAddress1691179124964 implements MigrationInterface {
    name = 'ChangedEmployeeAddress1691179124964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "username" character varying NOT NULL, "joining_date" character varying NOT NULL, "is_active" boolean NOT NULL, "experience" integer NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line1"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "REL_7e77f562043393b08de949b804"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "employee_id" uuid`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "UQ_7e77f562043393b08de949b804b" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_7e77f562043393b08de949b804b" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_7e77f562043393b08de949b804b"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "UQ_7e77f562043393b08de949b804b"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "employee_id" integer`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "REL_7e77f562043393b08de949b804" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line1"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line1" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
