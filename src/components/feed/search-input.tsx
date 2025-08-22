"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSearch: (value: string) => void
  onClear: () => void
  placeholder?: string
  className?: string
  showSuggestions?: boolean
}

interface SearchSuggestion {
  text: string
  type: 'tag' | 'section' | 'class' | 'recent'
  count?: number
}

export default function SearchInput({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = "Search posts, polls, feedback, lost & found...",
  className = "",
  showSuggestions = false
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  // Fetch search suggestions when input is focused
  useEffect(() => {
    if (isFocused && showSuggestions) {
      fetchSuggestions()
    }
  }, [isFocused, showSuggestions])

  // Show dropdown when there are suggestions and input is focused
  useEffect(() => {
    setShowDropdown(isFocused && suggestions.length > 0 && value.length > 0)
  }, [isFocused, suggestions, value])

  const fetchSuggestions = async () => {
    try {
      setIsLoadingSuggestions(true)
      const response = await fetch('/api/feed/search-suggestions')
      if (response.ok) {
        const data = await response.json()
        const allSuggestions: SearchSuggestion[] = [
          ...data.tags.map((tag: string) => ({ text: tag, type: 'tag' as const, count: data.tagCounts[tag] })),
          ...data.sections.map((section: string) => ({ text: section, type: 'section' as const })),
          ...data.classes.map((cls: string) => ({ text: cls, type: 'class' as const }))
        ]
        setSuggestions(allSuggestions)
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error)
    } finally {
      setIsLoadingSuggestions(false)
    }
  }

  const filteredSuggestions = useMemo(() => {
    if (!value.trim()) return suggestions.slice(0, 5) // Show first 5 when no input
    
    return suggestions
      .filter(suggestion => 
        suggestion.text.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 8) // Limit to 8 suggestions
  }, [suggestions, value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onSearch(value)
      setShowDropdown(false)
    } else if (e.key === "Escape") {
      onClear()
      setShowDropdown(false)
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onChange(suggestion.text)
    onSearch(suggestion.text)
    setShowDropdown(false)
    inputRef.current?.focus()
  }

  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'tag': return '🏷️'
      case 'section': return '👥'
      case 'class': return '📚'
      case 'recent': return '🕒'
      default: return '🔍'
    }
  }

  const getSuggestionColor = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'tag': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'section': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'class': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'recent': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Delay hiding to allow clicking on suggestions
            setTimeout(() => setIsFocused(false), 200)
          }}
          className={cn(
            "pl-10 pr-10 transition-all duration-200",
            className,
            isFocused && "ring-2 ring-ring ring-offset-2"
          )}
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
            onClick={onClear}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {isLoadingSuggestions ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
            </div>
          ) : filteredSuggestions.length > 0 ? (
            <div className="py-2">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.text}-${index}`}
                  className="w-full px-3 py-2 text-left hover:bg-muted/50 transition-colors flex items-center gap-2"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="text-sm">{getSuggestionIcon(suggestion.type)}</span>
                  <span className="flex-1 text-sm">{suggestion.text}</span>
                  {suggestion.count && (
                    <Badge variant="secondary" className="text-xs">
                      {suggestion.count}
                    </Badge>
                  )}
                  <span className={cn("text-xs px-2 py-1 rounded", getSuggestionColor(suggestion.type))}>
                    {suggestion.type}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              No suggestions found
            </div>
          )}
        </div>
      )}
    </div>
  )
}
