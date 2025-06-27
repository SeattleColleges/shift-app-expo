export type Profile = {
  profile_id: string; // Matches auth.users.id for RLS
  profile_int_id: string;
  name: string;
  email: string;
  role: string;
  position: string;
  supervisor: string;
  department: string;
}