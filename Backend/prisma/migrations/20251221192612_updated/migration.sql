/*
  Warnings:

  - The values [SALESMAN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "DealStatus" AS ENUM ('PENDING', 'Declined', 'AGREED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "FinanceStatus" AS ENUM ('NOT_APPLIED', 'AWAITING_APPROVAL', 'APPROVED', 'PENDING', 'AWAITING_PAYMENT', 'PAID');

-- CreateEnum
CREATE TYPE "CarStatus" AS ENUM ('DUEIN', 'INPREP', 'ONSALE', 'SOLD');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'SALESPERSON');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "status" "CarStatus" NOT NULL DEFAULT 'DUEIN',
ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Deal" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "dealerId" TEXT NOT NULL,
    "salespersonId" TEXT NOT NULL,
    "agreedPrice" INTEGER NOT NULL,
    "status" "DealStatus" NOT NULL,
    "pickupDate" TIMESTAMP(3),
    "dealDate" TIMESTAMP(3) NOT NULL,
    "deposit" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "finance" BOOLEAN NOT NULL DEFAULT false,
    "financeStatus" "FinanceStatus",
    "financeAmount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Deal_dealerId_idx" ON "Deal"("dealerId");

-- CreateIndex
CREATE INDEX "Deal_carId_idx" ON "Deal"("carId");

-- CreateIndex
CREATE INDEX "Deal_customerId_idx" ON "Deal"("customerId");

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_salespersonId_fkey" FOREIGN KEY ("salespersonId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
