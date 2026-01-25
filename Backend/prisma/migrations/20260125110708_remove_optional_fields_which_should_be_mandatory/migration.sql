/*
  Warnings:

  - Made the column `buyInPrice` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `engineType` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `Dealer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "buyInPrice" SET NOT NULL,
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "engineType" SET NOT NULL;

-- AlterTable
ALTER TABLE "Dealer" ALTER COLUMN "location" SET NOT NULL;
