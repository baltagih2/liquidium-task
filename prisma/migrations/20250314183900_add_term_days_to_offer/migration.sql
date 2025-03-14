/*
  Warnings:

  - Added the required column `interest` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termDays` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "interest" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "termDays" INTEGER NOT NULL;
