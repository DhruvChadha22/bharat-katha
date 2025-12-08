/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Otp` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Otp" ALTER COLUMN "expiresAt" SET DEFAULT (now() + interval '5 minutes');

-- CreateIndex
CREATE UNIQUE INDEX "Otp_email_key" ON "public"."Otp"("email");
