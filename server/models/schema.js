import db from '../db/index';

const tableSchema = `
    DROP TABLE IF EXISTS users CASCADE;

    DROP TABLE IF EXISTS requests;

    DROP TABLE IF EXISTS companies CASCADE;

    CREATE TABLE "users" (
        "userid" serial NOT NULL,
        "companyid" integer NOT NULL,
        "username" TEXT NOT NULL UNIQUE,
        "email" TEXT NOT NULL UNIQUE,
        "fullname" TEXT,
        "jobtitle" TEXT,
        "role" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        CONSTRAINT users_pk PRIMARY KEY ("userid")
    ) WITH (
    OIDS=FALSE
    );



    CREATE TABLE "requests" (
        "requestid" serial NOT NULL UNIQUE,
        "userid" integer NOT NULL,
        "reqtitle" TEXT NOT NULL,
        "reqdetails" TEXT NOT NULL,
        "createdat" TIMESTAMP NOT NULL,
        "lastupdated" TIMESTAMP NOT NULL
    ) WITH (
    OIDS=FALSE
    );



    CREATE TABLE "companies" (
        "companyid" serial NOT NULL,
        "companyname" TEXT NOT NULL UNIQUE,
        CONSTRAINT company_pk PRIMARY KEY ("companyid")
    ) WITH (
    OIDS=FALSE
    );



    ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("companyid") REFERENCES "companies"("companyid");

    ALTER TABLE "requests" ADD CONSTRAINT "requests_fk0" FOREIGN KEY ("userid") REFERENCES "users"("userid");
`;
db.query(tableSchema, (err) => {
  if (err) {
    throw (err);
  }
});
