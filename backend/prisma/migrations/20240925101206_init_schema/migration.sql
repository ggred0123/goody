-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "city_id" INTEGER,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthday" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "host_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "max_people" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_join" (
    "id" SERIAL NOT NULL,
    "event_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_join_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "event_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" SERIAL NOT NULL,
    "region_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "event_join_event_id_user_id_key" ON "event_join"("event_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "review_event_id_user_id_key" ON "review"("event_id", "user_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_join" ADD CONSTRAINT "event_join_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_join" ADD CONSTRAINT "event_join_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

------- 아래로는 직접 작성한 기본 데이터 추가 쿼리입니다 -------

-- 카테고리 기본 데이터 추가
INSERT INTO "category" ("name") VALUES
                                    ('요리'), ('파티'), ('독서'), ('러닝'), ('등산'),
                                    ('축구'), ('영화'), ('보드게임'), ('공연'), ('게임'),
                                    ('출사'), ('캠핑'), ('DIY'), ('자전거'), ('낚시'),
                                    ('스터디'), ('외국어'), ('카페투어'), ('명상'), ('요가'),
                                    ('공예'), ('댄스'), ('뮤지컬'), ('봉사활동'), ('창업/스타트업'),
                                    ('비즈니스'), ('친목'), ('여행'), ('연애/소개팅'), ('맛집투어');

-- 지역(특별시/광역시/도) 기본 데이터 추가
INSERT INTO "region" ("name") VALUES ('서울특별시'), ('부산광역시'), ('대구광역시'), ('인천광역시'), ('광주광역시'), ('대전광역시'), ('울산광역시'), ('세종특별자치시'), ('경기도'), ('강원도'), ('충청북도'), ('충청남도'), ('전라북도'), ('전라남도'), ('경상북도'), ('경상남도'), ('제주특별자치도');

-- 지역(시/군/구) 기본 데이터 추가
INSERT INTO "city" ("name", "region_id") VALUES ('종로구', 1), ('중구', 1), ('용산구', 1), ('성동구', 1), ('광진구', 1), ('동대문구', 1), ('중랑구', 1), ('성북구', 1), ('강북구', 1), ('도봉구', 1), ('노원구', 1), ('은평구', 1), ('서대문구', 1), ('마포구', 1), ('양천구', 1), ('강서구', 1), ('구로구', 1), ('금천구', 1), ('영등포구', 1), ('동작구', 1), ('관악구', 1), ('서초구', 1), ('강남구', 1), ('송파구', 1), ('강동구', 1);

INSERT INTO "city" ("name", "region_id") VALUES ('중구', 2), ('서구', 2), ('동구', 2), ('영도구', 2), ('부산진구', 2), ('동래구', 2), ('남구', 2), ('북구', 2), ('해운대구', 2), ('사하구', 2), ('금정구', 2), ('강서구', 2), ('연제구', 2), ('수영구', 2), ('사상구', 2), ('기장군', 2);

INSERT INTO "city" ("name", "region_id") VALUES ('중구', 3), ('동구', 3), ('서구', 3), ('남구', 3), ('북구', 3), ('수성구', 3), ('달서구', 3), ('달성군', 3);

INSERT INTO "city" ("name", "region_id") VALUES ('중구', 4), ('동구', 4), ('미추홀구', 4), ('연수구', 4), ('남동구', 4), ('부평구', 4), ('계양구', 4), ('서구', 4), ('강화군', 4), ('옹진군', 4);

INSERT INTO "city" ("name", "region_id") VALUES ('동구', 5), ('서구', 5), ('남구', 5), ('북구', 5), ('광산구', 5);

INSERT INTO "city" ("name", "region_id") VALUES ('동구', 6), ('중구', 6), ('서구', 6), ('유성구', 6), ('대덕구', 6);

INSERT INTO "city" ("name", "region_id") VALUES ('중구', 7), ('남구', 7), ('동구', 7), ('북구', 7), ('울주군', 7);

INSERT INTO "city" ("name", "region_id") VALUES ('세종특별자치시', 8);

INSERT INTO "city" ("name", "region_id") VALUES ('수원시', 9), ('성남시', 9), ('의정부시', 9), ('안양시', 9), ('부천시', 9), ('광명시', 9), ('평택시', 9), ('동두천시', 9), ('안산시', 9), ('고양시', 9), ('과천시', 9), ('구리시', 9), ('남양주시', 9), ('오산시', 9), ('시흥시', 9), ('군포시', 9), ('의왕시', 9), ('하남시', 9), ('용인시', 9), ('파주시', 9), ('이천시', 9), ('안성시', 9), ('김포시', 9), ('화성시', 9), ('광주시', 9), ('양주시', 9), ('포천시', 9), ('여주시', 9), ('연천군', 9), ('가평군', 9), ('양평군', 9);

INSERT INTO "city" ("name", "region_id") VALUES ('춘천시', 10), ('원주시', 10), ('강릉시', 10), ('동해시', 10), ('태백시', 10), ('속초시', 10), ('삼척시', 10), ('홍천군', 10), ('횡성군', 10), ('영월군', 10), ('평창군', 10), ('정선군', 10), ('철원군', 10), ('화천군', 10), ('양구군', 10), ('인제군', 10), ('고성군', 10), ('양양군', 10);

INSERT INTO "city" ("name", "region_id") VALUES ('청주시', 11), ('충주시', 11), ('제천시', 11), ('보은군', 11), ('옥천군', 11), ('영동군', 11), ('진천군', 11), ('괴산군', 11), ('음성군', 11), ('단양군', 11), ('증평군', 11);

INSERT INTO "city" ("name", "region_id") VALUES ('천안시', 12), ('공주시', 12), ('보령시', 12), ('아산시', 12), ('서산시', 12), ('논산시', 12), ('계룡시', 12), ('당진시', 12), ('금산군', 12), ('부여군', 12), ('서천군', 12), ('청양군', 12), ('홍성군', 12), ('예산군', 12), ('태안군', 12);

INSERT INTO "city" ("name", "region_id") VALUES ('전주시', 13), ('군산시', 13), ('익산시', 13), ('정읍시', 13), ('남원시', 13), ('김제시', 13), ('완주군', 13), ('진안군', 13), ('무주군', 13), ('장수군', 13), ('임실군', 13), ('순창군', 13), ('고창군', 13), ('부안군', 13);

INSERT INTO "city" ("name", "region_id") VALUES ('목포시', 14), ('여수시', 14), ('순천시', 14), ('나주시', 14), ('광양시', 14), ('담양군', 14), ('곡성군', 14), ('구례군', 14), ('고흥군', 14), ('보성군', 14), ('화순군', 14), ('장흥군', 14), ('강진군', 14), ('해남군', 14), ('영암군', 14), ('무안군', 14), ('함평군', 14), ('영광군', 14), ('장성군', 14), ('완도군', 14), ('진도군', 14), ('신안군', 14);

INSERT INTO "city" ("name", "region_id") VALUES ('포항시', 15), ('경주시', 15), ('김천시', 15), ('안동시', 15), ('구미시', 15), ('영주시', 15), ('영천시', 15), ('상주시', 15), ('문경시', 15), ('경산시', 15), ('군위군', 15), ('의성군', 15), ('청송군', 15), ('영양군', 15), ('영덕군', 15), ('청도군', 15), ('고령군', 15), ('성주군', 15), ('칠곡군', 15), ('예천군', 15), ('봉화군', 15), ('울진군', 15), ('울릉군', 15);

INSERT INTO "city" ("name", "region_id") VALUES ('창원시', 16), ('진주시', 16), ('통영시', 16), ('사천시', 16), ('김해시', 16), ('밀양시', 16), ('거제시', 16), ('양산시', 16), ('의령군', 16), ('함안군', 16), ('창녕군', 16), ('고성군', 16), ('남해군', 16), ('하동군', 16), ('산청군', 16), ('함양군', 16), ('거창군', 16), ('합천군', 16);

INSERT INTO "city" ("name", "region_id") VALUES ('제주시', 17), ('서귀포시', 17);

-- city, region, category 테이블의 updated_at 컬럼의 default 값 설정 삭제
ALTER TABLE "city" ALTER COLUMN "updated_at" DROP DEFAULT;
ALTER TABLE "region" ALTER COLUMN "updated_at" DROP DEFAULT;
ALTER TABLE "category" ALTER COLUMN "updated_at" DROP DEFAULT;