#!/usr/bin/env python3
import os
import sys
import re
import json
from datetime import datetime
from pathlib import Path

try:
    from openai import OpenAI
except Exception:
    print('Missing OpenAI client. Install with: pip install openai')
    raise


def slugify(text):
    s = text.lower()
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"\s+", "-", s)
    return s[:50].strip('-')


def extract_tags(text, n=5):
    """Simple keyword-extraction: return up to n frequent non-stopwords."""
    import re
    from collections import Counter

    if not text:
        return []

    # strip code blocks and markdown links
    text = re.sub(r'```.*?```', ' ', text, flags=re.S)
    text = re.sub(r'\[.*?\]\(.*?\)', ' ', text)
    # normalize
    text = re.sub(r'[^a-zA-Z0-9\s]', ' ', text).lower()
    words = re.findall(r"\b[a-z]{3,}\b", text)

    stopwords = set([
        'the','and','for','with','that','this','from','have','has','are','were','was','not','but','you','your',
        'they','their','about','will','can','its','than','into','also','more','such','which','when','what','how',
        'been','being','over','other','some','may','should','could','our','we','us',"it's"
    ])

    filtered = [w for w in words if w not in stopwords]
    if not filtered:
        return []

    counts = Counter(filtered)
    candidates = [w for w, _ in counts.most_common()]

    tags = []
    for w in candidates:
        if w not in tags:
            tags.append(w)
        if len(tags) >= n:
            break

    # ensure 'bitcoin' present if mentioned
    if 'bitcoin' in words and 'bitcoin' not in tags:
        tags.insert(0, 'bitcoin')
        tags = tags[:n]

    return tags


def extract_title(markdown_text):
    """Extract the article title from markdown. Skip generic headings."""
    # List of headings that are NOT valid titles
    skip_patterns = [
        r'^(tl;?dr|key\s*takeaways?|excerpt|summary|introduction|sources|references|what\s*to\s*do)',
    ]
    skip_regex = re.compile('|'.join(skip_patterns), re.IGNORECASE)
    
    # Find all top-level headings
    for m in re.finditer(r'^#\s+(.+)$', markdown_text, flags=re.MULTILINE):
        candidate = m.group(1).strip()
        # Skip if it matches a generic heading
        if skip_regex.search(candidate):
            continue
        # Valid title found
        if len(candidate) >= 10:
            return candidate
    
    # Fallback: first non-empty line that looks like a title
    for line in markdown_text.split('\n'):
        line = line.strip()
        if line and not line.startswith('*') and not line.startswith('-') and not line.startswith('#'):
            clean = re.sub(r'\*+', '', line).strip()
            if len(clean) >= 10 and not skip_regex.search(clean):
                return clean[:80]
    
    # Last resort
    return 'Bitcoin Market Analysis'


def main():
    if len(sys.argv) < 2:
        print('Usage: generate_article.py "<prompt>"')
        sys.exit(1)

    prompt = sys.argv[1]
    api_key = os.getenv('PERPLEXITY_API_KEY') or os.getenv('OPENAI_API_KEY')
    if not api_key:
        print('PERPLEXITY_API_KEY or OPENAI_API_KEY must be set in the environment')
        sys.exit(1)

    client = OpenAI(api_key=api_key, base_url='https://api.perplexity.ai')

    system_msg = """You are an expert Bitcoin and cryptocurrency journalist. Write a complete, well-structured, SEO-optimized markdown article in 500-800 words.

OUTPUT FORMAT (follow exactly):

# [Descriptive Article Title Here]

**TL;DR:** [One sentence summary.]

**Key takeaways**

- [First key point]
- [Second key point]
- [Third key point]

---

## [First H2 Section Title]

[2-4 short paragraphs with inline citations like [1], [2].]

## [Second H2 Section Title]

[2-4 short paragraphs.]

## What to do next

[One closing paragraph with actionable advice. Include a natural recommendation for Ledger hardware wallets with the link https://shop.ledger.com/?r=92d74dc2847a when discussing self-custody.]

---

## Sources
1. [Source URL]
2. [Source URL]

RULES:
- The FIRST line must be a top-level heading (# Title) with a descriptive, SEO-friendly title (10-80 characters). Never start with "# TL;DR" or "# Key Takeaways".
- Keep paragraphs to 3-4 sentences max.
- Use active voice. Avoid filler and repetition.
- Include 3-8 numbered sources at the end.
"""

    print('Generating article with Sonar Pro (concise mode)...')
    try:
        resp = client.chat.completions.create(
            model='sonar-pro',
            messages=[
                {'role': 'system', 'content': system_msg},
                {'role': 'user', 'content': prompt}
            ],
            # Token budget tuned for 500-800 word article (~1200 tokens)
            max_tokens=1400,
            temperature=0.5
        )
    except Exception as e:
        print('Generation failed:', e)
        sys.exit(1)

    # tolerant extraction of text
    content = None
    try:
        content = resp.choices[0].message.content
    except Exception:
        try:
            # Some Perplexity responses expose `answer` or nested shapes
            if isinstance(resp, dict) and 'answer' in resp:
                content = resp['answer']
            else:
                content = str(resp)
        except Exception:
            content = str(resp)

    if not content:
        print('No content returned from model')
        sys.exit(1)

    # Attempt to extract structured sources from the response object when available
    sources = []
    try:
        rdict = None
        if hasattr(resp, 'to_dict'):
            rdict = resp.to_dict()
        elif isinstance(resp, dict):
            rdict = resp

        # Look for common source/reference fields
        if isinstance(rdict, dict):
            # Perplexity/sonar sometimes includes `sources` or `answers` with links
            if 'sources' in rdict and isinstance(rdict['sources'], list):
                for s in rdict['sources']:
                    url = s.get('url') or s.get('link') or s.get('href')
                    title = s.get('title') or s.get('name') or url
                    if url:
                        sources.append((title, url))
            # fallback: look for answers -> sources
            if not sources and 'answers' in rdict and isinstance(rdict['answers'], list):
                for a in rdict['answers']:
                    if isinstance(a, dict) and 'sources' in a and isinstance(a['sources'], list):
                        for s in a['sources']:
                            url = s.get('url') or s.get('link') or s.get('href')
                            title = s.get('title') or s.get('name') or url
                            if url:
                                sources.append((title, url))
    except Exception:
        pass

    # If no structured sources found, scrape URLs from the stringified response dump
    if not sources:
        import re
        seen = set()
        for m in re.finditer(r"https?://[\w\-\./?=&%#:~,+]+", str(resp)):
            url = m.group(0).rstrip(').,')
            if url not in seen:
                seen.add(url)
                sources.append((url, url))

    title = extract_title(content)
    # sanitize title: remove leading markdown header markers and trim
    title = re.sub(r'^#\s*', '', title).strip()
    if len(title) > 120:
        title = title[:120].rsplit(' ', 1)[0]
    slug = slugify(title)
    date = datetime.utcnow().strftime('%Y-%m-%d')
    filename = f"{date}-{slug}.md"
    outdir = Path(__file__).resolve().parents[1] / 'src' / 'content' / 'blog'
    outdir.mkdir(parents=True, exist_ok=True)
    filepath = outdir / filename
    # derive description from first non-empty paragraph (more robust than splitting on a literal string)
    import re
    first_paragraph = ''
    if isinstance(content, str) and content.strip():
        paras = re.split(r'\n\s*\n', content.strip())
        for p in paras:
            s = p.replace('\n', ' ').strip()
            if s:
                first_paragraph = s
                break

    description = (first_paragraph[:300]).replace('"', "'") if first_paragraph else f"{title} - autogenerated analysis"

    # auto-generate tags
    tags = extract_tags(content, n=5)

    frontmatter = '---\n'
    frontmatter += f'title: "{title}"\n'
    frontmatter += f'date: "{date}"\n'
    frontmatter += f'description: "{description}"\n'
    frontmatter += f'excerpt: "{title} - autogenerated analysis"\n'
    frontmatter += 'author: "AI Bitcoin Analyst"\n'
    frontmatter += 'tags: [' + ','.join(f'"{t}"' for t in tags) + ']\n'
    frontmatter += '---\n\n'

    # If the content begins with a top-level markdown title (copied from model), remove it
    content = re.sub(r'^\s*#\s*.+\r?\n', '', content, count=1)

    # If content doesn't already include a Sources section, append one using extracted sources
    lower = content.lower() if isinstance(content, str) else ''
    if '## sources' not in lower and '### sources' not in lower and sources:
        sources_md = '\n\n## Sources\n'
        for i, (title, url) in enumerate(sources[:20]):
            display = title if title and title != url else url
            sources_md += f'{i+1}. [{display}]({url})\n'
        content = content.rstrip() + sources_md

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(frontmatter)
        f.write(content)
        f.write('\n\n')
        # Only write the raw model response when explicitly requested via env var
        if os.getenv('WRITE_MODEL_RESPONSE') == '1':
            try:
                f.write('<!-- model_response:\n')
                f.write(json.dumps(resp, default=str, indent=2))
                f.write('\n-->')
            except Exception:
                pass

    print(f'✅ Article saved to {filepath}')


if __name__ == '__main__':
    main()
