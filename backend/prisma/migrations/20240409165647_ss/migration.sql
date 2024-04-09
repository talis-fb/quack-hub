/*
  Warnings:

  - You are about to drop the column `experienceId` on the `Project` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_experienceId_fkey";

-- DropIndex
DROP INDEX "Project_experienceId_key";

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "experienceId";

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
