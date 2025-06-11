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
00000000-0000-0000-0000-000000000000	54f142b4-54b5-4b90-abcb-98b656695594	{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"super1@gmail.com","user_id":"64089d65-f16c-4ded-b75e-d7203fd8d09a","user_phone":""}}	2025-05-06 08:47:03.218401+00	
00000000-0000-0000-0000-000000000000	651c44f1-8822-44aa-8318-226e3a87d120	{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"super2@gmail.com","user_id":"74be5a0a-3b06-481e-91a8-09c2219c8737","user_phone":""}}	2025-05-06 08:47:36.204602+00	
00000000-0000-0000-0000-000000000000	af05d278-341b-48c4-b7af-c95bb0103e03	{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"empl1@gmail.com","user_id":"46bdd2bb-e45c-4ce8-bcac-05464c827462","user_phone":""}}	2025-05-06 08:48:16.228746+00	
00000000-0000-0000-0000-000000000000	08c3f3ff-0dc3-4f57-88f9-8f4512f95eb2	{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"empl2@gmail.com","user_id":"500759ca-c3f2-4b3a-bb1c-e5afda716c24","user_phone":""}}	2025-05-06 08:48:38.700731+00	
00000000-0000-0000-0000-000000000000	913d99b4-5764-42d3-b178-96fbf64d3551	{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"empl3@gmail.com","user_id":"bcacc5c3-d91f-45d6-a767-477020389ab2","user_phone":""}}	2025-05-06 08:48:59.609575+00	
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
00000000-0000-0000-0000-000000000000	64089d65-f16c-4ded-b75e-d7203fd8d09a	authenticated	authenticated	super1@gmail.com	$2a$10$bAlOKaGwpJaeJ7uQLlFpOe.HR9X1ise5EHX9ImO/l3.t1hqlNXOFG	2025-05-06 08:47:03.219675+00	\N		\N		\N			\N	\N	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-05-06 08:47:03.212331+00	2025-05-06 08:47:03.220199+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	74be5a0a-3b06-481e-91a8-09c2219c8737	authenticated	authenticated	super2@gmail.com	$2a$10$voJQAkzrMD7E4bDkc7ZWSOsFFivGRzhxY9V/jRBB2WxBGshuAGMVC	2025-05-06 08:47:36.205421+00	\N		\N		\N			\N	\N	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-05-06 08:47:36.203144+00	2025-05-06 08:47:36.205895+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	46bdd2bb-e45c-4ce8-bcac-05464c827462	authenticated	authenticated	empl1@gmail.com	$2a$10$J9Dv7L5aO7i.WhpI.P7bfePNta1bNxGV5b8PkxXGAjBhji1AVZxs6	2025-05-06 08:48:16.229667+00	\N		\N		\N			\N	\N	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-05-06 08:48:16.225514+00	2025-05-06 08:48:16.230047+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	500759ca-c3f2-4b3a-bb1c-e5afda716c24	authenticated	authenticated	empl2@gmail.com	$2a$10$FOV/Pyd0TA6Wh.H5Ta5aouuhrhHShf9dijiEP77f91d1fqaTTeIca	2025-05-06 08:48:38.701235+00	\N		\N		\N			\N	\N	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-05-06 08:48:38.692603+00	2025-05-06 08:48:38.702+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	bcacc5c3-d91f-45d6-a767-477020389ab2	authenticated	authenticated	empl3@gmail.com	$2a$10$ir8P.MZ.aQyhZjel1WC/DuX6AI9kdnqGm4EmswXuM2Tv4svwsTSaS	2025-05-06 08:48:59.610413+00	\N		\N		\N			\N	\N	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-05-06 08:48:59.607622+00	2025-05-06 08:48:59.610969+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
64089d65-f16c-4ded-b75e-d7203fd8d09a	64089d65-f16c-4ded-b75e-d7203fd8d09a	{"sub": "64089d65-f16c-4ded-b75e-d7203fd8d09a", "email": "super1@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-05-06 08:47:03.217397+00	2025-05-06 08:47:03.217435+00	2025-05-06 08:47:03.217435+00	faf23a9d-1aec-4e14-9590-e77e18a9593d
74be5a0a-3b06-481e-91a8-09c2219c8737	74be5a0a-3b06-481e-91a8-09c2219c8737	{"sub": "74be5a0a-3b06-481e-91a8-09c2219c8737", "email": "super2@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-05-06 08:47:36.204258+00	2025-05-06 08:47:36.204286+00	2025-05-06 08:47:36.204286+00	2e78185d-8ab8-4afb-9b68-ac5847cf4eb0
46bdd2bb-e45c-4ce8-bcac-05464c827462	46bdd2bb-e45c-4ce8-bcac-05464c827462	{"sub": "46bdd2bb-e45c-4ce8-bcac-05464c827462", "email": "empl1@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-05-06 08:48:16.227785+00	2025-05-06 08:48:16.227816+00	2025-05-06 08:48:16.227816+00	dc73e83f-9f97-46b7-adc5-9dcea36869c2
500759ca-c3f2-4b3a-bb1c-e5afda716c24	500759ca-c3f2-4b3a-bb1c-e5afda716c24	{"sub": "500759ca-c3f2-4b3a-bb1c-e5afda716c24", "email": "empl2@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-05-06 08:48:38.700009+00	2025-05-06 08:48:38.700045+00	2025-05-06 08:48:38.700045+00	35b7c3e8-c66f-4652-a715-15993010d1f9
bcacc5c3-d91f-45d6-a767-477020389ab2	bcacc5c3-d91f-45d6-a767-477020389ab2	{"sub": "bcacc5c3-d91f-45d6-a767-477020389ab2", "email": "empl3@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-05-06 08:48:59.608796+00	2025-05-06 08:48:59.608823+00	2025-05-06 08:48:59.608823+00	6907738c-0e15-4c93-a4c4-cadceb62973f
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
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
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
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."departments" ("department_id", "department_name", "department_desc", "created_on") FROM stdin;
1	App Dev Tutoring service	Offering tutoring serices to app development students	2025-05-06 08:34:28.327031+00
2	Computer Science Tutoring service	Offering tutoring serices to app development students	2025-05-06 08:34:28.327031+00
\.


--
-- Data for Name: positions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."positions" ("position_id", "position_name", "position_desc", "created_on") FROM stdin;
1	AD Tutor	Help other students learn the subject material....	2025-05-06 08:34:20.332526+00
2	Teacher Assistant	Teachers aid...	2025-05-06 08:34:20.332526+00
3	Food Court Cashier	Help monitor self-checkout...	2025-05-06 08:34:20.332526+00
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profiles" ("profile_id", "profile_int_id", "name", "email", "role", "position", "supervisor") FROM stdin;
46bdd2bb-e45c-4ce8-bcac-05464c827462	3	empl1	empl1@gmail.com	employee	\N	\N
500759ca-c3f2-4b3a-bb1c-e5afda716c24	4	empl2	empl2@gmail.com	employee	\N	\N
bcacc5c3-d91f-45d6-a767-477020389ab2	5	empl3	empl3@gmail.com	employee	\N	\N
64089d65-f16c-4ded-b75e-d7203fd8d09a	1	super1	super1@gmail.com	supervisor	\N	\N
74be5a0a-3b06-481e-91a8-09c2219c8737	2	super2	super2@gmail.com	supervisor	\N	\N
\.


--
-- Data for Name: supervisors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."supervisors" ("supervisor_id", "department", "added_at") FROM stdin;
1	1	2025-05-06 08:50:07.827869+00
2	2	2025-05-06 08:50:20.19181+00
\.


--
-- Data for Name: shifts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."shifts" ("shift_id", "assigned_user_id", "department_id", "supervisor_id", "shift_name", "slot", "needs_coverage", "shift_claimed", "coverage_reason", "notes", "shift_change_id", "created_on", "updated_on") FROM stdin;
11	3	1	1	Afternoon shift A	["2025-07-10 13:00:00+00","2025-07-10 17:00:00+00")	f	f	\N	\N	\N	2025-05-06 08:51:37.808699+00	\N
12	4	1	1	Afternoon shift B	["2025-07-10 13:00:00+00","2025-07-10 17:00:00+00")	f	f	\N	\N	\N	2025-05-06 08:51:37.808699+00	\N
13	3	1	1	Evening shift A	["2025-07-10 18:00:00+00","2025-07-10 22:00:00+00")	f	f	\N	\N	\N	2025-05-06 08:51:37.808699+00	\N
14	4	1	1	Evening shift B	["2025-07-10 18:00:00+00","2025-07-10 22:00:00+00")	f	f	\N	\N	\N	2025-05-06 08:51:37.808699+00	\N
15	3	1	2	Night shift A	["2025-07-10 23:00:00+00","2025-07-11 07:00:00+00")	f	f	\N	\N	\N	2025-05-06 08:51:37.808699+00	\N
16	4	1	2	Night shift B	["2025-07-10 23:00:00+00","2025-07-11 07:00:00+00")	f	f	\N	\N	\N	2025-05-06 08:51:37.808699+00	\N
9	3	1	1	Morning shift A	["2025-07-10 08:00:00+00","2025-07-10 12:00:00+00")	f	f	\N	\N	\N	2025-05-06 08:51:37.808699+00	2025-05-06 22:05:13.088605+00
10	5	1	1	Morning shift B	["2025-07-10 08:00:00+00","2025-07-10 12:00:00+00")	f	f	\N	\N	\N	2025-05-06 08:51:37.808699+00	\N
17	3	1	1	Morning shift A	["2025-07-11 08:00:00+00","2025-07-11 12:00:00+00")	f	f	\N	\N	\N	2025-05-06 23:58:23.543619+00	\N
18	4	1	1	Morning shift B	["2025-07-11 08:00:00+00","2025-07-11 12:00:00+00")	f	f	\N	\N	\N	2025-05-06 23:58:23.543619+00	\N
19	3	1	1	Afternoon shift A	["2025-07-12 13:00:00+00","2025-07-12 17:00:00+00")	f	f	\N	\N	\N	2025-05-06 23:58:23.543619+00	\N
20	4	1	1	Afternoon shift B	["2025-07-12 13:00:00+00","2025-07-12 17:00:00+00")	f	f	\N	\N	\N	2025-05-06 23:58:23.543619+00	\N
21	3	1	1	Evening shift A	["2025-07-13 18:00:00+00","2025-07-13 22:00:00+00")	f	f	\N	\N	\N	2025-05-06 23:58:23.543619+00	\N
22	4	1	1	Evening shift B	["2025-07-13 18:00:00+00","2025-07-13 22:00:00+00")	f	f	\N	\N	\N	2025-05-06 23:58:23.543619+00	\N
23	3	1	2	Night shift A	["2025-07-14 23:00:00+00","2025-07-15 07:00:00+00")	f	f	\N	\N	\N	2025-05-06 23:58:23.543619+00	\N
24	4	1	2	Night shift B	["2025-07-14 23:00:00+00","2025-07-15 07:00:00+00")	f	f	\N	\N	\N	2025-05-06 23:58:23.543619+00	\N
\.


--
-- Data for Name: shift_changes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."shift_changes" ("shift_change_id", "shift_id", "og_shift_profile_id", "covering_profile_id", "approved_by_supervisor_id", "denied_by_supervisor_id", "status", "coverage_reason", "requested_at", "denied_at", "approved_at", "covered_at", "removed_at") FROM stdin;
1	9	3	\N	\N	\N	removed	No reason provided	2025-05-06 22:02:42.810907+00	\N	\N	\N	2025-05-06 22:05:13.088605+00
2	10	4	5	2	\N	approved	test 1	2025-05-06 22:03:08.581162+00	\N	\N	2025-05-06 22:52:49.01457+00	\N
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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


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

SELECT pg_catalog.setval('"public"."shift_changes_shift_change_id_seq"', 2, true);


--
-- Name: shifts_shift_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."shifts_shift_id_seq"', 24, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
