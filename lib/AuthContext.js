import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { adminRequest, readApiResponse } from './adminApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [status, setStatus] = useState('checking');
  const [authError, setAuthError] = useState('');
  const authRequestVersion = useRef(0);

  const refreshAuth = useCallback(async () => {
    const requestVersion = ++authRequestVersion.current;
    setStatus('checking');
    setAuthError('');

    try {
      const response = await adminRequest('/session');
      const result = await readApiResponse(response);
      if (requestVersion !== authRequestVersion.current) return null;
      if (response.status === 401) {
        setAdmin(null);
        setStatus('unauthenticated');
        return null;
      }
      if (!response.ok) throw new Error(result.error || 'Unable to verify the admin session.');

      setAdmin(result.admin || null);
      setStatus(result.admin ? 'authenticated' : 'unauthenticated');
      return result.admin || null;
    } catch (error) {
      if (requestVersion !== authRequestVersion.current) return null;
      setAdmin(null);
      setStatus('error');
      setAuthError(error.message || 'Unable to reach the admin service.');
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    authRequestVersion.current += 1;
    const response = await adminRequest('/logout', { method: 'POST' });
    const result = await readApiResponse(response);
    if (!response.ok) throw new Error(result.error || 'Logout failed.');

    authRequestVersion.current += 1;
    setAdmin(null);
    setStatus('unauthenticated');
    setAuthError('');
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const value = useMemo(() => ({ admin, status, authError, refreshAuth, logout }), [
    admin,
    status,
    authError,
    refreshAuth,
    logout,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
}
