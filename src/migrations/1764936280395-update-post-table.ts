import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostTable1764936280395 implements MigrationInterface {
    name = 'UpdatePostTable1764936280395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "verification_code" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "code" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d702c086da466e5d25974512d46" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "verification_code"`);
    }

}
