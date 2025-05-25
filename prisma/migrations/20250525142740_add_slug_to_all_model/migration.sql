/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `role_permissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `role_permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `permissions` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `role_permissions` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `roles` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `permissions_slug_key` ON `permissions`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `role_permissions_slug_key` ON `role_permissions`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `roles_slug_key` ON `roles`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `users_slug_key` ON `users`(`slug`);
