// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\public\PublicNavigationHeader.tsx
// Timestamp: 15 May 2026 23:20 Sydney
// ====================================================================

"use client"

import Link from "next/link"

export default function PublicNavigationHeader() {

  return (

    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-zinc-900
        bg-black/90
        backdrop-blur
      "
    >

      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-8
          py-5
        "
      >

        <Link
          href="/"

          className="
            text-2xl
            font-black
            tracking-tight
          "
        >

          JustDefenders

        </Link>

        <nav
          className="
            hidden
            gap-8
            md:flex
          "
        >

          <Link
            href="/garage"

            className="
              text-zinc-400
              transition
              hover:text-white
            "
          >

            Garage

          </Link>

          <Link
            href="/suppliers"

            className="
              text-zinc-400
              transition
              hover:text-white
            "
          >

            Suppliers

          </Link>

          <Link
            href="/dashboard"

            className="
              text-zinc-400
              transition
              hover:text-white
            "
          >

            Operations

          </Link>

        </nav>

      </div>

    </header>
  )
}