import {Stack} from "expo-router";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen
            name="index"
            />
            <Stack.Screen
                name="forgot-password"
            />
            <Stack.Screen
                name="signuppage"
            />
        </Stack>
    )
}