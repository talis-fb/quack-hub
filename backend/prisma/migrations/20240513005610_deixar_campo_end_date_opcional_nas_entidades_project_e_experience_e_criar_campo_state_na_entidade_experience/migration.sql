-- CreateEnum
CREATE TYPE "StateExperience" AS ENUM ('PAUSED', 'PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "state" "StateExperience" NOT NULL DEFAULT 'PROGRESS',
ALTER COLUMN "endDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "endDate" DROP NOT NULL;
