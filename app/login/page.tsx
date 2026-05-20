// ====================================================================
// JustDefenders ©
// File: /frontend/app/login/page.tsx
// Timestamp: 16 May 2026 16:25 Sydney
// ====================================================================

"use client"

import {
  useState
} from "react"

import {
  useRouter
} from "next/navigation"

import {
  createClient
} from "@supabase/supabase-js"

const supabase =
  createClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

export default function LoginPage() {

  const router =
    useRouter()

  const [
    email,
    setEmail
  ] = useState("")

  const [
    password,
    setPassword
  ] = useState("")

  const [
    error,
    setError
  ] = useState("")

  async function handleLogin() {

    setError("")

    const {
      error
    } = await supabase.auth.signInWithPassword({

      email,
      password
    })

    if (error) {

      setError(
        error.message
      )

      return
    }

    router.push(
      "/garage"
    )

    router.refresh()
  }

  return (

    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-black
        px-6
        text-white
      "
    >

      <div
        className="
          w-full
          max-w-xl
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-950/80
          p-10
        "
      >

        <div className="text-xs uppercase tracking-[0.35em] text-green-400">
          JUSTDEFENDERS ACCESS
        </div>

        <div className="mt-6 text-5xl font-black">
          Operational Login
        </div>

        <div className="mt-4 text-zinc-400">
          Secure access to expedition
          intelligence infrastructure.
        </div>

        <div className="mt-10 space-y-6">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              w-full
              rounded-2xl
              border
              border-zinc-700
              bg-black
              px-5
              py-4
              text-lg
              outline-none
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full
              rounded-2xl
              border
              border-zinc-700
              bg-black
              px-5
              py-4
              text-lg
              outline-none
            "
          />

          {
            error && (

              <div className="text-red-400">
                {error}
              </div>
            )
          }

          <button
            onClick={handleLogin}
            className="
              w-full
              rounded-2xl
              bg-green-500
              px-5
              py-4
              text-lg
              font-black
              text-black
              transition-all
              hover:scale-[1.02]
            "
          >

            Access Platform

          </button>

        </div>

      </div>

    </main>
  )
}