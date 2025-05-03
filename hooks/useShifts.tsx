import { useEffect, useState } from 'react';
import { supabaseAdmin } from '@/lib/supabaseAdminClient';

export const useShifts = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        const fetchShifts = async () => {

            try {
                setLoading(true);
                // @ts-ignore
                const { data: shifts, error } = await supabaseAdmin.rpc('get_employee_shifts',{profile_id_param:3})

                if (error) throw error;
                if (shifts) setItems(shifts);

            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch shifts'));
            } finally {
                setLoading(false);
            }

        };
        fetchShifts();
    }, []);

    return { items, loading, error }
}
