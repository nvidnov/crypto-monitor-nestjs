import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostTable1746999909953 implements MigrationInterface {
    name = 'UpdatePostTable1746999909953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Role_name_enum" AS ENUM('Admin', 'Curator', 'User')`);
        await queryRunner.query(`CREATE TABLE "Role" ("id" SERIAL NOT NULL, "name" "public"."Role_name_enum" NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "UserRole" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "assignedAt" TIMESTAMP NOT NULL, "roleId" integer, "userId" integer, CONSTRAINT "PK_83fd6b024a41173978f5b2b9b79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "UserRole" ADD CONSTRAINT "FK_48ca98fafa3cd9a4c1e8caea1fe" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserRole" ADD CONSTRAINT "FK_c09e6f704c7cd9fe2bbc26a1a38" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserRole" DROP CONSTRAINT "FK_c09e6f704c7cd9fe2bbc26a1a38"`);
        await queryRunner.query(`ALTER TABLE "UserRole" DROP CONSTRAINT "FK_48ca98fafa3cd9a4c1e8caea1fe"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "role" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "UserRole"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`DROP TYPE "public"."Role_name_enum"`);
    }

}
