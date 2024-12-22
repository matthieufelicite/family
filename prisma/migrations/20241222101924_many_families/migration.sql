/*
  Warnings:

  - You are about to drop the column `familyId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_familyId_fkey";

-- DropIndex
DROP INDEX "User_familyId_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "familyId";

-- CreateTable
CREATE TABLE "_UserFamilies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserFamilies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserFamilies_B_index" ON "_UserFamilies"("B");

-- AddForeignKey
ALTER TABLE "_UserFamilies" ADD CONSTRAINT "_UserFamilies_A_fkey" FOREIGN KEY ("A") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFamilies" ADD CONSTRAINT "_UserFamilies_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
