import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import { adminRequest, readApiResponse } from '../../lib/adminApi';
import { useAuth } from '../../lib/AuthContext';

const pageSize = 10;

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Date unavailable' : date.toLocaleString();
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { status: authStatus } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (authStatus !== 'authenticated') return undefined;
    let active = true;
    const query = new URLSearchParams({ page: String(page), limit: String(pageSize) });
    if (search) query.set('search', search);

    setLoading(true);
    setError('');
    adminRequest(`/submissions?${query.toString()}`)
      .then(async (response) => {
        const result = await readApiResponse(response);
        if (response.status === 401) {
          router.replace('/admin/login');
          throw new Error('Your admin session has expired. Please sign in again.');
        }
        if (!response.ok) throw new Error(result.error || 'Unable to load submissions.');
        if (!active) return;
        setSubmissions(result.submissions || []);
        setTotal(result.pagination?.total || 0);
        setTotalPages(result.pagination?.pages || 0);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || 'Unable to reach the admin service.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [page, search, refreshKey, router, authStatus]);

  function handleSearch(event) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  return (
    <AdminLayout title="Contact submissions">
      <Head><title>Submissions | IEG Admin</title></Head>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-slate-600">Review messages sent through the website contact form.</p>
          <p className="mt-2 text-sm font-medium text-slate-900">{total} {total === 1 ? 'submission' : 'submissions'}</p>
        </div>
        <form onSubmit={handleSearch} className="flex w-full gap-2 sm:max-w-md">
          <label htmlFor="submission-search" className="sr-only">Search submissions</label>
          <input
            id="submission-search"
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search name, email, or message"
            className="h-11 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
          <button type="submit" className="h-11 rounded-lg bg-blue-700 px-4 text-sm font-medium text-white hover:bg-blue-800">Search</button>
        </form>
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <p role="status" className="p-8 text-center text-sm text-slate-600">Loading submissions…</p>
        ) : error ? (
          <div className="p-8 text-center">
            <p role="alert" className="text-sm text-red-700">{error}</p>
            <button type="button" onClick={() => setRefreshKey((current) => current + 1)} className="mt-3 text-sm font-medium text-blue-700 hover:underline">Retry</button>
          </div>
        ) : submissions.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="text-base font-semibold text-slate-900">No submissions found</h2>
            <p className="mt-2 text-sm text-slate-600">{search ? 'Try a different search term.' : 'New contact form messages will appear here.'}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Name</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Email</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Interest</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Received</th>
                    <th scope="col" className="px-5 py-3"><span className="sr-only">Details</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4 font-medium text-slate-900">{submission.name}</td>
                      <td className="px-5 py-4 text-slate-600">{submission.email}</td>
                      <td className="px-5 py-4 text-slate-600">{submission.interest}</td>
                      <td className="px-5 py-4 text-slate-600">{formatDate(submission.createdAt)}</td>
                      <td className="px-5 py-4 text-right">
                        <Link href={`/admin/submissions/${encodeURIComponent(submission.id)}`} className="whitespace-nowrap font-medium text-blue-700 hover:underline">View details</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4">
              <p className="text-sm text-slate-600">Page {page} of {Math.max(totalPages, 1)}</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page <= 1} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
                <button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page >= totalPages} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">Next</button>
              </div>
            </div>
          </>
        )}
      </section>
    </AdminLayout>
  );
}
