import { NextRequest } from "next/server";
import { writeClient } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs/server";

type SubmitFeedbackRequest = {
  feedbackId: string;
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }

    const body = (await req.json()) as SubmitFeedbackRequest;
    const { feedbackId, content } = body || {};

    if (!feedbackId || typeof content !== "string" || content.trim().length === 0) {
      return new Response(JSON.stringify({ error: "invalid request" }), { status: 400 });
    }

    const doc = await writeClient.fetch(
      `*[_id == $id && _type == "feedback"][0]{ _id, entries }`,
      { id: feedbackId }
    );

    if (!doc) {
      return new Response(JSON.stringify({ error: "feedback not found" }), { status: 404 });
    }

    const entry = {
      _type: "object",
      content: content.trim(),
      userId,
      createdAt: new Date().toISOString(),
    } as const;

    await writeClient
      .patch(feedbackId)
      .setIfMissing({ entries: [] })
      .append("entries", [entry])
      .commit({ autoGenerateArrayKeys: true });

    const updated = await writeClient.fetch(
      `*[_id == $id][0]{ _id, title, description, entries[]{ content, userId, createdAt } }`,
      { id: feedbackId }
    );

    return new Response(JSON.stringify({ ok: true, feedback: updated }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "unexpected error" }), { status: 500 });
  }
}