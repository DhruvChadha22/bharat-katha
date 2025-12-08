/*
  Warnings:

  - A unique constraint covering the columns `[name,voice,gender]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gender` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('Male', 'Female');

-- DropIndex
DROP INDEX "public"."Language_name_key";

-- AlterTable
ALTER TABLE "public"."Language" ADD COLUMN     "gender" "public"."Gender" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_voice_gender_key" ON "public"."Language"("name", "voice", "gender");
