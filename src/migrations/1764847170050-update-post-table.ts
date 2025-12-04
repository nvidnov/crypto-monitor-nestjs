import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostTable1764847170050 implements MigrationInterface {
    name = 'UpdatePostTable1764847170050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserRole" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "firstName" character varying`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "lastName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "UserRole" ADD "description" character varying`);
    }

}
