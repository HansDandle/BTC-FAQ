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
  const faqs = [
    {
      question: "How do I report Bitcoin on my taxes?",
      answer: "Bitcoin is treated as property for tax purposes. You must report gains and losses. Use Koinly to automate your crypto tax calculations.",
      link: "https://koinly.io/?via=0DA91C48&utm_source=affiliate",
      linkText: "Try Koinly",
      icon: "📊"
    },
    {
      question: "What is the best wallet for Bitcoin?",
      answer: "The Ledger Nano X is widely considered the best Bitcoin hardware wallet. It offers unparalleled security with a Secure Element chip, supports over 5,500 cryptocurrencies, and has a user-friendly mobile app via Bluetooth.",
      link: "https://shop.ledger.com/?r=4dd6902856a9",
      linkText: "Get your Ledger Nano X",
      icon: "🔒"
    },
    {
      question: "Where can I buy Bitcoin?",
      answer: "Sign up at a trusted exchange to buy Bitcoin safely and securely. We cover what to look for and how to protect your purchase.",
      link: "/blog/buy-bitcoin-guide",
      linkText: "Read our buying guide",
      icon: "💱"
    },
    {
      question: "How do I earn Bitcoin?",
      answer: "Earn Bitcoin by joining affiliate programs, mining, or providing services.",
      link: "/blog/earn-bitcoin-2024",
      linkText: "See the top 5 ways to earn",
      icon: "💰"
    }
  ];

  return (
    <main className="min-h-screen pt-8">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Bitcoin FAQ</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Get expert answers to the most common Bitcoin questions
          </p>
        </div>

        <div className="space-y-8 mb-20">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card card-hover p-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{faq.icon}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">{faq.question}</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {faq.answer}
                  </p>
                  <a 
                    href={faq.link} 
                    target="_blank" 
                    rel="nofollow" 
                    className="text-link font-semibold"
                  >
                    {faq.linkText} →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Check out our comprehensive blog for more Bitcoin insights and guides
            </p>
            <a href="/blog" className="btn-primary text-lg px-8 py-4">
              Read Our Blog
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
