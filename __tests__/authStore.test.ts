import { useAuthStore } from '../src/store/authStore';
import { loginApi } from '../src/api/auth.api';
import {
  saveToken,
  clearToken,
  getToken,
  getUserId,
} from '../src/utils/storage';

jest.mock('../src/api/auth.api');
jest.mock('../src/utils/storage');

describe('authStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      user: null,
      token: null,
      status: 'unauthenticated',
    });
  });

  it('initializes as unauthenticated when no token exists', async () => {
    (getToken as jest.Mock).mockResolvedValue(null);

    await useAuthStore.getState().initialize();

    expect(useAuthStore.getState().status).toBe('unauthenticated');
  });

  it('initializes as authenticated when token exists', async () => {
    (getToken as jest.Mock).mockResolvedValue('fake-token');
    (getUserId as jest.Mock).mockResolvedValue('user-123');

    await useAuthStore.getState().initialize();

    expect(useAuthStore.getState().status).toBe('authenticated');
    expect(useAuthStore.getState().token).toBe('fake-token');
  });

  it('logs in successfully', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@test.com' };
    (loginApi as jest.Mock).mockResolvedValue({
      token: 'new-token',
      user: mockUser,
    });

    await useAuthStore.getState().login('test@test.com', 'password');

    expect(useAuthStore.getState().status).toBe('authenticated');
    expect(useAuthStore.getState().user).toEqual(mockUser);
    expect(saveToken).toHaveBeenCalledWith('new-token');
  });

  it('handles login failure', async () => {
    (loginApi as jest.Mock).mockRejectedValue(new Error('Login failed'));

    await expect(
      useAuthStore.getState().login('test@test.com', 'password'),
    ).rejects.toThrow('Login failed');

    expect(useAuthStore.getState().status).toBe('unauthenticated');
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('logs out correctly', async () => {
    useAuthStore.setState({
      status: 'authenticated',
      token: 'some-token',
      user: { id: '1' } as any,
    });

    await useAuthStore.getState().logout();

    expect(useAuthStore.getState().status).toBe('unauthenticated');
    expect(useAuthStore.getState().token).toBeNull();
    expect(clearToken).toHaveBeenCalled();
  });
});
