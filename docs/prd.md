# **Product Requirements Document (PRD)**

**Project Name:** A Campus Companion
**Platform:** Web-first (mobile responsive)
**Tech Stack:** Next.js 15, TypeScript, shadcn/ui, Sanity CMS

---

## **1. Goal & Vision**

Students are drowning in scattered campus information: WhatsApp groups, notice boards, word-of-mouth.
**Goal:** Centralize core campus utilities in one lightweight, student-friendly app.
**Vision:** Become the go-to digital companion for navigating campus, staying informed, and participating in student life.

---

## **2. Core Value Proposition**

* **Save time:** One place for events, notices, and info.
* **Increase engagement:** Polls, Q\&A, real-time updates.
* **Reduce friction:** No more digging through messy WhatsApp chats or paper boards.

---

## **3. Users**

* **Primary:** Students (daily users, mobile-first behavior)
* **Secondary:** Teachers / admin (posting notices, announcements)
* **Tertiary:** Clubs & councils (polls, events, activities)

---

## **4. V1 – Features (Ship in 24 Hours)**

Keep it brutally lean. These features give **immediate value** and can be delivered with the given stack fast.

### **4.1 Digital Notice Board**

* Content managed via Sanity CMS.
* Categories: “Announcements,” “Events,” “Exams,” “Clubs.”
* Display as feed cards with timestamps.
* MVP: Read-only, no posting from students (admins only).

### **4.2 Interactive Map (Static V1)**

* Embed a **clickable campus map image**.
* Hover/click → modal showing room/area info.
* Tag certain areas with **event labels** (pulled from CMS).
* MVP: Not a live map, just clickable hotspots.

### **4.3 Polls**

* Admins can create a poll (question + options).
* Students can vote once per poll (session-based auth, no login needed in v1).
* Poll results displayed instantly as percentages.

### **4.4 Lost & Found (Listings)**

* Students can post simple entries: “Lost” or “Found” + item + description + contact.
* Posts displayed in a feed, filterable by category.
* MVP: No media upload in v1, just text.

---

## **5. V2 (Stretch – Not in 24h, but Next in Line)**

If time allows or for post-hackathon iteration:

* **Peer Support Q\&A / Chat** (needs moderation → can wait).
* **Push Notifications / Email Alerts** (reminders for events, deadlines).
* **Image upload for Lost & Found.**
* **Live event highlights on map** (requires integration, so later).

---

## **6. User Flow (Example)**

1. Student lands on homepage.

   * Sees “Notice Board” feed.
2. Clicks “Map.”

   * Sees campus layout. “Sports Day – Main Field” highlighted.
3. Scrolls down → poll widget → votes for farewell theme.
4. Switches to “Lost & Found.”

   * Spots a listing: “Lost – Blue Water Bottle.”

---

## **7. Architecture & Stack**

* **Frontend:** Next.js + TypeScript + shadcn/ui
* **CMS:** Sanity (stores notices, polls, lost/found posts, event tags for map)
* **Database:** Sanity (no separate DB needed for V1)
* **Auth:** Skip for v1 → allow anonymous voting + posting (basic input validation).

---

## **8. UI/UX Guidelines**

* **Clean, card-based design** (feed style).
* **Mobile-first layouts.**
* **Navigation Tabs:** Home (Notices), Map, Polls, Lost & Found.
* **Colors:** School/college theme (customizable via config).
* **Tone:** Friendly but functional.

---

## **9. KPIs for V1**

* **Engagement:** Daily active users / total students.
* **Utility:** # of notices read, # of poll votes, # of lost/found posts.
* **Adoption:** How many students open it at least once/day.

---

## **10. Risks & Assumptions**

* Risk: Students spam Lost & Found → solution: text-only moderation.
* Risk: Adoption low if not pushed → need strong first launch with real data (not demo filler).
* Assumption: Admins/teachers willing to maintain notices via CMS.

---

## **11. Brutal Priority (24h Shipping Order)**

1. **Notice Board (CMS-powered)** – non-negotiable, gives instant value.
2. **Static Interactive Map** – lightweight, wow factor.
3. **Polls (CMS-driven)** – fun, engages students.
4. **Lost & Found Feed** – easy to build, practical.

---

### **Deliverable in 24h:**

A functional web app where a student can:

* Read latest notices.
* See campus map + tagged events.
* Vote in polls.
* Post/read lost & found.