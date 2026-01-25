/*
  Warnings:

  - The values [PENDING,Declined,AGREED,COMPLETED] on the enum `DealStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PENDING] on the enum `FinanceStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The `color` column on the `Car` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `engineType` column on the `Car` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `transmission` column on the `Car` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `mileage` on table `Car` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ColorOptions" AS ENUM ('BLACK', 'BLUE', 'BROWN', 'GOLD', 'GREEN', 'GREY', 'ORANGE', 'PINK', 'PURPLE', 'RED', 'SILVER', 'WHITE', 'YELLOW');

-- CreateEnum
CREATE TYPE "EngineType" AS ENUM ('PETROL', 'DIESEL', 'ELECTRIC', 'PETROL_HYBRID', 'DIESEL_HYBRID');

-- CreateEnum
CREATE TYPE "TransmissionType" AS ENUM ('MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC');

-- AlterEnum
BEGIN;
CREATE TYPE "DealStatus_new" AS ENUM ('AWAITING_PAYMENT', 'AWAITING_PICKUP', 'CANCELLED', 'COLLECTED', 'RETURNED');
ALTER TABLE "Deal" ALTER COLUMN "status" TYPE "DealStatus_new" USING ("status"::text::"DealStatus_new");
ALTER TYPE "DealStatus" RENAME TO "DealStatus_old";
ALTER TYPE "DealStatus_new" RENAME TO "DealStatus";
DROP TYPE "public"."DealStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "FinanceStatus_new" AS ENUM ('NOT_APPLIED', 'AWAITING_APPROVAL', 'APPROVED', 'DECLINED', 'AWAITING_PAYMENT', 'PAID');
ALTER TABLE "Deal" ALTER COLUMN "financeStatus" TYPE "FinanceStatus_new" USING ("financeStatus"::text::"FinanceStatus_new");
ALTER TYPE "FinanceStatus" RENAME TO "FinanceStatus_old";
ALTER TYPE "FinanceStatus_new" RENAME TO "FinanceStatus";
DROP TYPE "public"."FinanceStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('APPLICATION_ADMIN', 'DEALER_ADMIN', 'SALES_MANAGER', 'SALESPERSON');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "buyInPrice" INTEGER,
ADD COLUMN     "dealerNotes" TEXT,
ADD COLUMN     "owners" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pictures" TEXT[],
ADD COLUMN     "recon" TEXT,
ADD COLUMN     "saleDate" TIMESTAMP(3),
ADD COLUMN     "salePrice" INTEGER,
ADD COLUMN     "video" TEXT,
ALTER COLUMN "buyInDate" DROP NOT NULL,
ALTER COLUMN "buyInDate" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP DEFAULT,
DROP COLUMN "color",
ADD COLUMN     "color" "ColorOptions",
ALTER COLUMN "condition" SET DEFAULT 'NEW',
DROP COLUMN "engineType",
ADD COLUMN     "engineType" "EngineType",
ALTER COLUMN "mileage" SET NOT NULL,
ALTER COLUMN "mileage" SET DEFAULT 0,
DROP COLUMN "transmission",
ADD COLUMN     "transmission" "TransmissionType" NOT NULL DEFAULT 'AUTOMATIC';

-- AlterTable
ALTER TABLE "Deal" ADD COLUMN     "extendedWarranty" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "extendedWarrantyAmount" INTEGER DEFAULT 0,
ADD COLUMN     "financeRate" INTEGER DEFAULT 0,
ADD COLUMN     "financeTerm" INTEGER DEFAULT 0,
ADD COLUMN     "gap" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "gapAmount" INTEGER DEFAULT 0,
ADD COLUMN     "paintProtection" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paintProtectionAmount" INTEGER DEFAULT 0,
ADD COLUMN     "servicePlan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "servicePlanAmount" INTEGER DEFAULT 0,
ADD COLUMN     "tradeInAllowance" INTEGER,
ADD COLUMN     "tradeInId" TEXT,
ALTER COLUMN "dealDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "financeStatus" SET DEFAULT 'NOT_APPLIED',
ALTER COLUMN "financeAmount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Dealer" ADD COLUMN     "email" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "Customer";

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_tradeInId_fkey" FOREIGN KEY ("tradeInId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;
