/*
  Warnings:

  - You are about to drop the column `chargeTax` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to drop the column `barcode` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `chargeTax` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `continueSellingOOS` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `trackQuantity` on the `Variant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `chargeTax`,
    MODIFY `description` JSON NULL;

-- AlterTable
ALTER TABLE `Variant` DROP COLUMN `barcode`,
    DROP COLUMN `chargeTax`,
    DROP COLUMN `continueSellingOOS`,
    DROP COLUMN `trackQuantity`;
