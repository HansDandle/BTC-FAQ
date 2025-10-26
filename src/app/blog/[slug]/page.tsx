import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import Link from "next/link";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  
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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <Link href="/blog" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 mb-6 inline-block">
        ← Back to Blog
      </Link>
      
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-yellow-700 dark:text-yellow-400">
            {post.title}
          </h1>
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span>By {post.author} • {new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-yellow-700 dark:prose-headings:text-yellow-400 prose-a:text-blue-600 dark:prose-a:text-blue-400">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children, ...props }) => (
                <a 
                  href={href} 
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'nofollow noopener' : undefined}
                  {...props}
                >
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}