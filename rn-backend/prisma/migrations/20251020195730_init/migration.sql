/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Slap` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Slap_clerkId_key" ON "Slap"("clerkId");
