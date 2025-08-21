import { fetchFeedbacks, fetchLostAndFound, fetchPolls, fetchPosts } from "@/sanity/lib/queries";
import UnifiedGrid from "@/components/feed/unified-grid";
import { mergeAndSortFeed, type UnifiedFeedItem } from "@/lib/utils";
import FeedFilter from "@/components/feed/feed-filter";

function parseQ(searchParams: {
  [key: string]: string | string[] | undefined;
}): { q: "all" | "posts" | "polls" | "feedback" | "lostandfound"; id?: string } {
  const qRaw = searchParams?.q;
  const q = Array.isArray(qRaw) ? qRaw[0] : qRaw;
  const idRaw = searchParams?.id;
  const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;
  const normalized =
    q === "laf"
      ? "lostandfound"
      : q === "posts" || q === "polls" || q === "feedback" || q === "lostandfound"
      ? q
      : undefined;
  if (normalized) return { q: normalized, id };
  return { q: "all", id };
}

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q, id } = parseQ(await searchParams);

  const [posts, polls, feedbacks, laf] = await Promise.all([
    fetchPosts(),
    fetchPolls(),
    fetchFeedbacks(),
    fetchLostAndFound(),
  ]);

  let items: UnifiedFeedItem[] = mergeAndSortFeed(posts, polls, feedbacks, laf);
  if (q === "posts") items = items.filter((i) => i.kind === "post");
  if (q === "polls") items = items.filter((i) => i.kind === "poll");
  if (q === "feedback") items = items.filter((i) => i.kind === "feedback");
  if (q === "lostandfound") items = items.filter((i) => i.kind === "lostandfound");

  if (q === "lostandfound" && id) {
    items = items.filter((i) => i.kind === "lostandfound" && i.item._id === id);
  } else {
    items = items.filter((i) => !(i.kind === "lostandfound" && i.item.found));
  }

  return (
    <section className="py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Feed</h1>
        <FeedFilter />
      </div>
      <UnifiedGrid items={items} focused={{ kind: q, id }} />
    </section>
  );
}