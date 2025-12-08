/*
  Warnings:

  - You are about to drop the column `content` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `OTP` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `transcript` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Story" DROP COLUMN "content",
ADD COLUMN     "transcript" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "token",
ADD COLUMN     "resetPwdToken" TEXT;

-- DropTable
DROP TABLE "public"."OTP";

-- CreateTable
CREATE TABLE "public"."Otp" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT (now() + interval '5 minutes'),

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);
