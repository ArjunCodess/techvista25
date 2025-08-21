'use client'

import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="mx-auto max-w-5xl h-15 px-4 flex items-center justify-between">
        <div className="font-semibold">&nbsp;</div>
        <nav className="flex items-center gap-3">
          <SignedOut>
            <Link href="/sign-in">
              <Button>Sign in</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="secondary">Sign up</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}