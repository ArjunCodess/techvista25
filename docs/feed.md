# Sanity Content Models

## Post (Feed Item)
Used for announcements, events, exam notices, or club activities.

**Fields:**
- `createdAt` — datetime (auto, required)
- `updatedAt` — datetime (auto, required)
- `content` — text (main body of post)
- `tags` — array of strings (multiple tags)
- `organisation` — reference → `organisation` (one, reusable)
- `classes` — array of strings (multiple class/year/section references)
- `filesMedia` — array of file uploads (optional)
  - **If image** → render normally in feed
  - **If video** → show preview thumbnail, play on click
  - **If document** → show filename + download link

---

## Lost & Found
Items students report lost or found on campus.

**Fields:**
- `lost` — string (title, e.g. *Blue Water Bottle*)
- `content` — text (details, description, where last seen)
- `found` — boolean (true = already found → don’t show; false = still lost → show)
- `createdAt` — datetime (auto, required)
- `updatedAt` — datetime (auto, required)

---

## Polls
Polls created by admin/organisation for events, decisions, or feedback.

**Fields:**
- `title` — string (poll question)
- `description` — text (optional, extra context)
- `options` — array of objects (min 2, max 10)
  - `content` — string (option text)

---

## Chat (SOON)
To be stored in Convex (not Sanity).

**Notes:**
- Chat threads + messages will live in Convex DB
- Sanity will not handle chat persistence