-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "companyEmail" TEXT NOT NULL DEFAULT 'unknown@example.com',
ADD COLUMN     "companyName" TEXT NOT NULL DEFAULT 'Unknown Company';
