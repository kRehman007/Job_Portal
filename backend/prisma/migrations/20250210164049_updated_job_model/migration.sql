/*
  Warnings:

  - You are about to drop the column `category` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "category",
ADD COLUMN     "availabe_seats" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "companyLogo" TEXT,
ADD COLUMN     "experience" INTEGER;
