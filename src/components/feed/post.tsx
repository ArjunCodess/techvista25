import type { FileMedia, ImageMedia, PostItem } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toTitleCase, formatDateTime } from "@/lib/utils";
import Image from "next/image";

function isImageMedia(m: ImageMedia | FileMedia): m is ImageMedia {
  return m._type === "image" && !!m.asset?.url;
}

function isFileMedia(m: ImageMedia | FileMedia): m is FileMedia {
  return m._type === "file" && !!m.asset?.url;
}

export default function Post({ item }: { item: PostItem }) {
  const media = Array.isArray(item.filesMedia) ? item.filesMedia : [];
  const images = media.filter(isImageMedia);
  const files = media.filter(isFileMedia);
  const firstDims = images[0]?.asset?.metadata?.dimensions;
  const aspectRatio =
    firstDims?.width && firstDims?.height
      ? firstDims.width / firstDims.height
      : 4 / 3;

  return (
    <Card className="gap-2">
      <CardContent>
        <div className="text-xs text-muted-foreground mb-2">
          {formatDateTime(item.createdAt)}
        </div>
        {item.content && (
          <p className="whitespace-pre-wrap mb-4">{item.content}</p>
        )}

        {images.length > 0 && (
          <div className="mb-4">
            {images.length === 1 ? (
              <div
                style={{ aspectRatio }}
                className="relative w-full overflow-hidden rounded-md"
              >
                <Image
                  priority={true}
                  key={images[0]._key}
                  src={urlFor(images[0]).fit("max").url() || "/placeholder.svg"}
                  alt={images[0].alt || images[0].asset?.originalFilename || ""}
                  height={450}
                  width={600}
                  className="object-scale-down"
                />
              </div>
            ) : (
              <div
                style={{ aspectRatio }}
                className="relative w-full rounded-md overflow-hidden"
              >
                <Carousel className="absolute inset-0 h-full w-full">
                  <CarouselContent className="h-full">
                    {images.map((m) => (
                      <CarouselItem key={m._key} className="h-full">
                        <Image
                          priority={true}
                          src={urlFor(m).fit("max").url() || "/placeholder.svg"}
                          alt={m.alt || m.asset?.originalFilename || ""}
                          height={450}
                          width={600}
                          className="object-scale-down"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
                  <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
                </Carousel>
              </div>
            )}
          </div>
        )}

        {files.length > 0 && (
          <div className="grid grid-cols-1 gap-2 mb-4">
            {files.map((f) => (
              <Button
                key={f._key}
                variant="outline"
                size="sm"
                asChild
                className="w-fit bg-transparent"
              >
                <a
                  href={f.asset!.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {f.asset!.originalFilename || "Download file"}
                </a>
              </Button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 w-full">
          {item.sections?.length
            ? item.sections.map((section, idx) => (
                <Badge
                  key={`section-${idx}`}
                  variant="section"
                  className="text-xs whitespace-nowrap"
                >
                  {toTitleCase(section)} Section
                </Badge>
              ))
            : null}
          {item.classes?.length
            ? item.classes.map((klass, idx) => (
                <Badge
                  key={`class-${idx}`}
                  variant="classes"
                  className="text-xs whitespace-nowrap"
                >
                  {toTitleCase(klass)}
                </Badge>
              ))
            : null}
          {item.tags?.length
            ? item.tags.map((tag, idx) => (
                <Badge
                  key={`tag-${idx}`}
                  variant="tags"
                  className="text-xs whitespace-nowrap"
                >
                  #{toTitleCase(tag)}
                </Badge>
              ))
            : null}
        </div>
      </CardContent>
    </Card>
  );
}