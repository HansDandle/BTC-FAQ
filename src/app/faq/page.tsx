import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bitcoin FAQ - Frequently Asked Questions",
  description: "Get answers to frequently asked questions about Bitcoin, crypto taxes, wallets, exchanges, and more. Expert guidance for crypto beginners and advanced users.",
  keywords: ["Bitcoin FAQ", "crypto taxes", "Bitcoin wallet", "Bitcoin exchange", "how to earn Bitcoin"],
  openGraph: {
    title: "Bitcoin FAQ - Frequently Asked Questions",
    description: "Get answers to frequently asked questions about Bitcoin, crypto taxes, wallets, exchanges, and more.",
  },
};

export default function FAQPage() {
  return (
      <main className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-yellow-700 dark:text-yellow-400">Bitcoin Frequently Asked Questions</h1>
        <ul className="space-y-8">
          <li>
            <h2 className="text-xl font-semibold">How do I report Bitcoin on my taxes?</h2>
            <p>Bitcoin is treated as property for tax purposes. You must report gains and losses. Use <a href="https://koinly.io/?via=0DA91C48&utm_source=affiliate" target="_blank" rel="nofollow" className="text-blue-600 underline font-medium">Koinly</a> to automate your crypto tax calculations.</p>
          </li>
          <li>
            <h2 className="text-xl font-semibold">What is the best wallet for Bitcoin?</h2>
            <p>Hardware wallets like Ledger and Trezor are recommended for security. <a href="https://affiliate-wallet.com" target="_blank" rel="nofollow" className="text-blue-600 underline font-medium">Get a hardware wallet</a>.</p>
          </li>
          <li>
            <h2 className="text-xl font-semibold">Where can I buy Bitcoin?</h2>
            <p>Sign up at a trusted exchange. <a href="https://affiliate-exchange.com/signup" target="_blank" rel="nofollow" className="text-blue-600 underline font-medium">Buy Bitcoin here</a>.</p>
          </li>
          <li>
            <h2 className="text-xl font-semibold">How do I earn Bitcoin?</h2>
            <p>Earn Bitcoin by joining affiliate programs, mining, or providing services. <a href="https://affiliate-earn.com" target="_blank" rel="nofollow" className="text-blue-600 underline font-medium">Learn more</a>.</p>
          </li>
        </ul>
      </main>
  );
}
