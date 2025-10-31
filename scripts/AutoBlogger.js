const { Octokit } = require('@octokit/rest');

class AutoBlogger {
  constructor() {
    this.openaiKey = process.env.OPENAI_API_KEY;
    this.githubToken = process.env.GITHUB_TOKEN;
    this.repoOwner = 'HansDandle';
    this.repoName = 'BTC-FAQ';
    
    this.octokit = new Octokit({ auth: this.githubToken });
    
    this.bitcoinTopics = [
      'Bitcoin security fundamentals',
      'Understanding Bitcoin volatility',
      'Bitcoin adoption trends 2024',
      'Bitcoin vs altcoins comparison',
      'Bitcoin technical analysis basics',
      'Bitcoin macro economic factors',
      'Bitcoin environmental impact truth',
      'Bitcoin legal status worldwide',
      'Bitcoin retirement planning',
      'Bitcoin for beginners guide'
    ];
  }

  async generateContent(topic) {
    const prompt = `Write a comprehensive, SEO-optimized blog post about "${topic}" for BTC-FAQ.com.

Requirements:
- Include frontmatter with title, description, date, author, and tags
- 1200-1800 words
- Natural integration of Ledger wallet (https://shop.ledger.com/?r=4dd6902856a9)
- Natural integration of Koinly tax software (https://koinly.io/?via=0DA91C48&utm_source=affiliate)
- Focus on education and value
- Include actionable tips
- Use H2 and H3 headings for structure
- Write in markdown format
- Target keywords: Bitcoin, crypto, ${topic.toLowerCase()}

Make it engaging and informative while maintaining professionalism.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 3000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async publishToGitHub(content, filename) {
    const path = `src/content/blog/${filename}`;
    
    try {
      await this.octokit.repos.createOrUpdateFileContents({
        owner: this.repoOwner,
        repo: this.repoName,
        path: path,
        message: `Add new blog post: ${filename}`,
        content: Buffer.from(content).toString('base64'),
      });
      
      console.log(`✅ Published: ${filename}`);
    } catch (error) {
      console.error('❌ Error publishing to GitHub:', error.message);
    }
  }

  async generateWeeklyPost() {
    const topic = this.bitcoinTopics[Math.floor(Math.random() * this.bitcoinTopics.length)];
    const date = new Date().toISOString().split('T')[0];
    const filename = `${topic.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}-${date}.md`;
    
    console.log(`🚀 Generating content for: ${topic}`);
    
    const content = await this.generateContent(topic);
    await this.publishToGitHub(content, filename);
    
    return { topic, filename };
  }
}

module.exports = AutoBlogger;