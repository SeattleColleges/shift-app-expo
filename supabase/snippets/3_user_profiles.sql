/*
Create user profile table

DROP TABLE IF EXISTS profiles;
DROP TYPE IF EXISTS user_role;
*/

-- Create Enums for roles
CREATE TYPE USER_ROLE AS ENUM ('employee', 'supervisor', 'admin');

-- Create a table for public profiles
CREATE TABLE profiles
(
    profile_id     UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    profile_int_id SERIAL UNIQUE,
    name           TEXT,
    email          TEXT UNIQUE,
    role           USER_ROLE                                    NOT NULL DEFAULT 'employee',
    position       INT                                          NULL REFERENCES positions (position_id),
    supervisor     UUID REFERENCES profiles (profile_id) DEFERRABLE INITIALLY DEFERRED,

    CONSTRAINT name_length CHECK (CHAR_LENGTH(name) >= 3)
);

-- Set up Row Level Security (RLS)
ALTER TABLE profiles
    ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by authenticated users." ON profiles
    FOR SELECT USING (TRUE); -- auth.uid() is not null

CREATE POLICY "Users can insert their own profile." ON profiles
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own profile." ON profiles
    FOR UPDATE USING (auth.uid() = profile_id);

-- Trigger function to create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER
AS
$$
BEGIN
    INSERT INTO public.profiles (profile_id, name, email)
    VALUES (new.id, new.raw_user_meta_data ->> 'name', new.email);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function after a new user is created
--DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT
    ON auth.users
    FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();

-- SELECT * FROM profiles;