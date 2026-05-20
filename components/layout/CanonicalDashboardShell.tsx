// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\layout\CanonicalDashboardShell.tsx
// Timestamp: 16 May 2026 06:35 Sydney
// ====================================================================

"use client"

import {
  ReactNode
} from "react"

import ProductionNavigation
from "../navigation/ProductionNavigation"

import MobileBottomNavigation
from "../mobile/MobileBottomNavigation"

interface Props {

  title: string

  subtitle?: string

  children:
    ReactNode
}

export default function CanonicalDashboardShell({
  title,
  subtitle,
  children
}: Props) {

  return (

    <main
      className="
        jd-grid-background
        min-h-screen
        bg-black
        text-white
      "
    >

      <ProductionNavigation />

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-4
          pb-32
          pt-12
          md:px-8
        "
      >

        <div
          className="
            mb-12
            max-w-4xl
          "
        >

          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-xs
              uppercase
              tracking-[0.24em]
              text-green-400
            "
          >

            Operational Intelligence Platform

          </div>

          <h1
            className="
              jd-operational-heading
              text-5xl
              font-black
              tracking-tight
              text-white
              md:text-7xl
            "
          >

            {
              title
            }

          </h1>

          {
            subtitle && (

              <p
                className="
                  jd-operational-subheading
                  mt-6
                  max-w-3xl
                  text-lg
                  text-zinc-400
                "
              >

                {
                  subtitle
                }

              </p>
            )
          }

        </div>

        <div>

          {
            children
          }

        </div>

      </div>

      <MobileBottomNavigation />

    </main>
  )
}