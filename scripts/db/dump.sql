--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: some_user
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nome character varying,
    email character varying NOT NULL,
    id_facebook character varying
);


ALTER TABLE public.usuarios OWNER TO some_user;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: some_user
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO some_user;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: some_user
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: some_user
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: some_user
--

COPY public.usuarios (id, nome, email, id_facebook) FROM stdin;
1	Henrique Teste	henrique_eujrktw_teste@tfbnw.net	105616418718443
2	Henrique Docker	henrique_docker@tfbnw.net	105616418718443
\.


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: some_user
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);


--
-- Name: usuarios PK_d7281c63c176e152e4c531594a8; Type: CONSTRAINT; Schema: public; Owner: some_user
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

