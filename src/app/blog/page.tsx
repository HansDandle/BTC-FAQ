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
      <main className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-yellow-700 dark:text-yellow-400">Bitcoin Blog</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <Link href={`/blog/${post.slug}`} className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-4 -m-4 transition-colors">
                <h2 className="text-xl font-semibold mb-2 text-yellow-800 dark:text-yellow-300 hover:text-yellow-600 dark:hover:text-yellow-200">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
  );
}
