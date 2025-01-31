import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', tabBarStyle: { display: 'flex' },  }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Schedule',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar-check-o" color={color} />,
                }}
            />
            <Tabs.Screen
                name="addShift"
                options={{
                    title: 'Add shift',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar-plus-o" color={color} />,
                }}
            />
            <Tabs.Screen
                name="coworkers"
                options={{
                    title: 'Corworkers',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="users" color={color} />,
                }}
            />
            <Tabs.Screen
                name="help"
                options={{
                    title: 'Help',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="question-circle" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profileView"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                }}
            />
            <Tabs.Screen
                name="department-org"
                options={{
                    href: null
                }}
            />
        </Tabs>
    );
}