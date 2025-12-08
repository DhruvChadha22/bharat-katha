/*
  Warnings:

  - Added the required column `audioId` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Story" ADD COLUMN     "audioId" TEXT NOT NULL,
ADD COLUMN     "imageId" TEXT NOT NULL;
