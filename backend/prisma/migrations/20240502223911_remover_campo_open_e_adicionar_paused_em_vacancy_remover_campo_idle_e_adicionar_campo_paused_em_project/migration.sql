/*
  Warnings:

  - The values [IDLE] on the enum `StateProject` will be removed. If these variants are still used in the database, this will fail.
  - The values [OPEN,IN_SELECTION_PROCESS] on the enum `StateVacancy` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StateProject_new" AS ENUM ('PAUSED', 'PROGRESS', 'COMPLETED', 'CANCELLED');
ALTER TABLE "Project" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Project" ALTER COLUMN "state" TYPE "StateProject_new" USING ("state"::text::"StateProject_new");
ALTER TYPE "StateProject" RENAME TO "StateProject_old";
ALTER TYPE "StateProject_new" RENAME TO "StateProject";
DROP TYPE "StateProject_old";
ALTER TABLE "Project" ALTER COLUMN "state" SET DEFAULT 'PROGRESS';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StateVacancy_new" AS ENUM ('PAUSED', 'CLOSED', 'PROGRESS');
ALTER TABLE "Vacancy" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Vacancy" ALTER COLUMN "state" TYPE "StateVacancy_new" USING ("state"::text::"StateVacancy_new");
ALTER TYPE "StateVacancy" RENAME TO "StateVacancy_old";
ALTER TYPE "StateVacancy_new" RENAME TO "StateVacancy";
DROP TYPE "StateVacancy_old";
ALTER TABLE "Vacancy" ALTER COLUMN "state" SET DEFAULT 'PROGRESS';
COMMIT;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "state" SET DEFAULT 'PROGRESS';

-- AlterTable
ALTER TABLE "Vacancy" ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "state" SET DEFAULT 'PROGRESS';
