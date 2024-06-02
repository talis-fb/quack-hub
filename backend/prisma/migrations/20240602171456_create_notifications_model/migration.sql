-- CreateEnum
CREATE TYPE "NotificationBindType" AS ENUM ('TELEGRAM', 'EMAIL');

-- CreateTable
CREATE TABLE "NotificationBind" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "NotificationBindType" NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "NotificationBind_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NotificationBind" ADD CONSTRAINT "NotificationBind_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
