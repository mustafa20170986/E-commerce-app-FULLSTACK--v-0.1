-- CreateTable
CREATE TABLE "Sellerapplicaiton" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "document" TEXT NOT NULL,
    "businessname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Sellerapplicaiton_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sellerapplicaiton_userId_key" ON "Sellerapplicaiton"("userId");

-- AddForeignKey
ALTER TABLE "Sellerapplicaiton" ADD CONSTRAINT "Sellerapplicaiton_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
