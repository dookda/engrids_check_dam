--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg110+2)
-- Dumped by pg_dump version 17.0

-- Started on 2025-01-01 21:49:18 +07

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
-- TOC entry 4291 (class 1262 OID 16384)
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
-- TOC entry 226 (class 1259 OID 17504)
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
-- TOC entry 225 (class 1259 OID 17503)
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
-- TOC entry 4120 (class 2604 OID 17507)
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

INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (6, 'aa', 'aa', '', '2024-04-16', 'ฝายไม้แกนดิน', 19.069505789658155, 99.01702880859375, '0101000020E61000000000000017C15840E576A521CB113340', 'uploads/1723954820853.jpeg', '2024-08-18 04:20:22.093486', 'Ue340022c2f6d6c989a3c4120991d90d1') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (9, 'test', 'test', '', '2024-12-24', 'ฝายไม้', 18.896217579021847, 99.18297860146204, '0101000020E61000006D49E1EBB5CB5840C7FFE7836EE53240', NULL, '2024-12-24 02:57:43.788201', 'Ue340022c2f6d6c989a3c4120991d90d1') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (10, '', '', '', '2024-12-24', 'ฝายไม้', 18.91792981423884, 99.1349450999308, '0101000020E610000054BDC5F0A2C85840DE2DC472FDEA3240', NULL, '2024-12-24 03:22:18.821604', 'Uc1851e3fade0e4fecfd9573da743004f') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (11, 'บ้านอาจารย์ยนต์', 'กำนันทูลย์', 'ห้วยดอกแดง', '2024-12-24', 'ฝายคอกหมู', 18.896233796073155, 99.18295910949156, '0101000020E610000061F11F9AB5CB584042B4FB936FE53240', 'uploads/1735010844686.jpg', '2024-12-24 03:27:24.70858', 'Ud282ab7bf6b184f78134fe4d180f5250') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (12, 'หมู่4 ต ป่าเมี่งห้วยข้าวหลาม', 'อุ่นเรือน', '', '2024-12-24', 'ฝายคอกหมู', 18.89401798717924, 99.18225242885444, '0101000020E6100000F8621706AACB584078F8E05CDEE43240', NULL, '2024-12-24 03:29:20.848449', 'Ud315d6d100c2a27bd63b64519c40e21a') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (13, 'K2', 'Khem', '', '2024-12-24', 'ฝายไม้', 18.89557913356342, 99.18171644210817, '0101000020E61000000100003EA1CB584089A291AC44E53240', NULL, '2024-12-24 03:29:41.143703', 'U8e2df074074bb0f3e8463649f2fde1da') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (14, 'K1', 'K', '', '2024-12-24', 'ฝายไม้', 18.895651430071027, 99.18185010546952, '0101000020E610000002F19F6EA3CB58404CC5806949E53240', NULL, '2024-12-24 03:41:01.896344', 'U8e2df074074bb0f3e8463649f2fde1da') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (15, 'ปางไฮ 1', 'สิริโชค', '', '2024-12-24', 'ฝายหินเรียงแกนดิน', 18.93087222303439, 99.32768378935295, '0101000020E6100000D1AC6DC5F8D4584002B05AA44DEE3240', NULL, '2024-12-24 03:42:56.59798', 'U73a0f8c6314014a8e44dd27d33508b48') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (16, 'ปางไฮ 1', 'สิริโชค', '', '2024-12-24', 'ฝายหินเรียงแกนดิน', 18.93087222303439, 99.32768378935295, '0101000020E6100000D1AC6DC5F8D4584002B05AA44DEE3240', NULL, '2024-12-24 03:42:58.038112', 'U73a0f8c6314014a8e44dd27d33508b48') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (17, 'ดั้งเดิม แม่ฮ่องไคร้ ห้วยหอ', 'ป่าชุมชน CSRแม่ฟ้าหลวง', 'สร้างปี 66', '2024-12-24', 'ฝายคอนกรีตเสริมเหล็ก', 18.829464440827884, 99.20579195022584, '0101000020E6100000010000B22BCD5840FA8C16C857D43240', 'uploads/1735012291930.jpeg', '2024-12-24 03:51:31.940098', 'Ucd982b8de25e427682fe8296876a5a26') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (18, 'เฉลิมพระเกียรติ โป่งกุม', 'บ้านโป่งกุ่ม', '', '2024-12-24', 'ฝายไม้', 18.9009009009009, 99.18591609647618, '0101000020E6100000928AA00CE6CB58406A4E0271A1E63240', NULL, '2024-12-24 04:00:26.560879', 'U51ec632abed8aa38288a8e758d3f5e17') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (19, '', '', '', '2024-12-24', 'ฝายไม้', 18.8965552568612, 99.1828356208148, '0101000020E610000061FC2C94B3CB5840964633A584E53240', 'uploads/1735013095851.jpg', '2024-12-24 04:04:55.888876', 'U4f8a3f95e0e5e61f4b1b2e08e4be177f') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (20, '', '', '', '2024-12-24', 'ฝายไม้', 18.8962229, 99.1829767, '0101000020E6100000859BE7E3B5CB5840216D2DDD6EE53240', 'uploads/1735013244165.jpg', '2024-12-24 04:07:24.226843', 'Udb7137a8ca8a8704b51f429854eea899') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (21, '', '', '', '2024-12-24', 'ฝายไม้', 18.8962229, 99.1829767, '0101000020E6100000859BE7E3B5CB5840216D2DDD6EE53240', 'uploads/1735013245702.jpg', '2024-12-24 04:07:25.746109', 'Udb7137a8ca8a8704b51f429854eea899') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (22, 'เฉลิมพระเกียรติ บ้านแม่ตอน ห้วนหาน2', 'บ้านแม่ตอน', 'กว้าว 1.5 เมตร ยาว 3 เมตร', '2024-12-24', 'ฝายไม้แกนดิน', 18.8963313, 99.1829245, '0101000020E6100000C748F608B5CB584094E1D3F775E53240', 'uploads/1735013303061.jpg', '2024-12-24 04:08:23.110905', 'Ucca8a3cf292ff84fcf7de2e3da4350d5') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (23, '', '', '', '2024-12-24', 'ฝายไม้', 18.895966652142075, 99.18284039169006, '0101000020E610000096AC2FA8B3CB5840BF410D125EE53240', NULL, '2024-12-24 04:10:46.813432', 'U3456c77c33b012cca9ed778fb0cbe599') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (24, '', '', '', '2024-12-24', 'ฝายไม้', 18.896239, 99.1829323, '0101000020E61000007478AD29B5CB584056664AEB6FE53240', NULL, '2024-12-24 04:11:55.023114', 'U78da97c1f060fddf9b804c267c61c715') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (25, 'เฉลิมพระเกียรติ บ้านกำแพงหิน ห้วยแม่หวาน', 'บ้านกำแพงหิน', 'ขนาดฝาย กว้าง 2 เมตร สูง 1.5 เมตร', '2024-12-24', 'ฝายไม้แกนดิน', 18.8963019, 99.1829406, '0101000020E610000014877D4CB5CB5840B9D7930A74E53240', 'uploads/1735013515570.jpg', '2024-12-24 04:11:55.624572', 'U92a0efe631d8fc0d58aecb88ad159f99') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (26, 'เฉลิมพระเกียรติ บ้านน้ำโค้ง/ห้วยหลวง', 'บ้านน้ำโค้ง', 'กว้าง 2 สูง 1.5', '2024-12-24', 'ฝายไม้', 18.8963273, 99.182936, '0101000020E6100000B5503239B5CB58401103B8B475E53240', 'uploads/1735013551566.jpg', '2024-12-24 04:12:31.618836', 'U57dc63f13ad8b39fecf7659099f8f34e') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (27, '', '', '', '2024-12-24', 'ฝายไม้', 18.8963318, 99.1829312, '0101000020E6100000C15A1025B5CB5840645D370076E53240', NULL, '2024-12-24 04:12:34.984384', 'Udb7137a8ca8a8704b51f429854eea899') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (28, 'เฉลิมพระเกียรติ บ้านปางบง คลองมะเกลี้ยง', 'บ้านปางบง', 'ฝายทำด้วยไม้ ขนาด กว้าง 2 เมตร สูง 1.5 เมตร', '2024-12-24', 'ฝายไม้', 18.896244549951426, 99.18306601110861, '0101000020E61000001FAE805AB7CB58407642674870E53240', 'uploads/1735013580359.jpeg', '2024-12-24 04:13:00.393359', 'Ue6e1f22254c1f7ea434e019adecf0c93') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (29, 'เฉลิมพระเกียรติ บ้านปางบง คลองมะเกลี้ยง', 'บ้านปางบง', 'ฝายทำด้วยไม้ ขนาด กว้าง 2 เมตร สูง 1.5 เมตร', '2024-12-24', 'ฝายไม้', 18.896244549951426, 99.18306601110861, '0101000020E61000001FAE805AB7CB58407642674870E53240', 'uploads/1735013587733.jpeg', '2024-12-24 04:13:07.750524', 'Ue6e1f22254c1f7ea434e019adecf0c93') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (30, 'เฉลิมพระเกียรติ บ้านแม่ตอน ห้วยหาน3', 'บ้านแม่ตอน', 'กว้าง 1.5 เมตร ยาว 3เมตร', '2024-12-24', 'ฝายไม้', 18.8962571, 99.1829503, '0101000020E6100000C7D22C75B5CB5840CC4EF51A71E53240', 'uploads/1735013681990.jpg', '2024-12-24 04:14:42.014247', 'U78da97c1f060fddf9b804c267c61c715') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (32, 'เฉลิมพระเกียรติ บ้านแม่หวาน ห้วยทราย1', 'บ้านแม่หวานหมู่ 3 ', 'กว้าง 3 เมตร  ยาว 5 เมตร สูง 1.2 เมตร', '2024-12-24', 'ฝายไม้แกนดิน', 18.8962249, 99.182935, '0101000020E6100000CD920035B5CB5840625CBBFE6EE53240', 'uploads/1735014096355.jpg', '2024-12-24 04:21:36.411367', 'U48458c3353c5d51e75eef8965c1792c7') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (33, 'ปางน้ำถุ ห้วย1', 'บ้านปางน้ำถุ', '3 เมตร', '2024-12-24', 'ฝายหินก่อ', 18.896276707413804, 99.18293862633077, '0101000020E610000003513644B5CB58404482EA6372E53240', 'uploads/1735014102232.jpeg', '2024-12-24 04:21:42.294725', 'Uc10114956901348f5905e97eacea2c6e') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (34, 'เฉลิมพระเกียรติอยู่บ้านพงษ์ทอง 2', 'บ้านพงษ์ทอง', '', '2024-12-24', 'ฝายไม้แกนดิน', 18.8963097, 99.1829269, '0101000020E6100000C1430713B5CB58406B96708D74E53240', NULL, '2024-12-24 04:24:12.872453', 'U14fe24592e6e29fa2152236f5ac1e76c') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (35, 'เฉลิมพระเกียรติหงษ์ทอง หมู่ 5', 'หงษ์ทอง', 'รายละเอียดเพิ่มเติม 3 × 3 เมตร', '2024-12-24', 'ฝายไม้', 18.9149846457989, 99.13696970726902, '0101000020E6100000D750971CC4C85840650C0A6F3CEA3240', 'uploads/1735014285986.png', '2024-12-24 04:24:45.98804', 'Uc1851e3fade0e4fecfd9573da743004f') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (36, 'บ้านปางไฮ ห้วยแม่วอง', 'ป่าขุนแม่กวง', '', '2024-12-24', 'ฝายหินก่อ', 18.922199595275565, 99.32491744931338, '0101000020E6100000D8AC8E72CBD45840CE17CE4515EC3240', NULL, '2024-12-24 04:27:22.999203', 'U794cb31c3d1d0564a18c6392ccf777c6') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (37, 'บ้านป่าสักงาม ห้วยเต๋ย', 'ห้วยฮ่องไคร้', 'ปูน หิน ทราย', '2024-12-24', 'ฝายหินก่อ', 19.007370785313068, 99.1360330581665, '0101000020E6100000000000C4B4C858408FDD410DE3013340', 'uploads/1735014518329.jpeg', '2024-12-24 04:28:38.354161', 'Ub4b73a8fed92e3d11eb72ef758dc0071') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (38, 'บ้านปางไฮ ห้วยแม่วอง', 'ป่าขุนแม่กวง', '', '2024-07-22', 'ฝายหินก่อ', 18.92249145979911, 99.32482149842346, '0101000020E61000000E311CE0C9D458402EAD7A6628EC3240', NULL, '2024-12-24 04:29:12.83547', 'U794cb31c3d1d0564a18c6392ccf777c6') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (39, 'เฉลิมพระเกียรติบ้านพงษ์ทอง', 'บ้านพงษ์ทอง', '3*3เมตร', '2024-12-24', 'ฝายไม้แกนดิน', 18.8962199, 99.1829565, '0101000020E6100000CD052E8FB5CB58403E86D8AA6EE53240', 'uploads/1735014557132', '2024-12-24 04:29:17.17208', 'U14fe24592e6e29fa2152236f5ac1e76c') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (40, '', '', '', '2024-12-24', 'ฝายไม้', 18.8965552568612, 99.1828356208148, '0101000020E610000061FC2C94B3CB5840964633A584E53240', 'uploads/1735014661007.jpg', '2024-12-24 04:31:01.043528', 'U4f8a3f95e0e5e61f4b1b2e08e4be177f') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (41, '', '', '', '2024-12-24', 'ฝายไม้', 18.8965552568612, 99.1828356208148, '0101000020E610000061FC2C94B3CB5840964633A584E53240', 'uploads/1735014662200.jpg', '2024-12-24 04:31:02.234555', 'U4f8a3f95e0e5e61f4b1b2e08e4be177f') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (42, '', '', '', '2024-12-24', 'ฝายไม้', 18.89635163960262, 99.18291892682329, '0101000020E6100000A12196F1B4CB58402ACF114D77E53240', 'uploads/1735014678520.jpg', '2024-12-24 04:31:18.571618', 'U4f8a3f95e0e5e61f4b1b2e08e4be177f') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (43, '', '', '', '2024-12-24', 'ฝายไม้', 18.896344654643716, 99.18291324713273, '0101000020E61000002D9CC3D9B4CB5840A1A3E1D776E53240', 'uploads/1735014679173.jpg', '2024-12-24 04:31:19.214282', 'U4f8a3f95e0e5e61f4b1b2e08e4be177f') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (44, '', '', '', '2024-12-24', 'ฝายไม้', 18.896344654643716, 99.18291324713273, '0101000020E61000002D9CC3D9B4CB5840A1A3E1D776E53240', 'uploads/1735014679697.jpg', '2024-12-24 04:31:19.730906', 'U4f8a3f95e0e5e61f4b1b2e08e4be177f') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (45, '', '', '', '2024-12-24', 'ฝายไม้', 18.896344654643716, 99.18291324713273, '0101000020E61000002D9CC3D9B4CB5840A1A3E1D776E53240', 'uploads/1735014681207.jpg', '2024-12-24 04:31:21.246856', 'U4f8a3f95e0e5e61f4b1b2e08e4be177f') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (46, '', '', '', '2024-12-24', 'ฝายไม้', 18.896331687798128, 99.18291606148972, '0101000020E6100000BC8091E5B4CB5840217655FE75E53240', 'uploads/1735014686948.jpg', '2024-12-24 04:31:26.990628', 'U4f8a3f95e0e5e61f4b1b2e08e4be177f') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (47, '', '', '', '2024-12-24', 'ฝายไม้', 18.896331687798128, 99.18291606148972, '0101000020E6100000BC8091E5B4CB5840217655FE75E53240', 'uploads/1735014690030.jpg', '2024-12-24 04:31:30.101086', 'U4f8a3f95e0e5e61f4b1b2e08e4be177f') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (48, '', '', '', '2024-12-24', 'ฝายไม้', 19.04125679106969, 99.03041839599611, '0101000020E610000001000060F2C15840D96118CE8F0A3340', NULL, '2024-12-24 04:33:08.102818', 'Uf6f4358c04b3e4c8d45fb903f1494b4a') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (49, 'ปางแฟน ห้วยพระสิงห์', 'ผช.ธีรนุช', 'ฝายเฉลิมพระเกียรติ', '2024-12-24', 'ฝายไม้', 18.8962854, 99.1828248, '0101000020E61000007539CA66B3CB5840DDE1C0F572E53240', 'uploads/1735014804473.jpg', '2024-12-24 04:33:24.489123', 'Ud282ab7bf6b184f78134fe4d180f5250') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (50, 'ฝายเฉลิมพระเกียรติ บ้านโป่งสามัคคี 1', 'ชาวบ้านโป่งสามัคคี', '', '2024-12-24', 'ฝายไม้', 18.90512431534585, 99.25057411193849, '0101000020E61000000100006809D058408E39253AB6E73240', 'uploads/1735014975705.jpeg', '2024-12-24 04:36:15.739354', 'U007cb1fb73e581b4a7b709169ebb462b') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (51, 'ปางแฟน 02', 'เพชร', 'ฝายเฉลิมพระเกียรติ', '2024-12-24', 'ฝายไม้', 18.89165662876793, 99.18442887070798, '0101000020E61000004108C0AECDCB5840E3D1DB9B43E43240', 'uploads/1735014990126.jpg', '2024-12-24 04:36:30.154408', 'Ud282ab7bf6b184f78134fe4d180f5250') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (52, 'บ้านปางไฮหว้ยแม่วอง', 'บ้านปางไฮ/ป่าขุนแม่กวง', '', '2024-12-24', 'ฝายหินก่อ', 18.922597381273633, 99.32473912298018, '0101000020E61000009F3B9A86C8D458400CF28B572FEC3240', NULL, '2024-12-24 04:37:01.366629', 'U794cb31c3d1d0564a18c6392ccf777c6') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (53, 'บ้านปางไฮห้วยแม่วอง', 'หม่บ้าน/ป่าขุนแม่กวง', '', '2024-07-22', 'ฝายหินก่อ', 18.922597381273633, 99.32473912298018, '0101000020E61000009F3B9A86C8D458400CF28B572FEC3240', NULL, '2024-12-24 04:38:19.65875', 'U794cb31c3d1d0564a18c6392ccf777c6') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (54, 'บ้านปางไฮห้วยแม่วอง', 'ผู้ใหญ่บ้าน+ป่าขุนแม่กวง', 'ฝายก่อหินกว้าง8.60 เมตร ปี63', '2024-12-24', 'ฝายหินก่อ', 18.92280667979295, 99.32133041211007, '0101000020E610000045CE6EAD90D45840B63DFE0E3DEC3240', NULL, '2024-12-24 04:47:32.445609', 'U794cb31c3d1d0564a18c6392ccf777c6') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (55, 'บ้านปางไฮห้วยแม่วอง', 'หมู่บ้าน+ป่าขุนแม่กวง', 'กว้าง8.30 เมตร สร้างปี 63', '2024-07-22', 'ฝายหินก่อ', 18.922710851929992, 99.32144795467387, '0101000020E61000002F2C719A92D4584020B444C736EC3240', NULL, '2024-12-24 04:49:42.977726', 'U794cb31c3d1d0564a18c6392ccf777c6') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (56, 'บ้านปางไฮห้วยแม่วอง', 'หมู่บ้าน+ป่าขุนแม่กวง', 'ก้วาง7.50เมตรสร้างปี65', '2024-07-22', 'ฝายหิน', 18.922198056204174, 99.31924662727504, '0101000020E61000004BE067896ED45840EAD4FB2B15EC3240', NULL, '2024-12-24 04:52:51.852113', 'U794cb31c3d1d0564a18c6392ccf777c6') ON CONFLICT DO NOTHING;
INSERT INTO public.checkdam (gid, cdname, cdcreator, cddetail, cddate, cdtype, lat, lng, geom, cdimage, created_at, userid) VALUES (57, 'บ้านปางไฮ+ห้วยแม่วอง', 'สร้างเอง', 'กว้าง 6 เมตร', '2024-07-22', 'ฝายหินก่อ', 18.92211909155573, 99.3194991171793, '0101000020E6100000B4D86CAC72D45840C43F2DFF0FEC3240', NULL, '2024-12-24 04:55:02.873003', 'U794cb31c3d1d0564a18c6392ccf777c6') ON CONFLICT DO NOTHING;


--
-- TOC entry 4285 (class 0 OID 17504)
-- Dependencies: 226
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--



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

INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (150, 'U4f8a3f95e0e5e61f4b1b2e08e4be177f', 'อนุรักษ์', '2024-12-24 03:22:47.172227', '2024-12-24 06:11:38.136331', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (66, 'U3e85543183b06fa5a9d4f2f00c5849f4', '〰️🍃Tharanda🍃〰️®️', '2024-12-24 03:11:38.609214', '2024-12-25 08:05:19.531867', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (90, 'U44f159c15dde193b9a06f994707775ee', 'ธวัชชัย', '2024-12-24 03:18:31.167193', '2024-12-24 03:30:44.893657', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (104, 'U78da97c1f060fddf9b804c267c61c715', 'สมศักดิ์ ไชยวงค์', '2024-12-24 03:19:32.671996', '2024-12-26 02:23:40.760647', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (143, 'U71b8ba42eb983972841522bbb5e05f9e', 'มนูญ', '2024-12-24 03:21:59.481318', '2024-12-24 04:30:26.365423', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (91, 'Ue9d47965f143432be06c0162aee1bf47', 'นิพนธ์ ใจปัญญา', '2024-12-24 03:18:33.186142', '2024-12-24 03:25:47.571845', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (133, 'Ue90b96e0fa9e027fe8e72373e6cf134b', 'Nikorn', '2024-12-24 03:21:30.294768', '2024-12-24 03:21:30.294768', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (106, 'U58146003aaac43f022de6934eb59891a', 'Kavita', '2024-12-24 03:19:57.490935', '2024-12-24 04:30:27.319839', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (82, 'Udb7137a8ca8a8704b51f429854eea899', 'จริยา  จันทร์อ่อน', '2024-12-24 03:17:32.827791', '2024-12-24 07:21:05.612911', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (84, 'Ue6e1f22254c1f7ea434e019adecf0c93', '🌈 MayMay 🌈', '2024-12-24 03:18:08.6461', '2024-12-24 04:13:53.697301', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (70, 'Uf77921a93bd2fc36a093787a6598d83c', 'ใจสั่งมา', '2024-12-24 03:11:59.940239', '2024-12-24 04:13:58.252149', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (26, 'U791a8a270a665ac9b9fb933abf0cb55f', 'Wanpen', '2024-12-12 01:57:07.348484', '2024-12-12 10:52:20.538226', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (68, 'U25b84a172235c98dbeb97a25396d01d7', 'หนึ่ง.', '2024-12-24 03:11:41.417005', '2024-12-24 04:30:43.285373', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (136, 'U4802eec03eef5db26135d0b8e2591784', 'manoch khamnoi', '2024-12-24 03:21:38.79917', '2024-12-24 03:21:38.79917', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (23, 'U6b5e335387c80f53199b71f0206220b3', 'Chanida S.', '2024-09-03 10:47:00.075664', '2024-12-23 08:35:52.543167', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (270, 'Uf6f4358c04b3e4c8d45fb903f1494b4a', 'เกษม ธรรมขันแข็ง', '2024-12-24 04:29:00.870966', '2024-12-24 13:46:52.406345', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (129, 'U48458c3353c5d51e75eef8965c1792c7', 'ภูริตา  (น้อง)', '2024-12-24 03:21:23.293587', '2024-12-24 13:47:23.825007', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (103, 'Ucca8a3cf292ff84fcf7de2e3da4350d5', 'somsri', '2024-12-24 03:19:18.423713', '2024-12-24 04:38:27.610612', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (52, 'U98b1b23cb25ebfb54e2136191098b3d3', 'เอกดอยป่าเหมี้ยง', '2024-12-24 02:59:59.22306', '2024-12-24 04:38:31.770623', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (138, 'Ub4b73a8fed92e3d11eb72ef758dc0071', 'มณเฑียร บุญช้างเผือก', '2024-12-24 03:21:42.26241', '2024-12-25 01:17:58.491868', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (142, 'U8962934e7839265cb951683a7595dcca', 'khanit thanutham', '2024-12-24 03:21:54.116934', '2024-12-24 03:21:54.116934', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (51, 'Ucd982b8de25e427682fe8296876a5a26', 'sirinthip.rinn', '2024-12-24 02:58:14.934281', '2024-12-24 04:41:30.52423', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (69, 'U37b95c7bb0b6441cdec4298ef9e01725', 'เสถียร', '2024-12-24 03:11:57.659477', '2024-12-24 04:29:30.681772', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (135, 'U6519071991efd5bb8ca50b17b6365feb', 'ปฐมพงษ์ ก้อนตุ้ย', '2024-12-24 03:21:38.709647', '2024-12-24 03:28:41.253313', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (45, 'U22eb9a702284f4682f8bb33b27b8347a', 'jam jam', '2024-12-24 02:42:24.398395', '2024-12-24 04:41:56.89159', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (140, 'U51ec632abed8aa38288a8e758d3f5e17', 'พ่อหลวงตรี', '2024-12-24 03:21:51.935469', '2024-12-24 04:31:45.570279', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (112, 'Uc10114956901348f5905e97eacea2c6e', '>-BeN €_€ SiRiNrAd-<', '2024-12-24 03:21:02.69671', '2024-12-24 04:17:18.091122', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (39, 'U796b0c6c2173cfca5d31fa1670dcf250', 'K', '2024-12-24 02:02:26.765411', '2024-12-24 03:21:17.686219', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (1, 'Ue340022c2f6d6c989a3c4120991d90d1', 'sakda.homhuan', '2024-08-18 02:37:20.238971', '2024-12-24 03:21:18.309118', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (46, 'U794cb31c3d1d0564a18c6392ccf777c6', 'อภิชาติ', '2024-12-24 02:42:25.151295', '2024-12-24 04:43:02.755016', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (141, 'U92a0efe631d8fc0d58aecb88ad159f99', 'ณมน', '2024-12-24 03:21:52.802289', '2024-12-24 07:34:12.670075', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (58, 'Ufb07ac4ea83afccd6a1912b367ac2881', 'วันชัย  ศรีวิลัย', '2024-12-24 03:03:24.97262', '2024-12-24 03:22:10.63767', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (53, 'U3456c77c33b012cca9ed778fb0cbe599', 'NIKON', '2024-12-24 03:00:25.875129', '2024-12-24 10:03:38.747658', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (148, 'U32f297e8e42a0e71b3c47545190028d4', 'S.Suriyonte', '2024-12-24 03:22:17.269114', '2024-12-24 03:22:17.269114', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (100, 'U57dc63f13ad8b39fecf7659099f8f34e', 'Tunyaluck Ponhan', '2024-12-24 03:19:10.739452', '2024-12-24 04:10:05.275394', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (107, 'Uc1851e3fade0e4fecfd9573da743004f', 'preecha', '2024-12-24 03:20:08.488959', '2024-12-24 04:30:04.258843', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (92, 'U3a0f49c3410fcc0103476b184dd2348d', 'จิราภรณ์', '2024-12-24 03:18:34.042714', '2024-12-25 06:05:09.783889', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (38, 'Ud405706afffe993af314858506cb50c8', 'Raweewan', '2024-12-24 02:02:25.865567', '2024-12-24 10:40:11.863199', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (320, 'U98b9ddb7427d996c975be8cb2194d82c', 'อดุลย์', '2024-12-24 04:52:14.580494', '2024-12-24 10:45:43.093489', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (61, 'U3ba5710e2f5228b8383895cc84c4d92f', 'kittichai', '2024-12-24 03:08:41.721793', '2024-12-24 11:20:41.462317', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (137, 'U8e2df074074bb0f3e8463649f2fde1da', 'เข็มเพชร', '2024-12-24 03:21:41.76003', '2024-12-24 03:30:13.167325', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (97, 'Ud315d6d100c2a27bd63b64519c40e21a', 'อุ่นเรือน', '2024-12-24 03:18:53.430927', '2024-12-25 06:34:46.825645', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (99, 'Ud282ab7bf6b184f78134fe4d180f5250', 'witoon Pongwanachol', '2024-12-24 03:18:56.272119', '2024-12-25 08:01:04.412156', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (109, 'U14fe24592e6e29fa2152236f5ac1e76c', 'nueng', '2024-12-24 03:20:26.476461', '2024-12-24 11:54:33.66444', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (47, 'U6a20087fb4eeccaa87e94b8572db2250', '@♡!_มอ~Man_!♥24♾', '2024-12-24 02:45:16.552549', '2024-12-24 12:22:58.338446', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (95, 'U42386f330fd05a57fa20676fb4cb77dc', 'Fon', '2024-12-24 03:18:45.597684', '2024-12-24 05:24:22.350253', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (63, 'Ub513ba061cbf199657269e3ec5a4652e', 'ชำนาญ', '2024-12-24 03:09:34.835766', '2024-12-24 04:32:41.20748', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (178, 'U007cb1fb73e581b4a7b709169ebb462b', 'Patomchat', '2024-12-24 03:29:41.791759', '2024-12-24 04:33:49.147909', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (89, 'U73a0f8c6314014a8e44dd27d33508b48', 'สิริโชค อารีย์', '2024-12-24 03:18:26.358763', '2024-12-24 04:33:51.445171', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users (gid, userid, username, created_at, updated_at, auth, fname, lname, mooban) VALUES (290, 'U18069839861531603a651c9e0c9d2e41', 'Kig Thatchai', '2024-12-24 04:30:39.91831', '2024-12-24 04:33:51.513915', NULL, NULL, NULL, NULL) ON CONFLICT DO NOTHING;


--
-- TOC entry 4296 (class 0 OID 0)
-- Dependencies: 222
-- Name: checkdam_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.checkdam_gid_seq', 57, true);


--
-- TOC entry 4297 (class 0 OID 0)
-- Dependencies: 225
-- Name: images_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_gid_seq', 1, false);


--
-- TOC entry 4298 (class 0 OID 0)
-- Dependencies: 224
-- Name: users_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_gid_seq', 355, true);


--
-- TOC entry 4126 (class 2606 OID 17481)
-- Name: checkdam checkdam_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checkdam
    ADD CONSTRAINT checkdam_pkey PRIMARY KEY (gid);


--
-- TOC entry 4130 (class 2606 OID 17512)
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


-- Completed on 2025-01-01 21:49:22 +07

--
-- PostgreSQL database dump complete
--

