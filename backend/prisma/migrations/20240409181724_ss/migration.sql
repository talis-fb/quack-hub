-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_projectId_fkey";

-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
