/*
  Warnings:

  - You are about to drop the column `experienceId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_experienceId_fkey";

-- DropIndex
DROP INDEX "Project_experienceId_key";

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "projectId" INTEGER;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "experienceId";

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
