import { LostAndFoundItem } from "@/sanity/lib/queries";
import { formatDateTime, toTitleCase } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LostAndFound({ item }: { item: LostAndFoundItem }) {
  return (
    <Card className="gap-2">
      <CardHeader>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <h3 className="font-medium">
              <span className="font-bold">{item.found ? "Found" : "Missing"}</span>: {item.lost || "Lost item"}
            </h3>
            <div className="flex items-center gap-2">
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
              <span className="text-xs text-muted-foreground sm:hidden">{formatDateTime(item.createdAt)}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground hidden sm:block">{formatDateTime(item.createdAt)}</div>
        </div>
      </CardHeader>
      {item.content && (
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">{item.content}</p>
        </CardContent>
      )}
      <div className="px-6 pt-1">
        <div className="flex flex-wrap gap-2 w-full">
          {item.sections?.map((section, idx) => (
            <Badge key={`laf-section-${idx}`} variant="section" className="text-xs whitespace-nowrap">
              {toTitleCase(section)}
            </Badge>
          ))}
          {item.classes?.map((klass, idx) => (
            <Badge key={`laf-class-${idx}`} variant="classes" className="text-xs whitespace-nowrap">
              {toTitleCase(klass)}
            </Badge>
          ))}
          {item.tags?.map((tag, idx) => (
            <Badge key={`laf-tag-${idx}`} variant="tags" className="text-xs whitespace-nowrap">
              #{toTitleCase(tag)}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}