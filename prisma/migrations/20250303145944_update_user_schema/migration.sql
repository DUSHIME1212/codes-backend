/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `Child` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Child" DROP COLUMN "phoneNumber";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneNumber" TEXT;
