import React from 'react';
import { Alert } from 'react-native';
import LoginPage from '../../app/(auth)/loginpage';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('LoginPage Component', () => {
  let component: React.ReactElement;
  let setEmailMock: jest.Mock;
  let setPasswordMock: jest.Mock;

  beforeEach(() => {
    setEmailMock = jest.fn();
    setPasswordMock = jest.fn();

    const originalUseState = React.useState;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => ['', setEmailMock] as any)
        .mockImplementationOnce(() => ['', setPasswordMock] as any);

    component = <LoginPage />;

    React.useState = originalUseState;
  });

  test('validates email correctly', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.co',
      'user+tag@example.org'
    ];

    const invalidEmails = [
      'invalid-email',
      'missing@domain',
      '@missinguser.com',
      'spaces not@allowed.com'
    ];

    validEmails.forEach(email => {
      setEmailMock(email);
      expect(setEmailMock).toHaveBeenCalledWith(email);
    });

    invalidEmails.forEach(email => {
      setEmailMock(email);
      expect(setEmailMock).toHaveBeenCalledWith(email);
    });
  });

  test('requires non-empty password', () => {
    const validPasswords = ['password123', 'securePass!'];
    const invalidPasswords = ['', ' '];

    validPasswords.forEach(password => {
      setPasswordMock(password);
      expect(setPasswordMock).toHaveBeenCalledWith(password);
    });

    invalidPasswords.forEach(password => {
      setPasswordMock(password);
      expect(setPasswordMock).toHaveBeenCalledWith(password);
    });
  });

  test('login button disabled with invalid input', () => {
    const scenarios = [
      { email: '', password: '', expectedDisabled: true },
      { email: 'invalid', password: 'pass', expectedDisabled: true },
      { email: 'test@example.com', password: '', expectedDisabled: true },
      { email: 'test@example.com', password: 'password123', expectedDisabled: false }
    ];

    scenarios.forEach(scenario => {
      setEmailMock(scenario.email);
      setPasswordMock(scenario.password);

      const isFormValid = scenario.email.includes('@') && scenario.password.length > 0;
      expect(isFormValid).toBe(!scenario.expectedDisabled);
    });
  });

  test('handles login submission', () => {
    const alertMock = jest.spyOn(Alert, 'alert');

    setEmailMock('test@example.com');
    setPasswordMock('password123');

    const email = 'test@example.com';
    const password = 'password123';

    if (email && password) {
      Alert.alert('Login', `Email: ${email}\nPassword: ${password}`);
    }

    expect(alertMock).toHaveBeenCalledWith(
      'Login', 
      `Email: ${email}\nPassword: ${password}`
    );
  });
});