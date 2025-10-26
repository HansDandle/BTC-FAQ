import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import Link from "next/link";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const posts = getAllBlogPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | BTC-FAQ`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-8">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/blog" className="text-link text-lg font-medium mb-8 inline-flex items-center gap-2 hover:gap-3 transition-all">
          ← Back to Blog
        </Link>
        
        <article className="glass-card p-8 md:p-12 mb-12">
          <header className="mb-12 text-center border-b border-gray-700 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400 mb-6">
              <span>By {post.author}</span>
              <span className="hidden sm:block">•</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none text-gray-300 leading-relaxed">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="text-4xl font-bold text-white mb-6 mt-8">{children}</h1>,
                h2: ({ children }) => <h2 className="text-3xl font-bold text-white mb-4 mt-8 border-b border-blue-500 pb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-2xl font-bold text-white mb-3 mt-6">{children}</h3>,
                p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                a: ({ href, children, ...props }) => (
                  <a 
                    href={href} 
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'nofollow noopener' : undefined}
                    className="text-link"
                    {...props}
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => <ul className="text-gray-300 mb-4 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="text-gray-300 mb-4 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="text-gray-300">{children}</li>,
                strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full glass-card">{children}</table>
                  </div>
                ),
                th: ({ children }) => <th className="px-4 py-3 text-left text-white font-semibold bg-gray-800/50">{children}</th>,
                td: ({ children }) => <td className="px-4 py-3 text-gray-300 border-t border-gray-700">{children}</td>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* CTA Section */}
        <div className="glass-card p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Secure Your Bitcoin Today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Don't wait to protect your investment. Get the world's most trusted hardware wallet.
          </p>
          <a href="https://shop.ledger.com/?r=4dd6902856a9" target="_blank" rel="nofollow" className="btn-primary text-lg px-8 py-4">
            Get Your Ledger Wallet
          </a>
        </div>
      </div>
    </main>
  );
}