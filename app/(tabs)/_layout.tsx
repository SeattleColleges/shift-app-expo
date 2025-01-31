import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="add-shift"
                options={{
                    title: 'Add shift',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
            <Tabs.Screen
                name="co-workers"
                options={{
                    title: 'Co-workers',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="help"
                options={{
                    title: 'Help',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile-view"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
        </Tabs>
    );
}