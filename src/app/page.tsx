import Image from "next/image";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Bitcoin FAQ - Your Complete Guide to Bitcoin Questions",
  description: "Get answers to the most common Bitcoin questions. Learn about buying, storing, and earning Bitcoin with our comprehensive FAQ guide and trusted affiliate recommendations.",
  keywords: ["Bitcoin FAQ", "What is Bitcoin", "How to buy Bitcoin", "Bitcoin wallet", "Bitcoin taxes", "Earn Bitcoin"],
  openGraph: {
    title: "Bitcoin FAQ - Your Complete Guide to Bitcoin Questions",
    description: "Get answers to the most common Bitcoin questions. Learn about buying, storing, and earning Bitcoin with our comprehensive FAQ guide.",
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bitcoin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bitcoin is a decentralized digital currency that enables peer-to-peer transactions without intermediaries. It's secured by blockchain technology and is the most recognized cryptocurrency worldwide."
        }
      },
      {
        "@type": "Question",
        "name": "How do I buy Bitcoin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can buy Bitcoin using trusted exchanges. Sign up at a reputable exchange to get started and earn bonuses."
        }
      },
      {
        "@type": "Question",
        "name": "How do I keep Bitcoin safe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Store your Bitcoin in a secure wallet. Hardware wallets are recommended for long-term storage."
        }
      },
      {
        "@type": "Question",
        "name": "Can I earn Bitcoin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Earn Bitcoin by joining affiliate programs, mining, or providing services."
        }
      }
    ]
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-gray-100 dark:from-black dark:to-zinc-900 px-4 py-12">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold text-yellow-700 dark:text-yellow-400 mb-4">Bitcoin FAQ</h1>
          <p className="text-lg text-gray-700 dark:text-zinc-300 mb-8">
            The most common Bitcoin questions answered by crypto natives. Start your journey, learn the basics, and discover ways to earn with Bitcoin.
          </p>
          <div className="grid gap-6 text-left">
            <div>
              <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-300">What is Bitcoin?</h2>
              <p className="text-gray-800 dark:text-zinc-200">Bitcoin is a decentralized digital currency that enables peer-to-peer transactions without intermediaries. It’s secured by blockchain technology and is the most recognized cryptocurrency worldwide.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-300">How do I buy Bitcoin?</h2>
              <p className="text-gray-800 dark:text-zinc-200">You can buy Bitcoin using trusted exchanges. <a href="https://affiliate-exchange.com/signup" className="text-blue-600 underline font-medium" rel="nofollow" target="_blank">Sign up here</a> to get started and earn bonuses.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-300">How do I keep Bitcoin safe?</h2>
              <p className="text-gray-800 dark:text-zinc-200">Store your Bitcoin in a secure wallet. Hardware wallets are recommended for long-term storage. <a href="https://affiliate-wallet.com" className="text-blue-600 underline font-medium" rel="nofollow" target="_blank">Get a hardware wallet</a>.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-300">Can I earn Bitcoin?</h2>
              <p className="text-gray-800 dark:text-zinc-200">Yes! Earn Bitcoin by joining affiliate programs, mining, or providing services. <a href="https://affiliate-earn.com" className="text-blue-600 underline font-medium" rel="nofollow" target="_blank">Discover earning opportunities</a>.</p>
            </div>
            <div className="bg-yellow-100 dark:bg-zinc-800 rounded-lg p-6 mt-6 shadow">
              <h2 className="text-xl font-bold text-yellow-900 dark:text-yellow-200 mb-2">Bitcoin Tax Calculation Made Easy</h2>
              <p className="text-gray-900 dark:text-zinc-100 mb-4">Tax season doesn’t have to be stressful. Track your Bitcoin transactions and calculate your crypto taxes automatically with <span className="font-semibold">Koinly</span>. Save time, avoid mistakes, and stay compliant.</p>
              <a href="https://koinly.io/?via=0DA91C48&utm_source=affiliate" target="_blank" rel="nofollow" className="inline-block bg-blue-700 text-white font-bold py-2 px-5 rounded-lg shadow hover:bg-blue-800 transition">Try Koinly for Free</a>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a href="https://affiliate-exchange.com/signup" className="inline-block bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-700 transition">Sign Up & Buy Bitcoin</a>
            <a href="https://koinly.io/?via=0DA91C48&utm_source=affiliate" target="_blank" rel="nofollow" className="inline-block bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-800 transition">Calculate Your Bitcoin Taxes with Koinly</a>
          </div>
        </section>
      </main>
    </>
  );
}
