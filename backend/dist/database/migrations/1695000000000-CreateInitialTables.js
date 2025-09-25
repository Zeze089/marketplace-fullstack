"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInitialTables1695000000000 = void 0;
class CreateInitialTables1695000000000 {
    name = 'CreateInitialTables1695000000000';
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL NOT NULL,
        "name" character varying(255) NOT NULL,
        "email" character varying(255) NOT NULL,
        "cpf" character varying(14) NOT NULL,
        "phone" character varying(15) NOT NULL,
        "password" character varying(255) NOT NULL,
        "role" character varying NOT NULL DEFAULT 'USER',
        "isActive" boolean NOT NULL DEFAULT false,
        "emailVerified" boolean NOT NULL DEFAULT false,
        "emailVerificationToken" character varying(255),
        "passwordResetToken" character varying(255),
        "passwordResetExpires" TIMESTAMP,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "UQ_users_cpf" UNIQUE ("cpf"),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      CREATE TABLE "products" (
        "id" SERIAL NOT NULL,
        "name" character varying(255) NOT NULL,
        "description" text,
        "price" numeric(10,2) NOT NULL,
        "stock" integer NOT NULL DEFAULT '0',
        "imageUrl" character varying(500),
        "category" character varying(100),
        "isActive" boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_products_id" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      CREATE TABLE "carts" (
        "id" SERIAL NOT NULL,
        "userId" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_carts_userId" UNIQUE ("userId"),
        CONSTRAINT "PK_carts_id" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      CREATE TABLE "cart_items" (
        "id" SERIAL NOT NULL,
        "cartId" integer NOT NULL,
        "productId" integer NOT NULL,
        "quantity" integer NOT NULL DEFAULT '1',
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_cart_items_id" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      ALTER TABLE "carts" 
      ADD CONSTRAINT "FK_carts_userId" 
      FOREIGN KEY ("userId") REFERENCES "users"("id") 
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);
        await queryRunner.query(`
      ALTER TABLE "cart_items" 
      ADD CONSTRAINT "FK_cart_items_cartId" 
      FOREIGN KEY ("cartId") REFERENCES "carts"("id") 
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);
        await queryRunner.query(`
      ALTER TABLE "cart_items" 
      ADD CONSTRAINT "FK_cart_items_productId" 
      FOREIGN KEY ("productId") REFERENCES "products"("id") 
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);
        await queryRunner.query(`CREATE INDEX "IDX_users_email" ON "users" ("email")`);
        await queryRunner.query(`CREATE INDEX "IDX_users_cpf" ON "users" ("cpf")`);
        await queryRunner.query(`CREATE INDEX "IDX_products_name" ON "products" ("name")`);
        await queryRunner.query(`CREATE INDEX "IDX_products_category" ON "products" ("category")`);
        await queryRunner.query(`CREATE INDEX "IDX_products_isActive" ON "products" ("isActive")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_cart_items_productId"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_cart_items_cartId"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_carts_userId"`);
        await queryRunner.query(`DROP INDEX "IDX_products_isActive"`);
        await queryRunner.query(`DROP INDEX "IDX_products_category"`);
        await queryRunner.query(`DROP INDEX "IDX_products_name"`);
        await queryRunner.query(`DROP INDEX "IDX_users_cpf"`);
        await queryRunner.query(`DROP INDEX "IDX_users_email"`);
        await queryRunner.query(`DROP TABLE "cart_items"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.CreateInitialTables1695000000000 = CreateInitialTables1695000000000;
//# sourceMappingURL=1695000000000-CreateInitialTables.js.map