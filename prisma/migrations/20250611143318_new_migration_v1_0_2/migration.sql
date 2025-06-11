/*
  Warnings:

  - The primary key for the `medias` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `medias` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[slug]` on the table `media_product_details` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `medias` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `varaints` will be added. If there are existing duplicate values, this will fail.
  - The required column `slug` was added to the `media_product_details` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `slug` was added to the `medias` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `slug` was added to the `products` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `slug` was added to the `varaints` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `media_product_details` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `medias` DROP PRIMARY KEY,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `products` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `varaints` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `media_product_details_slug_key` ON `media_product_details`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `medias_slug_key` ON `medias`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `products_slug_key` ON `products`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `varaints_slug_key` ON `varaints`(`slug`);
