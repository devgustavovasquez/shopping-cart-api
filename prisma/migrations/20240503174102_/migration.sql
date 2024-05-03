/*
  Warnings:

  - Added the required column `produtoId` to the `carrinho_items` table without a default value. This is not possible if the table is not empty.
  - Made the column `carrinhoId` on table `carrinho_items` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "carrinho_items" DROP CONSTRAINT "carrinho_items_carrinhoId_fkey";

-- AlterTable
ALTER TABLE "carrinho_items" ADD COLUMN     "produtoId" INTEGER NOT NULL,
ALTER COLUMN "carrinhoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "carrinho_items" ADD CONSTRAINT "carrinho_items_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "carrinhos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrinho_items" ADD CONSTRAINT "carrinho_items_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
