import { LostAndFoundItem } from "@/sanity/lib/queries";
import { formatDateTime } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LostAndFound({ item }: { item: LostAndFoundItem }) {
  return (
    <Card className="gap-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-medium">
            <span className="font-bold">
              {item.found ? "Found" : "Missing"}
            </span>
            : {item.lost || "Lost item"}
          </h3>
          <Badge
            variant={item.found ? "default" : "secondary"}
            className={
              item.found
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
            }
          >
            {item.found ? "Found" : "Missing"}
          </Badge>
        </div>
      </CardHeader>
      <div className="px-6 -mt-3 text-xs text-muted-foreground">{formatDateTime(item.updatedAt || item.createdAt)}</div>
      {item.content && (
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">{item.content}</p>
        </CardContent>
      )}
    </Card>
  );
}