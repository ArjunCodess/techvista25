"use client"

import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import SearchSuggestions from "./search-suggestions"
import SearchInput from "./search-input"

export default function FeedSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "")
  const [isExpanded, setIsExpanded] = useState(!!searchParams.get("search"))
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSearch = useCallback((value: string) => {
    const sp = new URLSearchParams(searchParams.toString())
    if (value.trim()) {
      sp.set("search", value.trim())
      // Save to search history
      const history = localStorage.getItem("feed-search-history")
      let searchHistory: string[] = []
      if (history) {
        try {
          searchHistory = JSON.parse(history)
        } catch (e) {
          console.error("Failed to parse search history:", e)
        }
      }
      const newHistory = [
        value.trim(),
        ...searchHistory.filter(item => item !== value.trim())
      ].slice(0, 5)
      localStorage.setItem("feed-search-history", JSON.stringify(newHistory))
    } else {
      sp.delete("search")
    }
    // Reset to first page when searching
    sp.delete("page")
    router.push(`${pathname}?${sp.toString()}`)
    setShowSuggestions(false)
  }, [router, pathname, searchParams])

  const handleClear = useCallback(() => {
    setSearchValue("")
    setIsExpanded(false)
    setShowSuggestions(false)
    const sp = new URLSearchParams(searchParams.toString())
    sp.delete("search")
    sp.delete("page")
    router.push(`${pathname}?${sp.toString()}`)
    inputRef.current?.focus()
  }, [router, pathname, searchParams])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchValue)
  }, [searchValue, handleSearch])

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setSearchValue(suggestion)
    handleSearch(suggestion)
  }, [handleSearch])

  const hasSearchQuery = useMemo(() => !!searchParams.get("search"), [searchParams])

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative">
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            onClear={handleClear}
            placeholder="Search posts, polls, feedback, lost & found..."
            className={cn(
              isExpanded ? "w-80" : "w-64",
              hasSearchQuery && "border-primary"
            )}
            showSuggestions={true}
          />
        </div>
        <Button 
          type="submit" 
          size="sm"
          className={cn(
            "transition-all duration-200",
            isExpanded ? "opacity-100" : "opacity-0"
          )}
        >
          Search
        </Button>
      </form>
      
      {/* Search Suggestions Panel */}
      {showSuggestions && !hasSearchQuery && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-background border rounded-lg shadow-lg p-4 z-50">
          <SearchSuggestions onSuggestionClick={handleSuggestionClick} />
        </div>
      )}
      
      {hasSearchQuery && (
        <div className="absolute top-full left-0 mt-2 text-sm text-muted-foreground">
          Searching for: &quot;{searchParams.get("search")}&quot;
        </div>
      )}
    </div>
  )
}
