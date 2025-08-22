"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Hash, Users, BookOpen, Loader2, BarChart3 } from "lucide-react"
import SearchHistory from "./search-history"
import SearchAnalytics from "./search-analytics"

interface SearchSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void
  className?: string
}

interface SanityData {
  tags: string[]
  sections: string[]
  classes: string[]
  totalItems: number
  tagCounts: Record<string, number>
  stats: {
    posts: number
    polls: number
    feedbacks: number
    lostAndFound: number
  }
}

export default function SearchSuggestions({ 
  onSuggestionClick, 
  className = "" 
}: SearchSuggestionsProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [sanityData, setSanityData] = useState<SanityData>({
    tags: [],
    sections: [],
    classes: [],
    totalItems: 0,
    tagCounts: {},
    stats: {
      posts: 0,
      polls: 0,
      feedbacks: 0,
      lostAndFound: 0
    }
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSuggestions(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchSanityData = async () => {
      try {
        setIsLoading(true)
        
        // Fetch all search suggestions from the single API endpoint
        const response = await fetch('/api/feed/search-suggestions')
        if (!response.ok) {
          throw new Error('Failed to fetch search suggestions')
        }
        
        const data = await response.json()
        setSanityData(data)
      } catch (error) {
        console.error('Failed to fetch Sanity data:', error)
        // Fallback to some default values if API fails
        setSanityData({
          tags: ["technology", "events", "academics"],
          sections: ["senior", "junior"],
          classes: ["computer science", "engineering"],
          totalItems: 0,
          tagCounts: {},
          stats: {
            posts: 0,
            polls: 0,
            feedbacks: 0,
            lostAndFound: 0
          }
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSanityData()
  }, [])

  if (!showSuggestions) return null

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search History */}
      <SearchHistory 
        onHistoryClick={onSuggestionClick}
        onClearHistory={() => {}}
      />
      
      {/* Search Analytics */}
      <SearchAnalytics />
      
      <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <TrendingUp className="h-4 w-4" />
        Popular searches
        {sanityData.totalItems > 0 && (
          <span className="text-xs text-muted-foreground">
            • {sanityData.totalItems} total items
          </span>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">Loading suggestions...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Content Statistics */}
          {sanityData.totalItems > 0 && (
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <BarChart3 className="h-3 w-3" />
                Content overview
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {sanityData.stats.posts > 0 && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                    {sanityData.stats.posts} posts
                  </span>
                )}
                {sanityData.stats.polls > 0 && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                    {sanityData.stats.polls} polls
                  </span>
                )}
                {sanityData.stats.feedbacks > 0 && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded">
                    {sanityData.stats.feedbacks} feedback
                  </span>
                )}
                {sanityData.stats.lostAndFound > 0 && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded">
                    {sanityData.stats.lostAndFound} lost & found
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Popular Tags */}
          {sanityData.tags.length > 0 && (
            <div>
              <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <Hash className="h-3 w-3" />
                Popular tags ({sanityData.tags.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {sanityData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => onSuggestionClick(tag)}
                    title={`${sanityData.tagCounts[tag] || 0} items with this tag`}
                  >
                    {tag}
                    {sanityData.tagCounts[tag] && (
                      <span className="ml-1 text-xs opacity-70">
                        ({sanityData.tagCounts[tag]})
                      </span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Popular Sections */}
          {sanityData.sections.length > 0 && (
            <div>
              <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <Users className="h-3 w-3" />
                Sections ({sanityData.sections.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {sanityData.sections.map((section) => (
                  <Badge
                    key={section}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => onSuggestionClick(section)}
                  >
                    {section}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Popular Classes */}
          {sanityData.classes.length > 0 && (
            <div>
              <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                Classes ({sanityData.classes.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {sanityData.classes.map((className) => (
                  <Badge
                    key={className}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => onSuggestionClick(className)}
                  >
                    {className}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="text-xs text-muted-foreground pt-2 border-t">
        💡 Tip: Use quotes for exact phrases, e.g., &quot;tech fest 2024&quot;
      </div>
    </div>
  )
}
