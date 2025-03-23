SET session_replication_role = replica;
create extension if not exists "btree_gist" with schema "public" version '1.7';

create type "public"."shift_status" as enum ('removed', 'denied', 'unclaimed', 'pending', 'approved');

create type "public"."user_role" as enum ('employee', 'supervisor', 'admin');

create sequence "public"."departments_department_id_seq";

create sequence "public"."positions_position_id_seq";

create sequence "public"."profiles_profile_int_id_seq";

create sequence "public"."shift_changes_shift_change_id_seq";

create sequence "public"."shifts_shift_id_seq";

create table "public"."departments" (
    "department_id" integer not null default nextval('departments_department_id_seq'::regclass),
    "department_name" text,
    "department_desc" text,
    "created_on" timestamp with time zone default now()
);


create table "public"."positions" (
    "position_id" integer not null default nextval('positions_position_id_seq'::regclass),
    "position_name" text,
    "position_desc" text,
    "created_on" timestamp with time zone default now()
);


create table "public"."profiles" (
    "profile_id" uuid not null,
    "profile_int_id" integer not null default nextval('profiles_profile_int_id_seq'::regclass),
    "name" text,
    "email" text,
    "role" user_role not null default 'employee'::user_role,
    "position" integer,
    "supervisor" uuid
);


alter table "public"."profiles" enable row level security;

create table "public"."shift_changes" (
    "shift_change_id" integer not null default nextval('shift_changes_shift_change_id_seq'::regclass),
    "shift_id" integer,
    "og_shift_profile_id" integer,
    "covering_profile_id" integer,
    "approved_by_supervisor_id" integer,
    "denied_by_supervisor_id" integer,
    "status" shift_status not null default 'unclaimed'::shift_status,
    "coverage_reason" text,
    "requested_at" timestamp with time zone default now()
);


create table "public"."shifts" (
    "shift_id" integer not null default nextval('shifts_shift_id_seq'::regclass),
    "assigned_user_id" integer,
    "department_id" integer,
    "supervisor_id" integer,
    "shift_name" text,
    "slot" tstzrange not null,
    "duration" integer generated always as ((EXTRACT(epoch FROM (upper(slot) - lower(slot))) / (60)::numeric)) stored,
    "needs_coverage" boolean default false,
    "coverage_reason" text,
    "notes" text,
    "created_on" timestamp with time zone default now()
);


create table "public"."supervisors" (
    "supervisor_id" integer not null,
    "department" integer,
    "added_at" timestamp with time zone default now()
);


alter sequence "public"."departments_department_id_seq" owned by "public"."departments"."department_id";

alter sequence "public"."positions_position_id_seq" owned by "public"."positions"."position_id";

alter sequence "public"."profiles_profile_int_id_seq" owned by "public"."profiles"."profile_int_id";

alter sequence "public"."shift_changes_shift_change_id_seq" owned by "public"."shift_changes"."shift_change_id";

alter sequence "public"."shifts_shift_id_seq" owned by "public"."shifts"."shift_id";

CREATE UNIQUE INDEX departments_pkey ON public.departments USING btree (department_id);

CREATE UNIQUE INDEX positions_pkey ON public.positions USING btree (position_id);

CREATE UNIQUE INDEX profiles_email_key ON public.profiles USING btree (email);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (profile_id);

CREATE UNIQUE INDEX profiles_profile_int_id_key ON public.profiles USING btree (profile_int_id);

CREATE UNIQUE INDEX shift_changes_pkey ON public.shift_changes USING btree (shift_change_id);

select 1; -- CREATE INDEX shifts_assigned_user_id_slot_excl ON public.shifts USING gist (assigned_user_id, slot);

CREATE UNIQUE INDEX shifts_pkey ON public.shifts USING btree (shift_id);

CREATE UNIQUE INDEX supervisors_pkey ON public.supervisors USING btree (supervisor_id);

alter table "public"."departments" add constraint "departments_pkey" PRIMARY KEY using index "departments_pkey";

alter table "public"."positions" add constraint "positions_pkey" PRIMARY KEY using index "positions_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."shift_changes" add constraint "shift_changes_pkey" PRIMARY KEY using index "shift_changes_pkey";

alter table "public"."shifts" add constraint "shifts_pkey" PRIMARY KEY using index "shifts_pkey";

alter table "public"."supervisors" add constraint "supervisors_pkey" PRIMARY KEY using index "supervisors_pkey";

alter table "public"."profiles" add constraint "name_length" CHECK ((char_length(name) >= 3)) not valid;

alter table "public"."profiles" validate constraint "name_length";

alter table "public"."profiles" add constraint "profiles_email_key" UNIQUE using index "profiles_email_key";

alter table "public"."profiles" add constraint "profiles_position_fkey" FOREIGN KEY ("position") REFERENCES positions(position_id) not valid;

alter table "public"."profiles" validate constraint "profiles_position_fkey";

alter table "public"."profiles" add constraint "profiles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_profile_id_fkey";

alter table "public"."profiles" add constraint "profiles_profile_int_id_key" UNIQUE using index "profiles_profile_int_id_key";

alter table "public"."profiles" add constraint "profiles_supervisor_fkey" FOREIGN KEY (supervisor) REFERENCES profiles(profile_id) DEFERRABLE INITIALLY DEFERRED not valid;

alter table "public"."profiles" validate constraint "profiles_supervisor_fkey";

alter table "public"."shift_changes" add constraint "shift_changes_approved_by_supervisor_id_fkey" FOREIGN KEY (approved_by_supervisor_id) REFERENCES supervisors(supervisor_id) not valid;

alter table "public"."shift_changes" validate constraint "shift_changes_approved_by_supervisor_id_fkey";

alter table "public"."shift_changes" add constraint "shift_changes_covering_profile_id_fkey" FOREIGN KEY (covering_profile_id) REFERENCES profiles(profile_int_id) not valid;

alter table "public"."shift_changes" validate constraint "shift_changes_covering_profile_id_fkey";

alter table "public"."shift_changes" add constraint "shift_changes_denied_by_supervisor_id_fkey" FOREIGN KEY (denied_by_supervisor_id) REFERENCES supervisors(supervisor_id) not valid;

alter table "public"."shift_changes" validate constraint "shift_changes_denied_by_supervisor_id_fkey";

alter table "public"."shift_changes" add constraint "shift_changes_og_shift_profile_id_fkey" FOREIGN KEY (og_shift_profile_id) REFERENCES profiles(profile_int_id) not valid;

alter table "public"."shift_changes" validate constraint "shift_changes_og_shift_profile_id_fkey";

alter table "public"."shift_changes" add constraint "shift_changes_shift_id_fkey" FOREIGN KEY (shift_id) REFERENCES shifts(shift_id) not valid;

alter table "public"."shift_changes" validate constraint "shift_changes_shift_id_fkey";

alter table "public"."shifts" add constraint "shifts_assigned_user_id_fkey" FOREIGN KEY (assigned_user_id) REFERENCES profiles(profile_int_id) not valid;

alter table "public"."shifts" validate constraint "shifts_assigned_user_id_fkey";

alter table "public"."shifts" add constraint "shifts_assigned_user_id_slot_excl" EXCLUDE USING gist (assigned_user_id WITH =, slot WITH &&);

alter table "public"."shifts" add constraint "shifts_department_id_fkey" FOREIGN KEY (department_id) REFERENCES departments(department_id) not valid;

alter table "public"."shifts" validate constraint "shifts_department_id_fkey";

alter table "public"."shifts" add constraint "shifts_slot_check" CHECK ((lower(slot) > now())) not valid;

alter table "public"."shifts" validate constraint "shifts_slot_check";

alter table "public"."shifts" add constraint "shifts_supervisor_id_fkey" FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id) not valid;

alter table "public"."shifts" validate constraint "shifts_supervisor_id_fkey";

alter table "public"."supervisors" add constraint "supervisors_department_fkey" FOREIGN KEY (department) REFERENCES departments(department_id) not valid;

alter table "public"."supervisors" validate constraint "supervisors_department_fkey";

alter table "public"."supervisors" add constraint "supervisors_supervisor_id_fkey" FOREIGN KEY (supervisor_id) REFERENCES profiles(profile_int_id) ON DELETE CASCADE not valid;

alter table "public"."supervisors" validate constraint "supervisors_supervisor_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_covering_id_to_shift_change(shift_id_param integer, covering_profile_id_param integer)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    shift_rec    RECORD;
    has_conflict BOOLEAN;
BEGIN -- Check for shift conflicts before changing shift status to pending when shift claimed
    SELECT slot
    INTO shift_rec
    FROM shifts
    WHERE shift_id = shift_id_param;
    -- Handle missing record
    IF
        NOT FOUND THEN
        RAISE EXCEPTION 'Shift w/ ID % not found', shift_id_param;
    END IF;

    SELECT EXISTS(SELECT 1
                  FROM shifts
                  WHERE assigned_user_id = covering_profile_id_param
                    AND slot && shift_rec.slot)
    INTO has_conflict;

    IF NOT has_conflict THEN
        UPDATE shift_changes
        SET covering_profile_id = covering_profile_id_param,
            status              = 'pending'
        WHERE shift_id = shift_id_param;
        RETURN TRUE;
    ELSE
        RAISE EXCEPTION 'Cannot pick up shift - schedule conflicts with existing shift';
    END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.add_shift_to_shift_change(shift_id_param integer, coverage_reason_param text DEFAULT 'No reason provided'::text)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    shift_rec RECORD;
BEGIN
    -- Get shift and save
    SELECT *
    INTO shift_rec
    FROM shifts
    WHERE shift_id = shift_id_param;

    IF
        NOT FOUND THEN
        RAISE EXCEPTION 'Shift w/ ID % not found', shift_id_param;
    END IF;

    UPDATE shifts
    SET needs_coverage = TRUE
    WHERE shift_id = shift_id_param;

    INSERT INTO shift_changes(shift_id, og_shift_profile_id, coverage_reason)
    VALUES (shift_rec.shift_id, shift_rec.assigned_user_id, coverage_reason_param);

    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RAISE;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.add_supervisor()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN -- If user not supervisor, add to table w/ new id
    IF
        NEW.role = 'supervisor' AND (OLD.role IS NULL OR OLD.role != 'supervisor') THEN
        INSERT INTO supervisors(supervisor_id)
        VALUES (NEW.profile_int_id)
        ON CONFLICT (supervisor_id) DO NOTHING;
    ELSIF -- If user loses supervisor role, delete from table
        OLD.role = 'supervisor' AND NEW.role != 'supervisor' THEN
        DELETE
        FROM supervisors
        WHERE supervisor_id = NEW.profile_int_id;
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.convert_pacific_tz(time_param timestamp with time zone)
 RETURNS timestamp with time zone
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN time_param AT TIME ZONE 'America/Los_Angeles';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.deny_shift_change(shift_id_param integer, supervisor_id_param integer)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
BEGIN
    DECLARE
        shift_change_rec RECORD;
    BEGIN -- Check any missing data, then supervisor privileges, save deny supervisor id and update needs coverage
        SELECT covering_profile_id, shift_change_id
        INTO shift_change_rec
        FROM shift_changes
        WHERE shift_id = shift_id_param;

        IF
            NOT FOUND THEN
            RAISE EXCEPTION 'Shift w/ ID % not found', shift_id_param;
        ELSE
            IF shift_change_rec.covering_profile_id IS NULL THEN
                RAISE EXCEPTION 'Shift w/ ID % missing covering profile id', shift_id_param;
            END IF;
            IF
                EXISTS(SELECT 1
                       FROM supervisors
                       WHERE supervisor_id = supervisor_id_param)
            THEN
                UPDATE shift_changes
                SET denied_by_supervisor_id = supervisor_id_param
                WHERE shift_id = shift_id_param;

                UPDATE shifts
                SET needs_coverage = FALSE
                WHERE shift_id = shift_id_param;
                RETURN TRUE;
            ELSE
                RAISE EXCEPTION 'Error updating shift change in shift_change_id %',
                    shift_change_rec.shift_change_id;
            END IF;
        END IF;
    END;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    INSERT INTO public.profiles (profile_id, name, email)
    VALUES (new.id, new.raw_user_meta_data ->> 'name', new.email);
    RETURN new;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.shift_owner_removed_shift(shift_id_param integer)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    shift_rec RECORD;
BEGIN
    -- Update, change status to removed, and set shift's needs_coverage to false
    SELECT status
    INTO shift_rec
    FROM shift_changes
    WHERE shift_id = shift_id_param;

    IF
        NOT FOUND THEN
        RAISE EXCEPTION 'Shift w/ ID % not found', shift_id_param;
    END IF;

    -- Check if shift not apporved
    IF
        shift_rec.status NOT IN ('approved', 'removed') THEN
        UPDATE shift_changes
        SET status       = 'removed',
            requested_at = NOW()
        WHERE shift_id = shift_id_param;

        UPDATE shifts
        SET needs_coverage = FALSE
        WHERE shift_id = shift_id_param;
    ELSE
        RAISE EXCEPTION 'Shift w/ ID % is approved, cannot be removed', shift_id_param;
    END IF;
    RETURN TRUE;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_shift_w_profile_ids(shift_id_param integer, supervisor_id_param integer)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    shift_change_rec RECORD;
BEGIN -- Check supervisor privileges, update shift, update needs_coverage to false
    SELECT covering_profile_id, shift_change_id
    INTO shift_change_rec
    FROM shift_changes
    WHERE shift_id = shift_id_param;

    IF
        NOT FOUND THEN
        RAISE EXCEPTION 'Shift w/ ID % not found', shift_id_param;
    ELSE
        IF shift_change_rec.covering_profile_id IS NULL THEN
            RAISE EXCEPTION 'Shift w/ ID % missing covering profile id', shift_id_param;
        END IF;
        IF
            EXISTS(SELECT 1
                   FROM supervisors
                   WHERE supervisor_id = supervisor_id_param)
        THEN
            UPDATE shift_changes
            SET approved_by_supervisor_id = supervisor_id_param
            WHERE shift_id = shift_id_param;

            UPDATE shifts
            SET assigned_user_id = shift_change_rec.covering_profile_id,
                needs_coverage   = FALSE
            WHERE shift_id = shift_id_param;
            RETURN TRUE;
        ELSE
            RAISE EXCEPTION 'Error updating shift change in shift_change_id %',
                shift_change_rec.shift_change_id;
        END IF;
    END IF;
END;
$function$
;

grant delete on table "public"."departments" to "anon";

grant insert on table "public"."departments" to "anon";

grant references on table "public"."departments" to "anon";

grant select on table "public"."departments" to "anon";

grant trigger on table "public"."departments" to "anon";

grant truncate on table "public"."departments" to "anon";

grant update on table "public"."departments" to "anon";

grant delete on table "public"."departments" to "authenticated";

grant insert on table "public"."departments" to "authenticated";

grant references on table "public"."departments" to "authenticated";

grant select on table "public"."departments" to "authenticated";

grant trigger on table "public"."departments" to "authenticated";

grant truncate on table "public"."departments" to "authenticated";

grant update on table "public"."departments" to "authenticated";

grant delete on table "public"."departments" to "service_role";

grant insert on table "public"."departments" to "service_role";

grant references on table "public"."departments" to "service_role";

grant select on table "public"."departments" to "service_role";

grant trigger on table "public"."departments" to "service_role";

grant truncate on table "public"."departments" to "service_role";

grant update on table "public"."departments" to "service_role";

grant delete on table "public"."positions" to "anon";

grant insert on table "public"."positions" to "anon";

grant references on table "public"."positions" to "anon";

grant select on table "public"."positions" to "anon";

grant trigger on table "public"."positions" to "anon";

grant truncate on table "public"."positions" to "anon";

grant update on table "public"."positions" to "anon";

grant delete on table "public"."positions" to "authenticated";

grant insert on table "public"."positions" to "authenticated";

grant references on table "public"."positions" to "authenticated";

grant select on table "public"."positions" to "authenticated";

grant trigger on table "public"."positions" to "authenticated";

grant truncate on table "public"."positions" to "authenticated";

grant update on table "public"."positions" to "authenticated";

grant delete on table "public"."positions" to "service_role";

grant insert on table "public"."positions" to "service_role";

grant references on table "public"."positions" to "service_role";

grant select on table "public"."positions" to "service_role";

grant trigger on table "public"."positions" to "service_role";

grant truncate on table "public"."positions" to "service_role";

grant update on table "public"."positions" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."shift_changes" to "anon";

grant insert on table "public"."shift_changes" to "anon";

grant references on table "public"."shift_changes" to "anon";

grant select on table "public"."shift_changes" to "anon";

grant trigger on table "public"."shift_changes" to "anon";

grant truncate on table "public"."shift_changes" to "anon";

grant update on table "public"."shift_changes" to "anon";

grant delete on table "public"."shift_changes" to "authenticated";

grant insert on table "public"."shift_changes" to "authenticated";

grant references on table "public"."shift_changes" to "authenticated";

grant select on table "public"."shift_changes" to "authenticated";

grant trigger on table "public"."shift_changes" to "authenticated";

grant truncate on table "public"."shift_changes" to "authenticated";

grant update on table "public"."shift_changes" to "authenticated";

grant delete on table "public"."shift_changes" to "service_role";

grant insert on table "public"."shift_changes" to "service_role";

grant references on table "public"."shift_changes" to "service_role";

grant select on table "public"."shift_changes" to "service_role";

grant trigger on table "public"."shift_changes" to "service_role";

grant truncate on table "public"."shift_changes" to "service_role";

grant update on table "public"."shift_changes" to "service_role";

grant delete on table "public"."shifts" to "anon";

grant insert on table "public"."shifts" to "anon";

grant references on table "public"."shifts" to "anon";

grant select on table "public"."shifts" to "anon";

grant trigger on table "public"."shifts" to "anon";

grant truncate on table "public"."shifts" to "anon";

grant update on table "public"."shifts" to "anon";

grant delete on table "public"."shifts" to "authenticated";

grant insert on table "public"."shifts" to "authenticated";

grant references on table "public"."shifts" to "authenticated";

grant select on table "public"."shifts" to "authenticated";

grant trigger on table "public"."shifts" to "authenticated";

grant truncate on table "public"."shifts" to "authenticated";

grant update on table "public"."shifts" to "authenticated";

grant delete on table "public"."shifts" to "service_role";

grant insert on table "public"."shifts" to "service_role";

grant references on table "public"."shifts" to "service_role";

grant select on table "public"."shifts" to "service_role";

grant trigger on table "public"."shifts" to "service_role";

grant truncate on table "public"."shifts" to "service_role";

grant update on table "public"."shifts" to "service_role";

grant delete on table "public"."supervisors" to "anon";

grant insert on table "public"."supervisors" to "anon";

grant references on table "public"."supervisors" to "anon";

grant select on table "public"."supervisors" to "anon";

grant trigger on table "public"."supervisors" to "anon";

grant truncate on table "public"."supervisors" to "anon";

grant update on table "public"."supervisors" to "anon";

grant delete on table "public"."supervisors" to "authenticated";

grant insert on table "public"."supervisors" to "authenticated";

grant references on table "public"."supervisors" to "authenticated";

grant select on table "public"."supervisors" to "authenticated";

grant trigger on table "public"."supervisors" to "authenticated";

grant truncate on table "public"."supervisors" to "authenticated";

grant update on table "public"."supervisors" to "authenticated";

grant delete on table "public"."supervisors" to "service_role";

grant insert on table "public"."supervisors" to "service_role";

grant references on table "public"."supervisors" to "service_role";

grant select on table "public"."supervisors" to "service_role";

grant trigger on table "public"."supervisors" to "service_role";

grant truncate on table "public"."supervisors" to "service_role";

grant update on table "public"."supervisors" to "service_role";

create policy "Public profiles are viewable by authenticated users."
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = profile_id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = profile_id));


CREATE TRIGGER supervisor_role_change AFTER UPDATE OF role ON public.profiles FOR EACH ROW EXECUTE FUNCTION add_supervisor();


