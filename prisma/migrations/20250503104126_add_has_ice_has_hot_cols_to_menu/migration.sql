-- AlterTable
ALTER TABLE "menus" ADD COLUMN     "has_hot" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "has_ice" BOOLEAN NOT NULL DEFAULT true;
