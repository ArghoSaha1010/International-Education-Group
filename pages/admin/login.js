import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { adminRequest, readApiResponse } from '../../lib/adminApi';
import { useAuth } from '../../lib/AuthContext';
import BackToHomeLink from '../../components/BackToHomeLink';

function safeAdminDestination(value) {
  return typeof value === 'string' && (value === '/admin' || value.startsWith('/admin/'))
    ? value
    : '/admin';
}

export default function AdminLoginPage() {
  const router = useRouter();
  const { status: authStatus, refreshAuth } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('username') && !params.has('password')) return;

    params.delete('username');
    params.delete('password');
    const query = params.toString();
    const cleanUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
    window.history.replaceState(window.history.state, '', cleanUrl);
  }, []);

  useEffect(() => {
    if (authStatus === 'authenticated' && router.isReady) {
      router.replace(safeAdminDestination(router.query.next));
    }
  }, [authStatus, router.isReady, router.query.next]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');
    try {
      const response = await adminRequest('/login', {
        method: 'POST',
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const result = await readApiResponse(response);
      if (!response.ok) throw new Error(result.error || 'Sign-in failed. Check your credentials and try again.');
      const authenticatedAdmin = await refreshAuth();
      if (!authenticatedAdmin) throw new Error('Sign-in succeeded, but the admin session could not be restored. Please try again.');
      await router.replace(safeAdminDestination(router.query.next));
    } catch (requestError) {
      setError(requestError instanceof TypeError
        ? 'Unable to reach the admin service. Please try again.'
        : requestError.message || 'Sign-in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Head><title>Admin login | International Education Group</title></Head>
      <main className="flex min-h-screen items-center justify-center bg-[#f3f6fc] px-5 py-10 font-[Poppins]">
        <div className="w-full max-w-md">
          <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <a href="/" className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">International Education Group</a>
            <h1 className="mt-5 text-2xl font-semibold text-slate-900">Admin sign in</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">Sign in to view contact enquiries.</p>

            <form method="post" onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="admin-username" className="mb-2 block text-sm font-medium text-slate-800">Username</label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="h-12 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-slate-800">Password</label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
            </form>
          </section>
          <footer className="mt-6 flex justify-center text-sm text-slate-600">
            <BackToHomeLink />
          </footer>
        </div>
      </main>
    </>
  );
}
