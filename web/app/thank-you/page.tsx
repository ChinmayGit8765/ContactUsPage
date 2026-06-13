import Link from 'next/link';

interface Props {
  searchParams: { name?: string };
}

export default function ThankYouPage({ searchParams }: Props) {
  const name = searchParams.name ?? 'there';

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="max-w-md">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank you, {name}!</h1>
        <p className="text-gray-600 mb-8">
          We&apos;ve received your message and will be in touch shortly.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/contact"
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to contact
          </Link>
          <Link
            href="/contacts"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white transition-colors"
          >
            View contacts
          </Link>
        </div>
      </div>
    </div>
  );
}
