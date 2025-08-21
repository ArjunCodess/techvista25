import { LostAndFoundItem } from "@/sanity/lib/queries";
import LostAndFound from "./laf";

export default function LostAndFoundGrid({ items }: { items: LostAndFoundItem[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Lost & Found</h2>
      <div className="grid grid-cols-1 gap-4">
        {items?.map((i) => (
          <LostAndFound key={i._id} item={i} />
        ))}
      </div>
    </div>
  );
}