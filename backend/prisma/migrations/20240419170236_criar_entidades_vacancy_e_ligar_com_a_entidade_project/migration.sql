-- CreateEnum
CREATE TYPE "StateVacancy" AS ENUM ('OPEN', 'CLOSED', 'IN_SELECTION_PROCESS');

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "state" "StateVacancy" NOT NULL DEFAULT 'OPEN',
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
