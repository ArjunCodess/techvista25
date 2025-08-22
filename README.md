# Campusly: Your Digital Campus Companion
Campusly is a Next.js application built to streamline campus life by providing a centralized hub for announcements, polls, and a lost and found system.  It leverages Sanity CMS for content management and Clerk for user authentication.

## Features
* **Digital Notice Board:** Stay updated with the latest announcements, events, and important information.
* **Interactive Polls:** Participate in polls, share your opinion, and view real-time results.
* **Lost & Found:** Report lost items, find missing belongings, and connect with others to facilitate recovery.
* **User Authentication:** Secure user accounts via Clerk.
* **Admin Panel (Sanity Studio):**  Manage content, posts, polls and lost and found items through the integrated Sanity Studio.
* **Live Content Updates:**  Real-time updates to the feed via Sanity's live content API.

## Usage
Campusly provides a user-friendly interface for students to access key campus information.  Users can view announcements, participate in polls, report lost items, and see a unified feed. The admin panel allows authorized users to manage all content aspects.

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/ArjunCodess/techvista25.git
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Set up environment variables:** Create a `.env.local` file in the root directory and add the following, replacing placeholders with your actual values.  Obtain these values from your Sanity and Clerk projects.
    ```NEXT_PUBLIC_SANITY_PROJECT_ID=<your_sanity_project_id>
    NEXT_PUBLIC_SANITY_DATASET=<your_sanity_dataset>
    NEXT_PUBLIC_SANITY_API_VERSION=<your_sanity_api_version>
    SANITY_API_WRITE_TOKEN=<your_sanity_write_token>
    CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
    ```
4. **Run the development server:**
   ```bash
   pnpm dev
   ```

## Technologies Used
* **Next.js:** A React framework for building web applications, used for the frontend.
* **React:**  A JavaScript library for building user interfaces.
* **TypeScript:**  A superset of JavaScript that adds static typing.
* **Tailwind CSS:** A utility-first CSS framework.
* **Sanity.io:** A headless CMS used for content management.
* **@sanity/image-url:**  A package for generating image URLs from Sanity.
* **@sanity/next-sanity:** Provides integration between Next.js and Sanity.
* **Clerk:** An authentication provider.
* **Lucide:** React icon library.
* **Framer Motion:** For animations.

## API Documentation
### `/api/feedback/submit` (POST)

**Request:**

```json
{
  "feedbackId": "<feedback_id>",
  "content": "<feedback_content>"
}
```

**Response (200 OK):**

```json
{
  "ok": true,
  "feedback": { /* Updated feedback document */ }
}
```

### `/api/laf/found` (POST)

**Request:**

```json
{
  "lafId": "<laf_id>",
  "phoneNumber": "<phone_number>"
}
```

**Response (200 OK):**

```json
{
  "ok": true,
  "laf": { /* Updated lost and found document */ }
}
```

### `/api/poll/vote` (POST)

**Request:**

```json
{
  "pollId": "<poll_id>",
  "optionIndex": <option_index>
}
```

**Response (200 OK):**

```json
{
  "ok": true,
  "poll": { /* Updated poll document */ }
}
```

## Dependencies
The project dependencies are listed in `package.json`.

*README.md was made with [Etchr](https://etchr.dev)*