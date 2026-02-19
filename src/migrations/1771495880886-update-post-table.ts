import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostTable1771495880886 implements MigrationInterface {
    name = 'UpdatePostTable1771495880886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Role_name_enum" AS ENUM('Admin', 'Curator', 'User')`);
        await queryRunner.query(`CREATE TABLE "Role" ("id" SERIAL NOT NULL, "name" "public"."Role_name_enum" NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "UserRole" ("id" SERIAL NOT NULL, "assignedAt" TIMESTAMP NOT NULL DEFAULT now(), "roleId" integer, "userId" integer, CONSTRAINT "PK_83fd6b024a41173978f5b2b9b79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "firstName" character varying, "lastName" character varying, "login" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "accountBlocked" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_03599a389e75563b8314f74278b" UNIQUE ("login"), CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "verification_code" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "code" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "isUsed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d702c086da466e5d25974512d46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "UserRole" ADD CONSTRAINT "FK_48ca98fafa3cd9a4c1e8caea1fe" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserRole" ADD CONSTRAINT "FK_c09e6f704c7cd9fe2bbc26a1a38" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserRole" DROP CONSTRAINT "FK_c09e6f704c7cd9fe2bbc26a1a38"`);
        await queryRunner.query(`ALTER TABLE "UserRole" DROP CONSTRAINT "FK_48ca98fafa3cd9a4c1e8caea1fe"`);
        await queryRunner.query(`DROP TABLE "verification_code"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "UserRole"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`DROP TYPE "public"."Role_name_enum"`);
    }

}
