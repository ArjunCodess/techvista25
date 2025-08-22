import { NextResponse } from 'next/server'
import { fetchPolls } from '@/sanity/lib/queries'

export async function GET() {
  try {
    const polls = await fetchPolls()
    return NextResponse.json(polls)
  } catch (error) {
    console.error('Failed to fetch polls:', error)
    return NextResponse.json({ error: 'Failed to fetch polls' }, { status: 500 })
  }
}

