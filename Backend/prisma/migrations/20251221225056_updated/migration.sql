/*
  Warnings:

  - You are about to drop the column `customerId` on the `Deal` table. All the data in the column will be lost.
  - Added the required column `customerEmail` to the `Deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerNumber` to the `Deal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deal" DROP CONSTRAINT "Deal_customerId_fkey";

-- DropIndex
DROP INDEX "Deal_customerId_idx";

-- AlterTable
ALTER TABLE "Deal" DROP COLUMN "customerId",
ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerNumber" TEXT NOT NULL;
