/*
  Warnings:

  - You are about to drop the column `gender` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `voice` on the `Language` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Language` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Language_name_voice_gender_key";

-- AlterTable
ALTER TABLE "public"."Language" DROP COLUMN "gender",
DROP COLUMN "voice";

-- DropEnum
DROP TYPE "public"."Gender";

-- CreateTable
CREATE TABLE "public"."Voice" (
    "id" TEXT NOT NULL,
    "male" TEXT NOT NULL,
    "female" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,

    CONSTRAINT "Voice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voice_languageId_key" ON "public"."Voice"("languageId");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "public"."Language"("name");

-- AddForeignKey
ALTER TABLE "public"."Voice" ADD CONSTRAINT "Voice_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
