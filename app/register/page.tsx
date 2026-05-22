/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\register\page.tsx
 *
 * Timestamp:
 * 21 May 2026 10:52 Sydney
 *
 * PURPOSE:
 * Registration Page
 *
 * STRATEGY:
 * PASS 17A — Authentication Foundation
 *
 * ============================================================
 */

"use client"

import {
  useState
} from "react"

import {
  useRouter
} from "next/navigation"

import Link from "next/link"

import {
  supabase
} from "@/lib/supabase/client"

// ============================================================
// PAGE
// ============================================================

export default function RegisterPage(){

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

    loading,

    setLoading

  ] = useState(false)

  const [

    error,

    setError

  ] = useState("")

  // ==========================================================
  // REGISTER
  // ==========================================================

  async function handleRegister(){

    setLoading(true)

    setError("")

    const {

      error

    } =

      await supabase.auth
        .signUp({

          email,

          password
        })

    if (
      error
    ) {

      setError(
        error.message
      )

      setLoading(false)

      return
    }

    router.push("/login")
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#020617]
        px-6
      "
    >

      <div
        className="
          w-full
          max-w-[480px]
          rounded-3xl
          border
          border-slate-800
          bg-[#081122]
          p-8
        "
      >

        <div
          className="
            text-center
          "
        >

          <h1
            className="
              text-4xl
              font-black
              text-white
            "
          >
            JustDefenders©
          </h1>

          <div
            className="
              mt-2
              text-slate-400
            "
          >
            Create Operational Account
          </div>

        </div>

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <div
          className="
            mt-8
            space-y-5
          "
        >

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
              border-slate-700
              bg-[#020617]
              px-4
              py-4
              text-white
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
              border-slate-700
              bg-[#020617]
              px-4
              py-4
              text-white
              outline-none
            "
          />

          {

            error

            &&

            <div
              className="
                rounded-2xl
                border
                border-red-900
                bg-red-950/30
                px-4
                py-3
                text-sm
                text-red-300
              "
            >
              {error}
            </div>
          }

          <button

            onClick={handleRegister}

            disabled={loading}

            className="
              w-full
              rounded-2xl
              bg-[#1D4ED8]
              px-5
              py-4
              text-sm
              font-black
              text-white
            "
          >

            {

              loading

              ?

              "Creating Account..."

              :

              "Create Account"
            }

          </button>

        </div>

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <div
          className="
            mt-6
            text-center
            text-sm
            text-slate-400
          "
        >

          Already registered?

          {" "}

          <Link
            href="/login"
            className="
              text-[#60A5FA]
            "
          >
            Sign In
          </Link>

        </div>

      </div>

    </div>
  )
}