/*
  Warnings:

  - You are about to drop the column `name` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `names` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `names` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "name",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "names" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "names" TEXT NOT NULL,
ALTER COLUMN "hierarchyLevel" SET DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "Driver_email_key" ON "Driver"("email");
