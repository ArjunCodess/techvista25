import { PostItem } from "@/sanity/lib/queries";
import Post from "./post";

export default function PostsGrid({ items }: { items: PostItem[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Posts</h2>
      <div className="grid grid-cols-1 gap-4">
        {items?.map((p) => (
          <Post key={p._id} item={p} />
        ))}
      </div>
    </div>
  );
}