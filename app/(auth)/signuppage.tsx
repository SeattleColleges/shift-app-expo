import React, {useState, useEffect, useCallback} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert,
    KeyboardTypeOptions,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {supabase} from "@/lib/supabaseClient";
import {router} from "expo-router";


const {width} = Dimensions.get('window');

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: '',
        supervisor: '',
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const validateEmail = useCallback((email: string): boolean => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }, []);

    const validatePassword = useCallback((password: string): string | null => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return 'Password must contain at least one lowercase letter.';
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!/(?=.*\d)/.test(password)) {
            return 'Password must contain at least one number.';
        }
        if (!/(?=.*[@$!%*?&#^~])/.test(password)) {
            return 'Password must contain at least one special character (@, $, !, %, *, ?, &,).';
        }
        return null; // Password is valid
    }, []);

    const validateForm = useCallback(() => {
        const emailIsValid = validateEmail(formData.email);
        setIsEmailValid(emailIsValid);

        const passwordErrorMsg = validatePassword(formData.password);
        setPasswordError(passwordErrorMsg);

        const formValid =
            Object.entries(formData)
                .filter(([key]) => key !== 'middleName') // Exclude middleName from required fields.
                .every(([_, value]) => value) &&
            emailIsValid &&
            !passwordErrorMsg &&
            formData.password === formData.confirmPassword;
        setIsFormValid(formValid);
    }, [formData, validateEmail, validatePassword]);

    useEffect(() => {
        validateForm();
    }, [validateForm]);

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleInputChange = useCallback((name: string, value: string) => {
        let newValue = value;
        if (['name', 'middleName', 'lastName'].includes(name)) {
            newValue = capitalizeFirstLetter(value);
        }
        setFormData((prev) => ({...prev, [name]: newValue}));
    }, []);

    const handleSignUp = useCallback(async () => {
        if (!supabase) {
            Alert.alert('Error', 'Authentication service is not available. Please try again later.');
            return;
        }

        try {
            // Sign up with Supabase
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        name: `${formData.name} ${formData.middleName} ${formData.lastName}`.trim(),
                        department: formData.department,
                        supervisor: formData.supervisor,
                    },
                },
            });

            if (authError) {
                Alert.alert('Error', authError.message);
                return;
            }

            if (authData.user) {
                Alert.alert(
                    'Success',
                    'Account created successfully! Please check your email for verification.',
                    [
                        {
                            text: 'OK',
                            onPress: () => router.replace('/(auth)'),
                        },
                    ]
                );
            }
        } catch (error) {
            console.error('Sign up error:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
    }, [formData, router]);

    const renderInput = useCallback(
        (
            label: string,
            name: string,
            value: string,
            onChange: (name: string, value: string) => void,
            keyboardType: KeyboardTypeOptions = 'default',
            error: string | null = null,
            secureTextEntry: boolean = false,
            autoCapitalize: 'none' | 'sentences' | 'words' | 'characters' = 'sentences',
            textContentType: 'none' | 'emailAddress' | 'password' | 'newPassword' | 'oneTimeCode' = 'none'
        ) => (
            <View style={styles.inputContainer}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={label}
                    placeholderTextColor="#888"
                    value={value}
                    onChangeText={(text) => onChange(name, text)}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize={autoCapitalize}
                    textContentType={textContentType}
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
        ),
        []
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Sign Up</Text>
                {renderInput('First Name', 'name', formData.name, handleInputChange)}
                {renderInput('Middle Name (Optional)', 'middleName', formData.middleName, handleInputChange)}
                {renderInput('Last Name', 'lastName', formData.lastName, handleInputChange)}
                {renderInput(
                    'Email',
                    'email',
                    formData.email,
                    handleInputChange,
                    'email-address',
                    !isEmailValid ? 'Wrong email format' : null,
                    false,
                    'none',
                    'emailAddress'
                )}
                {renderInput(
                    'Password',
                    'password',
                    formData.password,
                    handleInputChange,
                    'default',
                    passwordError,
                    true,
                    'none',
                    'newPassword'
                )}
                {renderInput(
                    'Confirm Password',
                    'confirmPassword',
                    formData.confirmPassword,
                    handleInputChange,
                    'default',
                    formData.password !== formData.confirmPassword ? 'Passwords do not match' : null,
                    true,
                    'none',
                    'newPassword'
                )}
                {renderInput('Department', 'department', formData.department, handleInputChange)}
                {renderInput('Supervisor', 'supervisor', formData.supervisor, handleInputChange)}

                <TouchableOpacity
                    style={[styles.signUpButton, !isFormValid && { backgroundColor: '#ccc' }]}
                    onPress={handleSignUp}
                    disabled={!isFormValid}
                >
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.signInContainer}>
                    <Text style={styles.text}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.replace('/(auth)')}>
                        <Text style={styles.link}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: width > 400 ? 32 : 28,
        fontWeight: 'normal',
        marginBottom: 20,
    },
    inputContainer: {
        width: '85%',
        maxWidth: 400,
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: width > 400 ? 50 : 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    signUpButton: {
        width: '85%',
        maxWidth: 400,
        height: width > 400 ? 50 : 45,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 15,
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signInContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 14,
        color: '#666',
    },
    link: {
        color: '#007BFF',
        fontSize: 14,
        marginLeft: 5,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 40,
        paddingTop: 20,
    },
});