/*
  Warnings:

  - Changed the type of `occasion` on the `GiftList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Occasion" AS ENUM ('CASAMENTO', 'ANIVERSARIO', 'CHA_DE_CASA_NOVA', 'CHA_DE_BEBE', 'FORMATURA', 'OUTROS');

-- AlterTable
ALTER TABLE "GiftList" DROP COLUMN "occasion",
ADD COLUMN     "occasion" "Occasion" NOT NULL;

-- AddForeignKey
ALTER TABLE "GiftList" ADD CONSTRAINT "GiftList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
