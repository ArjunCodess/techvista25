import { NextResponse } from 'next/server'
import { fetchFeedbacks } from '@/sanity/lib/queries'

export async function GET() {
  try {
    const feedbacks = await fetchFeedbacks()
    return NextResponse.json(feedbacks)
  } catch (error) {
    console.error('Failed to fetch feedbacks:', error)
    return NextResponse.json({ error: 'Failed to fetch feedbacks' }, { status: 500 })
  }
}

