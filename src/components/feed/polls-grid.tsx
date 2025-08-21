import { PollItem } from "@/sanity/lib/queries";
import Poll from "./poll";

export default function PollsGrid({ items }: { items: PollItem[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Polls</h2>
      <div className="grid grid-cols-1 gap-4">
        {items?.map((p) => (
          <Poll key={p._id} item={p} />
        ))}
      </div>
    </div>
  );
}