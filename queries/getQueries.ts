import {SupabaseClient} from "@supabase/supabase-js";

export const getAllFromTable = async (supabaseClient:  SupabaseClient<any, "public", any>, table: string) => {
    try {
        const { data: data } = await supabaseClient.from(table).select();
        return data;
    } catch (e) {
        console.log(e)
    }
}