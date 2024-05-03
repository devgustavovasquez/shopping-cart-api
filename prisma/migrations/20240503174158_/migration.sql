/*
  Warnings:

  - You are about to drop the column `carrinhoId` on the `carrinho_items` table. All the data in the column will be lost.
  - You are about to drop the column `produtoId` on the `carrinho_items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "carrinho_items" DROP CONSTRAINT "carrinho_items_carrinhoId_fkey";

-- DropForeignKey
ALTER TABLE "carrinho_items" DROP CONSTRAINT "carrinho_items_produtoId_fkey";

-- AlterTable
ALTER TABLE "carrinho_items" DROP COLUMN "carrinhoId",
DROP COLUMN "produtoId";

-- AddForeignKey
ALTER TABLE "carrinho_items" ADD CONSTRAINT "carrinho_items_carrinho_id_fkey" FOREIGN KEY ("carrinho_id") REFERENCES "carrinhos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrinho_items" ADD CONSTRAINT "carrinho_items_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
