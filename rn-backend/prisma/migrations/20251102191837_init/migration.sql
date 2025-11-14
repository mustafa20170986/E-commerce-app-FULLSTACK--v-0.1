/*
  Warnings:

  - A unique constraint covering the columns `[storeId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - The required column `storeId` was added to the `Store` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "storeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Store_storeId_key" ON "Store"("storeId");
