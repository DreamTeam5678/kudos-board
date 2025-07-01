/*
  Warnings:

  - You are about to drop the column `description` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Card` table. All the data in the column will be lost.
  - Added the required column `author` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gifUrl` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "title",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "gifUrl" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0;
