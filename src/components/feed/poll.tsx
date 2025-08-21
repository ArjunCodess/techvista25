import type { PollItem } from "@/sanity/lib/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Poll({ item }: { item: PollItem }) {
  return (
    <Card>
      {item.title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">{item.title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={item.title ? "pt-0" : ""}>
        {item.description && (
          <p className="text-sm text-muted-foreground mb-3">
            {item.description}
          </p>
        )}
        {item.options?.length && (
          <ul className="space-y-1 text-sm">
            {item.options.map((o, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                {o.content}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}