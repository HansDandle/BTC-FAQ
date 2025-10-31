const fs = require('fs');
const path = require('path');

async function generateBlogPost() {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
  if (!OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  // Bitcoin topics for variety
  const topics = [
    'Bitcoin DCA strategies',
    'Bitcoin Lightning Network explained',
    'Bitcoin mining difficulty adjustment',
    'Bitcoin ETF vs direct ownership',
    'Bitcoin security best practices',
    'Bitcoin scalability solutions',
    'Bitcoin regulatory updates',
    'Bitcoin energy consumption facts',
    'Bitcoin halving cycles explained',
    'Bitcoin vs traditional banking',
    'Bitcoin cold storage methods',
    'Bitcoin inheritance planning',
    'Bitcoin tax implications 2024',
    'Bitcoin institutional adoption',
    'Bitcoin layer 2 solutions'
  ];

  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  const currentDate = new Date().toISOString().split('T')[0];
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert Bitcoin educator writing for BTC-FAQ.com. Create engaging, SEO-optimized blog posts that naturally incorporate affiliate links for Ledger hardware wallets (https://shop.ledger.com/?r=4dd6902856a9) and Koinly tax software (https://koinly.io/?via=0DA91C48&utm_source=affiliate).

Requirements:
- Write in markdown format with frontmatter
- Include relevant Bitcoin keywords naturally
- Provide genuine value and education
- Include 1-2 affiliate link mentions that feel natural
- Target 1000-1500 words
- Use engaging headlines and subheadings
- Include actionable advice
- Maintain authoritative but accessible tone`
          },
          {
            role: 'user',
            content: `Write a comprehensive blog post about "${randomTopic}" for ${currentDate}. Make it engaging, informative, and SEO-friendly. Include practical tips and naturally mention Ledger wallets for security and Koinly for tax tracking where relevant.`
          }
        ],
        max_tokens: 2500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    const content = data.choices[0].message.content;
    
    // Generate filename from topic
    const filename = randomTopic
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    
    const filepath = path.join(__dirname, '..', 'src', 'content', 'blog', `${filename}-${currentDate}.md`);
    
    // Ensure directory exists
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filepath, content);
    
    console.log(`✅ Generated blog post: ${filename}-${currentDate}.md`);
    console.log(`📍 Topic: ${randomTopic}`);
    
  } catch (error) {
    console.error('❌ Error generating blog post:', error.message);
    process.exit(1);
  }
}

generateBlogPost();