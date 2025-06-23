import { Stack } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TabLayout() {
    const router = useRouter();
    const pathname = usePathname();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchRole = async () => {
            if (supabase) {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    const { data: roleData } = await supabase
                        .from('profiles')
                        .select('role')
                        .eq('profile_id', session.user.id)
                        .single();
                    
                    if (roleData?.role) {
                        setRole(roleData.role.toLowerCase());
                    }
                }
            }
        };

        fetchRole();
    }, []);

    const isAdmin = role === 'admin';

    const tabs = [
        { name: 'index', title: 'Schedule', icon: 'calendar-check-o' },
        ...(isAdmin ? [{ name: 'add-shift', title: 'Add Shift', icon: 'calendar-plus-o' }] : []),
        { name: 'coworkers', title: 'Coworkers', icon: 'users' },
        { name: 'notifications', title: 'Notifications', icon: 'bell' },
        { name: 'profileView', title: 'Profile', icon: 'user' },
    ];

    const handleTabPress = (tabName: string) => {
        if (tabName === 'index') {
            router.push('/(tabs)' as any);
        } else {
            router.push(`/(tabs)/${tabName}` as any);
        }
    };

    const isTabActive = (tabName: string) => {
        if (tabName === 'index') {
            return pathname === '/(tabs)/' || pathname === '/(tabs)/index';
        }
        return pathname === `/(tabs)/${tabName}`;
    };

    return (
        <View style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="add-shift" />
                <Stack.Screen name="coworkers" />
                <Stack.Screen name="notifications" />
                <Stack.Screen name="profileView" />
            </Stack>
            
            {/* Custom Bottom Tab Bar */}
            <View style={styles.tabBar}>
                {tabs.map((tab) => {
                    const isActive = isTabActive(tab.name);
                    return (
                        <TouchableOpacity
                            key={tab.name}
                            style={styles.tab}
                            onPress={() => handleTabPress(tab.name)}
                        >
                            <FontAwesome 
                                size={24} 
                                name={tab.icon as any} 
                                color={isActive ? '#007AFF' : '#8E8E93'} 
                            />
                            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                                {tab.title}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
        paddingBottom: 20,
        paddingTop: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    tabText: {
        fontSize: 12,
        marginTop: 4,
        color: '#8E8E93',
    },
    activeTabText: {
        color: '#007AFF',
    },
});