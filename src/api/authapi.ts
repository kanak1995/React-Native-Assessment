import { generateToken } from '../utils/token';

const BASE_URL = 'http://localhost:3000';
// Android emulator → http://10.0.2.2:3000

// ---------------- REGISTER ----------------
export const registerApi = async (
  name: string,
  email: string,
  password: string,
) => {
  if (!name || !email || !password) {
    throw { code: 'VALIDATION_ERROR', message: 'All fields required' };
  }

  const exists = await fetch(`${BASE_URL}/users?email=${email}`).then(res =>
    res.json(),
  );

  if (exists.length > 0) {
    throw { code: 'EMAIL_EXISTS', message: 'Email already registered' };
  }

  const token = generateToken();

  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
      token,
    }),
  });

  const user = await res.json();

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

// ---------------- LOGIN ----------------
export const loginApi = async (email: string, password: string) => {
  // 1️⃣ Field-level validation
  if (!email) {
    throw {
      code: 'EMAIL_REQUIRED',
      field: 'email',
      message: 'Email is required',
    };
  }

  if (!password) {
    throw {
      code: 'PASSWORD_REQUIRED',
      field: 'password',
      message: 'Password is required',
    };
  }

  // 2️⃣ Check credentials
  const users = await fetch(
    `${BASE_URL}/users?email=${email}&password=${password}`,
  ).then(res => res.json());

  // 3️⃣ Generate token
  if (users.length === 0) {
    throw {
      code: 'INVALID_CREDENTIALS',
      message: 'Email or password incorrect',
    };
  }

  const user = users[0];
  const newToken = generateToken();
  console.log(newToken);
  await fetch(`${BASE_URL}/users/${user.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: newToken }),
  });

  return {
    token: newToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};
