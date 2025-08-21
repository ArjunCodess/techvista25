"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { formatDateTime, toTitleCase } from "@/lib/utils";
import { Badge } from "../ui/badge";
import type { FeedbackItem } from "@/sanity/lib/queries";

export default function Feedback({ item }: { item: FeedbackItem }) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userFeedback, setUserFeedback] = useState<string>("");
  const cooldownTimerRef = useRef<number | null>(null);

  const { user, isSignedIn } = useUser();

  useEffect(() => {
    // Check if user has already submitted feedback
    if (user?.id && item.entries) {
      const userEntry = item.entries.find(entry => entry.userId === user.id);
      if (userEntry) {
        setHasSubmitted(true);
        setUserFeedback(userEntry.content);
      }
    }
    return () => {
      if (cooldownTimerRef.current)
        window.clearInterval(cooldownTimerRef.current);
    };
  }, [user?.id, item.entries]);

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

  async function handleSubmit() {
    if (!isSignedIn || submitting || cooldownUntil || hasSubmitted) return;
    if (!text.trim()) return;
    setSubmitting(true);
    startCooldown(5);
    try {
      const res = await fetch("/api/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackId: item._id, content: text.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setHasSubmitted(true);
        setUserFeedback(data?.feedback?.userFeedback ?? text.trim());
        setText("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  const isDisabled =
    !isSignedIn || submitting || Boolean(cooldownUntil) || hasSubmitted;

  return (
    <Card className="gap-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            {item.title && (
              <CardTitle className="text-base font-medium">
                <span className="font-bold">Feedback</span>: {item.title}
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
            <Badge key={`feedback-section-${idx}`} variant="section" className="text-xs whitespace-nowrap">
              {toTitleCase(section)}
            </Badge>
          ))}
          {item.classes?.map((klass, idx) => (
            <Badge key={`feedback-class-${idx}`} variant="classes" className="text-xs whitespace-nowrap">
              {toTitleCase(klass)}
            </Badge>
          ))}
          {item.tags?.map((tag, idx) => (
            <Badge key={`feedback-tag-${idx}`} variant="tags" className="text-xs whitespace-nowrap">
              #{toTitleCase(tag)}
            </Badge>
          ))}
        </div>
        {hasSubmitted ? (
          <div className="space-y-3">
            <div className="pt-4 pb-2">
              <span className="text-sm font-medium text-green-600">✓ Feedback submitted</span>
            </div>
            <div className="bg-muted/50 rounded-md p-3">
              <p className="text-sm text-muted-foreground mb-2">Your feedback:</p>
              <p className="text-sm">{userFeedback}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="write your feedback..."
              disabled={isDisabled}
              className={`w-full min-h-24 border rounded-md px-3 py-2 text-sm ${
                isDisabled ? "opacity-80" : ""
              }`}
            />
            <div className="flex items-center justify-end">
              <Button
                onClick={handleSubmit}
                disabled={isDisabled || !text.trim()}
                className={`border rounded-md px-3 py-1.5 text-sm ${
                  isDisabled || !text.trim()
                    ? "cursor-not-allowed opacity-80"
                    : ""
                }`}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}