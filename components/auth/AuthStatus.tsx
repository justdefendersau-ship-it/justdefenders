/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\auth\AuthStatus.tsx
 *
 * Timestamp:
 * 21 May 2026 11:24 Sydney
 *
 * PURPOSE:
 * Authentication Session Status
 *
 * STRATEGY:
 * PASS 17C — Protected Routes + Session UX
 *
 * ============================================================
 */

"use client"

import Link from "next/link"

import {
  LogOut,
  ShieldCheck
} from "lucide-react"

import {
  useRouter
} from "next/navigation"

import {
  useAuth
} from "@/contexts/AuthContext"

import {
  supabase
} from "@/lib/supabase/client"

// ============================================================
// COMPONENT
// ============================================================

export default function AuthStatus(){

  const {

    session,

    loading

  } = useAuth()

  const router =
    useRouter()

  // ==========================================================
  // SIGN OUT
  // ==========================================================

  async function handleLogout(){

    await supabase.auth
      .signOut()

    router.push("/login")
  }

  // ==========================================================
  // LOADING
  // ==========================================================

  if (
    loading
  ) {

    return (

      <div
        className="
          text-sm
          text-slate-500
        "
      >
        Loading...
      </div>
    )
  }

  // ==========================================================
  // AUTHENTICATED
  // ==========================================================

  if (
    session
  ) {

    return (

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <div
          className="
            hidden
            items-center
            gap-2
            rounded-full
            border
            border-slate-700
            bg-[#081122]
            px-4
            py-2
            text-sm
            text-slate-300
            lg:flex
          "
        >

          <ShieldCheck
            className="
              h-4
              w-4
              text-[#4ADE80]
            "
          />

          {

            session.user.email
          }

        </div>

        <button

          onClick={handleLogout}

          className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-slate-700
            px-4
            py-2
            text-sm
            font-bold
            text-slate-300
            transition-all
            hover:border-red-500
            hover:text-red-300
          "
        >

          <LogOut
            className="
              h-4
              w-4
            "
          />

          Sign Out

        </button>

      </div>
    )
  }

  // ==========================================================
  // GUEST
  // ==========================================================

  return (

    <Link
      href="/login"
      className="
        rounded-2xl
        bg-[#1D4ED8]
        px-5
        py-3
        text-sm
        font-black
        text-white
      "
    >
      Sign In
    </Link>
  )
}