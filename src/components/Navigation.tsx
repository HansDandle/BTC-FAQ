import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-yellow-600 dark:bg-yellow-800 p-4">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          BTC-FAQ
        </Link>
        <div className="space-x-6">
          <Link href="/" className="text-white hover:text-yellow-200 font-medium">
            Home
          </Link>
          <Link href="/faq" className="text-white hover:text-yellow-200 font-medium">
            FAQ
          </Link>
          <Link href="/blog" className="text-white hover:text-yellow-200 font-medium">
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}