export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Lumen & Co. Pty Ltd · PO Box 100, Melbourne VIC 3000
      </div>
    </footer>
  );
}
