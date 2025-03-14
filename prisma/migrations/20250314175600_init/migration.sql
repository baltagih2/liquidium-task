-- CreateTable
CREATE TABLE "UserOrdinal" (
    "id" TEXT NOT NULL,
    "inscriptionId" TEXT NOT NULL,
    "inscriptionName" TEXT NOT NULL,
    "collectionId" TEXT,
    "ownerWallet" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "floorPrice" DOUBLE PRECISION NOT NULL,
    "lastSalePrice" DOUBLE PRECISION NOT NULL,
    "metadata" JSONB NOT NULL,
    "contentUrl" TEXT NOT NULL,
    "bisUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserOrdinal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "ordinalId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "ltv" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOrdinal_inscriptionId_key" ON "UserOrdinal"("inscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_slug_key" ON "Collection"("slug");

-- AddForeignKey
ALTER TABLE "UserOrdinal" ADD CONSTRAINT "UserOrdinal_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_ordinalId_fkey" FOREIGN KEY ("ordinalId") REFERENCES "UserOrdinal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
