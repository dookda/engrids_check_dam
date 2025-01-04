CREATE EXTENSION postgis;
CREATE TABLE public.users (
    gid serial NOT NULL PRIMARY KEY,
    userid text NOT NULL,
    username text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    auth text,
    fname text,
    lname text,
    mooban text
);

CREATE TABLE public.checkdam (
    gid serial NOT NULL PRIMARY KEY,
    userid text,
    cdname character varying(255) ,
    cdcreator character varying(255),
    cddetail text,
    cddate date,
    cdtype text,
    lat double precision,
    lng double precision,
    geom public.geometry(Point,4326),
    cdimage character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.images (
	gid serial NOT NULL PRIMARY KEY,
    userid text,
    cdimage text,
    pathimage text,
    ts timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);