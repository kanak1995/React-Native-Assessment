import { BASE_URL } from '../config/constants';
import { generateToken } from '../utils/token';
import { request } from './http';

// ---------------- REGISTER ----------------
export async function registerApi(
  name: string,
  email: string,
  password: string,
) {
  if (!name || !email || !password) {
    throw { code: 'VALIDATION_ERROR', message: 'All fields required' };
  }

  const users = await request<any[]>(`${BASE_URL}/users?email=${email}`);

  if (users.length > 0) {
    throw { code: 'EMAIL_EXISTS', message: 'Email already registered' };
  }

  const token = generateToken();

  const user = await request<any>(`${BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password, token }),
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

// ---------------- LOGIN ----------------
export async function loginApi(email: string, password: string) {
  if (!email) throw { code: 'EMAIL_REQUIRED', field: 'email' };
  if (!password) throw { code: 'PASSWORD_REQUIRED', field: 'password' };

  const users = await request<any[]>(
    `${BASE_URL}/users?email=${email}&password=${password}`,
  );

  if (users.length === 0) {
    throw { code: 'INVALID_CREDENTIALS' };
  }

  const user = users[0];
  const token = generateToken();

  await request(`${BASE_URL}/users/${user.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ token }),
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
