import * as SecureStore from "expo-secure-store";

export const ExpoSecureStoreAdapter = {
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