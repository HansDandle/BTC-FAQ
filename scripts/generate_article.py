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
    m = re.search(r'^#\s*(.+)$', markdown_text, flags=re.MULTILINE)
    if m:
        return m.group(1).strip()
    # fallback: first line or generate
    first = markdown_text.split('\n', 1)[0].strip()
    return first[:60] if first else 'Bitcoin Article'


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

    system_msg = (
        "You are an expert Bitcoin and cryptocurrency journalist with a libertarian bent. Produce a tight, concise, SEO-optimized markdown article. "
        "Focus on one clear main message (at most two closely related points). Write for an informed audience. "
        "Target ~800-1000 words. Start with a one-sentence TL;DR and a short 3-bullet Key takeaways section. "
        "Use H2/H3 headings and brief paragraphs. Prefer active voice and avoid rambling or filler. "
        "When citing facts, include inline numeric citations like [1], [2], and include a final '## Sources' section with numbered links. "
        "Include a brief, natural recommendation for Ledger hardware wallets when discussing self-custody, using the link https://shop.ledger.com/?r=92d74dc2847a."
    )

    print('Generating article with Sonar Pro (concise mode)...')
    try:
        resp = client.chat.completions.create(
            model='sonar-pro',
            messages=[
                {'role': 'system', 'content': system_msg},
                {'role': 'user', 'content': prompt}
            ],
            # Reduce token budget to encourage concision; adjust as needed
            max_tokens=1600,
            temperature=0.45
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

    # enforce max word count (1000 words) to avoid overly long rambling outputs
    words = re.findall(r"\w+", content)
    max_words = 1000
    truncated = False
    if len(words) > max_words:
        truncated = True
        # keep first max_words words and try to preserve some heading structure by joining
        content = ' '.join(words[:max_words]) + '\n\n*Note: article truncated to meet 1000-word limit.*\n\n'

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
