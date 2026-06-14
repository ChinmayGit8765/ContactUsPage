import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">

      {/* Hero */}
      <div className="text-center mb-16">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
          Junior Software Engineer — Tech Test
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">OpenAgent Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A full-stack contact management app built with NestJS, Next.js 14, PostgreSQL, and Docker.
          Submit enquiries via a validated contact form and manage them from a live contacts list.
        </p>
        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          <Link href="/contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
            Contact Us form →
          </Link>
          <Link href="/contacts" className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors">
            View contacts
          </Link>
        </div>
      </div>

      {/* What this project does */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">What this project covers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: '📋',
              title: 'Contact Us page',
              desc: 'Company details card alongside a validated form — first name, last name, email, Australian phone number, and optional note.',
            },
            {
              icon: '🙏',
              title: 'Thank You page',
              desc: 'After submission the user is greeted by first name on a personalised confirmation page.',
            },
            {
              icon: '📇',
              title: 'Contacts list',
              desc: 'All submissions shown newest-first. Each contact can be marked as verified (once only) or deleted.',
            },
            {
              icon: '🔒',
              title: 'API validation',
              desc: 'NestJS ValidationPipe rejects bad emails and non-Australian phone numbers with structured 400 errors.',
            },
            {
              icon: '🐘',
              title: 'PostgreSQL + TypeORM',
              desc: 'Contacts persisted in Postgres with UUID primary keys, auto timestamps, and schema sync.',
            },
            {
              icon: '🐳',
              title: 'Fully Dockerised',
              desc: 'Single `docker compose up --build` spins up db, api, and web with zero manual steps.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex gap-4">
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Tech stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
          {[
            { label: 'Backend', value: 'NestJS 10' },
            { label: 'Frontend', value: 'Next.js 14' },
            { label: 'Database', value: 'PostgreSQL 16' },
            { label: 'Infra', value: 'Docker Compose' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
              <p className="font-semibold text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
