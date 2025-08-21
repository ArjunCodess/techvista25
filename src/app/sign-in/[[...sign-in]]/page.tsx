'use client'

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center p-4">
      <SignIn />
    </div>
  )
}