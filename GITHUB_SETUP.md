# 🚀 GitHub Actions Bitcoin Blog Setup Guide

## Required API Keys for Current Events Blog Generation

Your AI Bitcoin blog system needs these API keys to generate topical, current content with real market data:

### 1. **OpenAI API Key** (Required)
- **Purpose**: Generates high-quality Bitcoin analysis content
- **Cost**: ~$0.02-0.05 per blog post with GPT-4
- **Setup**:
  1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
  2. Create account and add billing method
  3. Generate new API key
  4. Copy the key (starts with `sk-`)

### 2. **NewsAPI Key** (Optional but Recommended)
- **Purpose**: Fetches current Bitcoin/crypto news for context
- **Cost**: FREE for up to 1,000 requests/month
- **Setup**:
  1. Go to [NewsAPI.org](https://newsapi.org/register)
  2. Register for free account
  3. Copy your API key
  4. Enables real-time news integration

### 3. **CoinMarketCap API Key** (Optional but Recommended)
- **Purpose**: Real-time Bitcoin price data and market metrics
- **Cost**: FREE tier includes 10,000 calls/month
- **Setup**:
  1. Go to [CoinMarketCap API](https://coinmarketcap.com/api/)
  2. Sign up for free account
  3. Generate API key in dashboard
  4. Enables accurate price data integration

## 🔐 Adding Secrets to GitHub Repository

1. **Navigate to Repository Settings**:
   ```
   GitHub.com → Your Repository → Settings Tab → Secrets and Variables → Actions
   ```

2. **Add Each Secret**:
   
   **Required Secret:**
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key (sk-...)
   
   **Optional Secrets for Enhanced Features:**
   - Name: `NEWS_API_KEY`
   - Value: Your NewsAPI key
   
   - Name: `COINMARKETCAP_API_KEY`
   - Value: Your CoinMarketCap API key

3. **Click "Add Secret"** for each one

## 🎯 What Your System Does

### **Automatic Schedule**:
- **Monday & Thursday at 9 AM UTC** (twice weekly for freshness)
- Automatically triggered, no manual intervention needed

### **Content Generated**:
- ✅ **Current market analysis** with real Bitcoin prices
- ✅ **Political developments** affecting crypto policy
- ✅ **Regulatory updates** and their market implications
- ✅ **Institutional adoption** news and trends
- ✅ **Technical analysis** with current support/resistance
- ✅ **Macro economic** context (Fed policy, inflation, etc.)

### **SEO Optimization**:
- Current date-based keywords
- Trending crypto topics
- Market-specific long-tail keywords
- Natural Ledger affiliate integration

## 🚀 Activation Steps

1. **Add API Keys** to GitHub Secrets (at minimum: OPENAI_API_KEY)

2. **Commit and Push** the new workflow:
   ```bash
   git add .
   git commit -m "🤖 Add current events Bitcoin blog automation"
   git push
   ```

3. **Test Manual Trigger**:
   - Go to Actions tab in GitHub
   - Find "AI Bitcoin Blog - Current Events"
   - Click "Run workflow"

4. **Verify Automation**:
   - Check Actions tab after next scheduled run
   - New blog posts appear in `src/content/blog/`
   - Automatic deployment to your site

## 📊 Expected Results

### **Traffic Growth**:
- **2x more organic traffic** from current events keywords
- **Higher click-through rates** on extremely timely content
- **Better search rankings** for Bitcoin-related queries

### **Engagement Increase**:
- **Longer page visits** from in-depth analysis
- **Higher social shares** due to current relevance
- **Return visitors** checking for latest analysis

### **Revenue Optimization**:
- **Natural Ledger affiliate placements** in security discussions
- **Higher conversion rates** from targeted, relevant content
- **Authority building** leading to more affiliate trust

## 🔧 Customization Options

### **Change Posting Schedule**:
Edit `.github/workflows/auto-blog.yml`:
```yaml
# Daily at 9 AM UTC
- cron: '0 9 * * *'

# Every 3 days at 9 AM UTC  
- cron: '0 9 */3 * *'

# Weekdays only at 9 AM UTC
- cron: '0 9 * * 1-5'
```

### **Adjust Content Focus**:
Modify `scripts/generate-current-blog.js` prompt to emphasize:
- More technical analysis
- Specific regulatory focus
- Particular political angles
- Different market segments

## ⚡ Quick Start Checklist

- [ ] Get OpenAI API key and add to GitHub Secrets
- [ ] (Optional) Get NewsAPI and CoinMarketCap keys  
- [ ] Push changes to GitHub repository
- [ ] Test manual workflow trigger
- [ ] Verify first auto-generated post
- [ ] Monitor traffic and engagement improvements

Your Bitcoin blog is now a **current events content machine** that will outrank competitors with fresher, more relevant analysis! 🎯