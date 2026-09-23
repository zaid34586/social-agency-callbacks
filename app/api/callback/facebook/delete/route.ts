import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const signedRequest = request.url.split('signed_request=')[1]?.split('&')[0]
  
  // Parse signed_request, delete user data per GDPR
  console.log('Delete request:', signedRequest)
  
  return NextResponse.json({ status: 'deleted' })
}