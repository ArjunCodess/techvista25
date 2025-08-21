import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { LostAndFoundItem, PollItem, PostItem } from "@/sanity/lib/queries"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type UnifiedFeedItem =
  | { kind: "post"; date: string; item: PostItem }
  | { kind: "poll"; date: string; item: PollItem }
  | { kind: "lostandfound"; date: string; item: LostAndFoundItem }

export function mergeAndSortFeed(
  posts: PostItem[],
  polls: PollItem[],
  laf: LostAndFoundItem[]
): UnifiedFeedItem[] {
  const normalizedPosts: UnifiedFeedItem[] = (posts || []).map((p) => ({
    kind: "post",
    date: p.updatedAt || p.createdAt || new Date().toISOString(),
    item: p,
  }))
  const normalizedPolls: UnifiedFeedItem[] = (polls || []).map((p) => ({
    kind: "poll",
    date: p.createdAt,
    item: p,
  }))
  const normalizedLaf: UnifiedFeedItem[] = (laf || []).map((l) => ({
    kind: "lostandfound",
    date: l.updatedAt || l.createdAt || new Date().toISOString(),
    item: l,
  }))

  return [...normalizedPosts, ...normalizedPolls, ...normalizedLaf].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}