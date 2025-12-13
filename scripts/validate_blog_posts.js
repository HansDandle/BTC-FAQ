const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');

function isUrlLine(line) {
  return /https?:\/\//i.test(line);
}

function validateFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const errors = [];

  // Title
  if (!data.title || typeof data.title !== 'string') {
    errors.push('missing or invalid `title`');
  } else {
    const t = data.title.trim();
    if (t.startsWith('#')) errors.push('title starts with a markdown header (`#`)');
    if (t.length < 10) errors.push('title too short (<10 chars)');
    if (t.length > 120) errors.push('title too long (>120 chars)');
  }

  // Description / excerpt
  const desc = data.description || data.excerpt;
  if (!desc || typeof desc !== 'string') {
    errors.push('missing `description` or `excerpt`');
  } else if (desc.length > 300) {
    errors.push('description/excerpt too long (>300 chars)');
  }

  // Tags
  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    errors.push('missing or empty `tags` array');
  } else if (data.tags.length > 10) {
    errors.push('too many tags (>10)');
  } else {
    data.tags.forEach((t) => {
      if (typeof t !== 'string') errors.push('tag is not a string');
      if (t !== t.toLowerCase()) errors.push(`tag not lowercase: ${t}`);
      if (t.length > 30) errors.push(`tag too long: ${t}`);
    });
  }

  // Content length
  const stripped = content.replace(/```[\s\S]*?```/g, '').replace(/<!--([\s\S]*?)-->/g, '');
  const bodyLen = stripped.trim().length;
  if (bodyLen < 200) errors.push('content too short (<200 chars)');
  if (bodyLen > 12000) errors.push('content too long (>12k chars)');

  // Sources section: check for "## Sources" and at least one URL after it
  const sourcesHeaderIndex = content.indexOf('\n## Sources');
  if (sourcesHeaderIndex === -1 && content.indexOf('\n# Sources') === -1) {
    errors.push('missing "## Sources" section');
  } else {
    // get substring after Sources header
    const after = content.slice(sourcesHeaderIndex === -1 ? content.indexOf('\n# Sources') : sourcesHeaderIndex);
    const lines = after.split(/\r?\n/).slice(1);
    const hasUrl = lines.some(isUrlLine);
    if (!hasUrl) errors.push('no URLs found under Sources');
  }

  // No frontmatter duplication in content (title repeated as '# Title' at top)
  const firstLine = content.split(/\r?\n/)[0] || '';
  if (/^#\s+/.test(firstLine)) {
    errors.push('content begins with a top-level markdown title — title should be in frontmatter, not in body');
  }

  return errors;
}

function main() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error('Blog directory not found:', BLOG_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
  let failed = false;

  files.forEach((f) => {
    const p = path.join(BLOG_DIR, f);
    const errs = validateFile(p);
    if (errs.length) {
      failed = true;
      console.error('\n[INVALID] ', f);
      errs.forEach((e) => console.error('  -', e));
    } else {
      console.log('[OK] ', f);
    }
  });

  if (failed) process.exit(2);
}

main();
