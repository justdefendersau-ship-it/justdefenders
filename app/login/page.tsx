'use client'

// JustDefenders ©
// File: /app/login/page.tsx
// Timestamp: 30 March 2026 05:25

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const [email, setEmail] = useState('')

  async function signIn() {
    await supabase.auth.signInWithOtp({
      email,
    })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <div className="bg-gray-900 p-6 rounded-xl w-[320px]">
        <h1 className="text-lg mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={signIn}
          className="w-full bg-blue-600 p-2 rounded"
        >
          Send Magic Link
        </button>
      </div>
    </div>
  )
}