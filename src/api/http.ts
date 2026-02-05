// export async function request<T>(
//   url: string,
//   options: RequestInit = {},
// ): Promise<T> {
//   const response = await fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//       ...(options.headers || {}),
//     },
//     ...options,
//   });

import { getToken, clearToken } from '../utils/storage';
export async function request<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await getToken();
  // console.log('.....................token..............', token);
  // await saveToken(token + 'kanak');
  // const newtoken = await getToken();
  // console.log('.....................token..............', newtoken);

  const headers: HeadersInit_ = {
    ...(options.headers || {}),
    ...(options.body && { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // 🔴 HANDLE AUTH ERROR HERE
  if (response.status === 401) {
    await clearToken(); // logout
  }

  if (!response.ok) {
    let errorBody: any = null;

    try {
      errorBody = await response.json();
    } catch {}

    throw new Error(
      errorBody?.message || `Request failed (${response.status})`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
