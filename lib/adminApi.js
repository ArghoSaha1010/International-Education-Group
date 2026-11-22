export const ADMIN_API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001').replace(/\/+$/, '');

export async function adminRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(`${ADMIN_API_URL}/api/admin${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });
}

export async function readApiResponse(response) {
  return response.json().catch(() => ({}));
}
