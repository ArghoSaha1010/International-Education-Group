import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';

export default function AdminFooterAccess({ showSessionActions = true }) {
  const { admin, status, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState('');

  async function handleLogout() {
    setLoggingOut(true);
    setError('');
    try {
      await logout();
    } catch (logoutError) {
      setError(logoutError.message || 'Unable to log out right now.');
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <Link
        href="/admin/login"
        className="inline-flex min-h-8 items-center rounded-md border border-[#1c2c49]/20 px-3 py-1 text-xs font-semibold text-[#1c2c49] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Admin Login
      </Link>
      {showSessionActions && status === 'authenticated' && admin && (
        <>
          <Link href="/admin" className="font-medium transition hover:text-[#1c2c49]">Admin dashboard</Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="font-medium transition hover:text-[#1c2c49] disabled:cursor-wait disabled:opacity-60"
          >
            {loggingOut ? 'Logging out…' : 'Log out'}
          </button>
        </>
      )}
      {error && <span role="alert" className="w-full text-xs text-red-700">{error}</span>}
    </div>
  );
}
