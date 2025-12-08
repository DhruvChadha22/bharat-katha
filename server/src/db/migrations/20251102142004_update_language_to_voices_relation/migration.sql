/*
  Warnings:

  - You are about to drop the `Voice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Voice" DROP CONSTRAINT "Voice_languageId_fkey";

-- DropTable
DROP TABLE "public"."Voice";

-- CreateTable
CREATE TABLE "public"."Voices" (
    "id" TEXT NOT NULL,
    "male" TEXT NOT NULL,
    "female" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,

    CONSTRAINT "Voices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voices_languageId_key" ON "public"."Voices"("languageId");

-- AddForeignKey
ALTER TABLE "public"."Voices" ADD CONSTRAINT "Voices_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
