import { useState, useCallback } from 'react';
import { supabaseAdmin } from '@/lib/supabaseAdminClient';

export const useAddShift = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState(null);

    const addShift = useCallback(async ({ shift_name, assigned_user_id, startTime, endTime, department_id, supervisor_id }) => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: rpcError } = await supabaseAdmin.rpc('add_shift_to_shifts_table', {
                shift_name_param: shift_name,
                assigned_user_id_param: assigned_user_id,
                start_time_param: startTime,
                end_time_param: endTime,
                department_id_param: department_id,
                supervisor_id_param: supervisor_id
            });

            if (rpcError) {
                throw rpcError
            }

            setData(data);
            return { success: true, data }

        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to add shift'));
            return { success: false, error: err };

        } finally {
            setLoading(false);
        }
    }, []);

    return { addShift, data, loading, error };
};