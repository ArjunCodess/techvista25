"use client";

import { LostAndFoundItem } from "@/sanity/lib/queries";
import { formatDateTime, toTitleCase } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function LostAndFound({
  item,
  focused,
}: {
  item: LostAndFoundItem;
  focused?: boolean;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const isMissing = !item.found;
  const viewHref = useMemo(
    () => `/feed?q=laf&id=${encodeURIComponent(item._id)}`,
    [item._id]
  );

  return (
    <Card className="gap-2">
      <CardHeader>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <h3 className="font-medium">
              <span className="font-bold">
                {item.found ? "Found" : "Missing"}
              </span>
              : {item.lost || "Lost item"}
            </h3>
            <div className="flex items-center gap-2">
              <Badge
                variant={item.found ? "default" : "secondary"}
                className={
                  item.found
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                }
              >
                {item.found ? "Found" : "Missing"}
              </Badge>
              <span className="text-xs text-muted-foreground sm:hidden">
                {formatDateTime(item.createdAt)}
              </span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground hidden sm:block">
            {formatDateTime(item.createdAt)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {item.content && (
          <p className="text-sm text-muted-foreground">{item.content}</p>
        )}

        {item.phoneNumbers && item.phoneNumbers.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">
              Contact Numbers ({item.phoneNumbers.length}):
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.phoneNumbers.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone}`}
                  className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:bg-blue-100"
                >
                  📞 {phone}
                </a>
              ))}
            </div>
          </div>
        )}

        {!focused && (
          <div>
            <Link
              href={viewHref}
              className="text-sm font-medium text-primary underline"
            >
              View more
            </Link>
          </div>
        )}

        {focused && isMissing && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <Input
              placeholder="Your phone number"
              className="w-full border rounded px-3 py-2 text-sm"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button
              disabled={isSubmitting}
              onClick={async () => {
                setIsSubmitting(true);
                try {
                  await fetch("/api/laf/found", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      lafId: item._id,
                      phoneNumber: phoneNumber || undefined,
                    }),
                  });
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className={isSubmitting ? "opacity-75 cursor-not-allowed" : ""}
            >
              Add Contact Number
            </Button>
          </div>
        )}
      </CardContent>
      <div className="px-6 pt-1">
        <div className="flex flex-wrap gap-2 w-full">
          {item.sections?.map((section, idx) => (
            <Badge
              key={`laf-section-${idx}`}
              variant="section"
              className="text-xs whitespace-nowrap"
            >
              {toTitleCase(section)}
            </Badge>
          ))}
          {item.classes?.map((klass, idx) => (
            <Badge
              key={`laf-class-${idx}`}
              variant="classes"
              className="text-xs whitespace-nowrap"
            >
              {toTitleCase(klass)}
            </Badge>
          ))}
          {item.tags?.map((tag, idx) => (
            <Badge
              key={`laf-tag-${idx}`}
              variant="tags"
              className="text-xs whitespace-nowrap"
            >
              #{toTitleCase(tag)}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}