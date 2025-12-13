const fs = require('fs');
const path = require('path');

async function generateMockPost() {
  const currentDate = new Date().toISOString().split('T')[0];
  const title = `Mock Bitcoin Market Analysis ${currentDate}`;
  const slug = `mock-bitcoin-market-analysis-${currentDate}`;
  const filename = `${currentDate}-${slug}.md`;
  const filepath = path.join(__dirname, '..', 'src', 'content', 'blog', filename);

  const blogDir = path.dirname(filepath);
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

  const frontmatter = `---\ntitle: "${title}"\ndate: "${currentDate}"\nexcerpt: "Mock current Bitcoin market analysis for testing automation"\nauthor: "AI Bitcoin Analyst (mock)"\ntags: ["bitcoin","market-analysis","mock"]\nreadTime: "3 min read"\n---\n\n`;

  const content = `# ${title}\n\nThis is a mock Bitcoin market analysis generated for testing the automated blog workflow.\n\n- Bitcoin Price: $67,000 (mock)\n- Market Sentiment: neutral (mock)\n\n## Political & Regulatory\nMock summary of political and regulatory developments.\n\n## Market Dynamics\nMock summary of market flows and ETF activity.\n\n## Technical Analysis\nMock support and resistance levels.\n\n## Conclusion\nThis post is a placeholder used to validate the automation pipeline.\n`;

  fs.writeFileSync(filepath, frontmatter + content);
  console.log(`Generated mock post: ${filename}`);
  return filename;
}

if (require.main === module) {
  generateMockPost().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { generateMockPost };
