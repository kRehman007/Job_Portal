/*
  Warnings:

  - You are about to drop the column `fullName` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `gender` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "fullName",
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "resume" TEXT,
ADD COLUMN     "tagline" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fullName" TEXT NOT NULL;
