import { NextRequest } from "next/server";
import { writeClient } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs/server";

type AddPhoneRequest = {
  lafId: string;
  phoneNumber?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }

    const body = (await req.json()) as AddPhoneRequest;
    const { lafId, phoneNumber } = body || {};
    if (!lafId) {
      return new Response(JSON.stringify({ error: "invalid request" }), { status: 400 });
    }

    const doc = await writeClient.fetch(
      `*[_id == $id && _type == "lostAndFound"][0]{ _id, found, entries, phoneNumbers }`,
      { id: lafId }
    );

    if (!doc) {
      return new Response(JSON.stringify({ error: "lostAndFound not found" }), { status: 404 });
    }

    // Only add phone number, never mark as found
    let phoneNumbersPatch: Record<string, unknown> = {};
    if (phoneNumber && typeof phoneNumber === "string" && phoneNumber.trim()) {
      const existingNumbers = Array.isArray(doc.phoneNumbers) ? doc.phoneNumbers : [];
      phoneNumbersPatch = {
        phoneNumbers: [...existingNumbers, phoneNumber.trim()],
      };
    }

    await writeClient
      .patch(lafId)
      .setIfMissing({ entries: 0, phoneNumbers: [] })
      .set({ updatedAt: new Date().toISOString(), ...phoneNumbersPatch })
      .inc({ entries: 1 })
      .commit({ autoGenerateArrayKeys: true });

    const updated = await writeClient.fetch(
      `*[_id == $id][0]{ _id, found, entries, phoneNumbers }`,
      { id: lafId }
    );

    return new Response(JSON.stringify({ ok: true, laf: updated }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "unexpected error" }), { status: 500 });
  }
}