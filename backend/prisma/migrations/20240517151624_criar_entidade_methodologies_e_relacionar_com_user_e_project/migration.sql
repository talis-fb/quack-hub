-- CreateTable
CREATE TABLE "Methodologie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Methodologie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectMethodologie" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "methodologieId" INTEGER NOT NULL,

    CONSTRAINT "ProjectMethodologie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMethodologie" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "methodologieId" INTEGER NOT NULL,

    CONSTRAINT "UserMethodologie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMethodologie_projectId_methodologieId_key" ON "ProjectMethodologie"("projectId", "methodologieId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMethodologie_userId_methodologieId_key" ON "UserMethodologie"("userId", "methodologieId");

-- AddForeignKey
ALTER TABLE "ProjectMethodologie" ADD CONSTRAINT "ProjectMethodologie_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMethodologie" ADD CONSTRAINT "ProjectMethodologie_methodologieId_fkey" FOREIGN KEY ("methodologieId") REFERENCES "Methodologie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMethodologie" ADD CONSTRAINT "UserMethodologie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMethodologie" ADD CONSTRAINT "UserMethodologie_methodologieId_fkey" FOREIGN KEY ("methodologieId") REFERENCES "Methodologie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
