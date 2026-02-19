import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../src/screens/onboarding/LoginScreen';
import { useAuthStore } from '../src/store/authStore';

// Mock the dependencies
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
    useFocusEffect: jest.fn(),
  };
});

jest.mock('../src/store/authStore');

describe('LoginScreen', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    expect(getByText('Welcome')).toBeTruthy();
    expect(getByPlaceholderText('example@example.com')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByText('Log In')).toBeTruthy();
  });

  it('shows error on failed login', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));

    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    fireEvent.changeText(
      getByPlaceholderText('example@example.com'),
      'test@test.com',
    );
    fireEvent.changeText(
      getByPlaceholderText('Enter your password'),
      'password',
    );
    fireEvent.press(getByText('Log In'));

    await waitFor(() => {
      expect(getByText('Invalid credentials')).toBeTruthy();
    });
  });

  it('navigates on successful login', async () => {
    mockLogin.mockResolvedValueOnce(undefined);

    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    fireEvent.changeText(
      getByPlaceholderText('example@example.com'),
      'test@test.com',
    );
    fireEvent.changeText(
      getByPlaceholderText('Enter your password'),
      'password',
    );
    fireEvent.press(getByText('Log In'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('MainTabs');
    });
  });
});
