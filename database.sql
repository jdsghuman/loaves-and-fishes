
CREATE TABLE "person"
(
    "id" serial NOT NULL,
    "name" varchar(300) NOT NULL,
    "username" varchar(300) NOT NULL UNIQUE, 
    "password" varchar(300) NOT NULL,
    "email" varchar(1000) NOT NULL,
    "last_location" integer,
    "status" BOOLEAN NOT NULL DEFAULT 'false',
    "new" BOOLEAN NOT NULL DEFAULT 'true',
    "admin" BOOLEAN NOT NULL DEFAULT 'false',
    CONSTRAINT person_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "location"
(
    "id" serial NOT NULL,
    "location_name" varchar(300) NOT NULL,
    "street_address" varchar(500) NOT NULL,
    "city" varchar(500) NOT NULL,
    "state" varchar(500) NOT NULL,
    "zip" integer NOT NULL,
    "county" varchar(500) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT 'true',
    "notes" varchar(1000),
    "updated_by" integer,
    "date_updated" TIMESTAMP,
    CONSTRAINT location_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "meal_outlet_category"
(
    "id" serial NOT NULL,
    "category_name" varchar(500) NOT NULL,
    "sub_category" integer,
    "notes" varchar(1000),
    "active" BOOLEAN NOT NULL DEFAULT 'true',
    "updated_by" integer,
    "date_updated" TIMESTAMP,
    CONSTRAINT meal_outlet_category_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "count"
(
    "id" serial NOT NULL,
    "meal_count" integer NOT NULL DEFAULT '1',
    "timestamp" DATE NOT NULL,
    "summer" BOOLEAN NOT NULL DEFAULT 'false',
    "farm" BOOLEAN NOT NULL DEFAULT 'false',
    "location_id" integer NOT NULL,
    "gender_id" integer,
    "race_id" integer,
    "age_id" integer,
    CONSTRAINT count_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "location_outlet"
(
    "id" serial NOT NULL,
    "location_id" integer NOT NULL,
    "outlet_id" integer NOT NULL,
    CONSTRAINT location_outlet_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "outlet_sub_category"
(
    "id" serial NOT NULL,
    "category_name" varchar(300) NOT NULL,
    CONSTRAINT outlet_sub_category_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "gender"
(
    "id" serial NOT NULL,
    "gender_name" varchar(500),
    CONSTRAINT gender_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "race"
(
    "id" serial NOT NULL,
    "race_name" varchar(500),
    CONSTRAINT race_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



CREATE TABLE "age"
(
    "id" serial NOT NULL,
    "age_category" varchar(500) NOT NULL,
    CONSTRAINT age_pk PRIMARY KEY ("id")
)
WITH (
  OIDS=FALSE
);



ALTER TABLE "person" ADD CONSTRAINT "person_fk0" FOREIGN KEY ("last_location") REFERENCES "location"("id");

ALTER TABLE "location" ADD CONSTRAINT "location_fk0" FOREIGN KEY ("updated_by") REFERENCES "person"("id");

ALTER TABLE "meal_outlet_category" ADD CONSTRAINT "meal_outlet_category_fk0" FOREIGN KEY ("sub_category") REFERENCES "outlet_sub_category"("id");
ALTER TABLE "meal_outlet_category" ADD CONSTRAINT "meal_outlet_category_fk1" FOREIGN KEY ("updated_by") REFERENCES "person"("id");

ALTER TABLE "count" ADD CONSTRAINT "count_fk0" FOREIGN KEY ("location_id") REFERENCES "location"("id");
ALTER TABLE "count" ADD CONSTRAINT "count_fk1" FOREIGN KEY ("gender_id") REFERENCES "gender"("id");
ALTER TABLE "count" ADD CONSTRAINT "count_fk2" FOREIGN KEY ("race_id") REFERENCES "race"("id");
ALTER TABLE "count" ADD CONSTRAINT "count_fk3" FOREIGN KEY ("age_id") REFERENCES "age"("id");

ALTER TABLE "location_outlet" ADD CONSTRAINT "location_outlet_fk0" FOREIGN KEY ("location_id") REFERENCES "location"("id");
ALTER TABLE "location_outlet" ADD CONSTRAINT "location_outlet_fk1" FOREIGN KEY ("outlet_id") REFERENCES "meal_outlet_category"("id");


INSERT INTO gender
    ("gender_name")
VALUES('Female'),
    ('Male'),
    ('Transgender'),
    ('Gender Unknown');


INSERT INTO race
    ("race_name")
VALUES('African'),
    ('African / American'),
    ('Native American / American Indian'),
    ('Asian / Pacific Islander'),
    ('Caucasian / White'),
    ('Hispanic / Latino'),
    ('Multi-racial'),
    ('Race Unknown');

INSERT INTO age
    ("age_category")
VALUES('Preschool (0-4)'),
    ('Child (5-12)'),
    ('Teen (13-19)'),
    ('Young Adult (20-25)'),
    ('Adult (26-54)'),
    ('Senior (55+)'),
    ('Age Unknown'),
    ('Generic Child'),
    ('Generic Adult');

INSERT INTO outlet_sub_category
    ("category_name")
VALUES('None');
    ('Open'),
    ('Closed');

INSERT INTO meal_outlet_category
    ("category_name")
VALUES('CACFP'),
    ('CMP'),
    ('HUB'),
    ('Produce Market'),
    ('Public Dining'),
    ('SFSP'),
    ('Street Outreach');