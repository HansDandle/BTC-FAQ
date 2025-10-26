import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

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
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen pt-8">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Bitcoin Blog</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest Bitcoin insights, guides, and expert analysis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="glass-card card-hover overflow-hidden">
              <Link href={`/blog/${post.slug}`} className="block p-8 h-full">
                <div className="flex flex-col h-full">
                  <h2 className="text-2xl font-bold text-white mb-4 leading-tight hover:text-blue-300 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <div className="flex gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Secure Your Bitcoin?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Don't keep your Bitcoin on exchanges. Get the world's most trusted hardware wallet.
            </p>
            <a href="https://shop.ledger.com/?r=4dd6902856a9" target="_blank" rel="nofollow" className="btn-primary text-lg px-8 py-4">
              Get Your Ledger Wallet
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
