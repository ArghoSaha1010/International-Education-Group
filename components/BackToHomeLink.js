import Link from 'next/link';

export default function BackToHomeLink() {
  return (
    <Link
      href="/"
      className="inline-flex min-h-8 items-center rounded-md border border-[#1c2c49]/20 px-3 py-1 text-xs font-semibold text-[#1c2c49] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      ← Back to Home
    </Link>
  );
}
