// @ts-ignore
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import { ExpoSecureStoreAdapter } from "@/lib/expoSecureStoreAdapter";

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