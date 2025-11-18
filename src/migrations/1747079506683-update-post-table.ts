import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostTable1747079506683 implements MigrationInterface {
    name = 'UpdatePostTable1747079506683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserRole" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "UserRole" ALTER COLUMN "assignedAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserRole" ALTER COLUMN "assignedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "UserRole" ALTER COLUMN "description" SET NOT NULL`);
    }

}
