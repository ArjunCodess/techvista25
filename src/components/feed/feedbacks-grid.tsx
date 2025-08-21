import Feedback, { FeedbackItem } from "./feedback";

export default function FeedbacksGrid({ items }: { items: FeedbackItem[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Feedback</h2>
      <div className="grid grid-cols-1 gap-4">
        {items?.map((f) => (
          <Feedback key={f._id} item={f} />)
        )}
      </div>
    </div>
  );
}