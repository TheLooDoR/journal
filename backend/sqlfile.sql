--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7
-- Dumped by pg_dump version 11.7

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

SET default_with_oids = false;

--
-- Name: corps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.corps (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.corps OWNER TO postgres;

--
-- Name: corps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.corps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE public.corps_id_seq OWNER TO postgres;

--
-- Name: corps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.corps_id_seq OWNED BY public.corps.id;


--
-- Name: dates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dates (
    id integer NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.dates OWNER TO postgres;

--
-- Name: dates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dates_id_seq OWNER TO postgres;

--
-- Name: dates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dates_id_seq OWNED BY public.dates.id;


--
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    id integer NOT NULL,
    name text NOT NULL,
    full_name text NOT NULL
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.departments_id_seq OWNER TO postgres;

--
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;


--
-- Name: groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groups (
    id integer NOT NULL,
    name text NOT NULL,
    department_id integer NOT NULL
);


ALTER TABLE public.groups OWNER TO postgres;

--
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.groups_id_seq OWNER TO postgres;

--
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;


--
-- Name: journals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.journals (
    user_id integer NOT NULL,
    subject_id integer NOT NULL,
    student_id integer NOT NULL,
    type_id integer NOT NULL,
    date_id integer NOT NULL,
    time_id integer NOT NULL,
    corps_id integer,
    hall text NOT NULL,
    present boolean DEFAULT true,
    valid_miss boolean DEFAULT false,
    score integer,
    note text
);


ALTER TABLE public.journals OWNER TO postgres;

--
-- Name: positions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.positions (
    id integer NOT NULL,
    name text NOT NULL,
    short_name text NOT NULL
);


ALTER TABLE public.positions OWNER TO postgres;

--
-- Name: positions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.positions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.positions_id_seq OWNER TO postgres;

--
-- Name: positions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.positions_id_seq OWNED BY public.positions.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name text NOT NULL,
    full_name text NOT NULL,
    short_name text NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: schedules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedules (
    user_id integer NOT NULL,
    subject_id integer NOT NULL,
    group_id integer NOT NULL,
    type_id integer NOT NULL,
    week_day_id integer NOT NULL,
    time_id integer NOT NULL,
    corps_id integer NOT NULL,
    hall text NOT NULL
);


ALTER TABLE public.schedules OWNER TO postgres;

--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id integer NOT NULL,
    group_id integer NOT NULL,
    surname text NOT NULL,
    name text NOT NULL,
    patronymic text NOT NULL,
    budget boolean NOT NULL
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_id_seq OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: subject_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subject_types (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.subject_types OWNER TO postgres;

--
-- Name: subject_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subject_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subject_types_id_seq OWNER TO postgres;

--
-- Name: subject_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subject_types_id_seq OWNED BY public.subject_types.id;


--
-- Name: subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subjects (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.subjects OWNER TO postgres;

--
-- Name: subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subjects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subjects_id_seq OWNER TO postgres;

--
-- Name: subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subjects_id_seq OWNED BY public.subjects.id;


--
-- Name: times; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.times (
    id integer NOT NULL,
    "time" time without time zone NOT NULL
);


ALTER TABLE public.times OWNER TO postgres;

--
-- Name: times_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.times_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.times_id_seq OWNER TO postgres;

--
-- Name: times_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.times_id_seq OWNED BY public.times.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    surname text NOT NULL,
    name text NOT NULL,
    patronymic text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    admin boolean NOT NULL,
    department_id integer,
    position_id integer,
    role_id integer,
    phone_number text,
    confirmed boolean DEFAULT false,
    "resetPasswordToken" text,
    "resetPasswordExpires" timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: week_days; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.week_days (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.week_days OWNER TO postgres;

--
-- Name: week_days_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.week_days_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.week_days_id_seq OWNER TO postgres;

--
-- Name: week_days_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.week_days_id_seq OWNED BY public.week_days.id;


--
-- Name: corps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.corps ALTER COLUMN id SET DEFAULT nextval('public.corps_id_seq'::regclass);


--
-- Name: dates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dates ALTER COLUMN id SET DEFAULT nextval('public.dates_id_seq'::regclass);


--
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- Name: groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);


--
-- Name: positions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions ALTER COLUMN id SET DEFAULT nextval('public.positions_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Name: subject_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject_types ALTER COLUMN id SET DEFAULT nextval('public.subject_types_id_seq'::regclass);


--
-- Name: subjects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);


--
-- Name: times id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.times ALTER COLUMN id SET DEFAULT nextval('public.times_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: week_days id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.week_days ALTER COLUMN id SET DEFAULT nextval('public.week_days_id_seq'::regclass);


--
-- Data for Name: corps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.corps (id, name) FROM stdin;
1	У1
2	У2
\.


--
-- Data for Name: dates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dates (id, date) FROM stdin;
101	2020-03-19
102	2020-03-17
103	2020-03-18
104	2020-03-20
105	2020-03-25
106	2020-03-27
107	2020-04-01
108	2020-04-03
109	2020-04-08
110	2020-04-10
111	2020-03-26
112	2020-04-04
113	2020-04-05
114	2020-04-06
115	2020-04-07
116	2020-04-09
117	2020-04-11
118	2020-04-12
119	2020-04-29
120	2020-04-30
121	2020-04-16
122	2020-04-21
123	2020-04-23
124	2020-04-28
125	2020-05-05
126	2020-05-07
127	2020-03-24
128	2020-03-31
129	2020-04-26
130	2020-02-18
131	2020-01-18
132	2020-04-15
133	2020-04-22
134	2020-05-06
135	2020-05-13
136	2020-05-20
137	2020-05-27
138	2020-06-03
139	2020-06-10
140	2020-06-17
141	2020-06-24
142	2020-07-01
143	2020-07-08
144	2020-07-15
145	2020-07-22
146	2020-07-29
147	2020-06-04
148	2020-06-11
149	2020-06-18
150	2020-06-25
151	2020-07-02
152	2020-07-09
153	2020-07-16
154	2020-07-23
155	2020-04-02
156	2020-05-14
157	2020-05-21
158	2020-05-28
159	2020-04-17
160	2020-04-24
161	2020-05-01
162	2020-05-08
163	2020-05-15
164	2020-05-22
165	2020-05-29
166	2020-06-05
167	2020-04-14
168	2020-05-12
169	2020-05-19
170	2020-05-26
171	2020-06-02
172	2020-01-04
173	2020-05-20
174	2020-05-21
175	2020-04-27
\.


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (id, name, full_name) FROM stdin;
1	СУ	Стратегическое управление
2	ПИИТУ	Программная инженерия и информационные технологии
\.


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.groups (id, name, department_id) FROM stdin;
1	КН-26	1
2	КН-27	1
3	КН-36-б	2
4	КН-25	1
5	КН-36-а	2
6	КН-36-в	2
\.


--
-- Data for Name: journals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.journals (user_id, subject_id, student_id, type_id, date_id, time_id, corps_id, hall, present, valid_miss, score, note) FROM stdin;
18	2	14	1	107	2	1	704	t	f	\N	
18	2	15	1	107	2	1	704	t	f	\N	
18	2	16	1	107	2	1	704	f	f	\N	
18	2	17	1	107	2	1	704	f	f	\N	
18	2	18	1	107	2	1	704	t	f	\N	
18	2	19	1	107	2	1	704	t	f	\N	
18	2	20	1	107	2	1	704	t	f	\N	
18	2	21	1	107	2	1	704	t	f	\N	
18	2	26	1	107	2	1	704	t	f	\N	
18	2	14	1	109	2	1	704	t	f	\N	
18	2	15	1	109	2	1	704	t	f	\N	
18	2	16	1	109	2	1	704	f	f	\N	
18	2	17	1	109	2	1	704	t	f	60	
18	2	18	1	109	2	1	704	t	f	\N	
18	2	19	1	109	2	1	704	t	f	\N	
18	2	20	1	109	2	1	704	t	f	\N	
18	2	21	1	109	2	1	704	f	t	\N	
18	2	26	1	109	2	1	704	t	f	\N	
18	2	14	1	132	2	1	704	t	f	\N	
18	2	15	1	132	2	1	704	t	f	\N	
18	2	16	1	132	2	1	704	f	f	\N	
18	2	17	1	132	2	1	704	t	f	\N	
18	2	18	1	132	2	1	704	f	f	\N	
18	2	19	1	132	2	1	704	t	f	\N	
18	2	20	1	132	2	1	704	t	f	\N	
18	2	21	1	132	2	1	704	t	f	\N	
18	2	26	1	132	2	1	704	t	f	85	
18	2	14	1	133	2	1	704	t	f	\N	
18	2	15	1	133	2	1	704	t	f	\N	
18	2	16	1	133	2	1	704	t	f	74	
18	2	18	1	133	2	1	704	t	f	\N	
18	2	19	1	133	2	1	704	t	f	\N	
18	2	20	1	133	2	1	704	t	f	92	
18	2	21	1	133	2	1	704	f	f	\N	
18	2	26	1	133	2	1	704	t	f	\N	
18	2	14	1	119	2	1	704	t	f	\N	
18	2	15	1	119	2	1	704	t	f	\N	
18	2	16	1	119	2	1	704	t	f	85	
18	2	17	1	119	2	1	704	t	f	\N	
18	2	18	1	119	2	1	704	t	f	\N	
18	2	19	1	119	2	1	704	t	f	95	
18	2	20	1	119	2	1	704	t	f	\N	
18	2	21	1	119	2	1	704	t	f	\N	
18	2	26	1	119	2	1	704	t	f	\N	76
18	2	14	1	134	2	1	704	t	f	\N	
18	2	15	1	134	2	1	704	t	f	72	
18	2	16	1	134	2	1	704	t	f	\N	
18	2	17	1	134	2	1	704	t	f	\N	
18	2	18	1	134	2	1	704	t	f	\N	
18	2	19	1	134	2	1	704	t	f	\N	
18	2	20	1	134	2	1	704	t	f	\N	
18	2	21	1	134	2	1	704	t	f	\N	
18	2	26	1	134	2	1	704	t	f	\N	
18	2	14	1	135	2	1	704	t	f	\N	
18	2	15	1	135	2	1	704	t	f	\N	a
18	2	16	1	135	2	1	704	t	f	86	
18	2	17	1	135	2	1	704	t	f	\N	
18	2	18	1	135	2	1	704	t	f	\N	
18	2	19	1	135	2	1	704	t	f	\N	
18	2	20	1	135	2	1	704	t	f	\N	
18	2	21	1	135	2	1	704	t	f	\N	
18	2	26	1	135	2	1	704	t	f	\N	
18	2	14	1	136	2	1	704	t	f	\N	
18	2	15	1	136	2	1	704	t	f	\N	
18	2	16	1	136	2	1	704	f	f	\N	
18	2	17	1	136	2	1	704	t	f	\N	
18	2	18	1	136	2	1	704	t	f	\N	
18	2	19	1	136	2	1	704	t	f	\N	
18	2	20	1	136	2	1	704	t	f	\N	
18	2	21	1	136	2	1	704	t	f	\N	
18	2	26	1	136	2	1	704	t	f	\N	
18	2	14	1	137	2	1	704	t	f	\N	
18	2	15	1	137	2	1	704	t	f	\N	
18	2	16	1	137	2	1	704	t	f	\N	
18	2	17	1	137	2	1	704	t	f	\N	
18	2	18	1	137	2	1	704	t	f	\N	
18	2	19	1	137	2	1	704	t	f	\N	
18	2	20	1	137	2	1	704	t	f	\N	
18	2	21	1	137	2	1	704	t	f	\N	
18	2	26	1	137	2	1	704	t	f	\N	
18	2	14	1	138	2	1	704	t	f	\N	
18	2	15	1	138	2	1	704	t	f	\N	
18	2	16	1	138	2	1	704	t	f	\N	
18	2	17	1	138	2	1	704	t	f	\N	
18	2	18	1	138	2	1	704	t	f	\N	
18	2	19	1	138	2	1	704	t	f	\N	
18	2	20	1	138	2	1	704	t	f	\N	
18	2	21	1	138	2	1	704	t	f	\N	
18	2	26	1	138	2	1	704	t	f	\N	
18	18	14	2	107	3	2	701	t	f	\N	
18	18	15	2	107	3	2	701	t	f	\N	
18	18	16	2	107	3	2	701	t	f	\N	
18	18	17	2	107	3	2	701	t	f	\N	
18	18	18	2	107	3	2	701	t	f	\N	
18	18	19	2	107	3	2	701	t	f	\N	
18	18	20	2	107	3	2	701	t	f	\N	
18	18	21	2	107	3	2	701	t	f	\N	
18	18	26	2	107	3	2	701	t	f	\N	
18	18	14	2	109	3	2	701	t	f	\N	
18	18	15	2	109	3	2	701	t	f	\N	
18	18	16	2	109	3	2	701	t	f	\N	
18	18	17	2	109	3	2	701	t	f	\N	
18	18	18	2	109	3	2	701	t	f	\N	
18	18	19	2	109	3	2	701	t	f	\N	
18	18	20	2	109	3	2	701	t	f	\N	
18	18	21	2	109	3	2	701	t	f	\N	
18	18	26	2	109	3	2	701	t	f	\N	
18	18	14	2	132	3	2	701	t	f	\N	
18	18	15	2	132	3	2	701	t	f	\N	
18	18	16	2	132	3	2	701	t	f	\N	
18	18	17	2	132	3	2	701	t	f	\N	
18	18	18	2	132	3	2	701	t	f	\N	
18	18	19	2	132	3	2	701	t	f	\N	
18	18	20	2	132	3	2	701	t	f	\N	
18	18	21	2	132	3	2	701	t	f	\N	
18	18	26	2	132	3	2	701	t	f	\N	
18	18	14	2	133	3	2	701	t	f	\N	
18	18	15	2	133	3	2	701	t	f	\N	
18	18	16	2	133	3	2	701	t	f	\N	
18	18	17	2	133	3	2	701	t	f	\N	
18	18	18	2	133	3	2	701	t	f	\N	
18	18	19	2	133	3	2	701	t	f	\N	
18	18	20	2	133	3	2	701	t	f	\N	
18	18	21	2	133	3	2	701	t	f	\N	
18	18	26	2	133	3	2	701	t	f	\N	
18	18	14	2	119	3	2	701	t	f	\N	
18	18	15	2	119	3	2	701	t	f	\N	
18	18	16	2	119	3	2	701	t	f	\N	
18	18	17	2	119	3	2	701	t	f	\N	
18	18	18	2	119	3	2	701	t	f	\N	
18	18	19	2	119	3	2	701	t	f	\N	
18	18	20	2	119	3	2	701	t	f	\N	
18	18	21	2	119	3	2	701	t	f	\N	
18	18	26	2	119	3	2	701	t	f	\N	
18	18	14	2	134	3	2	701	t	f	\N	
18	18	15	2	134	3	2	701	t	f	\N	
18	18	16	2	134	3	2	701	t	f	\N	
18	18	17	2	134	3	2	701	t	f	\N	
18	18	18	2	134	3	2	701	t	f	\N	
18	18	19	2	134	3	2	701	t	f	\N	
18	18	20	2	134	3	2	701	t	f	\N	
18	18	21	2	134	3	2	701	t	f	\N	
18	18	26	2	134	3	2	701	t	f	\N	
18	18	14	2	135	3	2	701	t	f	\N	
18	18	15	2	135	3	2	701	t	f	\N	
18	18	16	2	135	3	2	701	t	f	\N	
18	18	17	2	135	3	2	701	t	f	\N	
18	18	18	2	135	3	2	701	t	f	\N	
18	18	19	2	135	3	2	701	t	f	\N	
18	18	20	2	135	3	2	701	t	f	\N	
18	18	21	2	135	3	2	701	t	f	\N	
18	18	26	2	135	3	2	701	t	f	\N	
18	18	14	2	136	3	2	701	t	f	\N	
18	18	15	2	136	3	2	701	t	f	\N	
18	18	16	2	136	3	2	701	t	f	\N	
18	18	17	2	136	3	2	701	t	f	\N	
18	18	18	2	136	3	2	701	t	f	\N	
18	18	19	2	136	3	2	701	t	f	\N	
18	18	20	2	136	3	2	701	t	f	\N	
18	18	21	2	136	3	2	701	t	f	\N	
18	18	26	2	136	3	2	701	t	f	\N	
18	18	14	2	137	3	2	701	t	f	\N	
18	18	15	2	137	3	2	701	t	f	\N	
18	18	16	2	137	3	2	701	t	f	\N	
18	18	17	2	137	3	2	701	t	f	\N	
18	18	18	2	137	3	2	701	t	f	\N	
18	18	19	2	137	3	2	701	t	f	\N	
18	18	20	2	137	3	2	701	t	f	\N	
18	18	21	2	137	3	2	701	t	f	\N	
18	18	26	2	137	3	2	701	t	f	\N	
18	18	14	2	138	3	2	701	t	f	\N	
18	18	15	2	138	3	2	701	t	f	\N	
18	18	16	2	138	3	2	701	t	f	\N	
18	18	17	2	138	3	2	701	t	f	\N	
18	18	18	2	138	3	2	701	t	f	\N	
18	18	19	2	138	3	2	701	t	f	\N	
18	18	20	2	138	3	2	701	t	f	\N	
18	18	21	2	138	3	2	701	t	f	\N	
18	18	26	2	138	3	2	701	t	f	\N	
18	1	14	2	107	4	2	701	t	f	\N	
18	1	15	2	107	4	2	701	t	f	\N	
18	1	16	2	107	4	2	701	t	f	\N	
18	1	17	2	107	4	2	701	t	f	\N	
18	1	18	2	107	4	2	701	t	f	\N	
18	1	19	2	107	4	2	701	t	f	\N	
18	1	20	2	107	4	2	701	t	f	\N	
18	1	21	2	107	4	2	701	t	f	\N	
18	1	26	2	107	4	2	701	t	f	\N	
18	1	14	2	109	4	2	701	t	f	\N	
18	1	15	2	109	4	2	701	t	f	\N	
18	1	16	2	109	4	2	701	t	f	\N	
18	1	17	2	109	4	2	701	t	f	\N	
18	1	18	2	109	4	2	701	t	f	\N	
18	1	19	2	109	4	2	701	t	f	\N	
18	1	20	2	109	4	2	701	t	f	\N	
18	1	21	2	109	4	2	701	t	f	\N	
18	1	26	2	109	4	2	701	t	f	\N	
18	1	14	2	132	4	2	701	t	f	\N	
18	1	15	2	132	4	2	701	t	f	\N	
18	1	16	2	132	4	2	701	t	f	\N	
18	1	17	2	132	4	2	701	t	f	\N	
18	1	18	2	132	4	2	701	t	f	\N	
18	1	19	2	132	4	2	701	t	f	\N	
18	1	20	2	132	4	2	701	t	f	\N	
18	1	21	2	132	4	2	701	t	f	\N	
18	1	26	2	132	4	2	701	t	f	\N	
18	1	14	2	133	4	2	701	t	f	\N	
18	1	15	2	133	4	2	701	t	f	\N	
18	1	16	2	133	4	2	701	t	f	\N	
18	1	17	2	133	4	2	701	t	f	\N	
18	1	18	2	133	4	2	701	t	f	\N	
18	1	19	2	133	4	2	701	t	f	\N	
18	1	20	2	133	4	2	701	t	f	\N	
18	1	21	2	133	4	2	701	t	f	\N	
18	1	26	2	133	4	2	701	t	f	\N	
18	1	14	2	119	4	2	701	t	f	\N	
18	1	15	2	119	4	2	701	t	f	\N	
18	1	16	2	119	4	2	701	t	f	\N	
18	1	17	2	119	4	2	701	t	f	\N	
18	1	18	2	119	4	2	701	t	f	\N	
18	1	19	2	119	4	2	701	t	f	\N	
18	1	20	2	119	4	2	701	t	f	\N	
18	1	21	2	119	4	2	701	t	f	\N	
18	1	26	2	119	4	2	701	t	f	\N	
18	1	14	2	134	4	2	701	t	f	\N	
18	1	15	2	134	4	2	701	t	f	\N	
18	1	16	2	134	4	2	701	t	f	\N	
18	1	17	2	134	4	2	701	t	f	\N	
18	1	18	2	134	4	2	701	t	f	\N	
18	1	19	2	134	4	2	701	t	f	\N	
18	1	20	2	134	4	2	701	t	f	\N	
18	1	21	2	134	4	2	701	t	f	\N	
18	1	26	2	134	4	2	701	t	f	\N	
18	1	14	2	135	4	2	701	t	f	\N	
18	1	15	2	135	4	2	701	t	f	\N	
18	1	16	2	135	4	2	701	t	f	\N	
18	1	17	2	135	4	2	701	t	f	\N	
18	1	18	2	135	4	2	701	t	f	\N	
18	1	19	2	135	4	2	701	t	f	\N	
18	1	20	2	135	4	2	701	t	f	\N	
18	1	21	2	135	4	2	701	t	f	\N	
18	1	26	2	135	4	2	701	t	f	\N	
18	1	14	2	136	4	2	701	t	f	\N	
18	1	15	2	136	4	2	701	t	f	\N	
18	1	16	2	136	4	2	701	t	f	\N	
18	1	17	2	136	4	2	701	t	f	\N	
18	1	18	2	136	4	2	701	t	f	\N	
18	1	19	2	136	4	2	701	t	f	\N	
18	1	20	2	136	4	2	701	t	f	\N	
18	1	21	2	136	4	2	701	t	f	\N	
18	1	26	2	136	4	2	701	t	f	\N	
18	1	14	2	137	4	2	701	t	f	\N	
18	1	15	2	137	4	2	701	t	f	\N	
18	1	16	2	137	4	2	701	t	f	\N	
18	1	17	2	137	4	2	701	t	f	\N	
18	1	18	2	137	4	2	701	t	f	\N	
18	1	19	2	137	4	2	701	t	f	\N	
18	1	20	2	137	4	2	701	t	f	\N	
18	1	21	2	137	4	2	701	t	f	\N	
18	1	26	2	137	4	2	701	t	f	\N	
18	1	14	2	138	4	2	701	t	f	\N	
18	1	15	2	138	4	2	701	t	f	\N	
18	1	16	2	138	4	2	701	t	f	\N	
18	1	17	2	138	4	2	701	t	f	\N	
18	1	18	2	138	4	2	701	t	f	\N	
18	1	19	2	138	4	2	701	t	f	\N	
18	1	20	2	138	4	2	701	t	f	\N	
18	1	21	2	138	4	2	701	t	f	\N	
18	1	26	2	138	4	2	701	t	f	\N	
18	16	14	1	155	1	2	704	t	f	\N	
18	16	15	1	155	1	2	704	t	f	\N	
18	16	16	1	155	1	2	704	t	f	\N	
18	16	17	1	155	1	2	704	t	f	\N	
18	16	18	1	155	1	2	704	t	f	\N	
18	16	19	1	155	1	2	704	t	f	\N	
18	16	20	1	155	1	2	704	t	f	\N	
18	16	21	1	155	1	2	704	t	f	\N	
18	16	26	1	155	1	2	704	t	f	\N	
18	16	14	1	116	1	2	704	t	f	\N	
18	16	15	1	116	1	2	704	t	f	\N	
18	16	16	1	116	1	2	704	t	f	\N	
18	16	17	1	116	1	2	704	t	f	\N	
18	16	18	1	116	1	2	704	t	f	\N	
18	16	19	1	116	1	2	704	t	f	\N	
18	16	20	1	116	1	2	704	t	f	\N	
18	16	21	1	116	1	2	704	t	f	\N	
18	16	26	1	116	1	2	704	t	f	\N	
18	16	14	1	121	1	2	704	t	f	\N	
18	16	15	1	121	1	2	704	t	f	\N	
18	16	16	1	121	1	2	704	t	f	\N	
18	16	17	1	121	1	2	704	t	f	\N	
18	16	18	1	121	1	2	704	t	f	\N	
18	16	19	1	121	1	2	704	t	f	\N	
18	16	20	1	121	1	2	704	t	f	\N	
18	16	21	1	121	1	2	704	t	f	\N	
18	16	26	1	121	1	2	704	t	f	\N	
18	16	14	1	123	1	2	704	t	f	\N	
18	16	15	1	123	1	2	704	t	f	\N	
18	16	16	1	123	1	2	704	t	f	\N	
18	16	17	1	123	1	2	704	t	f	\N	
18	16	18	1	123	1	2	704	t	f	\N	
18	16	19	1	123	1	2	704	t	f	\N	
18	16	20	1	123	1	2	704	t	f	\N	
18	16	21	1	123	1	2	704	t	f	\N	
18	16	26	1	123	1	2	704	t	f	\N	
18	16	14	1	120	1	2	704	t	f	\N	
18	16	15	1	120	1	2	704	t	f	\N	
18	16	16	1	120	1	2	704	t	f	\N	
18	16	17	1	120	1	2	704	t	f	\N	
18	16	18	1	120	1	2	704	t	f	\N	
18	16	19	1	120	1	2	704	t	f	\N	
18	16	20	1	120	1	2	704	t	f	\N	
18	16	21	1	120	1	2	704	t	f	\N	
18	16	26	1	120	1	2	704	t	f	\N	
18	16	14	1	126	1	2	704	t	f	\N	
18	16	15	1	126	1	2	704	t	f	\N	
18	16	16	1	126	1	2	704	t	f	\N	
18	16	17	1	126	1	2	704	t	f	\N	
18	16	18	1	126	1	2	704	t	f	\N	
18	16	19	1	126	1	2	704	t	f	\N	
18	16	20	1	126	1	2	704	t	f	\N	
18	16	21	1	126	1	2	704	t	f	\N	
18	16	26	1	126	1	2	704	t	f	\N	
18	16	14	1	156	1	2	704	t	f	\N	
18	16	15	1	156	1	2	704	t	f	\N	
18	16	16	1	156	1	2	704	t	f	\N	
18	16	17	1	156	1	2	704	t	f	\N	
18	16	18	1	156	1	2	704	t	f	\N	
18	16	19	1	156	1	2	704	t	f	\N	
18	16	20	1	156	1	2	704	t	f	\N	
18	16	21	1	156	1	2	704	t	f	\N	
18	16	26	1	156	1	2	704	t	f	\N	
18	16	14	1	157	1	2	704	t	f	\N	
18	16	15	1	157	1	2	704	t	f	\N	
18	16	16	1	157	1	2	704	t	f	\N	
18	16	17	1	157	1	2	704	t	f	\N	
18	16	18	1	157	1	2	704	t	f	\N	
18	16	19	1	157	1	2	704	t	f	\N	
18	16	20	1	157	1	2	704	t	f	\N	
18	16	21	1	157	1	2	704	t	f	\N	
18	16	26	1	157	1	2	704	t	f	\N	
18	16	14	1	158	1	2	704	t	f	\N	
18	16	15	1	158	1	2	704	t	f	\N	
18	16	16	1	158	1	2	704	t	f	\N	
18	16	17	1	158	1	2	704	t	f	\N	
18	16	18	1	158	1	2	704	t	f	\N	
18	16	19	1	158	1	2	704	t	f	\N	
18	16	20	1	158	1	2	704	t	f	\N	
18	16	21	1	158	1	2	704	t	f	\N	
18	16	26	1	158	1	2	704	t	f	\N	
18	16	14	1	147	1	2	704	t	f	\N	
18	16	15	1	147	1	2	704	t	f	\N	
18	16	16	1	147	1	2	704	t	f	\N	
18	16	17	1	147	1	2	704	t	f	\N	
18	16	18	1	147	1	2	704	t	f	\N	
18	16	19	1	147	1	2	704	t	f	\N	
18	16	20	1	147	1	2	704	t	f	\N	
18	16	21	1	147	1	2	704	t	f	\N	
18	16	26	1	147	1	2	704	t	f	\N	
18	16	14	2	155	3	2	704	t	f	\N	
18	16	15	2	155	3	2	704	t	f	\N	
18	16	16	2	155	3	2	704	t	f	\N	
18	16	17	2	155	3	2	704	t	f	\N	
18	16	18	2	155	3	2	704	t	f	\N	
18	16	19	2	155	3	2	704	t	f	\N	
18	16	20	2	155	3	2	704	t	f	\N	
18	16	21	2	155	3	2	704	t	f	\N	
18	16	26	2	155	3	2	704	t	f	\N	
18	16	14	2	116	3	2	704	t	f	\N	
18	16	15	2	116	3	2	704	t	f	\N	
18	16	16	2	116	3	2	704	t	f	\N	
18	16	17	2	116	3	2	704	t	f	\N	
18	16	18	2	116	3	2	704	t	f	\N	
18	16	19	2	116	3	2	704	t	f	\N	
18	16	20	2	116	3	2	704	t	f	\N	
18	16	21	2	116	3	2	704	t	f	\N	
18	16	26	2	116	3	2	704	t	f	\N	
18	16	14	2	121	3	2	704	t	f	\N	
18	16	15	2	121	3	2	704	t	f	\N	
18	16	16	2	121	3	2	704	t	f	\N	
18	16	17	2	121	3	2	704	t	f	\N	
18	16	18	2	121	3	2	704	t	f	\N	
18	16	19	2	121	3	2	704	t	f	\N	
18	16	20	2	121	3	2	704	t	f	\N	
18	16	21	2	121	3	2	704	t	f	\N	
18	16	26	2	121	3	2	704	t	f	\N	
18	16	14	2	123	3	2	704	t	f	\N	
18	16	15	2	123	3	2	704	t	f	\N	
18	16	16	2	123	3	2	704	t	f	\N	
18	16	17	2	123	3	2	704	t	f	\N	
18	16	18	2	123	3	2	704	t	f	\N	
18	16	19	2	123	3	2	704	t	f	\N	
18	16	20	2	123	3	2	704	t	f	\N	
18	16	21	2	123	3	2	704	t	f	\N	
18	16	26	2	123	3	2	704	t	f	\N	
18	16	14	2	120	3	2	704	t	f	\N	
18	16	15	2	120	3	2	704	t	f	\N	
18	16	16	2	120	3	2	704	t	f	\N	
18	16	17	2	120	3	2	704	t	f	\N	
18	16	18	2	120	3	2	704	t	f	\N	
18	16	19	2	120	3	2	704	t	f	\N	
18	16	20	2	120	3	2	704	t	f	\N	
18	16	21	2	120	3	2	704	t	f	\N	
18	16	26	2	120	3	2	704	t	f	\N	
18	16	14	2	126	3	2	704	t	f	\N	
18	16	15	2	126	3	2	704	t	f	\N	
18	16	16	2	126	3	2	704	t	f	\N	
18	16	17	2	126	3	2	704	t	f	\N	
18	16	18	2	126	3	2	704	t	f	\N	
18	16	19	2	126	3	2	704	t	f	\N	
18	16	20	2	126	3	2	704	t	f	\N	
18	16	21	2	126	3	2	704	t	f	\N	
18	16	26	2	126	3	2	704	t	f	\N	
18	16	14	2	156	3	2	704	t	f	\N	
18	16	15	2	156	3	2	704	t	f	\N	
18	16	16	2	156	3	2	704	t	f	\N	
18	16	17	2	156	3	2	704	t	f	\N	
18	16	18	2	156	3	2	704	t	f	\N	
18	16	19	2	156	3	2	704	t	f	\N	
18	16	20	2	156	3	2	704	t	f	\N	
18	16	21	2	156	3	2	704	t	f	\N	
18	16	26	2	156	3	2	704	t	f	\N	
18	16	14	2	157	3	2	704	t	f	\N	
18	16	15	2	157	3	2	704	t	f	\N	
18	16	16	2	157	3	2	704	t	f	\N	
18	16	17	2	157	3	2	704	t	f	\N	
18	16	18	2	157	3	2	704	t	f	\N	
18	16	19	2	157	3	2	704	t	f	\N	
18	16	20	2	157	3	2	704	t	f	\N	
18	16	21	2	157	3	2	704	t	f	\N	
18	16	26	2	157	3	2	704	t	f	\N	
18	16	14	2	158	3	2	704	t	f	\N	
18	16	15	2	158	3	2	704	t	f	\N	
18	16	16	2	158	3	2	704	t	f	\N	
18	16	17	2	158	3	2	704	t	f	\N	
18	16	18	2	158	3	2	704	t	f	\N	
18	16	19	2	158	3	2	704	t	f	\N	
18	16	20	2	158	3	2	704	t	f	\N	
18	16	21	2	158	3	2	704	t	f	\N	
18	16	26	2	158	3	2	704	t	f	\N	
18	16	14	2	147	3	2	704	t	f	\N	
18	16	15	2	147	3	2	704	t	f	\N	
18	16	16	2	147	3	2	704	t	f	\N	
18	16	17	2	147	3	2	704	t	f	\N	
18	16	18	2	147	3	2	704	t	f	\N	
18	16	19	2	147	3	2	704	t	f	\N	
18	16	20	2	147	3	2	704	t	f	\N	
18	16	21	2	147	3	2	704	t	f	\N	
18	16	26	2	147	3	2	704	t	f	\N	
18	15	14	2	108	2	2	703	t	f	\N	
18	15	15	2	108	2	2	703	t	f	\N	
18	15	16	2	108	2	2	703	t	f	\N	
18	15	17	2	108	2	2	703	t	f	\N	
18	15	18	2	108	2	2	703	t	f	\N	
18	15	19	2	108	2	2	703	t	f	\N	
18	15	20	2	108	2	2	703	t	f	\N	
18	15	21	2	108	2	2	703	t	f	\N	
18	15	26	2	108	2	2	703	t	f	\N	
18	15	14	2	110	2	2	703	t	f	\N	
18	15	15	2	110	2	2	703	t	f	\N	
18	15	16	2	110	2	2	703	t	f	\N	
18	15	17	2	110	2	2	703	t	f	\N	
18	15	18	2	110	2	2	703	t	f	\N	
18	15	19	2	110	2	2	703	t	f	\N	
18	15	20	2	110	2	2	703	t	f	\N	
18	15	21	2	110	2	2	703	t	f	\N	
18	15	26	2	110	2	2	703	t	f	\N	
18	15	14	2	159	2	2	703	t	f	\N	
18	15	15	2	159	2	2	703	t	f	\N	
18	15	16	2	159	2	2	703	t	f	\N	
18	15	17	2	159	2	2	703	t	f	\N	
18	15	18	2	159	2	2	703	t	f	\N	
18	15	19	2	159	2	2	703	t	f	\N	
18	15	20	2	159	2	2	703	t	f	\N	
18	15	21	2	159	2	2	703	t	f	\N	
18	15	26	2	159	2	2	703	t	f	\N	
18	15	14	2	160	2	2	703	t	f	\N	
18	15	15	2	160	2	2	703	t	f	\N	
18	15	16	2	160	2	2	703	t	f	\N	
18	15	17	2	160	2	2	703	t	f	\N	
18	15	18	2	160	2	2	703	t	f	\N	
18	15	19	2	160	2	2	703	t	f	\N	
18	15	20	2	160	2	2	703	t	f	\N	
18	15	21	2	160	2	2	703	t	f	\N	
18	15	26	2	160	2	2	703	t	f	\N	
18	15	14	2	161	2	2	703	t	f	\N	
18	15	15	2	161	2	2	703	t	f	\N	
18	15	16	2	161	2	2	703	t	f	\N	
18	15	17	2	161	2	2	703	t	f	\N	
18	15	18	2	161	2	2	703	t	f	\N	
18	15	19	2	161	2	2	703	t	f	\N	
18	15	20	2	161	2	2	703	t	f	\N	
18	15	21	2	161	2	2	703	t	f	\N	
18	15	26	2	161	2	2	703	t	f	\N	
18	15	14	2	162	2	2	703	t	f	\N	
18	15	15	2	162	2	2	703	t	f	\N	
18	15	16	2	162	2	2	703	t	f	\N	
18	15	17	2	162	2	2	703	t	f	\N	
18	15	18	2	162	2	2	703	t	f	\N	
18	15	19	2	162	2	2	703	t	f	\N	
18	15	20	2	162	2	2	703	t	f	\N	
18	15	21	2	162	2	2	703	t	f	\N	
18	15	26	2	162	2	2	703	t	f	\N	
18	15	14	2	163	2	2	703	t	f	\N	
18	15	15	2	163	2	2	703	t	f	\N	
18	15	16	2	163	2	2	703	t	f	\N	
18	15	17	2	163	2	2	703	t	f	\N	
18	15	18	2	163	2	2	703	t	f	\N	
18	15	19	2	163	2	2	703	t	f	\N	
18	15	20	2	163	2	2	703	t	f	\N	
18	15	21	2	163	2	2	703	t	f	\N	
18	15	26	2	163	2	2	703	t	f	\N	
18	15	14	2	164	2	2	703	t	f	\N	
18	15	15	2	164	2	2	703	t	f	\N	
18	15	16	2	164	2	2	703	t	f	\N	
18	15	17	2	164	2	2	703	t	f	\N	
18	15	18	2	164	2	2	703	t	f	\N	
18	15	19	2	164	2	2	703	t	f	\N	
18	15	20	2	164	2	2	703	t	f	\N	
18	15	21	2	164	2	2	703	t	f	\N	
18	15	26	2	164	2	2	703	t	f	\N	
18	15	14	2	165	2	2	703	t	f	\N	
18	15	15	2	165	2	2	703	t	f	\N	
18	15	16	2	165	2	2	703	t	f	\N	
18	15	17	2	165	2	2	703	t	f	\N	
18	15	18	2	165	2	2	703	t	f	\N	
18	15	19	2	165	2	2	703	t	f	\N	
18	15	20	2	165	2	2	703	t	f	\N	
18	15	21	2	165	2	2	703	t	f	\N	
18	15	26	2	165	2	2	703	t	f	\N	
18	15	14	2	166	2	2	703	t	f	\N	
18	15	15	2	166	2	2	703	t	f	\N	
18	15	16	2	166	2	2	703	t	f	\N	
18	15	17	2	166	2	2	703	t	f	\N	
18	15	18	2	166	2	2	703	t	f	\N	
18	15	19	2	166	2	2	703	t	f	\N	
18	15	20	2	166	2	2	703	t	f	\N	
18	15	21	2	166	2	2	703	t	f	\N	
18	15	26	2	166	2	2	703	t	f	\N	
18	14	14	1	155	2	2	703	t	f	\N	
18	14	15	1	155	2	2	703	t	f	\N	
18	14	16	1	155	2	2	703	t	f	\N	
18	14	17	1	155	2	2	703	t	f	\N	
18	14	18	1	155	2	2	703	t	f	\N	
18	14	19	1	155	2	2	703	t	f	\N	
18	14	20	1	155	2	2	703	t	f	\N	
18	14	21	1	155	2	2	703	t	f	\N	
18	14	26	1	155	2	2	703	t	f	\N	
18	14	14	1	116	2	2	703	t	f	\N	
18	14	15	1	116	2	2	703	t	f	\N	
18	14	16	1	116	2	2	703	t	f	\N	
18	14	17	1	116	2	2	703	t	f	\N	
18	14	18	1	116	2	2	703	t	f	\N	
18	14	19	1	116	2	2	703	t	f	\N	
18	14	20	1	116	2	2	703	t	f	\N	
18	14	21	1	116	2	2	703	t	f	\N	
18	14	26	1	116	2	2	703	t	f	\N	
18	14	14	1	121	2	2	703	t	f	\N	
18	14	15	1	121	2	2	703	t	f	\N	
18	14	16	1	121	2	2	703	t	f	\N	
18	14	17	1	121	2	2	703	t	f	\N	
18	14	18	1	121	2	2	703	t	f	\N	
18	14	19	1	121	2	2	703	t	f	\N	
18	14	20	1	121	2	2	703	t	f	\N	
18	14	21	1	121	2	2	703	t	f	\N	
18	14	26	1	121	2	2	703	t	f	\N	
18	14	14	1	123	2	2	703	t	f	\N	
18	14	15	1	123	2	2	703	t	f	\N	
18	14	16	1	123	2	2	703	t	f	\N	
18	14	17	1	123	2	2	703	t	f	\N	
18	14	18	1	123	2	2	703	t	f	\N	
18	14	19	1	123	2	2	703	t	f	\N	
18	14	20	1	123	2	2	703	t	f	\N	
18	14	21	1	123	2	2	703	t	f	\N	
18	14	26	1	123	2	2	703	t	f	\N	
18	14	14	1	120	2	2	703	t	f	\N	
18	14	15	1	120	2	2	703	t	f	\N	
18	14	16	1	120	2	2	703	t	f	\N	
18	14	17	1	120	2	2	703	t	f	\N	
18	14	18	1	120	2	2	703	t	f	\N	
18	14	19	1	120	2	2	703	t	f	\N	
18	14	20	1	120	2	2	703	t	f	\N	
18	14	21	1	120	2	2	703	t	f	\N	
18	14	26	1	120	2	2	703	t	f	\N	
18	14	14	1	126	2	2	703	t	f	\N	
18	14	15	1	126	2	2	703	t	f	\N	
18	14	16	1	126	2	2	703	t	f	\N	
18	14	17	1	126	2	2	703	t	f	\N	
18	14	18	1	126	2	2	703	t	f	\N	
18	14	19	1	126	2	2	703	t	f	\N	
18	14	20	1	126	2	2	703	t	f	\N	
18	14	21	1	126	2	2	703	t	f	\N	
18	14	26	1	126	2	2	703	t	f	\N	
18	14	14	1	156	2	2	703	t	f	\N	
18	14	15	1	156	2	2	703	t	f	\N	
18	14	16	1	156	2	2	703	t	f	\N	
18	14	17	1	156	2	2	703	t	f	\N	
18	14	18	1	156	2	2	703	t	f	\N	
18	14	19	1	156	2	2	703	t	f	\N	
18	14	20	1	156	2	2	703	t	f	\N	
18	14	21	1	156	2	2	703	t	f	\N	
18	14	26	1	156	2	2	703	t	f	\N	
18	14	14	1	157	2	2	703	t	f	\N	
18	14	15	1	157	2	2	703	t	f	\N	
18	14	16	1	157	2	2	703	t	f	\N	
18	14	17	1	157	2	2	703	t	f	\N	
18	14	18	1	157	2	2	703	t	f	\N	
18	14	19	1	157	2	2	703	t	f	\N	
18	14	20	1	157	2	2	703	t	f	\N	
18	14	21	1	157	2	2	703	t	f	\N	
18	14	26	1	157	2	2	703	t	f	\N	
18	14	14	1	158	2	2	703	t	f	\N	
18	14	15	1	158	2	2	703	t	f	\N	
18	14	16	1	158	2	2	703	t	f	\N	
18	14	17	1	158	2	2	703	t	f	\N	
18	14	18	1	158	2	2	703	t	f	\N	
18	14	19	1	158	2	2	703	t	f	\N	
18	14	20	1	158	2	2	703	t	f	\N	
18	14	21	1	158	2	2	703	t	f	\N	
18	14	26	1	158	2	2	703	t	f	\N	
18	14	14	1	147	2	2	703	t	f	\N	
18	14	15	1	147	2	2	703	t	f	\N	
18	14	16	1	147	2	2	703	t	f	\N	
18	14	17	1	147	2	2	703	t	f	\N	
18	14	18	1	147	2	2	703	t	f	\N	
18	14	19	1	147	2	2	703	t	f	\N	
18	14	20	1	147	2	2	703	t	f	\N	
18	14	21	1	147	2	2	703	t	f	\N	
18	14	26	1	147	2	2	703	t	f	\N	
18	14	14	2	108	4	2	704	t	f	\N	
18	14	15	2	108	4	2	704	t	f	\N	
18	14	16	2	108	4	2	704	t	f	\N	
18	14	17	2	108	4	2	704	t	f	\N	
18	14	18	2	108	4	2	704	t	f	\N	
18	14	19	2	108	4	2	704	t	f	\N	
18	14	20	2	108	4	2	704	t	f	\N	
18	14	21	2	108	4	2	704	t	f	\N	
18	14	26	2	108	4	2	704	t	f	\N	
18	14	14	2	110	4	2	704	t	f	\N	
18	14	15	2	110	4	2	704	t	f	\N	
18	14	16	2	110	4	2	704	t	f	\N	
18	14	17	2	110	4	2	704	t	f	\N	
18	14	18	2	110	4	2	704	t	f	\N	
18	14	19	2	110	4	2	704	t	f	\N	
18	14	20	2	110	4	2	704	t	f	\N	
18	14	21	2	110	4	2	704	t	f	\N	
18	14	26	2	110	4	2	704	t	f	\N	
18	14	14	2	159	4	2	704	t	f	\N	
18	14	15	2	159	4	2	704	t	f	\N	
18	14	16	2	159	4	2	704	t	f	\N	
18	14	17	2	159	4	2	704	t	f	\N	
18	14	18	2	159	4	2	704	t	f	\N	
18	14	19	2	159	4	2	704	t	f	\N	
18	14	20	2	159	4	2	704	t	f	\N	
18	14	21	2	159	4	2	704	t	f	\N	
18	14	26	2	159	4	2	704	t	f	\N	
18	14	14	2	160	4	2	704	t	f	\N	
18	14	15	2	160	4	2	704	t	f	\N	
18	14	16	2	160	4	2	704	t	f	\N	
18	14	17	2	160	4	2	704	t	f	\N	
18	14	18	2	160	4	2	704	t	f	\N	
18	14	19	2	160	4	2	704	t	f	\N	
18	14	20	2	160	4	2	704	t	f	\N	
18	14	21	2	160	4	2	704	t	f	\N	
18	14	26	2	160	4	2	704	t	f	\N	
18	14	14	2	161	4	2	704	t	f	\N	
18	14	15	2	161	4	2	704	t	f	\N	
18	14	16	2	161	4	2	704	t	f	\N	
18	14	17	2	161	4	2	704	t	f	\N	
18	14	18	2	161	4	2	704	t	f	\N	
18	14	19	2	161	4	2	704	t	f	\N	
18	14	20	2	161	4	2	704	t	f	\N	
18	14	21	2	161	4	2	704	t	f	\N	
18	14	26	2	161	4	2	704	t	f	\N	
18	14	14	2	162	4	2	704	t	f	\N	
18	14	15	2	162	4	2	704	t	f	\N	
18	14	16	2	162	4	2	704	t	f	\N	
18	14	17	2	162	4	2	704	t	f	\N	
18	14	18	2	162	4	2	704	t	f	\N	
18	14	19	2	162	4	2	704	t	f	\N	
18	14	20	2	162	4	2	704	t	f	\N	
18	14	21	2	162	4	2	704	t	f	\N	
18	14	26	2	162	4	2	704	t	f	\N	
18	14	14	2	163	4	2	704	t	f	\N	
18	14	15	2	163	4	2	704	t	f	\N	
18	14	16	2	163	4	2	704	t	f	\N	
18	14	17	2	163	4	2	704	t	f	\N	
18	14	18	2	163	4	2	704	t	f	\N	
18	14	19	2	163	4	2	704	t	f	\N	
18	14	20	2	163	4	2	704	t	f	\N	
18	14	21	2	163	4	2	704	t	f	\N	
18	14	26	2	163	4	2	704	t	f	\N	
18	14	14	2	164	4	2	704	t	f	\N	
18	14	15	2	164	4	2	704	t	f	\N	
18	14	16	2	164	4	2	704	t	f	\N	
18	14	17	2	164	4	2	704	t	f	\N	
18	14	18	2	164	4	2	704	t	f	\N	
18	14	19	2	164	4	2	704	t	f	\N	
18	14	20	2	164	4	2	704	t	f	\N	
18	14	21	2	164	4	2	704	t	f	\N	
18	14	26	2	164	4	2	704	t	f	\N	
18	14	14	2	165	4	2	704	t	f	\N	
18	14	15	2	165	4	2	704	t	f	\N	
18	14	16	2	165	4	2	704	t	f	\N	
18	14	17	2	165	4	2	704	t	f	\N	
18	14	18	2	165	4	2	704	t	f	\N	
18	14	19	2	165	4	2	704	t	f	\N	
18	14	20	2	165	4	2	704	t	f	\N	
18	14	21	2	165	4	2	704	t	f	\N	
18	14	26	2	165	4	2	704	t	f	\N	
18	14	14	2	166	4	2	704	t	f	\N	
18	14	15	2	166	4	2	704	t	f	\N	
18	14	16	2	166	4	2	704	t	f	\N	
18	14	17	2	166	4	2	704	t	f	\N	
18	14	18	2	166	4	2	704	t	f	\N	
18	14	19	2	166	4	2	704	t	f	\N	
18	14	20	2	166	4	2	704	t	f	\N	
18	14	21	2	166	4	2	704	t	f	\N	
18	14	26	2	166	4	2	704	t	f	\N	
18	18	14	1	128	2	1	406	t	f	\N	
18	18	15	1	128	2	1	406	t	f	\N	
18	18	16	1	128	2	1	406	t	f	\N	
18	18	17	1	128	2	1	406	t	f	\N	
18	18	18	1	128	2	1	406	t	f	\N	
18	18	19	1	128	2	1	406	t	f	\N	
18	18	20	1	128	2	1	406	t	f	\N	
18	18	21	1	128	2	1	406	t	f	\N	
18	18	26	1	128	2	1	406	t	f	\N	
18	18	14	1	115	2	1	406	t	f	\N	
18	18	15	1	115	2	1	406	t	f	\N	
18	18	16	1	115	2	1	406	t	f	\N	
18	18	17	1	115	2	1	406	t	f	\N	
18	18	18	1	115	2	1	406	t	f	\N	
18	18	19	1	115	2	1	406	t	f	\N	
18	18	20	1	115	2	1	406	t	f	\N	
18	18	21	1	115	2	1	406	t	f	\N	
18	18	26	1	115	2	1	406	t	f	\N	
18	18	14	1	167	2	1	406	t	f	\N	
18	18	15	1	167	2	1	406	t	f	\N	
18	18	16	1	167	2	1	406	t	f	\N	
18	18	17	1	167	2	1	406	t	f	\N	
18	18	18	1	167	2	1	406	t	f	\N	
18	18	19	1	167	2	1	406	t	f	\N	
18	18	20	1	167	2	1	406	t	f	\N	
18	18	21	1	167	2	1	406	t	f	\N	
18	18	26	1	167	2	1	406	t	f	\N	
18	18	14	1	122	2	1	406	t	f	\N	
18	18	15	1	122	2	1	406	t	f	\N	
18	18	16	1	122	2	1	406	t	f	\N	
18	18	17	1	122	2	1	406	t	f	\N	
18	18	18	1	122	2	1	406	t	f	\N	
18	18	19	1	122	2	1	406	t	f	\N	
18	18	20	1	122	2	1	406	t	f	\N	
18	18	21	1	122	2	1	406	t	f	\N	
18	18	26	1	122	2	1	406	t	f	\N	
18	18	14	1	124	2	1	406	t	f	\N	
18	18	15	1	124	2	1	406	t	f	\N	
18	18	16	1	124	2	1	406	t	f	\N	
18	18	17	1	124	2	1	406	t	f	\N	
18	18	18	1	124	2	1	406	t	f	\N	
18	18	19	1	124	2	1	406	t	f	\N	
18	18	20	1	124	2	1	406	t	f	\N	
18	18	21	1	124	2	1	406	t	f	\N	
18	18	26	1	124	2	1	406	t	f	\N	
18	18	14	1	125	2	1	406	t	f	\N	
18	18	15	1	125	2	1	406	t	f	\N	
18	18	16	1	125	2	1	406	t	f	\N	
18	18	17	1	125	2	1	406	t	f	\N	
18	18	18	1	125	2	1	406	t	f	\N	
18	18	19	1	125	2	1	406	t	f	\N	
18	18	20	1	125	2	1	406	t	f	\N	
18	18	21	1	125	2	1	406	t	f	\N	
18	18	26	1	125	2	1	406	t	f	\N	
18	18	14	1	168	2	1	406	t	f	\N	
18	18	15	1	168	2	1	406	t	f	\N	
18	18	16	1	168	2	1	406	t	f	\N	
18	18	17	1	168	2	1	406	t	f	\N	
18	18	18	1	168	2	1	406	t	f	\N	
18	18	19	1	168	2	1	406	t	f	\N	
18	18	20	1	168	2	1	406	t	f	\N	
18	18	21	1	168	2	1	406	t	f	\N	
18	18	26	1	168	2	1	406	t	f	\N	
18	18	14	1	169	2	1	406	t	f	\N	
18	18	15	1	169	2	1	406	t	f	\N	
18	18	16	1	169	2	1	406	t	f	\N	
18	18	17	1	169	2	1	406	t	f	\N	
18	18	18	1	169	2	1	406	t	f	\N	
18	18	19	1	169	2	1	406	t	f	\N	
18	18	20	1	169	2	1	406	t	f	\N	
18	18	21	1	169	2	1	406	t	f	\N	
18	18	26	1	169	2	1	406	t	f	\N	
18	18	14	1	170	2	1	406	t	f	\N	
18	18	15	1	170	2	1	406	t	f	\N	
18	18	16	1	170	2	1	406	t	f	\N	
18	18	17	1	170	2	1	406	t	f	\N	
18	18	18	1	170	2	1	406	t	f	\N	
18	18	19	1	170	2	1	406	t	f	\N	
18	18	20	1	170	2	1	406	t	f	\N	
18	18	21	1	170	2	1	406	t	f	\N	
18	18	26	1	170	2	1	406	t	f	\N	
18	18	14	1	171	2	1	406	t	f	\N	
18	18	15	1	171	2	1	406	t	f	\N	
18	18	16	1	171	2	1	406	t	f	\N	
18	18	17	1	171	2	1	406	t	f	\N	
18	18	18	1	171	2	1	406	t	f	\N	
18	18	19	1	171	2	1	406	t	f	\N	
18	18	20	1	171	2	1	406	t	f	\N	
18	18	21	1	171	2	1	406	t	f	\N	
18	18	26	1	171	2	1	406	t	f	\N	
18	2	14	2	128	3	2	704	t	f	\N	
18	2	15	2	128	3	2	704	t	f	\N	
18	2	16	2	128	3	2	704	t	f	\N	
18	2	17	2	128	3	2	704	t	f	\N	
18	2	18	2	128	3	2	704	t	f	\N	
18	2	19	2	128	3	2	704	t	f	\N	
18	2	20	2	128	3	2	704	t	f	\N	
18	2	21	2	128	3	2	704	t	f	\N	
18	2	26	2	128	3	2	704	t	f	\N	
18	2	14	2	115	3	2	704	t	f	\N	
18	2	15	2	115	3	2	704	t	f	\N	
18	2	16	2	115	3	2	704	t	f	\N	
18	2	17	2	115	3	2	704	t	f	\N	
18	2	18	2	115	3	2	704	t	f	\N	
18	2	19	2	115	3	2	704	t	f	\N	
18	2	20	2	115	3	2	704	t	f	\N	
18	2	21	2	115	3	2	704	t	f	\N	
18	2	26	2	115	3	2	704	t	f	\N	
18	2	14	2	167	3	2	704	t	f	\N	
18	2	15	2	167	3	2	704	t	f	\N	
18	2	16	2	167	3	2	704	t	f	\N	
18	2	17	2	167	3	2	704	t	f	\N	
18	2	18	2	167	3	2	704	t	f	\N	
18	2	19	2	167	3	2	704	t	f	\N	
18	2	20	2	167	3	2	704	t	f	\N	
18	2	21	2	167	3	2	704	t	f	\N	
18	2	26	2	167	3	2	704	t	f	\N	
18	2	14	2	122	3	2	704	t	f	\N	
18	2	15	2	122	3	2	704	t	f	\N	
18	2	16	2	122	3	2	704	t	f	\N	
18	2	17	2	122	3	2	704	t	f	\N	
18	2	18	2	122	3	2	704	t	f	\N	
18	2	19	2	122	3	2	704	t	f	\N	
18	2	20	2	122	3	2	704	t	f	\N	
18	2	21	2	122	3	2	704	t	f	\N	
18	2	26	2	122	3	2	704	t	f	\N	
18	2	14	2	124	3	2	704	t	f	\N	
18	2	15	2	124	3	2	704	t	f	\N	
18	2	16	2	124	3	2	704	t	f	\N	
18	2	17	2	124	3	2	704	t	f	\N	
18	2	18	2	124	3	2	704	t	f	\N	
18	2	19	2	124	3	2	704	t	f	\N	
18	2	20	2	124	3	2	704	t	f	\N	
18	2	21	2	124	3	2	704	t	f	\N	
18	2	26	2	124	3	2	704	t	f	\N	
18	2	14	2	125	3	2	704	t	f	\N	
18	2	15	2	125	3	2	704	t	f	\N	
18	2	16	2	125	3	2	704	t	f	\N	
18	2	17	2	125	3	2	704	t	f	\N	
18	2	18	2	125	3	2	704	t	f	\N	
18	2	19	2	125	3	2	704	t	f	\N	
18	2	20	2	125	3	2	704	t	f	\N	
18	2	21	2	125	3	2	704	t	f	\N	
18	2	26	2	125	3	2	704	t	f	\N	
18	2	14	2	168	3	2	704	t	f	\N	
18	2	15	2	168	3	2	704	t	f	\N	
18	2	16	2	168	3	2	704	t	f	\N	
18	2	17	2	168	3	2	704	t	f	\N	
18	2	18	2	168	3	2	704	t	f	\N	
18	2	19	2	168	3	2	704	t	f	\N	
18	2	20	2	168	3	2	704	t	f	\N	
18	2	21	2	168	3	2	704	t	f	\N	
18	2	26	2	168	3	2	704	t	f	\N	
18	2	14	2	169	3	2	704	t	f	\N	
18	2	15	2	169	3	2	704	t	f	\N	
18	2	16	2	169	3	2	704	t	f	\N	
18	2	17	2	169	3	2	704	t	f	\N	
18	2	18	2	169	3	2	704	t	f	\N	
18	2	19	2	169	3	2	704	t	f	\N	
18	2	20	2	169	3	2	704	t	f	\N	
18	2	21	2	169	3	2	704	t	f	\N	
18	2	26	2	169	3	2	704	t	f	\N	
18	2	14	2	170	3	2	704	t	f	\N	
18	2	15	2	170	3	2	704	t	f	\N	
18	2	16	2	170	3	2	704	t	f	\N	
18	2	17	2	170	3	2	704	t	f	\N	
18	2	18	2	170	3	2	704	t	f	\N	
18	2	19	2	170	3	2	704	t	f	\N	
18	2	20	2	170	3	2	704	t	f	\N	
18	2	21	2	170	3	2	704	t	f	\N	
18	2	26	2	170	3	2	704	t	f	\N	
18	2	14	2	171	3	2	704	t	f	\N	
18	2	15	2	171	3	2	704	t	f	\N	
18	2	16	2	171	3	2	704	t	f	\N	
18	2	17	2	171	3	2	704	t	f	\N	
18	2	18	2	171	3	2	704	t	f	\N	
18	2	19	2	171	3	2	704	t	f	\N	
18	2	20	2	171	3	2	704	t	f	\N	
18	2	21	2	171	3	2	704	t	f	\N	
18	2	26	2	171	3	2	704	t	f	\N	
18	1	14	1	128	4	1	306	t	f	\N	
18	1	15	1	128	4	1	306	t	f	\N	
18	1	16	1	128	4	1	306	t	f	\N	
18	1	17	1	128	4	1	306	t	f	\N	
18	1	18	1	128	4	1	306	t	f	\N	
18	1	19	1	128	4	1	306	t	f	\N	
18	1	20	1	128	4	1	306	t	f	\N	
18	1	21	1	128	4	1	306	t	f	\N	
18	1	26	1	128	4	1	306	t	f	\N	
18	1	14	1	115	4	1	306	t	f	\N	
18	1	15	1	115	4	1	306	t	f	\N	
18	1	16	1	115	4	1	306	t	f	\N	
18	1	17	1	115	4	1	306	t	f	\N	
18	1	18	1	115	4	1	306	t	f	\N	
18	1	19	1	115	4	1	306	t	f	\N	
18	1	20	1	115	4	1	306	t	f	\N	
18	1	21	1	115	4	1	306	t	f	\N	
18	1	26	1	115	4	1	306	t	f	\N	
18	1	14	1	167	4	1	306	t	f	\N	
18	1	15	1	167	4	1	306	t	f	\N	
18	1	16	1	167	4	1	306	t	f	\N	
18	1	17	1	167	4	1	306	t	f	\N	
18	1	18	1	167	4	1	306	t	f	\N	
18	1	19	1	167	4	1	306	t	f	\N	
18	1	20	1	167	4	1	306	t	f	\N	
18	1	21	1	167	4	1	306	t	f	\N	
18	1	26	1	167	4	1	306	t	f	\N	
18	1	14	1	122	4	1	306	t	f	\N	
18	1	15	1	122	4	1	306	t	f	\N	
18	1	16	1	122	4	1	306	t	f	\N	
18	1	17	1	122	4	1	306	t	f	\N	
18	1	18	1	122	4	1	306	t	f	\N	
18	1	19	1	122	4	1	306	t	f	\N	
18	1	20	1	122	4	1	306	t	f	\N	
18	1	21	1	122	4	1	306	t	f	\N	
18	1	26	1	122	4	1	306	t	f	\N	
18	1	14	1	124	4	1	306	t	f	\N	
18	1	15	1	124	4	1	306	t	f	\N	
18	1	16	1	124	4	1	306	t	f	\N	
18	1	17	1	124	4	1	306	t	f	\N	
18	1	18	1	124	4	1	306	t	f	\N	
18	1	19	1	124	4	1	306	t	f	\N	
18	1	20	1	124	4	1	306	t	f	\N	
18	1	21	1	124	4	1	306	t	f	\N	
18	1	26	1	124	4	1	306	t	f	\N	
18	1	14	1	125	4	1	306	t	f	\N	
18	1	15	1	125	4	1	306	t	f	\N	
18	1	16	1	125	4	1	306	t	f	\N	
18	1	17	1	125	4	1	306	t	f	\N	
18	1	18	1	125	4	1	306	t	f	\N	
18	1	19	1	125	4	1	306	t	f	\N	
18	1	20	1	125	4	1	306	t	f	\N	
18	1	21	1	125	4	1	306	t	f	\N	
18	1	26	1	125	4	1	306	t	f	\N	
18	1	14	1	168	4	1	306	t	f	\N	
18	1	15	1	168	4	1	306	t	f	\N	
18	1	16	1	168	4	1	306	t	f	\N	
18	1	17	1	168	4	1	306	t	f	\N	
18	1	18	1	168	4	1	306	t	f	\N	
18	1	19	1	168	4	1	306	t	f	\N	
18	1	20	1	168	4	1	306	t	f	\N	
18	1	21	1	168	4	1	306	t	f	\N	
18	1	26	1	168	4	1	306	t	f	\N	
18	1	14	1	169	4	1	306	t	f	\N	
18	1	15	1	169	4	1	306	t	f	\N	
18	1	16	1	169	4	1	306	t	f	\N	
18	1	17	1	169	4	1	306	t	f	\N	
18	1	18	1	169	4	1	306	t	f	\N	
18	1	19	1	169	4	1	306	t	f	\N	
18	1	20	1	169	4	1	306	t	f	\N	
18	1	21	1	169	4	1	306	t	f	\N	
18	1	26	1	169	4	1	306	t	f	\N	
18	1	14	1	170	4	1	306	t	f	\N	
18	1	15	1	170	4	1	306	t	f	\N	
18	1	16	1	170	4	1	306	t	f	\N	
18	1	17	1	170	4	1	306	t	f	\N	
18	1	18	1	170	4	1	306	t	f	\N	
18	1	19	1	170	4	1	306	t	f	\N	
18	1	20	1	170	4	1	306	t	f	\N	
18	1	21	1	170	4	1	306	t	f	\N	
18	1	26	1	170	4	1	306	t	f	\N	
18	1	14	1	171	4	1	306	t	f	\N	
18	1	15	1	171	4	1	306	t	f	\N	
18	1	16	1	171	4	1	306	t	f	\N	
18	1	17	1	171	4	1	306	t	f	\N	
18	1	18	1	171	4	1	306	t	f	\N	
18	1	19	1	171	4	1	306	t	f	\N	
18	1	20	1	171	4	1	306	t	f	\N	
18	1	21	1	171	4	1	306	t	f	\N	
18	1	26	1	171	4	1	306	t	f	\N	
18	2	17	1	133	2	1	704	t	f	34	
\.


--
-- Data for Name: positions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.positions (id, name, short_name) FROM stdin;
1	Аспирант	Асп
2	Ассистент	Асс.
3	Ведущий научный сотрудник	Внс.
4	Главный научный сотрудник	Гнс
5	Доцент	Доц.
6	Младший научный сотрудник	Мнс.
7	Научный сотрудник	Нс.
8	Преподаватель	Преп.
9	Профессор	Проф.
10	Старший преподаватель	Ст.преп.
11	Старший научный сотрудник	Снс.
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, full_name, short_name) FROM stdin;
1	admin	Администратор	Адм.
2	curator	Куратор/преподаватель	К/П
3	teacher	Преподаватель	Пр.
4	manager	Менеджер	Мн.
\.


--
-- Data for Name: schedules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schedules (user_id, subject_id, group_id, type_id, week_day_id, time_id, corps_id, hall) FROM stdin;
18	18	1	1	2	2	1	306
18	2	1	2	2	3	2	704
18	1	1	1	2	4	1	408
18	2	1	1	3	2	2	702
18	18	1	2	3	3	2	704
18	1	1	2	3	4	2	704
18	16	1	1	4	1	1	801
18	14	1	1	4	2	2	512
18	16	1	2	4	3	2	704
18	15	1	2	5	4	2	404
18	14	1	2	5	2	2	702
18	19	1	1	1	1	2	306
18	19	1	2	1	2	2	306
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (id, group_id, surname, name, patronymic, budget) FROM stdin;
14	1	Дудь	Екатерина	Юрьевна	t
15	1	Алимова	Алина	Юрьевна	t
16	1	Барнич	Павел	Егорович	f
17	1	Абрамов	Павел	Сергеевич	t
18	1	Мизари	Анна	Юрьевна	f
19	1	Мизари	Павел	Юрьевич	f
20	1	Толмокова	Анна	Сергеевна	f
21	1	Олейников	Никита	Юрьевич	t
26	1	Кабанец	Роман	Михайлович	t
\.


--
-- Data for Name: subject_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subject_types (id, name) FROM stdin;
2	Практическое занятие
3	Модуль
1	Лекция
\.


--
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subjects (id, name) FROM stdin;
1	Матанализ
2	ДВВ
14	Теория принятия решений
15	Исследование операций
16	Разработка веб-приложений
18	БД
19	Основы сложных систем
\.


--
-- Data for Name: times; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.times (id, "time") FROM stdin;
1	08:30:00
2	10:25:00
3	12:35:00
4	14:30:00
5	16:25:00
6	18:10:00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, surname, name, patronymic, email, password, admin, department_id, position_id, role_id, phone_number, confirmed, "resetPasswordToken", "resetPasswordExpires") FROM stdin;
18	Олейников	Никита	Юрьевич	theloodor@gmail.com	$2a$10$tc.u4dmc5BjrV6sDv4rDxe9FnwCfGn7/Mpn3dcjJc8RqWkQ73geV.	f	1	9	3	+38 (095) 87 94 933	t	\N	\N
45	Адм	Администратор	Администраторович	admin@gmail.com	$2a$10$p7LIjWS/wEpNG896DIGN2OB6380p6ArrMMoeqzJpVJAPbOogQXvuG	f	1	7	1	+38 (093) 87 96 977	t	\N	\N
46	test	test	test	admin1@gmail.com	$2a$10$ObabaHbYy08GrXNPZYbwdOueCYBtC1LITbI0LNmIxy4APtJw355KO	f	2	4	1		t	\N	\N
47	qweqwe	ыы	asdasd	test1@gmail.com	$2a$10$zC.S/lIuPYn3LAcUBA250e38.0tbls7zm7fOvabm7pisAW1FNM2Qq	f	1	11	3	+38 (055) 55 55 555	t	\N	\N
48	Фамилия	Имя	Отвество	ttttt@gmail.com	$2a$10$zC.S/lIuPYn3LAcUBA250e38.0tbls7zm7fOvabm7pisAW1FNM2Qq	f	1	4	3	\N	t	\N	\N
49	asdasdasd	asdasdsdsa	asdasdasd	tttett@gmail.com	$2a$10$zC.S/lIuPYn3LAcUBA250e38.0tbls7zm7fOvabm7pisAW1FNM2Qq	f	1	5	3	\N	t	\N	\N
50	wwwwww	wwwwww	wwwwww	wwwww@gmail.com	$2a$10$zC.S/lIuPYn3LAcUBA250e38.0tbls7zm7fOvabm7pisAW1FNM2Qq	f	1	3	3	\N	t	\N	\N
51	qweqweqwe	qweqweqwe	qweqwewqe	qweqwe@gmail.com	$2a$10$zC.S/lIuPYn3LAcUBA250e38.0tbls7zm7fOvabm7pisAW1FNM2Qq	f	1	5	3	\N	t	\N	\N
52	яяяяяя	яяяяяяя	яяяяяяя	qqazq@gmail.com	$2a$10$zC.S/lIuPYn3LAcUBA250e38.0tbls7zm7fOvabm7pisAW1FNM2Qq	f	1	3	3	\N	t	\N	\N
53	jklasfjdksdjf	akjsdaskdj	aslkjfdfj	kjflkd@gmail.com	$2a$10$zC.S/lIuPYn3LAcUBA250e38.0tbls7zm7fOvabm7pisAW1FNM2Qq	f	1	7	3	\N	t	\N	\N
54	pppppppp	pppppp	ppppppp	ppppp@gmail.com	$2a$10$zC.S/lIuPYn3LAcUBA250e38.0tbls7zm7fOvabm7pisAW1FNM2Qq	f	2	8	3	\N	t	\N	\N
55	uuuuuu	uuuuuu	uuuuuuu	uuuuu@gmail.com	$2a$10$zC.S/lIuPYn3LAcUBA250e38.0tbls7zm7fOvabm7pisAW1FNM2Qq	f	2	9	3	\N	t	\N	\N
56	qewqew	qew	eqew	qew@gmail.com	$2a$10$zC.S/lIuPYn3LAcUBA250e38.0tbls7zm7fOvabm7pisAW1FNM2Qq	f	2	4	3	\N	t	\N	\N
57	eeeeeeee	eeeeeee	eeeeeeee	eeeeee@gmail.com	$2a$10$zC.S/lIuPYn3LAcUBA250e38.0tbls7zm7fOvabm7pisAW1FNM2Qq	f	2	4	3	\N	t	\N	\N
\.


--
-- Data for Name: week_days; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.week_days (id, name) FROM stdin;
1	Понедельник
2	Вторник
3	Среда
4	Четверг
5	Пятница
6	Суббота
7	Воскресенье
\.


--
-- Name: corps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.corps_id_seq', 4, true);


--
-- Name: dates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dates_id_seq', 175, true);


--
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_id_seq', 7, true);


--
-- Name: groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.groups_id_seq', 7, true);


--
-- Name: positions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.positions_id_seq', 14, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 9, true);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_id_seq', 27, true);


--
-- Name: subject_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subject_types_id_seq', 5, true);


--
-- Name: subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subjects_id_seq', 20, true);


--
-- Name: times_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.times_id_seq', 6, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 58, true);


--
-- Name: week_days_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.week_days_id_seq', 10, true);


--
-- Name: corps corps_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.corps
    ADD CONSTRAINT corps_name_key UNIQUE (name);


--
-- Name: departments departments_full_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_full_name_key UNIQUE (full_name);


--
-- Name: departments departments_name_full_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_name_full_name_key UNIQUE (name);


--
-- Name: groups groups_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_name_key UNIQUE (name);


--
-- Name: positions positions_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_name_key UNIQUE (name);


--
-- Name: positions positions_short_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_short_name_key UNIQUE (short_name);


--
-- Name: roles roles_full_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_full_name_key UNIQUE (full_name);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_short_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_short_name_key UNIQUE (short_name);


--
-- Name: corps sqlite_autoindex_corps_2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.corps
    ADD CONSTRAINT sqlite_autoindex_corps_2 PRIMARY KEY (id);


--
-- Name: dates sqlite_autoindex_dates_1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dates
    ADD CONSTRAINT sqlite_autoindex_dates_1 PRIMARY KEY (id);


--
-- Name: departments sqlite_autoindex_departments_2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT sqlite_autoindex_departments_2 PRIMARY KEY (id);


--
-- Name: groups sqlite_autoindex_groups_2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT sqlite_autoindex_groups_2 PRIMARY KEY (id);


--
-- Name: journals sqlite_autoindex_journals_1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journals
    ADD CONSTRAINT sqlite_autoindex_journals_1 PRIMARY KEY (subject_id, student_id, type_id, date_id, time_id);


--
-- Name: positions sqlite_autoindex_positions_2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions
    ADD CONSTRAINT sqlite_autoindex_positions_2 PRIMARY KEY (id);


--
-- Name: roles sqlite_autoindex_roles_3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT sqlite_autoindex_roles_3 PRIMARY KEY (id);


--
-- Name: schedules sqlite_autoindex_schedules_1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT sqlite_autoindex_schedules_1 PRIMARY KEY (subject_id, group_id, type_id, week_day_id, time_id);


--
-- Name: students sqlite_autoindex_students_1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT sqlite_autoindex_students_1 PRIMARY KEY (id);


--
-- Name: subject_types sqlite_autoindex_subject_types_1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject_types
    ADD CONSTRAINT sqlite_autoindex_subject_types_1 PRIMARY KEY (id);


--
-- Name: subjects sqlite_autoindex_subjects_1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT sqlite_autoindex_subjects_1 PRIMARY KEY (id);


--
-- Name: times sqlite_autoindex_times_1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.times
    ADD CONSTRAINT sqlite_autoindex_times_1 PRIMARY KEY (id);


--
-- Name: users sqlite_autoindex_users_2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT sqlite_autoindex_users_2 PRIMARY KEY (id);


--
-- Name: week_days sqlite_autoindex_week_days_1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.week_days
    ADD CONSTRAINT sqlite_autoindex_week_days_1 PRIMARY KEY (id);


--
-- Name: subject_types subject_types_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject_types
    ADD CONSTRAINT subject_types_name_key UNIQUE (name);


--
-- Name: times times_time_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.times
    ADD CONSTRAINT times_time_key UNIQUE ("time");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: week_days week_days_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.week_days
    ADD CONSTRAINT week_days_name_key UNIQUE (name);


--
-- Name: journals fk__corps_0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journals
    ADD CONSTRAINT fk__corps_0 FOREIGN KEY (corps_id) REFERENCES public.corps(id);


--
-- Name: schedules fk__corps_0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT fk__corps_0 FOREIGN KEY (corps_id) REFERENCES public.corps(id);


--
-- Name: journals fk__dates_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journals
    ADD CONSTRAINT fk__dates_2 FOREIGN KEY (date_id) REFERENCES public.dates(id);


--
-- Name: groups fk__departments_0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT fk__departments_0 FOREIGN KEY (department_id) REFERENCES public.departments(id);


--
-- Name: users fk__departments_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk__departments_2 FOREIGN KEY (department_id) REFERENCES public.departments(id);


--
-- Name: students fk__groups_0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT fk__groups_0 FOREIGN KEY (group_id) REFERENCES public.groups(id);


--
-- Name: schedules fk__groups_4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT fk__groups_4 FOREIGN KEY (group_id) REFERENCES public.groups(id);


--
-- Name: users fk__positions_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk__positions_1 FOREIGN KEY (position_id) REFERENCES public.positions(id);


--
-- Name: users fk__roles_0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk__roles_0 FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: journals fk__students_4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journals
    ADD CONSTRAINT fk__students_4 FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: journals fk__subject_types_3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journals
    ADD CONSTRAINT fk__subject_types_3 FOREIGN KEY (type_id) REFERENCES public.subject_types(id);


--
-- Name: schedules fk__subject_types_3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT fk__subject_types_3 FOREIGN KEY (type_id) REFERENCES public.subject_types(id);


--
-- Name: journals fk__subjects_5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journals
    ADD CONSTRAINT fk__subjects_5 FOREIGN KEY (subject_id) REFERENCES public.subjects(id);


--
-- Name: schedules fk__subjects_5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT fk__subjects_5 FOREIGN KEY (subject_id) REFERENCES public.subjects(id);


--
-- Name: journals fk__times_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.journals
    ADD CONSTRAINT fk__times_1 FOREIGN KEY (time_id) REFERENCES public.times(id);


--
-- Name: schedules fk__times_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT fk__times_1 FOREIGN KEY (time_id) REFERENCES public.times(id);


--
-- Name: schedules fk__week_days_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT fk__week_days_2 FOREIGN KEY (week_day_id) REFERENCES public.week_days(id);


--
-- PostgreSQL database dump complete
--

