import { BASE_URL } from '../config/constants';
import { getToken } from '../utils/storage';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

export async function getCurrentUser(): Promise<AuthUser> {
  const token = await getToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  const res = await fetch(`${BASE_URL}/users?token=${token}`);

  if (!res.ok) {
    throw new Error('Unauthorized');
  }

  const users: AuthUser[] = await res.json();

  if (!users.length) {
    throw new Error('Unauthorized');
  }

  return users[0]; // ✅ correct user matched by token
}
