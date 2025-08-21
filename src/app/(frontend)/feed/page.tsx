import {
  fetchLostAndFound,
  fetchPolls,
  fetchPosts,
} from "@/sanity/lib/queries";
import UnifiedGrid from "@/components/feed/unified-grid";
import { mergeAndSortFeed } from "@/lib/utils";

function parseQ(searchParams: {
  [key: string]: string | string[] | undefined;
}): "all" | "posts" | "polls" | "lostandfound" {
  const qRaw = searchParams?.q;
  const q = Array.isArray(qRaw) ? qRaw[0] : qRaw;
  if (q === "posts" || q === "polls" || q === "lostandfound") return q;
  return "all";
}

export default async function FeedPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const _q = parseQ(searchParams);

  const [posts, polls, laf] = await Promise.all([
    fetchPosts(),
    fetchPolls(),
    fetchLostAndFound(),
  ]);

  const items = mergeAndSortFeed(posts, polls, laf);
  return (
    <section className="py-6">
      <UnifiedGrid items={items} />
    </section>
  );
}