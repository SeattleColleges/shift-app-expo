import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import LoginPage from "../../app/(auth)/index";
import { mockProfile } from "@/context/MockProfile";

jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(async () => ({ data: { user: { id: '123' } }, error: null })),
      signInWithPassword: jest.fn(async () => ({ data: { user: { id: '123' } }, error: null })),
    },
  },
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(() => Promise.resolve(null)),
  setItemAsync: jest.fn(() => Promise.resolve()),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    render(<LoginPage />);
  });

  test("enables login button when email and password are valid", async () => {
    fireEvent.changeText(screen.getByTestId('email-input'), mockProfile.email);
    fireEvent.changeText(screen.getByTestId('password-input'), mockProfile.password);

    const loginButton = screen.getByTestId('login-button');

    await waitFor(() => {
      expect(loginButton.props.accessibilityState?.disabled).toBe(false);
    });
  });

  test("disables login button when email is valid and password is empty", async () => {
    fireEvent.changeText(screen.getByTestId('email-input'), mockProfile.email);
    fireEvent.changeText(screen.getByTestId('password-input'), '');

    const loginButton = screen.getByTestId('login-button');

    await waitFor(() => {
      expect(loginButton.props.accessibilityState?.disabled).toBe(true);
    });
  });

  test("disables login button when both email and password are empty", async () => {
    fireEvent.changeText(screen.getByTestId('email-input'), '');
    fireEvent.changeText(screen.getByTestId('password-input'), '');

    const loginButton = screen.getByTestId('login-button');

    await waitFor(() => {
      expect(loginButton.props.accessibilityState?.disabled).toBe(true);
    });
  });
});
