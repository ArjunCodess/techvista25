"use client"

import { useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const OPTIONS = [
  { value: "all", label: "All" },
  { value: "posts", label: "Posts" },
  { value: "polls", label: "Polls" },
  { value: "lostandfound", label: "Lost & Found" },
]

export default function FeedFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const current = useMemo(() => {
    const q = searchParams.get("q") ?? "all"
    return OPTIONS.find((o) => o.value === q)?.value ?? "all"
  }, [searchParams])

  const currentLabel = OPTIONS.find((o) => o.value === current)?.label ?? "All"

  const setQ = (next: string) => {
    const sp = new URLSearchParams(searchParams.toString())
    if (next === "all") sp.delete("q")
    else sp.set("q", next)
    router.push(`${pathname}?${sp.toString()}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Filter: {currentLabel}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {OPTIONS.map((opt) => (
          <DropdownMenuItem key={`action-${opt.value}`} onClick={() => setQ(opt.value)}>
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}