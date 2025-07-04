-- CreateTable
CREATE TABLE "GiftList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "occasion" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GiftList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" TEXT,
    "purchased" BOOLEAN NOT NULL DEFAULT false,
    "reservedBy" TEXT,
    "reservedAt" TIMESTAMP(3),
    "giftListId" TEXT NOT NULL,

    CONSTRAINT "ListItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_giftListId_fkey" FOREIGN KEY ("giftListId") REFERENCES "GiftList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
