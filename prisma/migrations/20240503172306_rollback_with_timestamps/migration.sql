/*
  Warnings:

  - You are about to drop the column `created_at` on the `carrinhos` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `carrinhos` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "carrinhos" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "created_at",
DROP COLUMN "updated_at";
