import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserTableDeleteUsername1618159396531
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "username");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "username",
        type: "varchar",
        isUnique: true,
      })
    );
  }
}
