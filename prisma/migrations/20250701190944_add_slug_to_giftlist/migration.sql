/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `GiftList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `GiftList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GiftList" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GiftList_slug_key" ON "GiftList"("slug");
