import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import ForgotPasswordPage from '../../app/(auth)/forgot-password';

// Mock Supabase client
jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      resetPasswordForEmail: jest.fn().mockResolvedValue({ error: null })
    }
  }
}));

describe('ForgotPasswordPage Component', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordPage />);
    
    expect(getByText('Forgot Password')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByText('Send Reset Link')).toBeTruthy();
  });

  test('shows error message for invalid email', async () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordPage />);
    
    const emailInput = getByPlaceholderText('Enter your email');
    const submitButton = getByText('Send Reset Link');

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.press(submitButton);

    expect(getByText('Invalid email address')).toBeTruthy();
  });

  test('clears error message when valid email is entered', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<ForgotPasswordPage />);
    
    const emailInput = getByPlaceholderText('Enter your email');
    const submitButton = getByText('Send Reset Link');

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.press(submitButton);

    expect(getByText('Invalid email address')).toBeTruthy();

    fireEvent.changeText(emailInput, 'valid@example.com');

    await waitFor(() => {
      expect(queryByText('Invalid email address')).toBeNull();
    });
  });

  test('displays success message after form submission', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<ForgotPasswordPage />);

    const emailInput = getByPlaceholderText('Enter your email');
    const submitButton = getByText('Send Reset Link');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.press(submitButton);

    expect(getByText('Sending...')).toBeTruthy();

    await waitFor(() => {
      expect(getByText('If this email is registered, you will receive a reset link.')).toBeTruthy();
    });

    await waitFor(() => {
      expect(queryByText('Sending...')).toBeNull();
    });
  });

  test('shows error message when backend request fails', async () => {
    // Mock Supabase to return an error
    const { supabase } = require('@/lib/supabaseClient');
    supabase.auth.resetPasswordForEmail.mockRejectedValueOnce({
      message: 'Failed to send reset password email'
    });

    const { getByText, getByPlaceholderText } = render(<ForgotPasswordPage />);
    
    const emailInput = getByPlaceholderText('Enter your email');
    const submitButton = getByText('Send Reset Link');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(getByText('Failed to send reset password email')).toBeTruthy();
    });
  });
});
