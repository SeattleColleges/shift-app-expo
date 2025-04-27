import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useIsSupervisor(userId: number | null) {
    const [isSupervisor, setIsSupervisor] = useState<boolean | null>(null);

    useEffect(() => {
        if (!userId) return;
        async function fetchRole() {
            if (!supabase) throw new Error('Supabase is invalid.');
            const { data, error } = await supabase.rpc('is_supervisor', { supervisor_id_param: userId });
            if (error) {
                console.error(error);
                setIsSupervisor(false);
            } else {
                setIsSupervisor(data);
            }
        }

        fetchRole();
    }, [userId]);

    return isSupervisor;
}
