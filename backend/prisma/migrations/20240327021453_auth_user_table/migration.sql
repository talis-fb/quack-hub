/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";

-- CreateTable
CREATE TABLE "UserAuth" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "UserAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAuth_userId_key" ON "UserAuth"("userId");

-- AddForeignKey
ALTER TABLE "UserAuth" ADD CONSTRAINT "UserAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
