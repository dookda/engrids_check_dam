--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg110+1)
-- Dumped by pg_dump version 16.3

-- Started on 2024-08-17 17:38:54 +07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4280 (class 1262 OID 16384)
-- Name: geodb; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE geodb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE geodb OWNER TO postgres;

\connect geodb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 4281 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 17579)
-- Name: checkdam; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.checkdam (
    gid integer NOT NULL,
    cdname character varying(255) NOT NULL,
    cdcreator character varying(255) NOT NULL,
    cddetail text,
    cddate date,
    lat double precision,
    lng double precision,
    geom public.geometry(Point,4326),
    cdimage character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    userid text
);


ALTER TABLE public.checkdam OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17578)
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
-- TOC entry 4282 (class 0 OID 0)
-- Dependencies: 223
-- Name: checkdam_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.checkdam_gid_seq OWNED BY public.checkdam.gid;


--
-- TOC entry 222 (class 1259 OID 17498)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    gid integer NOT NULL,
    userid text NOT NULL,
    username text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17497)
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
-- TOC entry 4283 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_gid_seq OWNED BY public.users.gid;


--
-- TOC entry 4113 (class 2604 OID 17582)
-- Name: checkdam gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkdam ALTER COLUMN gid SET DEFAULT nextval('public.checkdam_gid_seq'::regclass);


--
-- TOC entry 4110 (class 2604 OID 17501)
-- Name: users gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN gid SET DEFAULT nextval('public.users_gid_seq'::regclass);


--
-- TOC entry 4274 (class 0 OID 17579)
-- Dependencies: 224
-- Data for Name: checkdam; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, lat, lng, geom, cdimage, created_at, userid) VALUES (1, 'ฝาย1', 'sakda', 'ทดสอบ', '2018-07-22', 18.938696515845233, 99.09226477146149, '0101000020E6100000000080AAE7C55840A76C346A4EF03240', 'uploads/1723890140358.jpeg', '2024-08-17 10:22:20.97676', 'Ue340022c2f6d6c989a3c4120991d90d1') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, lat, lng, geom, cdimage, created_at, userid) VALUES (2, 'ฝาย2', 'sakda', 'test', '2024-08-17', 18.931797368393763, 99.08189535140993, '0101000020E6100000010000C63DC5584005C0B7458AEE3240', 'uploads/1723890246927.png', '2024-08-17 10:24:07.000036', 'Ue340022c2f6d6c989a3c4120991d90d1') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, lat, lng, geom, cdimage, created_at, userid) VALUES (3, 'ฝาย3', 'sakda', 'ฝาย3', '2024-07-22', 18.985600920771365, 99.09024238586427, '0101000020E610000001000088C6C55840D99E895750FC3240', 'uploads/1723890283617.jpeg', '2024-08-17 10:24:44.45108', 'Ue340022c2f6d6c989a3c4120991d90d1') ON CONFLICT DO NOTHING;


--
-- TOC entry 4109 (class 0 OID 16703)
-- Dependencies: 217
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4272 (class 0 OID 17498)
-- Dependencies: 222
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (gid, userid, username, created_at, updated_at) VALUES (1, 'Ue340022c2f6d6c989a3c4120991d90d1', 'sakda.homhuan', '2024-08-16 09:17:43.045405', '2024-08-17 10:23:06.05675') ON CONFLICT DO NOTHING;


--
-- TOC entry 4284 (class 0 OID 0)
-- Dependencies: 223
-- Name: checkdam_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.checkdam_gid_seq', 3, true);


--
-- TOC entry 4285 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_gid_seq', 32, true);


--
-- TOC entry 4121 (class 2606 OID 17587)
-- Name: checkdam checkdam_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkdam
    ADD CONSTRAINT checkdam_pkey PRIMARY KEY (gid);


--
-- TOC entry 4119 (class 2606 OID 17507)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 4122 (class 2606 OID 17588)
-- Name: checkdam checkdam_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkdam
    ADD CONSTRAINT checkdam_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE SET NULL;


-- Completed on 2024-08-17 17:38:55 +07

--
-- PostgreSQL database dump complete
--

