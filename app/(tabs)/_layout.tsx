import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import {useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";

export default function TabLayout() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchRole = async () => {
            const storedRole = await SecureStore.getItemAsync('role');
            setRole(storedRole);
        };

        fetchRole();
    }, []);
    const isAdmin = role === 'administrator' || role === 'supervisor';
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', tabBarStyle: { display: 'flex' },  }}>
            <Tabs.Screen
                name="calendar"
                options={{
                    title: 'Schedule',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar-check-o" color={color} />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="add-shift"
                options={{
                    title: 'Add Shift',
                    tabBarIcon: ({color}) => <FontAwesome size={28} name="calendar-plus-o" color={color}/>,
                    href: isAdmin ? null : '/(tabs)/add-shift'
                }}
            />
            <Tabs.Screen
                name="coworkers"
                options={{
                    title: 'Coworkers',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="users" color={color} />,
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: 'Notifications',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profileView"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                }}
            />
            {/* These screens are not direct tabs and are handled by file-system routing or other navigation methods */}
            <Tabs.Screen
                name="department-org"
                options={{
                    href: null
                }}
            />
            <Tabs.Screen
                name="help"
                options={{
                    href: null
                }}
            />
            <Tabs.Screen
                name="editProfile"
                options={{
                    href: null
                }}
            />
        </Tabs>
    );
}