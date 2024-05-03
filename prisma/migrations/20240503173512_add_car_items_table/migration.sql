/*
  Warnings:

  - You are about to drop the column `produto_id` on the `carrinhos` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `carrinhos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "carrinhos" DROP CONSTRAINT "carrinhos_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "carrinhos" DROP CONSTRAINT "carrinhos_usuario_id_fkey";

-- AlterTable
ALTER TABLE "carrinhos" DROP COLUMN "produto_id",
DROP COLUMN "quantidade";

-- CreateTable
CREATE TABLE "carrinho_items" (
    "id" SERIAL NOT NULL,
    "carrinho_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "carrinhoId" INTEGER,

    CONSTRAINT "carrinho_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "carrinho_items" ADD CONSTRAINT "carrinho_items_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "carrinhos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
