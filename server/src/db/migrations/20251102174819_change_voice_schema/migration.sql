/*
  Warnings:

  - A unique constraint covering the columns `[languageId,type]` on the table `Voice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Voice` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Voice_type_languageId_key";

-- AlterTable
ALTER TABLE "public"."Voice" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Voice_languageId_type_key" ON "public"."Voice"("languageId", "type");
