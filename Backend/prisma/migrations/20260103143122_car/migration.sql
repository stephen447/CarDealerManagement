/*
  Warnings:

  - The values [DUEIN,INPREP,ONSALE] on the enum `CarStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Deal` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerFirstName` to the `Deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerLastName` to the `Deal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CarCondition" AS ENUM ('NEW', 'USED');

-- CreateEnum
CREATE TYPE "CarType" AS ENUM ('RETAIL', 'TRADE');

-- AlterEnum
BEGIN;
CREATE TYPE "CarStatus_new" AS ENUM ('DUE_IN', 'IN_PREP', 'ON_SALE', 'SOLD');
ALTER TABLE "public"."Car" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Car" ALTER COLUMN "status" TYPE "CarStatus_new" USING ("status"::text::"CarStatus_new");
ALTER TYPE "CarStatus" RENAME TO "CarStatus_old";
ALTER TYPE "CarStatus_new" RENAME TO "CarStatus";
DROP TYPE "public"."CarStatus_old";
ALTER TABLE "Car" ALTER COLUMN "status" SET DEFAULT 'DUE_IN';
COMMIT;

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "color" TEXT,
ADD COLUMN     "condition" "CarCondition" NOT NULL DEFAULT 'USED',
ADD COLUMN     "engineSize" INTEGER,
ADD COLUMN     "engineType" TEXT,
ADD COLUMN     "mileage" INTEGER,
ADD COLUMN     "transmission" TEXT,
ADD COLUMN     "type" "CarType" NOT NULL DEFAULT 'RETAIL',
ALTER COLUMN "registration" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'DUE_IN';

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "name",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Deal" DROP COLUMN "customerName",
ADD COLUMN     "customerFirstName" TEXT NOT NULL,
ADD COLUMN     "customerLastName" TEXT NOT NULL;
