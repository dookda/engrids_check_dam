--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg110+1)
-- Dumped by pg_dump version 17.0

-- Started on 2024-12-31 20:37:29 +07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4291 (class 1262 OID 16384)
-- Name: geodb; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE geodb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE geodb OWNER TO postgres;

\connect geodb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16385)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 4292 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 17463)
-- Name: checkdam; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.checkdam (
    gid integer NOT NULL,
    cdname character varying(255) NOT NULL,
    cdcreator character varying(255) NOT NULL,
    cddetail text,
    cddate date,
    cdtype text,
    lat double precision,
    lng double precision,
    geom public.geometry(Point,4326),
    cdimage character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    userid text
);


ALTER TABLE public.checkdam OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17469)
-- Name: checkdam_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.checkdam_gid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.checkdam_gid_seq OWNER TO postgres;

--
-- TOC entry 4293 (class 0 OID 0)
-- Dependencies: 222
-- Name: checkdam_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.checkdam_gid_seq OWNED BY public.checkdam.gid;


--
-- TOC entry 226 (class 1259 OID 17549)
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    gid integer NOT NULL,
    userid text,
    cdimage text,
    pathimage text,
    ts timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.images OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17548)
-- Name: images_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_gid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.images_gid_seq OWNER TO postgres;

--
-- TOC entry 4294 (class 0 OID 0)
-- Dependencies: 225
-- Name: images_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_gid_seq OWNED BY public.images.gid;


--
-- TOC entry 223 (class 1259 OID 17470)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    gid integer NOT NULL,
    userid text NOT NULL,
    username text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    auth text,
    fname text,
    lname text,
    mooban text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17477)
-- Name: users_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_gid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_gid_seq OWNER TO postgres;

--
-- TOC entry 4295 (class 0 OID 0)
-- Dependencies: 224
-- Name: users_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_gid_seq OWNED BY public.users.gid;


--
-- TOC entry 4115 (class 2604 OID 17478)
-- Name: checkdam gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkdam ALTER COLUMN gid SET DEFAULT nextval('public.checkdam_gid_seq'::regclass);


--
-- TOC entry 4120 (class 2604 OID 17552)
-- Name: images gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN gid SET DEFAULT nextval('public.images_gid_seq'::regclass);


--
-- TOC entry 4117 (class 2604 OID 17479)
-- Name: users gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN gid SET DEFAULT nextval('public.users_gid_seq'::regclass);


--
-- TOC entry 4280 (class 0 OID 17463)
-- Dependencies: 221
-- Data for Name: checkdam; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (17, 'da', 'da', 'aaa', '2024-12-30', 'ฝายคอกหมู', 16.7695743, 100.1983453, '0101000020E61000002E347CB0B10C5940935742D202C53040', 'm5b2nhe2', '2024-12-30 13:25:04.662884', 'Ue340022c2f6d6c989a3c4120991d90d1') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (18, 'poon', 'poon', 'poon', '2024-12-30', 'ฝายคอนกรีต', 16.741271133046165, 100.2986526489258, '0101000020E6100000010000201D135940F3E6E9F1C3BD3040', 'm5b2o481', '2024-12-30 13:25:34.245216', 'Ue340022c2f6d6c989a3c4120991d90d1') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (19, 'jikdaaaa', 'jikdaaaaa', 'jikdaaaa', '2024-12-30', 'ฝายปูนผสมดิน', 18.761496647967718, 99.0142822265625, '0101000020E610000000000000EAC05840F408BF71F1C23240', 'm5b2okry', '2024-12-30 13:25:55.682125', 'Ue340022c2f6d6c989a3c4120991d90d1') ON CONFLICT DO NOTHING;


--
-- TOC entry 4285 (class 0 OID 17549)
-- Dependencies: 226
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.images (gid, userid, cdimage, pathimage, ts) VALUES (1, 'Ue340022c2f6d6c989a3c4120991d90d1', 'm5b2nhe2', 'uploads/1735565104577.jpg', '2024-12-30 13:25:04.63972+00') ON CONFLICT DO NOTHING;
INSERT INTO public.images (gid, userid, cdimage, pathimage, ts) VALUES (2, 'Ue340022c2f6d6c989a3c4120991d90d1', 'm5b2o481', 'uploads/1735565134151.png', '2024-12-30 13:25:34.22407+00') ON CONFLICT DO NOTHING;
INSERT INTO public.images (gid, userid, cdimage, pathimage, ts) VALUES (3, 'Ue340022c2f6d6c989a3c4120991d90d1', 'm5b2okry', 'uploads/1735565256317.jpg', '2024-12-30 13:27:36.391743+00') ON CONFLICT DO NOTHING;
INSERT INTO public.images (gid, userid, cdimage, pathimage, ts) VALUES (4, 'Ue340022c2f6d6c989a3c4120991d90d1', 'm5b2okry', 'uploads/1735565289034.png', '2024-12-30 13:28:09.292543+00') ON CONFLICT DO NOTHING;
INSERT INTO public.images (gid, userid, cdimage, pathimage, ts) VALUES (5, 'Ue340022c2f6d6c989a3c4120991d90d1', 'm5b2okry', 'uploads/1735565572270.jpg', '2024-12-30 13:32:52.391844+00') ON CONFLICT DO NOTHING;
INSERT INTO public.images (gid, userid, cdimage, pathimage, ts) VALUES (6, 'Ue340022c2f6d6c989a3c4120991d90d1', 'm5b2okry', 'uploads/1735565714054.png', '2024-12-30 13:35:14.299776+00') ON CONFLICT DO NOTHING;
INSERT INTO public.images (gid, userid, cdimage, pathimage, ts) VALUES (7, 'Ue340022c2f6d6c989a3c4120991d90d1', 'm5b2okry', 'uploads/1735565951822.png', '2024-12-30 13:39:12.14025+00') ON CONFLICT DO NOTHING;


--
-- TOC entry 4114 (class 0 OID 16703)
-- Dependencies: 217
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4282 (class 0 OID 17470)
-- Dependencies: 223
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (1, 'Ue340022c2f6d6c989a3c4120991d90d1', 'sakda.homhuan', '2024-08-18 02:37:20.238971', '2024-12-31 13:36:32.800839', 'admin', 'dab', 'homhuan', '') ON CONFLICT DO NOTHING;


--
-- TOC entry 4296 (class 0 OID 0)
-- Dependencies: 222
-- Name: checkdam_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.checkdam_gid_seq', 19, true);


--
-- TOC entry 4297 (class 0 OID 0)
-- Dependencies: 225
-- Name: images_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_gid_seq', 7, true);


--
-- TOC entry 4298 (class 0 OID 0)
-- Dependencies: 224
-- Name: users_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_gid_seq', 85, true);


--
-- TOC entry 4126 (class 2606 OID 17481)
-- Name: checkdam checkdam_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkdam
    ADD CONSTRAINT checkdam_pkey PRIMARY KEY (gid);


--
-- TOC entry 4130 (class 2606 OID 17557)
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (gid);


--
-- TOC entry 4128 (class 2606 OID 17483)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 4131 (class 2606 OID 17484)
-- Name: checkdam checkdam_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkdam
    ADD CONSTRAINT checkdam_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE SET NULL;


-- Completed on 2024-12-31 20:37:30 +07

--
-- PostgreSQL database dump complete
--

