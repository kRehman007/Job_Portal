-- CreateEnum
CREATE TYPE "JOBTYPE" AS ENUM ('Onsite', 'Remote', 'Hybrid');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "jobType" "JOBTYPE" NOT NULL DEFAULT 'Onsite';
