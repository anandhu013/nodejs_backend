import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDepartmentId1691246597603 implements MigrationInterface {
    name = 'AddedDepartmentId1691246597603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "department_id" TO "departmentID"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_7dbf7a33faea5cd01b0e6a1e843" FOREIGN KEY ("departmentID") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_7dbf7a33faea5cd01b0e6a1e843"`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "departmentID" TO "department_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
