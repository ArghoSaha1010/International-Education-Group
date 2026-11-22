import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BackToHomeLink from './BackToHomeLink';
import { useAuth } from '../lib/AuthContext';

export default function AdminLayout({ title, children }) {
  const router = useRouter();
  const { admin, status, authError, logout, refreshAuth } = useAuth();
  const [error, setError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
  const footer = (
    <footer className="border-t border-slate-200 bg-white px-5 py-4 sm:px-8">
      <div className="mx-auto max-w-7xl"><BackToHomeLink /></div>
    </footer>
  );

  useEffect(() => {
    if (status === 'unauthenticated' && router.isReady && !loggingOut) {
      router.replace({ pathname: '/admin/login', query: { next: router.asPath } });
    }
  }, [status, router.isReady, router.asPath, loggingOut]);

  async function handleLogout() {
    setLoggingOut(true);
    setError('');
    try {
      await logout();
      await router.replace('/admin/login');
    } catch (logoutError) {
      setError(logoutError.message || 'Unable to log out right now.');
      setLoggingOut(false);
    }
  }

  if (status === 'checking') {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <main className="flex flex-1 items-center justify-center px-5 text-sm text-slate-600">Checking admin session…</main>
        {footer}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <main className="flex flex-1 items-center justify-center px-5">
          <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-lg font-semibold text-slate-900">Admin service unavailable</h1>
            <p role="alert" className="mt-2 text-sm text-red-700">{authError || 'Your session could not be verified.'}</p>
            <button type="button" onClick={refreshAuth} className="mt-5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
              Try again
            </button>
          </div>
        </main>
        {footer}
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <main className="flex flex-1 items-center justify-center px-5 text-sm text-slate-600">Redirecting to admin sign in…</main>
        {footer}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-[Poppins] text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <a href="/admin" className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">IEG Admin</a>
            <h1 className="mt-1 text-lg font-semibold text-slate-900">{title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-600 sm:inline">{admin.username}</span>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60"
            >
              {loggingOut ? 'Signing out…' : 'Log out'}
            </button>
          </div>
        </div>
      </header>
      {error && <p role="alert" className="mx-auto mt-4 max-w-7xl px-5 text-sm text-red-700 sm:px-8">{error}</p>}
      <main className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-10">{children}</main>
      {footer}
    </div>
  );
}
