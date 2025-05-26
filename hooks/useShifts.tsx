import { useEffect, useState } from 'react';
import { supabaseAdmin } from '@/lib/supabaseAdminClient';
import { dateTimeFormatter, extractUTC } from "@/data/utils";

export const useShifts = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                setLoading(true);
                // @ts-ignore
                const { data: shifts, error } = await supabaseAdmin.rpc('get_employee_shifts', { profile_id_param: 3 });

                if (error) throw error;

                if (shifts) {
                    const modifiedShifts = (shifts) => {
                        const groupedByDate = new Map();

                        shifts.forEach(shift => {
                            //console.log("Shift:", shift);

                            // Extract start timestamp from slot
                            const startTimestamp = extractUTC(shift.slot.split(',')[0]);
                            const endTimestamp = extractUTC(shift.slot.split(',')[1]);

                            if (!startTimestamp) return;

                            const datePart = startTimestamp.split(' ')[0];
                            //
                            // console.log("Date part:", datePart);

                            // Map group by date
                            if (!groupedByDate.has(datePart)) {
                                groupedByDate.set(datePart, {
                                    dayHeader: datePart,
                                    data: []
                                });
                            }

                            // Add shift to date group data []
                            groupedByDate.get(datePart).data.push({
                                ...shift,
                                id: shift.shift_id.toString()+Date.now(),
                                startTime: startTimestamp,
                                endTime: endTimestamp,
                                date: datePart

                            });
                        });

                        return Array.from(groupedByDate.values());
                    };

                    const formattedShifts = modifiedShifts(shifts);
                    //console.log("Formatted shifts:", JSON.stringify(formattedShifts, null, 2));
                    setItems(formattedShifts);
                }

            } catch (err) {
                console.error("Error fetching shifts:", err);
                setError(err instanceof Error ? err : new Error('Failed to fetch shifts'));
            } finally {
                setLoading(false);
            }
        };

        fetchShifts();
    }, []);

    return { items, loading, error };
}