import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

export const getAll = async (
  supabaseClient: SupabaseClient<Database>,
  table: keyof Database['public']['Tables']
) => {
  try {
    const { data, error } = await supabaseClient.from(table).select();

    if (error) {
      console.error('Error fetching data:', error);
      return null;
    }

    return data;
  } catch (e) {
    console.error('Unexpected error:', e);
    return null;
  }
}