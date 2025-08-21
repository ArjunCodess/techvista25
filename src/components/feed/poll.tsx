"use client";

import type { PollItem } from "@/sanity/lib/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Poll({ item }: { item: PollItem }) {
  const [options, setOptions] = useState(
    () =>
      item.options?.map((o) => ({ content: o.content, votes: o.votes ?? 0 })) ||
      []
  );
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const cooldownTimerRef = useRef<number | null>(null);

  const storageVoteKey = useMemo(() => `poll_voted_${item._id}`, [item._id]);
  const { isSignedIn } = useUser();

  useEffect(() => {
    try {
      const voted = localStorage.getItem(storageVoteKey) === "1";
      setHasVoted(voted);
    } catch {}
    return () => {
      if (cooldownTimerRef.current)
        window.clearInterval(cooldownTimerRef.current);
    };
  }, [storageVoteKey]);

  const totalVotes = useMemo(
    () =>
      options.reduce(
        (sum, o) => sum + (typeof o.votes === "number" ? o.votes : 0),
        0
      ),
    [options]
  );

  function startCooldown(seconds: number) {
    const until = Date.now() + seconds * 1000;
    setCooldownUntil(until);
    if (cooldownTimerRef.current)
      window.clearInterval(cooldownTimerRef.current);
    cooldownTimerRef.current = window.setInterval(() => {
      if (Date.now() >= until) {
        setCooldownUntil(null);
        if (cooldownTimerRef.current)
          window.clearInterval(cooldownTimerRef.current);
      }
    }, 200);
  }

  async function handleVote(optionIndex: number) {
    if (!isSignedIn) return;
    if (hasVoted || isSubmitting || cooldownUntil) return;
    setIsSubmitting(true);
    startCooldown(5);
    try {
      const res = await fetch("/api/poll/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId: item._id, optionIndex }),
      });
      if (res.ok) {
        const data = await res.json();
        const updated = data?.poll?.options as
          | { content: string; votes?: number }[]
          | undefined;
        if (Array.isArray(updated))
          setOptions(
            updated.map((o) => ({ content: o.content, votes: o.votes ?? 0 }))
          );
        setHasVoted(true);
        try {
          localStorage.setItem(storageVoteKey, "1");
        } catch {}
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const isDisabled =
    !isSignedIn || isSubmitting || Boolean(cooldownUntil) || hasVoted;

  return (
    <Card className="gap-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            {item.title && (
              <CardTitle className="text-base font-medium">
                <span className="font-bold">Poll</span>: {item.title}
              </CardTitle>
            )}
          </div>
          <div className="text-xs text-muted-foreground">{formatDateTime(item.createdAt)}</div>
        </div>
      </CardHeader>
      <CardContent className={item.title ? "pt-0" : ""}>
        {item.description && (
          <p className="text-sm text-muted-foreground mb-3">
            {item.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2 w-full mb-3">
          {item.sections?.map((section, idx) => (
            <Badge key={`poll-section-${idx}`} variant="section" className="text-xs whitespace-nowrap">
              {section}
            </Badge>
          ))}
          {item.classes?.map((klass, idx) => (
            <Badge key={`poll-class-${idx}`} variant="classes" className="text-xs whitespace-nowrap">
              {klass}
            </Badge>
          ))}
          {item.tags?.map((tag, idx) => (
            <Badge key={`poll-tag-${idx}`} variant="tags" className="text-xs whitespace-nowrap">
              #{tag}
            </Badge>
          ))}
        </div>
        {options.length > 0 && (
          <div className="space-y-2">
            {options.map((o, idx) => {
              const votes = o.votes ?? 0;
              const pct =
                totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
              return (
                <button
                  key={idx}
                  disabled={isDisabled}
                  onClick={() => handleVote(idx)}
                  className={`w-full text-left border rounded-md px-3 py-2 transition-colors ${
                    isDisabled
                      ? "cursor-not-allowed opacity-80"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm">{o.content}</span>
                    {hasVoted && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {pct}% ({votes})
                      </span>
                    )}
                  </div>
                  {hasVoted && (
                    <div className="mt-1 h-1.5 w-full bg-muted rounded">
                      <div
                        className="h-1.5 bg-primary rounded"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}