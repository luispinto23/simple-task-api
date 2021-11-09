/*
  Warnings:

  - You are about to drop the column `description` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Task` DROP COLUMN `description`,
    ADD COLUMN `summary` VARCHAR(191) NOT NULL DEFAULT '';
