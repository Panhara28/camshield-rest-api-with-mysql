/*
  Warnings:

  - Added the required column `imageVariant` to the `varaints` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `varaints` ADD COLUMN `imageVariant` VARCHAR(191) NOT NULL;
