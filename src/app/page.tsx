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
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto icon-gradient mb-6">
                <span className="text-4xl font-bold text-white">₿</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Bitcoin FAQ</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your comprehensive guide to Bitcoin. Get expert answers, secure your crypto, and start earning today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href="https://shop.ledger.com/?r=4dd6902856a9" target="_blank" rel="nofollow" className="btn-primary text-lg px-8 py-4">
                Secure Your Bitcoin
              </a>
              <a href="/blog" className="btn-secondary text-lg px-8 py-4">
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Cards Section */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className="gradient-text">Common Questions</span>
            </h2>
            <p className="text-xl text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Everything you need to know about Bitcoin, explained simply
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="glass-card card-hover p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 icon-gradient flex-shrink-0">
                    <span className="text-2xl font-bold text-white">₿</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">What is Bitcoin?</h3>
                    <p className="text-gray-300 leading-relaxed">Bitcoin is a decentralized digital currency that enables peer-to-peer transactions without intermediaries. It's secured by blockchain technology and is the most recognized cryptocurrency worldwide.</p>
                  </div>
                </div>
              </div>

              <div className="glass-card card-hover p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-white">💱</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">How do I buy Bitcoin?</h3>
                    <p className="text-gray-300 leading-relaxed">You can buy Bitcoin using trusted exchanges. <a href="https://affiliate-exchange.com/signup" className="text-link" rel="nofollow" target="_blank">Sign up here</a> to get started and earn bonuses.</p>
                  </div>
                </div>
              </div>

              <div className="glass-card card-hover p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-white">🔒</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">How do I keep Bitcoin safe?</h3>
                    <p className="text-gray-300 leading-relaxed">Store your Bitcoin in a secure wallet. The <strong className="text-white">Ledger Nano X</strong> is the gold standard - trusted by millions worldwide with bank-grade security. <a href="https://shop.ledger.com/?r=4dd6902856a9" className="text-link" rel="nofollow" target="_blank">Get your Ledger wallet here</a>.</p>
                  </div>
                </div>
              </div>

              <div className="glass-card card-hover p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-white">💰</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Can I earn Bitcoin?</h3>
                    <p className="text-gray-300 leading-relaxed">Yes! Earn Bitcoin by joining affiliate programs, mining, or providing services. <a href="https://affiliate-earn.com" className="text-link" rel="nofollow" target="_blank">Discover earning opportunities</a>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section - Koinly */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">📊</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Bitcoin Tax Calculation Made Easy
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Tax season doesn't have to be stressful. Track your Bitcoin transactions and calculate your crypto taxes automatically with <strong className="text-white">Koinly</strong>. Save time, avoid mistakes, and stay compliant.
              </p>
              <a href="https://koinly.io/?via=0DA91C48&utm_source=affiliate" target="_blank" rel="nofollow" className="btn-primary text-lg px-8 py-4">
                Try Koinly for Free
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Ready to Start Your Bitcoin Journey?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Get the tools and knowledge you need to succeed in the world of Bitcoin
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="https://shop.ledger.com/?r=4dd6902856a9" target="_blank" rel="nofollow" className="btn-primary text-lg px-8 py-4">
                Secure Your Bitcoin with Ledger
              </a>
              <a href="https://koinly.io/?via=0DA91C48&utm_source=affiliate" target="_blank" rel="nofollow" className="btn-secondary text-lg px-8 py-4">
                Calculate Your Bitcoin Taxes
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}