// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\mobile\MobileBottomNavigation.tsx
// Timestamp: 15 May 2026 22:45 Sydney
// ====================================================================

"use client"

import Link from "next/link"

const navigationItems = [

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
      "Parts",

    href:
      "/parts"
  }
]

export default function MobileBottomNavigation() {

  return (

    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-zinc-800
        bg-black/95
        backdrop-blur
        md:hidden
      "
    >

      <div
        className="
          grid
          grid-cols-4
        "
      >

        {
          navigationItems.map(
            item => (

              <Link
                key={
                  item.href
                }

                href={
                  item.href
                }

                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  py-4
                  text-xs
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

      </div>

    </nav>
  )
}