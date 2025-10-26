import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bitcoin Blog - Latest News and Guides",
  description: "Stay updated with the latest Bitcoin news, guides, and tips. Learn about crypto taxes, earning strategies, and wallet security from crypto experts.",
  keywords: ["Bitcoin blog", "crypto news", "Bitcoin guides", "crypto taxes", "Bitcoin earning", "cryptocurrency tips"],
  openGraph: {
    title: "Bitcoin Blog - Latest News and Guides",
    description: "Stay updated with the latest Bitcoin news, guides, and tips. Learn about crypto taxes, earning strategies, and wallet security.",
  },
};

export default function BlogPage() {
  return (
      <main className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-yellow-700 dark:text-yellow-400">Bitcoin Blog</h1>
        <article className="mb-8">
          <h2 className="text-xl font-semibold mb-2">How to Calculate Your Bitcoin Taxes with Koinly</h2>
          <p className="mb-2">Tax season can be overwhelming for crypto users. Koinly makes it easy to track your Bitcoin transactions and generate tax reports. <a href="https://koinly.io/?via=0DA91C48&utm_source=affiliate" target="_blank" rel="nofollow" className="text-blue-600 underline font-medium">Try Koinly now</a>.</p>
        </article>
        <article className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Top 5 Ways to Earn Bitcoin in 2025</h2>
          <p className="mb-2">From affiliate programs to mining, discover the best strategies to earn Bitcoin this year. <a href="https://affiliate-earn.com" target="_blank" rel="nofollow" className="text-blue-600 underline font-medium">Start earning</a>.</p>
        </article>
        <article>
          <h2 className="text-xl font-semibold mb-2">Best Bitcoin Wallets for Security</h2>
          <p className="mb-2">Protect your Bitcoin with a hardware wallet. <a href="https://affiliate-wallet.com" target="_blank" rel="nofollow" className="text-blue-600 underline font-medium">Get yours here</a>.</p>
        </article>
      </main>
  );
}
