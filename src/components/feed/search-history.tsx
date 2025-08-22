"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const SEARCH_HISTORY_KEY = "feed-search-history"
const MAX_HISTORY_ITEMS = 5

interface SearchHistoryProps {
  onHistoryClick: (query: string) => void
  onClearHistory: () => void
  className?: string
}

export default function SearchHistory({ 
  onHistoryClick, 
  onClearHistory,
  className = "" 
}: SearchHistoryProps) {
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  useEffect(() => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY)
    if (history) {
      try {
        const parsed = JSON.parse(history)
        if (Array.isArray(parsed)) {
          setSearchHistory(parsed.slice(0, MAX_HISTORY_ITEMS))
        }
      } catch (e) {
        console.error("Failed to parse search history:", e)
      }
    }
  }, [])

  const addToHistory = (query: string) => {
    if (!query.trim()) return
    
    const newHistory = [
      query.trim(),
      ...searchHistory.filter(item => item !== query.trim())
    ].slice(0, MAX_HISTORY_ITEMS)
    
    setSearchHistory(newHistory)
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
  }

  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem(SEARCH_HISTORY_KEY)
    onClearHistory()
  }

  const handleHistoryClick = (query: string) => {
    onHistoryClick(query)
    addToHistory(query)
  }

  if (searchHistory.length === 0) return null

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent searches
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <X className="h-3 w-3 mr-1" />
          Clear
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {searchHistory.map((query, index) => (
          <Badge
            key={`${query}-${index}`}
            variant="outline"
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
            onClick={() => handleHistoryClick(query)}
          >
            {query}
          </Badge>
        ))}
      </div>
    </div>
  )
}
