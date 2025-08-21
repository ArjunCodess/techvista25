import { PostItem } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export default function Post({ item }: { item: PostItem }) {
  return (
    <article className="rounded-lg border bg-card text-card-foreground p-4">
      {item.organisationTitle ? (
        <div className="text-xs text-muted-foreground">{item.organisationTitle}</div>
      ) : null}
      {item.content ? <p className="mt-1 whitespace-pre-wrap">{item.content}</p> : null}
      {Array.isArray(item.filesMedia) && item.filesMedia.length > 0 ? (
        <div className="mt-3 grid grid-cols-1 gap-3">
          {item.filesMedia.map((m) => {
            if (m._type === "image" && m.asset?.url) {
              const imgUrl = urlFor(m).width(600).height(450).fit("max").url();
              return (
                <img
                  key={m._key}
                  src={imgUrl}
                  alt={m.alt || m.asset?.originalFilename || ""}
                  className="rounded-md w-full h-auto"
                />
              );
            }
            if (m._type === "file" && m.asset?.url) {
              return (
                <a
                  key={m._key}
                  href={m.asset.url}
                  className="inline-flex items-center text-sm underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {m.asset.originalFilename || "Download file"}
                </a>
              );
            }
            return null;
          })}
        </div>
      ) : null}
      <div className="mt-3 text-[11px] text-muted-foreground">
        {item.tags?.length ? <span>#{item.tags.join(" #")}</span> : null}
      </div>
    </article>
  );
}