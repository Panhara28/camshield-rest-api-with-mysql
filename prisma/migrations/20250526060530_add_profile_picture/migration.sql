/*
  Warnings:

  - Added the required column `profilePicture` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `profilePicture` VARCHAR(191) NOT NULL;
