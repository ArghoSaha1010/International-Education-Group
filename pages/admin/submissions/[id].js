import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/AdminLayout';
import { adminRequest, readApiResponse } from '../../../lib/adminApi';
import { useAuth } from '../../../lib/AuthContext';

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Date unavailable' : date.toLocaleString();
}

function DetailRow({ label, children }) {
  return (
    <div className="grid gap-1 border-b border-slate-100 py-4 sm:grid-cols-[180px_1fr] sm:gap-5">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="min-w-0 break-words text-sm text-slate-900">{children}</dd>
    </div>
  );
}

export default function SubmissionDetailPage() {
  const router = useRouter();
  const { status: authStatus } = useAuth();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authStatus !== 'authenticated' || !router.isReady || !id) return undefined;
    let active = true;

    setLoading(true);
    setError('');
    adminRequest(`/submissions/${encodeURIComponent(id)}`)
      .then(async (response) => {
        const result = await readApiResponse(response);
        if (response.status === 401) {
          router.replace('/admin/login');
          throw new Error('Your admin session has expired. Please sign in again.');
        }
        if (!response.ok) throw new Error(result.error || 'Unable to load this submission.');
        if (active) setSubmission(result.submission);
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
  }, [authStatus, router.isReady, id]);

  return (
    <AdminLayout title="Submission details">
      <Head><title>Submission details | IEG Admin</title></Head>
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:underline">← Back to submissions</Link>

      <section className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        {loading ? (
          <p role="status" className="py-8 text-center text-sm text-slate-600">Loading submission…</p>
        ) : error ? (
          <div className="py-8 text-center">
            <p role="alert" className="text-sm text-red-700">{error}</p>
            <Link href="/admin" className="mt-3 inline-block text-sm font-medium text-blue-700 hover:underline">Return to submissions</Link>
          </div>
        ) : submission ? (
          <>
            <div className="border-b border-slate-200 pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">{submission.interest}</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">{submission.name}</h2>
              <p className="mt-1 text-sm text-slate-600">Received {formatDate(submission.createdAt)}</p>
            </div>
            <dl className="mt-2">
              <DetailRow label="Email">{submission.email}</DetailRow>
              <DetailRow label="Institution or organization">{submission.institution}</DetailRow>
              <DetailRow label="Area of interest">{submission.interest}</DetailRow>
              <DetailRow label="Message"><p className="whitespace-pre-wrap">{submission.message}</p></DetailRow>
              <DetailRow label="Last updated">{formatDate(submission.updatedAt)}</DetailRow>
            </dl>
          </>
        ) : null}
      </section>
    </AdminLayout>
  );
}
