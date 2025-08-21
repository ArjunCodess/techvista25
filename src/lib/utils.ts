import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { LostAndFoundItem, PollItem, PostItem, FeedbackItem } from "@/sanity/lib/queries"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toTitleCase(input: string): string {
  if (!input) return input
  return input
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function formatDateTime(input?: string): string {
  if (!input) return ""
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return input
  try {
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return date.toISOString()
  }
}

export type UnifiedFeedItem =
  | { kind: "post"; date: string; item: PostItem }
  | { kind: "poll"; date: string; item: PollItem }
  | { kind: "feedback"; date: string; item: FeedbackItem }
  | { kind: "lostandfound"; date: string; item: LostAndFoundItem }

export function mergeAndSortFeed(
  posts: PostItem[],
  polls: PollItem[],
  feedbacks: FeedbackItem[],
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
  const normalizedFeedback: UnifiedFeedItem[] = (feedbacks || []).map((f) => ({
    kind: "feedback",
    date: f.createdAt,
    item: f,
  }))
  const normalizedLaf: UnifiedFeedItem[] = (laf || []).map((l) => ({
    kind: "lostandfound",
    date: l.updatedAt || l.createdAt || new Date().toISOString(),
    item: l,
  }))

  return [...normalizedPosts, ...normalizedPolls, ...normalizedFeedback, ...normalizedLaf].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}