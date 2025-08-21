import { UnifiedFeedItem } from "@/lib/utils";
import Post from "./post";
import Poll from "./poll";
import Feedback from "./feedback";
import LostAndFound from "./laf";

export default function UnifiedGrid({ items, focused }: { items: UnifiedFeedItem[]; focused?: { kind: "all" | "posts" | "polls" | "feedback" | "lostandfound"; id?: string } }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((u, idx) => (
        <div key={idx} className="overflow-hidden">
          {u.kind === "post" && <Post item={u.item} />}
          {u.kind === "poll" && <Poll item={u.item} />}
          {u.kind === "feedback" && <Feedback item={u.item} />}
          {u.kind === "lostandfound" && (
            <LostAndFound item={u.item} focused={focused?.kind === "lostandfound" && focused?.id === u.item._id} />
          )}
        </div>
      ))}
    </div>
  );
}