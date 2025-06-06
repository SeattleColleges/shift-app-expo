import { Stack } from 'expo-router';

export default function ScheduleStack() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Schedule',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="shift-details-page/[id]"
                options={{
                    title: 'Shift Details',
                    headerShown: true,
                    headerBackVisible: true,
                    headerBackTitle: 'Schedule',
                    presentation: 'card'
                }}
            />
        </Stack>
    );
}