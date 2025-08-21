import { NextRequest } from "next/server";
import { writeClient } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs/server";

type VoteRequest = {
  pollId: string;
  optionIndex: number;
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }
    
    const body = (await req.json()) as VoteRequest;
    const { pollId, optionIndex } = body || {};

    if (!pollId || typeof optionIndex !== "number" || optionIndex < 0) {
      return new Response(JSON.stringify({ error: "invalid request" }), { status: 400 });
    }

    const poll = await writeClient.fetch(
      `*[_id == $id][0]{
        _id,
        options[]{ _key, votes },
        voters
      }`,
      { id: pollId }
    );

    if (!poll) {
      return new Response(JSON.stringify({ error: "poll not found" }), { status: 404 });
    }

    const options: Array<{ _key: string; votes?: number }> = poll.options || [];
    if (optionIndex >= options.length) {
      return new Response(JSON.stringify({ error: "option index out of range" }), { status: 400 });
    }

    const voters: string[] = Array.isArray(poll.voters) ? poll.voters : [];
    if (voters.includes(userId)) {
      return new Response(JSON.stringify({ error: "already voted" }), { status: 409 });
    }

    const target = options[optionIndex];
    const newCount = (typeof target.votes === "number" ? target.votes : 0) + 1;

    const patch: Record<string, unknown> = {};
    patch[`options[_key=="${target._key}"].votes`] = newCount;
    patch["voters"] = [...voters, userId];

    await writeClient.patch(pollId).setIfMissing({ voters: [] }).set(patch).commit({ autoGenerateArrayKeys: true });

    const updated = await writeClient.fetch(
      `*[_id == $id][0]{ _id, options[]{ content, votes }, voters }`,
      { id: pollId }
    );

    return new Response(JSON.stringify({ ok: true, poll: updated }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "unexpected error" }), { status: 500 });
  }
}