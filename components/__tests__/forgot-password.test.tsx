import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import ForgotPasswordPage from '../../app/(auth)/forgot-password';

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
    jest.useFakeTimers(); // ✅ Enable fake timers before rendering

    const { getByText, getByPlaceholderText, queryByText } = render(<ForgotPasswordPage />);

    const emailInput = getByPlaceholderText('Enter your email');
    const submitButton = getByText('Send Reset Link');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.press(submitButton);

    // Ensure the button changes to "Sending..."
    expect(getByText('Sending...')).toBeTruthy();

    // Move time forward by 2000ms
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    // Wait for success message to appear
    await waitFor(() => {
      expect(getByText('If this email is registered, you will receive a reset link.')).toBeTruthy();
    });

    // Ensure the button resets back to "Send Reset Link"
    await waitFor(() => {
      expect(queryByText('Sending...')).toBeNull();
    });

    jest.useRealTimers(); // ✅ Restore real timers after test completes
  });
});
