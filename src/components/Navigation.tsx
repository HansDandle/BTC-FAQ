import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    function onClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (open && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

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
        <div className="md:hidden relative" ref={menuRef}>
          <button
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-gray-300 hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile dropdown panel */}
          <div
            id="mobile-menu"
            className={`absolute right-0 mt-2 w-44 bg-surface/95 backdrop-blur rounded-lg py-2 shadow-lg ring-1 ring-black/10 transform origin-top-right transition-opacity ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
            role="menu"
            aria-labelledby="mobile-menu-button"
          >
            <Link href="/faq" className="block px-4 py-2 text-link hover:bg-white/5" onClick={() => setOpen(false)}>
              FAQ
            </Link>
            <Link href="/blog" className="block px-4 py-2 text-link hover:bg-white/5" onClick={() => setOpen(false)}>
              Blog
            </Link>
            <a
              href="https://shop.ledger.com/?r=4dd6902856a9"
              target="_blank"
              rel="nofollow"
              className="block px-4 py-2"
              onClick={() => setOpen(false)}
            >
              <span className="btn-primary w-full text-left">Get Ledger</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}