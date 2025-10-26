import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="nav-blur sticky top-0 z-50 py-4 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 icon-gradient">
            <span className="text-2xl font-bold text-white">₿</span>
          </div>
          <span className="gradient-text text-2xl font-bold tracking-tight group-hover:opacity-80 transition-opacity">
            BTC-FAQ
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/faq" className="text-link text-lg font-medium">
            FAQ
          </Link>
          <Link href="/blog" className="text-link text-lg font-medium">
            Blog
          </Link>
          <a 
            href="https://shop.ledger.com/?r=4dd6902856a9" 
            target="_blank" 
            rel="nofollow"
            className="btn-primary text-sm"
          >
            Get Ledger
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-300 hover:text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}