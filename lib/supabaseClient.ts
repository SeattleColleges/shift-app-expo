import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
    getItem: async (key: string) => {
        try {
            const value = await SecureStore.getItemAsync(key);
            if (value) {
                const { access_token, refresh_token } = JSON.parse(value);
                return JSON.stringify({access_token, refresh_token, token_type: 'bearer', user: null})
            }
            return null;
        } catch (error) {
            console.error('Error getting item from Securestore:', error);
            return null;
        }
    },
    setItem: async (key: string, value: string): Promise<void> => {
        try {
            const session = JSON.parse(value);
            const { access_token, refresh_token } = session;
            // Store only the tokens in SecureStore
            await SecureStore.setItemAsync(key, JSON.stringify({ access_token, refresh_token }));
        } catch (error) {
            console.error('Error setting item to Securestore:', error);
        }
    },
    removeItem: async (key: string): Promise<void> => {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.error('Error deleting item from Securestore:', error);
        }
    },
};

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing Supabase configuration. Supabase client will not be initialized.');
}

export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            storage: ExpoSecureStoreAdapter,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    })
    : null;