"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="mx-auto max-w-5xl h-15 px-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl md:text-2xl">
          Campusly
        </Link>
        <nav className="flex items-center gap-3">
          <SignedOut>
            <div className="flex gap-3">
              <Link href="/sign-in">
                <Button>Sign in</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="secondary">Sign up</Button>
              </Link>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/feed" className="text-base hover:underline">
                  Feed
                </Link>
              </Button>
              <UserButton />
            </div>
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}