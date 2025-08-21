import { UnifiedFeedItem } from "@/lib/utils";
import Post from "./post";
import Poll from "./poll";
import LostAndFound from "./laf";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function UnifiedGrid({ items }: { items: UnifiedFeedItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((u, idx) => (
        <Card key={idx} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              {u.kind === "post" && "Post"}
              {u.kind === "poll" && "Poll"}
              {u.kind === "lostandfound" && "Lost & Found"}
            </CardTitle>
            <Badge variant="secondary">
              {new Date(u.date).toLocaleString()}
            </Badge>
          </CardHeader>
          <CardContent>
            {u.kind === "post" && <Post item={u.item} />}
            {u.kind === "poll" && <Poll item={u.item} />}
            {u.kind === "lostandfound" && <LostAndFound item={u.item} />}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


