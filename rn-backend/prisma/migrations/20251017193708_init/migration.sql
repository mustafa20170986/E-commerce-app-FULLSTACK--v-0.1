/*
  Warnings:

  - You are about to drop the `Sellerapplicaiton` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Sellerapplicaiton" DROP CONSTRAINT "Sellerapplicaiton_userId_fkey";

-- DropTable
DROP TABLE "public"."Sellerapplicaiton";

-- CreateTable
CREATE TABLE "Sellerapplication" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "document" TEXT NOT NULL,
    "businessname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Sellerapplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sellerapplication_userId_key" ON "Sellerapplication"("userId");

-- AddForeignKey
ALTER TABLE "Sellerapplication" ADD CONSTRAINT "Sellerapplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
