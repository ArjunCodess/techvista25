"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Search, Clock, BarChart3 } from "lucide-react"

interface SearchAnalyticsProps {
  className?: string
}

interface SearchTrend {
  query: string
  count: number
  lastSearched: string
}

export default function SearchAnalytics({ className = "" }: SearchAnalyticsProps) {
  const [searchTrends, setSearchTrends] = useState<SearchTrend[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSearchAnalytics = async () => {
      try {
        setIsLoading(true)
        
        // Get search history from localStorage
        const history = localStorage.getItem("feed-search-history")
        if (history) {
          try {
            const searchHistory = JSON.parse(history)
            const trends = searchHistory.map((query: string, index: number) => ({
              query,
              count: searchHistory.filter((q: string) => q === query).length,
              lastSearched: new Date(Date.now() - index * 60000).toISOString() // Simulate timestamps
            }))
            
            // Remove duplicates and sort by count
            const uniqueTrends = trends
              .filter((trend, index, self) => 
                index === self.findIndex(t => t.query === trend.query)
              )
              .sort((a, b) => b.count - a.count)
              .slice(0, 5)
            
            setSearchTrends(uniqueTrends)
          } catch (e) {
            console.error("Failed to parse search history:", e)
          }
        }
      } catch (error) {
        console.error('Failed to fetch search analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchAnalytics()
  }, [])

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-muted rounded w-24 mb-2"></div>
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-32"></div>
          <div className="h-3 bg-muted rounded w-28"></div>
          <div className="h-3 bg-muted rounded w-36"></div>
        </div>
      </div>
    )
  }

  if (searchTrends.length === 0) return null

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <TrendingUp className="h-4 w-4" />
        Search trends
      </div>
      
      <div className="space-y-2">
        {searchTrends.map((trend, index) => (
          <div key={trend.query} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Search className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm font-medium">{trend.query}</span>
              <Badge variant="secondary" className="text-xs">
                {trend.count}x
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Recent</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-muted-foreground pt-2 border-t">
        💡 Based on your search history
      </div>
    </div>
  )
}
