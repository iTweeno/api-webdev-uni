-- CreateEnum
CREATE TYPE "adtype" AS ENUM ('paid', 'internship', 'volunteering');

CREATE EXTENSION "uuid-ossp";

-- CreateEnum
CREATE TYPE "usertype" AS ENUM ('basic', 'admin');

-- CreateTable
CREATE TABLE "ad" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "salary" INTEGER NOT NULL,
    "currency" VARCHAR(255) NOT NULL,
    "last_time_updated" DATE NOT NULL,
    "amount_of_times_visited" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "owner" UUID NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "premium_until" DATE,
    "ad_type" "adtype" NOT NULL DEFAULT E'paid',

    CONSTRAINT "ad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "ad_id" UUID NOT NULL,
    "messenger" UUID NOT NULL,
    "receiver" UUID NOT NULL,
    "message_content" VARCHAR(255) NOT NULL,
    "sent_at" DATE NOT NULL,
    "edited" BOOLEAN NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_reporting" UUID NOT NULL,
    "ad_id" UUID NOT NULL,
    "message_content" VARCHAR(255) NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userr" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "birthday" DATE NOT NULL,
    "join_date" DATE NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "profile_picture" VARCHAR(255),
    "user_type" "usertype" NOT NULL DEFAULT E'basic',

    CONSTRAINT "userr_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userr_email_key" ON "userr"("email");

-- AddForeignKey
ALTER TABLE "ad" ADD CONSTRAINT "ad_owner_fkey" FOREIGN KEY ("owner") REFERENCES "userr"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_ad_id_fkey" FOREIGN KEY ("ad_id") REFERENCES "ad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_messenger_fkey" FOREIGN KEY ("messenger") REFERENCES "userr"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_receiver_fkey" FOREIGN KEY ("receiver") REFERENCES "userr"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_ad_id_fkey" FOREIGN KEY ("ad_id") REFERENCES "ad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_user_reporting_fkey" FOREIGN KEY ("user_reporting") REFERENCES "userr"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
