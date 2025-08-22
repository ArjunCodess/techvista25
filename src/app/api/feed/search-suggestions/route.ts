import { NextResponse } from 'next/server'
import { fetchPosts, fetchPolls, fetchFeedbacks, fetchLostAndFound } from '@/sanity/lib/queries'

export async function GET() {
  try {
    // Fetch all feed data in parallel
    const [posts, polls, feedbacks, laf] = await Promise.all([
      fetchPosts(),
      fetchPolls(),
      fetchFeedbacks(),
      fetchLostAndFound(),
    ])

    // Extract unique tags, sections, and classes with frequency counting
    const tagFrequency = new Map<string, number>()
    const allSections = new Set<string>()
    const allClasses = new Set<string>()

    // Process posts
    posts.forEach((post: any) => {
      if (post.tags) {
        post.tags.forEach((tag: string) => {
          tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1)
        })
      }
      if (post.sections) post.sections.forEach((section: string) => allSections.add(section))
      if (post.classes) post.classes.forEach((cls: string) => allClasses.add(cls))
    })

    // Process polls
    polls.forEach((poll: any) => {
      if (poll.tags) {
        poll.tags.forEach((tag: string) => {
          tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1)
        })
      }
      if (poll.sections) poll.sections.forEach((section: string) => allSections.add(section))
      if (poll.classes) poll.classes.forEach((cls: string) => allClasses.add(cls))
    })

    // Process feedbacks
    feedbacks.forEach((feedback: any) => {
      if (feedback.tags) {
        feedback.tags.forEach((tag: string) => {
          tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1)
        })
      }
      if (feedback.sections) feedback.sections.forEach((section: string) => allSections.add(section))
      if (feedback.classes) feedback.classes.forEach((cls: string) => allClasses.add(cls))
    })

    // Process lost and found
    laf.forEach((item: any) => {
      if (item.tags) {
        item.tags.forEach((tag: string) => {
          tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1)
        })
      }
      if (item.sections) item.sections.forEach((section: string) => allSections.add(section))
      if (item.classes) item.classes.forEach((cls: string) => allClasses.add(cls))
    })

    // Sort tags by frequency and get top ones
    const sortedTags = Array.from(tagFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([tag]) => tag)

    const suggestions = {
      tags: sortedTags,
      sections: Array.from(allSections).sort(),
      classes: Array.from(allClasses).sort().slice(0, 12), // Top 12 most common classes
      totalItems: posts.length + polls.length + feedbacks.length + laf.length,
      tagCounts: Object.fromEntries(tagFrequency),
      stats: {
        posts: posts.length,
        polls: polls.length,
        feedbacks: feedbacks.length,
        lostAndFound: laf.length
      }
    }

    // Add caching headers for better performance
    const response = NextResponse.json(suggestions)
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600') // Cache for 5 minutes, stale for 10 minutes
    response.headers.set('ETag', `"${Date.now()}"`) // Simple ETag for caching
    
    return response
  } catch (error) {
    console.error('Failed to fetch search suggestions:', error)
    return NextResponse.json({ error: 'Failed to fetch search suggestions' }, { status: 500 })
  }
}
