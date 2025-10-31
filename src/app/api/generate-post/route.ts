import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a Bitcoin expert creating SEO-optimized blog content for BTC-FAQ.com...'
          },
          {
            role: 'user',
            content: 'Generate a new Bitcoin blog post with affiliate links to Ledger and Koinly...'
          }
        ],
        max_tokens: 2500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    // Here you would typically save to a CMS or trigger a rebuild
    // For now, we'll just return success
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blog post generated successfully' 
    });
    
  } catch (error) {
    console.error('Error generating blog post:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export const runtime = 'edge';