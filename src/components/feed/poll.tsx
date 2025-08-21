import { PollItem } from "@/sanity/lib/queries";

export default function Poll({ item }: { item: PollItem }) {
  return (
    <article className="rounded-lg border bg-card text-card-foreground p-4">
      {item.title ? <h3 className="font-medium">{item.title}</h3> : null}
      {item.description ? (
        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
      ) : null}
      {item.options?.length ? (
        <ul className="mt-3 list-disc list-inside text-sm">
          {item.options.map((o, idx) => (
            <li key={idx}>{o.content}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}