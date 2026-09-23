import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    service: 'social-agency-callbacks',
    timestamp: new Date().toISOString()
  })
}