/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\parts\intelligence\[sku]\page.tsx
 *
 * Timestamp:
 * 21 May 2026 09:28 Sydney
 *
 * PURPOSE:
 * Part Intelligence Drill-Down Route
 *
 * STRATEGY:
 * PASS 15C — Part Intelligence Workspace
 *
 * ============================================================
 */

"use client"

import {
  useParams
} from "next/navigation"

import Link from "next/link"

import PartIntelligenceWorkspace
from "@/components/procurement/PartIntelligenceWorkspace"

import {
  getPartIntelligence
} from "@/lib/procurement/getPartIntelligence"

// ============================================================
// PAGE
// ============================================================

export default function PartIntelligencePage(){

  const params =
    useParams()

  const sku =

    String(
      params?.sku || ""
    )

  const part =

    getPartIntelligence(
      sku
    )

  // ==========================================================
  // NOT FOUND
  // ==========================================================

  if (
    !part
  ) {

    return (

      <div
        className="
          min-h-screen
          bg-[#020617]
          text-white
        "
      >

        <div
          className="
            mx-auto
            max-w-[1400px]
            px-6
            py-10
          "
        >

          <Link
            href="/parts"
            className="
              text-sm
              text-[#60A5FA]
            "
          >
            ← Back to Results
          </Link>

          <div
            className="
              mt-8
              rounded-2xl
              border
              border-slate-800
              bg-[#081122]
              p-10
            "
          >

            <h1
              className="
                text-3xl
                font-black
              "
            >
              Part Not Found
            </h1>

            <p
              className="
                mt-4
                text-slate-400
              "
            >
              Unable to locate
              procurement intelligence.
            </p>

          </div>

        </div>

      </div>
    )
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div
      className="
        min-h-screen
        bg-[#020617]
      "
    >

      <PartIntelligenceWorkspace
        part={part}
      />

    </div>
  )
}