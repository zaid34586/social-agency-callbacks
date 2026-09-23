import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = request.url.split('code=')[1]?.split('&')[0]
  const state = request.url.split('state=')[1]?.split('&')[0]
  
  if (!code) {
    return NextResponse.json({ error: 'No code' }, { status: 400 })
  }

  // TODO: Exchange code for token, save to database
  console.log('Instagram callback code:', code, 'state:', state)
  
  return new Response(`
    <html><body style="font-family:system-ui;padding:2rem;text-align:center">
      <h1>✅ Instagram Connected!</h1>
      <p>You can close this window.</p>
      <script>setTimeout(() => window.close(), 3000)</script>
    </body></html>
  `, { headers: { 'Content-Type': 'text/html' }})
}