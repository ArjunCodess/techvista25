import { groq } from "next-sanity";
import { sanityFetch } from "./live";

export type FeedKind = "posts" | "polls" | "lostandfound" | "feedback" | "all";

export type ImageMedia = {
  _key: string;
  _type: "image";
  asset: {
    url: string;
    mimeType: string;
    originalFilename: string;
    metadata?: { dimensions?: { width: number; height: number } };
  } | null;
  alt?: string;
};

export type FileMedia = {
  _key: string;
  _type: "file";
  asset: {
    url: string;
    mimeType: string;
    originalFilename: string;
  } | null;
};

export type PostItem = {
  _id: string;
  content?: string;
  tags?: string[];
  sections?: string[];
  classes?: string[];
  createdAt?: string;
  updatedAt?: string;
  filesMedia?: (ImageMedia | FileMedia)[];
};

export type LostAndFoundItem = {
  _id: string;
  lost?: string;
  content?: string;
  found?: boolean;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  sections?: string[];
  classes?: string[];
};

export type PollOption = { content: string; votes?: number };
export type PollItem = {
  _id: string;
  title?: string;
  description?: string;
  options?: PollOption[];
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
  sections?: string[];
  classes?: string[];
};

export type FeedbackEntry = { content: string; userId?: string; createdAt?: string };
export type FeedbackItem = {
  _id: string;
  title?: string;
  description?: string;
  entries?: FeedbackEntry[];
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
  sections?: string[];
  classes?: string[];
};

export const POSTS_QUERY = groq`*[_type == "post"] | order(coalesce(updatedAt, createdAt, _createdAt) desc) {
  _id,
  content,
  tags,
  sections,
  classes,
  createdAt,
  updatedAt,
  filesMedia[]{
    _key,
    _type,
    alt,
    asset->{
      url,
      mimeType,
      originalFilename,
      metadata{dimensions}
    }
  }
}`;

export const LOST_AND_FOUND_QUERY = groq`*[_type == "lostAndFound"] | order(coalesce(updatedAt, createdAt, _createdAt) desc) {
  _id,
  lost,
  content,
  found,
  createdAt,
  updatedAt,
  tags,
  sections,
  classes
}`;

export const POLLS_QUERY = groq`*[_type == "poll"] | order(coalesce(updatedAt, createdAt, _createdAt) desc) {
  _id,
  title,
  description,
  options[]{content, votes},
  createdAt,
  updatedAt,
  tags,
  sections,
  classes
}`;

export const FEEDBACKS_QUERY = groq`*[_type == "feedback"] | order(coalesce(updatedAt, createdAt, _createdAt) desc) {
  _id,
  title,
  description,
  entries[]{ content, userId, createdAt },
  createdAt,
  updatedAt,
  tags,
  sections,
  classes
}`;

export async function fetchPosts() {
  const result = await sanityFetch({ query: POSTS_QUERY });
  return result.data as PostItem[];
}

export async function fetchLostAndFound() {
  const result = await sanityFetch({ query: LOST_AND_FOUND_QUERY });
  return result.data as LostAndFoundItem[];
}

export async function fetchPolls() {
  const result = await sanityFetch({ query: POLLS_QUERY });
  return result.data as PollItem[];
}

export async function fetchFeedbacks() {
  const result = await sanityFetch({ query: FEEDBACKS_QUERY });
  return result.data as FeedbackItem[];
}