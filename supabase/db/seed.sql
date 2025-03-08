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

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'c0ae1b5c-4c29-4ba5-9a4d-fed15bc7e9e5', '{"action":"user_signedup","actor_id":"ac0b8829-0763-4db1-b650-a9831999146f","actor_username":"test@test.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-03-03 07:26:13.256151+00', ''),
	('00000000-0000-0000-0000-000000000000', '277a0df7-3c92-4f9a-bfd9-f24b03084724', '{"action":"login","actor_id":"ac0b8829-0763-4db1-b650-a9831999146f","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-03 07:26:13.258698+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd77bdf23-b7ea-4b11-a20f-e520a5ea9d2b', '{"action":"user_repeated_signup","actor_id":"ac0b8829-0763-4db1-b650-a9831999146f","actor_username":"test@test.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-03-03 07:26:44.293574+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cba2b6d9-38c6-4f33-8de8-4694569158a1', '{"action":"login","actor_id":"ac0b8829-0763-4db1-b650-a9831999146f","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-03-03 07:27:42.263233+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'ac0b8829-0763-4db1-b650-a9831999146f', 'authenticated', 'authenticated', 'test@test.com', '$2a$10$KemjNjpFpvEYECfkHvQSE.x2rgUwmfq7yUSh/qyq4voU3BxiMrCEK', '2025-03-03 07:26:13.256763+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-03-03 07:27:42.263842+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "ac0b8829-0763-4db1-b650-a9831999146f", "name": "Test", "email": "test@test.com", "email_verified": true, "phone_verified": false}', NULL, '2025-03-03 07:26:13.247313+00', '2025-03-03 07:27:42.265056+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('ac0b8829-0763-4db1-b650-a9831999146f', 'ac0b8829-0763-4db1-b650-a9831999146f', '{"sub": "ac0b8829-0763-4db1-b650-a9831999146f", "name": "Test", "email": "test@test.com", "email_verified": false, "phone_verified": false}', 'email', '2025-03-03 07:26:13.254331+00', '2025-03-03 07:26:13.25436+00', '2025-03-03 07:26:13.25436+00', 'b3123912-6255-4b9e-acf7-007a14ecd8fe');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('89e78ed2-29cc-4710-9912-d3fcddc7e5c5', 'ac0b8829-0763-4db1-b650-a9831999146f', '2025-03-03 07:26:13.259286+00', '2025-03-03 07:26:13.259286+00', NULL, 'aal1', NULL, NULL, 'Expo/2.32.17 CFNetwork/1496.0.7 Darwin/23.4.0', '192.168.65.1', NULL),
	('3600cbbd-69d8-4e62-a0bd-8dcbeffb7ee9', 'ac0b8829-0763-4db1-b650-a9831999146f', '2025-03-03 07:27:42.263891+00', '2025-03-03 07:27:42.263891+00', NULL, 'aal1', NULL, NULL, 'Expo/2.32.17 CFNetwork/1496.0.7 Darwin/23.4.0', '192.168.65.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('89e78ed2-29cc-4710-9912-d3fcddc7e5c5', '2025-03-03 07:26:13.261422+00', '2025-03-03 07:26:13.261422+00', 'password', '382ff667-98ae-4ba9-8959-6b1d08dc778f'),
	('3600cbbd-69d8-4e62-a0bd-8dcbeffb7ee9', '2025-03-03 07:27:42.265257+00', '2025-03-03 07:27:42.265257+00', 'password', '2e1c3374-e250-43a2-a805-b32b1a582428');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1, 'nXXWDHqD_Ac2n5guF9rN-w', 'ac0b8829-0763-4db1-b650-a9831999146f', false, '2025-03-03 07:26:13.260118+00', '2025-03-03 07:26:13.260118+00', NULL, '89e78ed2-29cc-4710-9912-d3fcddc7e5c5'),
	('00000000-0000-0000-0000-000000000000', 2, 'wrU635LwzUMVm_pS_KiUdQ', 'ac0b8829-0763-4db1-b650-a9831999146f', false, '2025-03-03 07:27:42.264433+00', '2025-03-03 07:27:42.264433+00', NULL, '3600cbbd-69d8-4e62-a0bd-8dcbeffb7ee9');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "name", "email") VALUES
	('ac0b8829-0763-4db1-b650-a9831999146f', 'Test', 'test@test.com');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 2, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
