"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UnifiedFeedItem } from "@/lib/utils"

interface SearchResultsSummaryProps {
  items: UnifiedFeedItem[]
  searchQuery: string
  onClearSearch: () => void
}

export default function SearchResultsSummary({ 
  items, 
  searchQuery, 
  onClearSearch 
}: SearchResultsSummaryProps) {
  const stats = useMemo(() => {
    const counts = {
      posts: 0,
      polls: 0,
      feedback: 0,
      lostandfound: 0
    }
    
    items.forEach(item => {
      counts[item.kind]++
    })
    
    return counts
  }, [items])
  
  const totalResults = items.length
  const hasResults = totalResults > 0
  
  if (!searchQuery) return null
  
  return (
    <div className="space-y-3">
      {/* Search Header */}
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="font-medium">
              Search results for "{searchQuery}"
            </div>
            <div className="text-sm text-muted-foreground">
              {hasResults ? `${totalResults} item${totalResults !== 1 ? 's' : ''} found` : 'No results found'}
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSearch}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </div>
      
      {/* Results Statistics */}
      {hasResults && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>Results by type:</span>
          {stats.posts > 0 && (
            <Badge variant="secondary" className="text-xs">
              {stats.posts} post{stats.posts !== 1 ? 's' : ''}
            </Badge>
          )}
          {stats.polls > 0 && (
            <Badge variant="secondary" className="text-xs">
              {stats.polls} poll{stats.polls !== 1 ? 's' : ''}
            </Badge>
          )}
          {stats.feedback > 0 && (
            <Badge variant="secondary" className="text-xs">
              {stats.feedback} feedback
            </Badge>
          )}
          {stats.lostandfound > 0 && (
            <Badge variant="secondary" className="text-xs">
              {stats.lostandfound} lost & found
            </Badge>
          )}
        </div>
      )}
      
      {/* No Results Message */}
      {!hasResults && (
        <div className="text-center py-8">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <div className="text-lg font-medium mb-2">No items found</div>
          <div className="text-muted-foreground mb-4">
            No items match your search for "{searchQuery}"
          </div>
          <div className="text-sm text-muted-foreground">
            Try adjusting your search terms or browse all items
          </div>
        </div>
      )}
    </div>
  )
}
