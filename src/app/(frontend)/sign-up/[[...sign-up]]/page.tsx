'use client'

import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center p-4">
      <SignUp />
    </div>
  )
}