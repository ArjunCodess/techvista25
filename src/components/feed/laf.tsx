import { LostAndFoundItem } from "@/sanity/lib/queries";

export default function LostAndFound({ item }: { item: LostAndFoundItem }) {
  return (
    <article className="rounded-lg border bg-card text-card-foreground p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{item.lost || "Lost item"}</h3>
        {item.found ? (
          <span className="text-xs rounded bg-green-100 text-green-800 px-2 py-0.5">
            Found
          </span>
        ) : (
          <span className="text-xs rounded bg-yellow-100 text-yellow-800 px-2 py-0.5">
            Missing
          </span>
        )}
      </div>
      {item.content ? (
        <p className="mt-1 text-sm text-muted-foreground">{item.content}</p>
      ) : null}
    </article>
  );
}