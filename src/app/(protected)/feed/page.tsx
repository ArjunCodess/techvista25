import { fetchFeedbacks, fetchLostAndFound, fetchPolls, fetchPosts } from "@/sanity/lib/queries";
import UnifiedGrid from "@/components/feed/unified-grid";
import { mergeAndSortFeed, searchFeedItems, type UnifiedFeedItem } from "@/lib/utils";
import FeedFilter from "@/components/feed/feed-filter";
import FeedSearch from "@/components/feed/feed-search";

function parseQ(searchParams: {
  [key: string]: string | string[] | undefined;
}): { q: "all" | "posts" | "polls" | "feedback" | "lostandfound"; id?: string; search?: string } {
  const qRaw = searchParams?.q;
  const q = Array.isArray(qRaw) ? qRaw[0] : qRaw;
  const idRaw = searchParams?.id;
  const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;
  const searchRaw = searchParams?.search;
  const search = Array.isArray(searchRaw) ? searchRaw[0] : searchRaw;
  
  const normalized =
    q === "laf"
      ? "lostandfound"
      : q === "posts" || q === "polls" || q === "feedback" || q === "lostandfound"
      ? q
      : undefined;
  if (normalized) return { q: normalized, id, search };
  return { q: "all", id, search };
}

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q, id, search } = parseQ(await searchParams);

  const [posts, polls, feedbacks, laf] = await Promise.all([
    fetchPosts(),
    fetchPolls(),
    fetchFeedbacks(),
    fetchLostAndFound(),
  ]);

  let items: UnifiedFeedItem[] = mergeAndSortFeed(posts, polls, feedbacks, laf);
  
  if (search) {
    items = searchFeedItems(items, search);
  }
  
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
        <div className="flex items-center gap-4">
          <FeedSearch />
          <FeedFilter />
        </div>
      </div>
      
      {search && (
        <div className="space-y-3">
          {/* Search Header */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium">
                  Search results for &quot;{search}&quot;
                </div>
                <div className="text-sm text-muted-foreground">
                  {items.length > 0 ? `${items.length} item${items.length !== 1 ? 's' : ''} found` : 'No results found'}
                </div>
              </div>
            </div>
            
            {/* Search Statistics */}
            {items.length > 0 && (
              <div className="text-right text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  {items.filter(i => i.kind === "post").length > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {items.filter(i => i.kind === "post").length} posts
                    </span>
                  )}
                  {items.filter(i => i.kind === "poll").length > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {items.filter(i => i.kind === "poll").length} polls
                    </span>
                  )}
                  {items.filter(i => i.kind === "feedback").length > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {items.filter(i => i.kind === "feedback").length} feedback
                    </span>
                  )}
                  {items.filter(i => i.kind === "lostandfound").length > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      {items.filter(i => i.kind === "lostandfound").length} lost & found
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* No Results Message */}
          {items.length === 0 && (
            <div className="text-center py-8">
              <div className="text-lg font-medium mb-2">No items found</div>
              <div className="text-muted-foreground mb-4">
                No items match your search for &quot;{search}&quot;
              </div>
              <div className="text-sm text-muted-foreground">
                Try adjusting your search terms or browse all items
              </div>
            </div>
          )}
        </div>
      )}
      
      {items.length > 0 && (
        <UnifiedGrid items={items} focused={{ kind: q, id }} />
      )}
    </section>
  );
}