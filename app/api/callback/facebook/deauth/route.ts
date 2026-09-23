import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const signedRequest = request.url.split('signed_request=')[1]?.split('&')[0]
  
  // Parse signed_request, revoke user's tokens
  console.log('Deauth:', signedRequest)
  
  return NextResponse.json({ status: 'deauthorized' })
}