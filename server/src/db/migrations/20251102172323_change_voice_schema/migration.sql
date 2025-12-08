/*
  Warnings:

  - You are about to drop the `Voices` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."VoiceType" AS ENUM ('Male', 'Female');

-- DropForeignKey
ALTER TABLE "public"."Voices" DROP CONSTRAINT "Voices_languageId_fkey";

-- DropTable
DROP TABLE "public"."Voices";

-- CreateTable
CREATE TABLE "public"."Voice" (
    "id" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "type" "public"."VoiceType" NOT NULL,

    CONSTRAINT "Voice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voice_type_languageId_key" ON "public"."Voice"("type", "languageId");

-- AddForeignKey
ALTER TABLE "public"."Voice" ADD CONSTRAINT "Voice_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
