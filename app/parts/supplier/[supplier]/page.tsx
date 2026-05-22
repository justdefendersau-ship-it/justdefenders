# ============================================================
# JustDefenders©
# File:
# C:\dev\justdefenders\frontend\app\parts\supplier\[supplier]\page.tsx
#
# Timestamp:
# 21 May 2026 08:24 Sydney
#
# PURPOSE:
# Supplier Detail Drill Down Route
#
# STRATEGY:
# PASS 15A — Supplier Detail Workspace Routing
#
# ============================================================

"use client"

import {
  useParams
} from "next/navigation"

import Link from "next/link"

import SupplierDetailWorkspace
from "@/components/procurement/SupplierDetailWorkspace"

import {
  getSupplierDetail
} from "@/lib/procurement/getSupplierDetail"

// ============================================================
// PAGE
// ============================================================

export default function SupplierDetailPage(){

  const params =
    useParams()

  const supplierSlug =

    String(
      params?.supplier || ""
    )

  const supplier =

    getSupplierDetail(
      supplierSlug
    )

  // ==========================================================
  // NOT FOUND
  // ==========================================================

  if (
    !supplier
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
              Supplier Not Found
            </h1>

            <p
              className="
                mt-4
                text-slate-400
              "
            >
              Unable to locate
              supplier intelligence.
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

      <SupplierDetailWorkspace
        supplier={supplier}
      />

    </div>
  )
}