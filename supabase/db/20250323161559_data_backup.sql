SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
00000000-0000-0000-0000-000000000000	73c51865-9e5c-4386-aa12-75d82174d89d	{"action":"user_signedup","actor_id":"e2495bd6-08d7-44dd-bf14-cd07fa6b640c","actor_username":"super1@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-23 06:57:02.644375+00	
00000000-0000-0000-0000-000000000000	c240d5d5-06d5-46e8-87d2-1c3f515fdad5	{"action":"login","actor_id":"e2495bd6-08d7-44dd-bf14-cd07fa6b640c","actor_username":"super1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-23 06:57:02.646272+00	
00000000-0000-0000-0000-000000000000	af9a94b7-5569-4db2-90f1-7deb193de96d	{"action":"user_signedup","actor_id":"0e4011f6-3bb9-4fa8-b640-f7819de52175","actor_username":"super2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-23 06:57:11.816565+00	
00000000-0000-0000-0000-000000000000	0f62d988-57f4-44cb-ba77-7a1997ab60b5	{"action":"login","actor_id":"0e4011f6-3bb9-4fa8-b640-f7819de52175","actor_username":"super2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-23 06:57:11.818379+00	
00000000-0000-0000-0000-000000000000	c15eb01a-9420-43f3-a3db-51bf43a59221	{"action":"user_signedup","actor_id":"45bd71a9-c007-47f1-9073-ca28f6ddf25c","actor_username":"emp1@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-23 06:57:42.561605+00	
00000000-0000-0000-0000-000000000000	7515003d-50bd-43f6-8ed1-08de01fad3cb	{"action":"login","actor_id":"45bd71a9-c007-47f1-9073-ca28f6ddf25c","actor_username":"emp1@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-23 06:57:42.564237+00	
00000000-0000-0000-0000-000000000000	2d24deab-2dfb-4b92-94ed-381c16d939cb	{"action":"user_signedup","actor_id":"1089f6ef-7be0-4c18-a1c2-16e8a4a55764","actor_username":"emp2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-23 06:57:51.202467+00	
00000000-0000-0000-0000-000000000000	88bea3db-309c-4584-9caa-32bad6c7d5be	{"action":"login","actor_id":"1089f6ef-7be0-4c18-a1c2-16e8a4a55764","actor_username":"emp2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-23 06:57:51.203874+00	
00000000-0000-0000-0000-000000000000	87582551-1801-4b00-9488-a9437b8178a0	{"action":"user_signedup","actor_id":"930c5f4a-d0c4-44e8-9f71-455f38702ba9","actor_username":"emp3@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-03-23 06:58:01.453062+00	
00000000-0000-0000-0000-000000000000	57ce8421-39e7-4eea-a673-12f878a1d960	{"action":"login","actor_id":"930c5f4a-d0c4-44e8-9f71-455f38702ba9","actor_username":"emp3@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-03-23 06:58:01.454795+00	
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") FROM stdin;
00000000-0000-0000-0000-000000000000	45bd71a9-c007-47f1-9073-ca28f6ddf25c	authenticated	authenticated	emp1@gmail.com	$2a$10$bRFoaWwBnuOQtYQomKI2reKTQeB/CH7sDdbbkxYZ3XGf6gz5hppPq	2025-03-23 06:57:42.56187+00	\N		\N		\N			\N	2025-03-23 06:57:42.564555+00	{"provider": "email", "providers": ["email"]}	{"sub": "45bd71a9-c007-47f1-9073-ca28f6ddf25c", "name": "Emp1", "email": "emp1@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-03-23 06:57:42.559336+00	2025-03-23 06:57:42.565399+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	e2495bd6-08d7-44dd-bf14-cd07fa6b640c	authenticated	authenticated	super1@gmail.com	$2a$10$2Ody68Nxs/sIytcDtSX3i.q9Agc38tW50CisEi7sequdeG/xNbcUe	2025-03-23 06:57:02.644804+00	\N		\N		\N			\N	2025-03-23 06:57:02.64679+00	{"provider": "email", "providers": ["email"]}	{"sub": "e2495bd6-08d7-44dd-bf14-cd07fa6b640c", "name": "Super1", "email": "super1@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-03-23 06:57:02.635848+00	2025-03-23 06:57:02.648318+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	1089f6ef-7be0-4c18-a1c2-16e8a4a55764	authenticated	authenticated	emp2@gmail.com	$2a$10$cvFetLCY2NhFwcRaRaLcJeqn2WR6xr2eElTShxywby0XVLZ.F3nO2	2025-03-23 06:57:51.20275+00	\N		\N		\N			\N	2025-03-23 06:57:51.204256+00	{"provider": "email", "providers": ["email"]}	{"sub": "1089f6ef-7be0-4c18-a1c2-16e8a4a55764", "name": "Emp2", "email": "emp2@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-03-23 06:57:51.199727+00	2025-03-23 06:57:51.205061+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	0e4011f6-3bb9-4fa8-b640-f7819de52175	authenticated	authenticated	super2@gmail.com	$2a$10$srCRQpZ1vVJegd/Zln9GBO.JKpPA8.jbvIx5ElAcjbPsfN7i8yVWO	2025-03-23 06:57:11.816828+00	\N		\N		\N			\N	2025-03-23 06:57:11.818809+00	{"provider": "email", "providers": ["email"]}	{"sub": "0e4011f6-3bb9-4fa8-b640-f7819de52175", "name": "Super2", "email": "super2@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-03-23 06:57:11.814088+00	2025-03-23 06:57:11.819705+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	930c5f4a-d0c4-44e8-9f71-455f38702ba9	authenticated	authenticated	emp3@gmail.com	$2a$10$OYYaw4AUHkvV7nQSH6qsWeHX3SxqbkbYmo2cUjzge2qBUBD9BHhIu	2025-03-23 06:58:01.45331+00	\N		\N		\N			\N	2025-03-23 06:58:01.455115+00	{"provider": "email", "providers": ["email"]}	{"sub": "930c5f4a-d0c4-44e8-9f71-455f38702ba9", "name": "Emp3", "email": "emp3@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-03-23 06:58:01.450712+00	2025-03-23 06:58:01.455861+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
e2495bd6-08d7-44dd-bf14-cd07fa6b640c	e2495bd6-08d7-44dd-bf14-cd07fa6b640c	{"sub": "e2495bd6-08d7-44dd-bf14-cd07fa6b640c", "name": "Super1", "email": "super1@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-03-23 06:57:02.642895+00	2025-03-23 06:57:02.642913+00	2025-03-23 06:57:02.642913+00	6364f461-2f50-42af-967c-1f379ae2e1fb
0e4011f6-3bb9-4fa8-b640-f7819de52175	0e4011f6-3bb9-4fa8-b640-f7819de52175	{"sub": "0e4011f6-3bb9-4fa8-b640-f7819de52175", "name": "Super2", "email": "super2@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-03-23 06:57:11.81556+00	2025-03-23 06:57:11.815579+00	2025-03-23 06:57:11.815579+00	d417b576-8f37-4a3a-b278-84c1ca551017
45bd71a9-c007-47f1-9073-ca28f6ddf25c	45bd71a9-c007-47f1-9073-ca28f6ddf25c	{"sub": "45bd71a9-c007-47f1-9073-ca28f6ddf25c", "name": "Emp1", "email": "emp1@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-03-23 06:57:42.560611+00	2025-03-23 06:57:42.560627+00	2025-03-23 06:57:42.560627+00	66168758-bb63-44b6-94dc-75446e9f593c
1089f6ef-7be0-4c18-a1c2-16e8a4a55764	1089f6ef-7be0-4c18-a1c2-16e8a4a55764	{"sub": "1089f6ef-7be0-4c18-a1c2-16e8a4a55764", "name": "Emp2", "email": "emp2@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-03-23 06:57:51.201439+00	2025-03-23 06:57:51.201474+00	2025-03-23 06:57:51.201474+00	ffc42b3a-4a3e-49c5-bc4e-8f983402165a
930c5f4a-d0c4-44e8-9f71-455f38702ba9	930c5f4a-d0c4-44e8-9f71-455f38702ba9	{"sub": "930c5f4a-d0c4-44e8-9f71-455f38702ba9", "name": "Emp3", "email": "emp3@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-03-23 06:58:01.452085+00	2025-03-23 06:58:01.452104+00	2025-03-23 06:58:01.452104+00	051dc41c-689b-4dc9-8988-e8f5827e0770
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") FROM stdin;
a3059da8-4f1e-49be-8259-b6b288985a61	e2495bd6-08d7-44dd-bf14-cd07fa6b640c	2025-03-23 06:57:02.646818+00	2025-03-23 06:57:02.646818+00	\N	aal1	\N	\N	Expo/2.32.17 CFNetwork/1496.0.7 Darwin/23.4.0	192.168.65.1	\N
cac80b5a-f0ec-4063-8979-b7ad612eeb88	0e4011f6-3bb9-4fa8-b640-f7819de52175	2025-03-23 06:57:11.818847+00	2025-03-23 06:57:11.818847+00	\N	aal1	\N	\N	Expo/2.32.17 CFNetwork/1496.0.7 Darwin/23.4.0	192.168.65.1	\N
df0419b3-5fb3-470e-82d8-9c20a520b00f	45bd71a9-c007-47f1-9073-ca28f6ddf25c	2025-03-23 06:57:42.564586+00	2025-03-23 06:57:42.564586+00	\N	aal1	\N	\N	Expo/2.32.17 CFNetwork/1496.0.7 Darwin/23.4.0	192.168.65.1	\N
e15e4141-9ed1-4a79-8820-0baa300e161f	1089f6ef-7be0-4c18-a1c2-16e8a4a55764	2025-03-23 06:57:51.204295+00	2025-03-23 06:57:51.204295+00	\N	aal1	\N	\N	Expo/2.32.17 CFNetwork/1496.0.7 Darwin/23.4.0	192.168.65.1	\N
66353a79-6b13-44c2-891d-1eb5cbb895b9	930c5f4a-d0c4-44e8-9f71-455f38702ba9	2025-03-23 06:58:01.455145+00	2025-03-23 06:58:01.455145+00	\N	aal1	\N	\N	Expo/2.32.17 CFNetwork/1496.0.7 Darwin/23.4.0	192.168.65.1	\N
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
a3059da8-4f1e-49be-8259-b6b288985a61	2025-03-23 06:57:02.648494+00	2025-03-23 06:57:02.648494+00	password	f8d24cba-4cf1-4c49-ba20-004117475260
cac80b5a-f0ec-4063-8979-b7ad612eeb88	2025-03-23 06:57:11.819828+00	2025-03-23 06:57:11.819828+00	password	0a6e8df2-8bb1-45b1-80ec-c215c4d5de97
df0419b3-5fb3-470e-82d8-9c20a520b00f	2025-03-23 06:57:42.565525+00	2025-03-23 06:57:42.565525+00	password	b5443955-faf0-4b09-9d00-6386058524d8
e15e4141-9ed1-4a79-8820-0baa300e161f	2025-03-23 06:57:51.205184+00	2025-03-23 06:57:51.205184+00	password	f3a0d1f0-96ce-47d1-a81d-b22d12217ee9
66353a79-6b13-44c2-891d-1eb5cbb895b9	2025-03-23 06:58:01.45599+00	2025-03-23 06:58:01.45599+00	password	42dfd67b-d849-44bc-8c85-b44615419594
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret", "phone", "last_challenged_at", "web_authn_credential", "web_authn_aaguid") FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address", "otp_code", "web_authn_session_data") FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
00000000-0000-0000-0000-000000000000	1	so4jQfz66HV5Peo8aqDJbQ	e2495bd6-08d7-44dd-bf14-cd07fa6b640c	f	2025-03-23 06:57:02.647515+00	2025-03-23 06:57:02.647515+00	\N	a3059da8-4f1e-49be-8259-b6b288985a61
00000000-0000-0000-0000-000000000000	2	tfVg_VWrywe9T6ZSQPdD_Q	0e4011f6-3bb9-4fa8-b640-f7819de52175	f	2025-03-23 06:57:11.819288+00	2025-03-23 06:57:11.819288+00	\N	cac80b5a-f0ec-4063-8979-b7ad612eeb88
00000000-0000-0000-0000-000000000000	3	HGSgZueH8jaQtQxQ66gR2A	45bd71a9-c007-47f1-9073-ca28f6ddf25c	f	2025-03-23 06:57:42.564919+00	2025-03-23 06:57:42.564919+00	\N	df0419b3-5fb3-470e-82d8-9c20a520b00f
00000000-0000-0000-0000-000000000000	4	SUiL0O7IpMvrWYRwUHZ_oA	1089f6ef-7be0-4c18-a1c2-16e8a4a55764	f	2025-03-23 06:57:51.20468+00	2025-03-23 06:57:51.20468+00	\N	e15e4141-9ed1-4a79-8820-0baa300e161f
00000000-0000-0000-0000-000000000000	5	405noCkdK9buffjae4ZJdg	930c5f4a-d0c4-44e8-9f71-455f38702ba9	f	2025-03-23 06:58:01.455456+00	2025-03-23 06:58:01.455456+00	\N	66353a79-6b13-44c2-891d-1eb5cbb895b9
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at", "name_id_format") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

COPY "pgsodium"."key" ("id", "status", "created", "expires", "key_type", "key_id", "key_context", "name", "associated_data", "raw_key", "raw_key_nonce", "parent_key", "comment", "user_data") FROM stdin;
\.


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."departments" ("department_id", "department_name", "department_desc", "created_on") FROM stdin;
1	App Dev Tutoring service	Offering tutoring serices to app development students	2025-03-23 06:44:56.170765+00
2	Computer Science Tutoring service	Offering tutoring serices to app development students	2025-03-23 06:44:56.170765+00
\.


--
-- Data for Name: positions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."positions" ("position_id", "position_name", "position_desc", "created_on") FROM stdin;
1	AD Tutor	Help other students learn the subject material....	2025-03-23 06:44:40.002931+00
2	Teacher Assistant	Teachers aid...	2025-03-23 06:44:40.002931+00
3	Food Court Cashier	Help monitor self-checkout...	2025-03-23 06:44:40.002931+00
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profiles" ("profile_id", "profile_int_id", "name", "email", "role", "position", "supervisor") FROM stdin;
0e4011f6-3bb9-4fa8-b640-f7819de52175	2	Super2	super2@gmail.com	supervisor	\N	\N
e2495bd6-08d7-44dd-bf14-cd07fa6b640c	1	Super1	super1@gmail.com	supervisor	\N	\N
45bd71a9-c007-47f1-9073-ca28f6ddf25c	3	Emp1	emp1@gmail.com	employee	\N	e2495bd6-08d7-44dd-bf14-cd07fa6b640c
1089f6ef-7be0-4c18-a1c2-16e8a4a55764	4	Emp2	emp2@gmail.com	employee	\N	0e4011f6-3bb9-4fa8-b640-f7819de52175
930c5f4a-d0c4-44e8-9f71-455f38702ba9	5	Emp3	emp3@gmail.com	employee	\N	0e4011f6-3bb9-4fa8-b640-f7819de52175
\.


--
-- Data for Name: supervisors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."supervisors" ("supervisor_id", "department", "added_at") FROM stdin;
2	\N	2025-03-23 20:49:58.012163+00
1	\N	2025-03-23 20:50:26.175125+00
\.


--
-- Data for Name: shifts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."shifts" ("shift_id", "assigned_user_id", "department_id", "supervisor_id", "shift_name", "slot", "needs_coverage", "coverage_reason", "notes", "created_on") FROM stdin;
1	3	1	1	Morning shift A	["2025-07-10 08:00:00+00","2025-07-10 12:00:00+00")	f	\N	\N	2025-03-23 22:15:36.904913+00
2	4	1	1	Morning shift B	["2025-07-10 08:00:00+00","2025-07-10 12:00:00+00")	f	\N	\N	2025-03-23 22:15:36.904913+00
3	3	1	1	Afternoon shift A	["2025-07-10 13:00:00+00","2025-07-10 17:00:00+00")	f	\N	\N	2025-03-23 22:15:36.904913+00
4	4	1	1	Afternoon shift B	["2025-07-10 13:00:00+00","2025-07-10 17:00:00+00")	f	\N	\N	2025-03-23 22:15:36.904913+00
5	3	1	1	Evening shift A	["2025-07-10 18:00:00+00","2025-07-10 22:00:00+00")	f	\N	\N	2025-03-23 22:15:36.904913+00
6	4	1	1	Evening shift B	["2025-07-10 18:00:00+00","2025-07-10 22:00:00+00")	f	\N	\N	2025-03-23 22:15:36.904913+00
7	3	1	2	Night shift A	["2025-07-10 23:00:00+00","2025-07-11 07:00:00+00")	f	\N	\N	2025-03-23 22:15:36.904913+00
8	4	1	2	Night shift B	["2025-07-10 23:00:00+00","2025-07-11 07:00:00+00")	f	\N	\N	2025-03-23 22:15:36.904913+00
\.


--
-- Data for Name: shift_changes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."shift_changes" ("shift_change_id", "shift_id", "og_shift_profile_id", "covering_profile_id", "approved_by_supervisor_id", "denied_by_supervisor_id", "status", "coverage_reason", "requested_at") FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") FROM stdin;
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata", "level") FROM stdin;
\.


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."prefixes" ("bucket_id", "name", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads" ("id", "in_progress_size", "upload_signature", "bucket_id", "key", "version", "owner_id", "created_at", "user_metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads_parts" ("id", "upload_id", "size", "part_number", "bucket_id", "key", "etag", "owner_id", "version", "created_at") FROM stdin;
\.


--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

COPY "supabase_functions"."hooks" ("id", "hook_table_id", "hook_name", "created_at", "request_id") FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY "vault"."secrets" ("id", "name", "description", "secret", "key_id", "nonce", "created_at", "updated_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 5, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: departments_department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."departments_department_id_seq"', 2, true);


--
-- Name: positions_position_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."positions_position_id_seq"', 3, true);


--
-- Name: profiles_profile_int_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."profiles_profile_int_id_seq"', 5, true);


--
-- Name: shift_changes_shift_change_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."shift_changes_shift_change_id_seq"', 1, false);


--
-- Name: shifts_shift_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."shifts_shift_id_seq"', 8, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
