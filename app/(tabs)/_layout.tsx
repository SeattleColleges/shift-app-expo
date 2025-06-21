import { Stack } from 'expo-router';

export default function TabLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Schedule',
                }}
            />
            <Stack.Screen
                name="add-shift"
                options={{
                    title: 'Add Shift',
                }}
            />
            <Stack.Screen
                name="coworkers"
                options={{
                    title: 'Coworkers',
                }}
            />
            <Stack.Screen
                name="notifications"
                options={{
                    title: 'Notifications',
                }}
            />
            <Stack.Screen
                name="profileView"
                options={{
                    title: 'Profile',
                }}
            />
        </Stack>
    );
}