import { LostAndFoundItem } from "@/sanity/lib/queries";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LostAndFound({ item }: { item: LostAndFoundItem }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{item.lost || "Lost item"}</h3>
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
      {item.content && (
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">{item.content}</p>
        </CardContent>
      )}
    </Card>
  );
}