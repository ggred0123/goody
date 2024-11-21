/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `birthday` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `city_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `city` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_join` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `region` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_region_id_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_category_id_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_city_id_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_host_id_fkey";

-- DropForeignKey
ALTER TABLE "event_join" DROP CONSTRAINT "event_join_event_id_fkey";

-- DropForeignKey
ALTER TABLE "event_join" DROP CONSTRAINT "event_join_user_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_event_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_city_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "birthday",
DROP COLUMN "city_id",
DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "updated_at",
ADD COLUMN     "profile_image" TEXT,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("user_id");

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "city";

-- DropTable
DROP TABLE "event";

-- DropTable
DROP TABLE "event_join";

-- DropTable
DROP TABLE "region";

-- DropTable
DROP TABLE "review";

-- CreateTable
CREATE TABLE "activity" (
    "activity_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("activity_id")
);

-- CreateTable
CREATE TABLE "keyword" (
    "keyword_id" INTEGER NOT NULL,
    "keyword_name" TEXT NOT NULL,

    CONSTRAINT "keyword_pkey" PRIMARY KEY ("keyword_id")
);

-- CreateTable
CREATE TABLE "activity_keywords" (
    "activity_id" INTEGER NOT NULL,
    "keyword_id" INTEGER NOT NULL,

    CONSTRAINT "activity_keywords_pkey" PRIMARY KEY ("activity_id","keyword_id")
);

-- CreateTable
CREATE TABLE "activity_location" (
    "location_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "activity_location_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "user_location" (
    "user_location_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "user_location_pkey" PRIMARY KEY ("user_location_id")
);

-- CreateTable
CREATE TABLE "recommendations" (
    "recommendation_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "user_location_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recommendations_pkey" PRIMARY KEY ("recommendation_id")
);

-- CreateTable
CREATE TABLE "recent_activity" (
    "recent_activity_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "viewed_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recent_activity_pkey" PRIMARY KEY ("recent_activity_id")
);

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_keywords" ADD CONSTRAINT "activity_keywords_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activity"("activity_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_keywords" ADD CONSTRAINT "activity_keywords_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "keyword"("keyword_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_location" ADD CONSTRAINT "user_location_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "activity_location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_user_location_id_fkey" FOREIGN KEY ("user_location_id") REFERENCES "user_location"("user_location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recent_activity" ADD CONSTRAINT "recent_activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recent_activity" ADD CONSTRAINT "recent_activity_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activity"("activity_id") ON DELETE RESTRICT ON UPDATE CASCADE;
