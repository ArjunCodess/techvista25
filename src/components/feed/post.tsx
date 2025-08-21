import type { PostItem } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Post({ item }: { item: PostItem }) {
  return (
    <Card className="gap-2">
      {item.organisationTitle && (
        <CardHeader>
          <div className="text-xs text-muted-foreground">
            {item.organisationTitle}
          </div>
        </CardHeader>
      )}
      <CardContent>
        {item.content && (
          <p className="whitespace-pre-wrap mb-3">{item.content}</p>
        )}

        {Array.isArray(item.filesMedia) && item.filesMedia.length > 0 && (
          <div className="grid grid-cols-1 gap-3 mb-4">
            {item.filesMedia.map((m) => {
              if (m._type === "image" && m.asset?.url) {
                const imgUrl = urlFor(m)
                  .width(600)
                  .height(450)
                  .fit("max")
                  .url();
                return (
                  <img
                    key={m._key}
                    src={imgUrl || "/placeholder.svg"}
                    alt={m.alt || m.asset?.originalFilename || ""}
                    className="rounded-md w-full h-auto"
                  />
                );
              }
              if (m._type === "file" && m.asset?.url) {
                return (
                  <Button
                    key={m._key}
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-fit bg-transparent"
                  >
                    <a
                      href={m.asset.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {m.asset.originalFilename || "Download file"}
                    </a>
                  </Button>
                );
              }
              return null;
            })}
          </div>
        )}

        {item.tags?.length && (
          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}