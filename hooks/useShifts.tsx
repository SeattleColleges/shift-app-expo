import { useEffect, useState } from 'react';
import { supabaseAdmin } from '@/lib/supabaseAdminClient';
import {convertToLocalDate, dateTimeFormatter, extractUTC} from "@/data/utils";

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

                        // Sort shifts by start date and group them by date
                        shifts.forEach(shift => {

                            const slots = shift.slot.split(',');
                            // Convert UTC date object to local timezone date object
                                // @ts-ignore
                            const startLocalTimeZone =convertToLocalDate(slots[0],'America/Los_Angeles' );
                            const endLocalTimeZone =convertToLocalDate(slots[1],'America/Los_Angeles' );

                            // Extract start timestamp from slot
                            const startTimestamp = extractUTC(shift.slot.split(',')[0]);
                            const endTimestamp = extractUTC(shift.slot.split(',')[1]);

                            if (!startTimestamp) return;

                            const startDate = startLocalTimeZone.toLocaleDateString('sv-SE') // sv-SE produces ISO 8601 date format

                            // Map group by date
                            if (!groupedByDate.has(startDate)) {
                                groupedByDate.set(startDate, {
                                    dayHeader: startDate,
                                    data: []
                                });
                            }


                            // Add shift to date group data []
                            groupedByDate.get(startDate).data.push({
                                ...shift,
                                id: shift.shift_id.toString()+Date.now(),
                                date: startDate,
                                startDateObj: startLocalTimeZone,
                                endDateObj: endLocalTimeZone,

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