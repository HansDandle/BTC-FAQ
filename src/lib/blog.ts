import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
}

export function getAllBlogPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(blogDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(blogDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const firstParagraph = (content || '').split(/\n\n+/)[0].replace(/\n/g, ' ').trim();
        return {
          slug,
          title: data.title || 'Untitled',
          description: data.description || data.excerpt || (firstParagraph ? firstParagraph.slice(0, 300) : ''),
          date: data.date || new Date().toISOString(),
          author: data.author || 'BTC-FAQ Team',
          tags: data.tags || [],
          content,
        };
      });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const firstParagraph = (content || '').split(/\n\n+/)[0].replace(/\n/g, ' ').trim();
    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || data.excerpt || (firstParagraph ? firstParagraph.slice(0, 300) : ''),
      date: data.date || new Date().toISOString(),
      author: data.author || 'BTC-FAQ Team',
      tags: data.tags || [],
      content,
    };
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
}