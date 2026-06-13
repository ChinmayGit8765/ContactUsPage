import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/contact" className="text-xl font-bold text-blue-600 hover:text-blue-700">
          OpenAgent
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link>
          <Link href="/contacts" className="hover:text-blue-600 transition-colors">Contacts</Link>
        </nav>
      </div>
    </header>
  );
}
