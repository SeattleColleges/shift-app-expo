import * as SecureStore from "expo-secure-store";
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

// Cookie storage for web platform
const getCookie = (name: string): string | null => {
    if (!isWeb || !isBrowser) return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(';').shift();
        return cookieValue ? decodeURIComponent(cookieValue) : null;
    }
    return null;
};

const setCookie = (name: string, value: string, days = 7): void => {
    if (!isWeb || !isBrowser) return;
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
};

const deleteCookie = (name: string): void => {
    if (!isWeb || !isBrowser) return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// Memory storage as fallback for non-browser environments
const memoryStorage = new Map<string, string>();

export const ExpoSecureStoreAdapter = {
    getItem: async (key: string) => {
        try {
            let value;
            if (isWeb) {
                if (isBrowser) {
                    value = getCookie(key);
                } else {
                    value = memoryStorage.get(key);
                }
            } else {
                value = await SecureStore.getItemAsync(key);
            }
            
            if (value) {
                // Try to parse as JSON first (for session data)
                try {
                    const parsed = JSON.parse(value);
                    if (parsed.access_token && parsed.refresh_token) {
                        // This is session data
                        const { access_token, refresh_token } = parsed;
                        return JSON.stringify({access_token, refresh_token, token_type: 'bearer', user: null})
                    } else {
                        // This is not session data, return as simple string
                        return value;
                    }
                } catch {
                    // Not valid JSON, return as simple string
                    return value;
                }
            }
            return null;
        } catch (error) {
            console.error('Error getting item from storage:', error);
            return null;
        }
    },
    setItem: async (key: string, value: string): Promise<void> => {
        try {
            let storageValue;
            
            // Try to parse as JSON first (for session data)
            try {
                const session = JSON.parse(value);
                if (session.access_token && session.refresh_token) {
                    // This is session data
                    const { access_token, refresh_token } = session;
                    storageValue = JSON.stringify({ access_token, refresh_token });
                } else {
                    // This is not session data, store as simple string
                    storageValue = value;
                }
            } catch {
                // Not valid JSON, store as simple string
                storageValue = value;
            }
            
            if (isWeb) {
                if (isBrowser) {
                    setCookie(key, storageValue);
                } else {
                    memoryStorage.set(key, storageValue);
                }
            } else {
                await SecureStore.setItemAsync(key, storageValue);
            }
        } catch (error) {
            console.error('Error setting item to storage:', error);
        }
    },
    removeItem: async (key: string): Promise<void> => {
        try {
            if (isWeb) {
                if (isBrowser) {
                    deleteCookie(key);
                } else {
                    memoryStorage.delete(key);
                }
            } else {
                await SecureStore.deleteItemAsync(key);
            }
        } catch (error) {
            console.error('Error deleting item from storage:', error);
        }
    },
};

if (isWeb) {
  // Polyfill for Supabase Auth JS expecting these methods
  (ExpoSecureStoreAdapter as any).setValueWithKeyAsync = async (key: string, value: string) => {
    return ExpoSecureStoreAdapter.setItem(key, value);
  };
  (ExpoSecureStoreAdapter as any).getValueWithKeyAsync = async (key: string) => {
    return ExpoSecureStoreAdapter.getItem(key);
  };
  (ExpoSecureStoreAdapter as any).deleteValueWithKeyAsync = async (key: string) => {
    return ExpoSecureStoreAdapter.removeItem(key);
  };
}