import { NextResponse } from 'next/server'
import { fetchLostAndFound } from '@/sanity/lib/queries'

export async function GET() {
  try {
    const laf = await fetchLostAndFound()
    return NextResponse.json(laf)
  } catch (error) {
    console.error('Failed to fetch lost and found:', error)
    return NextResponse.json({ error: 'Failed to fetch lost and found' }, { status: 500 })
  }
}

