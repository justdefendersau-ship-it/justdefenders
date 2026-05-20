// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\navigation\ProductionNavigation.tsx
// Timestamp: 16 May 2026 06:35 Sydney
// ====================================================================

"use client"

import Link from "next/link"

const navigation = [

  {
    label:
      "Garage",

    href:
      "/garage"
  },

  {
    label:
      "Suppliers",

    href:
      "/suppliers"
  },

  {
    label:
      "Operations",

    href:
      "/dashboard"
  },

  {
    label:
      "Platform",

    href:
      "/"
  }
]

export default function ProductionNavigation() {

  return (

    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-white/5
        bg-black/80
        backdrop-blur-xl
      "
    >

      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-4
          py-5
          md:px-8
        "
      >

        <Link
          href="/"

          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              h-3
              w-3
              rounded-full
              bg-green-500
              shadow-[0_0_20px_rgba(34,197,94,0.8)]
            "
          />

          <div>

            <div
              className="
                text-xl
                font-black
                tracking-tight
                text-white
              "
            >

              JustDefenders

            </div>

            <div
              className="
                text-[11px]
                uppercase
                tracking-[0.25em]
                text-zinc-500
              "
            >

              Operational Intelligence

            </div>

          </div>

        </Link>

        <nav
          className="
            hidden
            items-center
            gap-8
            md:flex
          "
        >

          {
            navigation.map(
              item => (

                <Link
                  key={
                    item.href
                  }

                  href={
                    item.href
                  }

                  className="
                    text-sm
                    font-medium
                    text-zinc-400
                    transition
                    hover:text-white
                  "
                >

                  {
                    item.label
                  }

                </Link>
              )
            )
          }

        </nav>

        <div
          className="
            hidden
            items-center
            gap-3
            md:flex
          "
        >

          <div
            className="
              h-2
              w-2
              rounded-full
              bg-green-500
            "
          />

          <div
            className="
              text-xs
              uppercase
              tracking-[0.2em]
              text-green-400
            "
          >

            Platform Online

          </div>

        </div>

      </div>

    </header>
  )
}