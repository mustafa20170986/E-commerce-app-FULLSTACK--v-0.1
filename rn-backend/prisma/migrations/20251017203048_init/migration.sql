/*
  Warnings:

  - You are about to drop the `Sellerapplication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Sellerapplication" DROP CONSTRAINT "Sellerapplication_userId_fkey";

-- DropTable
DROP TABLE "public"."Sellerapplication";

-- CreateTable
CREATE TABLE "Slap" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "document" TEXT NOT NULL,
    "businessname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Slap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Slap_userId_key" ON "Slap"("userId");

-- AddForeignKey
ALTER TABLE "Slap" ADD CONSTRAINT "Slap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
