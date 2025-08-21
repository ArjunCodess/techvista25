import { fetchLostAndFound, fetchPolls, fetchPosts } from "@/sanity/lib/queries";
import UnifiedGrid from "@/components/feed/unified-grid";
import { mergeAndSortFeed, type UnifiedFeedItem } from "@/lib/utils";
import FeedFilter from "@/components/feed/feed-filter";

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
  const q = parseQ(searchParams);

  const [posts, polls, laf] = await Promise.all([
    fetchPosts(),
    fetchPolls(),
    fetchLostAndFound(),
  ]);

  let items: UnifiedFeedItem[] = mergeAndSortFeed(posts, polls, laf);
  if (q === "posts") items = items.filter((i) => i.kind === "post");
  if (q === "polls") items = items.filter((i) => i.kind === "poll");
  if (q === "lostandfound") items = items.filter((i) => i.kind === "lostandfound");

  return (
    <section className="py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Feed</h1>
        <FeedFilter />
      </div>
      <UnifiedGrid items={items} />
    </section>
  );
}