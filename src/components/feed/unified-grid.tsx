import { UnifiedFeedItem } from "@/lib/utils";
import Post from "./post";
import Poll from "./poll";
import LostAndFound from "./laf";

export default function UnifiedGrid({ items }: { items: UnifiedFeedItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((u, idx) => (
        <div key={idx} className="overflow-hidden">
          {u.kind === "post" && <Post item={u.item} />}
          {u.kind === "poll" && <Poll item={u.item} />}
          {u.kind === "lostandfound" && <LostAndFound item={u.item} />}
        </div>
      ))}
    </div>
  );
}