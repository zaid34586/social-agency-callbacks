import { NextRequest, NextResponse } from 'next/server'

const META_APP_ID = process.env.META_APP_ID || '4664477173787402'
const META_APP_SECRET = process.env.META_APP_SECRET || '95da2136cbc7162f9b824b1098bf9dbd'
const REDIRECT_URI = 'https://social-agency-callbacks-jxb3hz0w7-match-mind-ai-s-projects.vercel.app/api/callback/facebook'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = request.url.split('code=')[1]?.split('&')[0]
  const state = request.url.split('state=')[1]?.split('&')[0]
  
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }

  try {
    // Exchange code for short-lived token
    const tokenResp = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?` +
      `client_id=${META_APP_ID}&client_secret=${META_APP_SECRET}` +
      `&redirect_uri=${encodeURIComponent('https://social-agency-callbacks-jxb3hz0w7-match-mind-ai-s-projects.vercel.app/api/callback/facebook')}` +
      `&code=${code}`
    )
    const tokenData = await tokenResp.json()
    const shortToken = tokenData.access_token

    // Exchange for long-lived token (60 days)
    const longResp = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?` +
      `grant_type=fb_exchange_token` +
      `&client_id=${META_APP_ID}&client_secret=${META_APP_SECRET}` +
      `&fb_exchange_token=${shortToken}`
    )
    const longData = await longResp.json()
    const longToken = longData.access_token

    // Get user's pages
    const pagesResp = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${longToken}`
    )
    const pagesData = await pagesResp.json()

    // Find Instagram Business Account
    for (const page of pagesData.data || []) {
      const igResp = await fetch(
        `https://graph.facebook.com/v19.0/${page.id}?fields=instagram_business_account&access_token=${longToken}`
      )
      const igData = await igResp.json()
      if (igData.instagram_business_account) {
        console.log('Save token for client:', { 
          pageId: page.id, 
          pageName: page.name, 
          instagramId: igData.instagram_business_account.id,
          accessToken: longToken 
        })
      }
    }

    return new Response(`
      <html><body style="font-family:system-ui;padding:2rem;text-align:center">
        <h1>✅ Facebook Connected!</h1>
        <p>You can close this window.</p>
        <script>setTimeout(() => window.close(), 3000)</script>
      </body></html>
    `, { headers: { 'Content-Type': 'text/html' }})
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}