export async function request<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw {
      code: 'API_ERROR',
      status: response.status,
      message: 'Request failed',
    };
  }

  return response.json();
}
