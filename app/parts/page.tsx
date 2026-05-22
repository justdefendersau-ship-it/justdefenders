/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\parts\page.tsx
 *
 * Timestamp:
 * 21 May 2026 09:48 Sydney
 *
 * PURPOSE:
 * Operational Procurement Workspace
 *
 * STRATEGY:
 * PASS 16A — Saved Procurement Lists Infrastructure
 *
 * ============================================================
 */

"use client"

import {
  useState
} from "react"

import ProcurementSearchHero
from "@/components/procurement/ProcurementSearchHero"

import TacticalSupplierResultsTable
from "@/components/procurement/TacticalSupplierResultsTable"

import TacticalFitmentSidebar
from "@/components/procurement/TacticalFitmentSidebar"

import ProcurementListDrawer
from "@/components/procurement/ProcurementListDrawer"

import {
  ProcurementProvider
} from "@/contexts/ProcurementContext"

import {
  ProcurementListProvider
} from "@/contexts/ProcurementListContext"

// ============================================================
// PAGE
// ============================================================

export default function PartsPage(){

  const [

    searchTerm,

    setSearchTerm

  ] = useState(
    "ERR3340"
  )

  const [

    procurementDrawerOpen,

    setProcurementDrawerOpen

  ] = useState(
    false
  )

  return (

    <ProcurementListProvider>

      <ProcurementProvider>

        <div
          className="
            min-h-screen
            bg-[#020617]
          "
        >

          {/* ============================================== */}
          {/* HEADER */}
          {/* ============================================== */}

          <ProcurementSearchHero />

          {/* ============================================== */}
          {/* CONTENT */}
          {/* ============================================== */}

          <div
            className="
              mx-auto
              max-w-[1800px]
              px-4
              py-3
              xl:px-4
            "
          >

            {/* ========================================== */}
            {/* PROCUREMENT ACTIONS */}
            {/* ========================================== */}

            <div
              className="
                mb-4
                flex
                justify-end
              "
            >

              <button

                onClick={() =>

                  setProcurementDrawerOpen(
                    true
                  )

                }

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
                Open Procurement List
              </button>

            </div>

            {/* ========================================== */}
            {/* GRID */}
            {/* ========================================== */}

            <div
              className="
                mt-2
                grid
                gap-4
                xl:grid-cols-[minmax(0,1fr)_360px]
              "
            >

              {/* ====================================== */}
              {/* RESULTS */}
              {/* ====================================== */}

              <div
                className="
                  min-w-0
                "
              >

                <TacticalSupplierResultsTable
                  searchTerm={searchTerm}
                />

              </div>

              {/* ====================================== */}
              {/* SIDEBAR */}
              {/* ====================================== */}

              <div
                className="
                  hidden
                  xl:block
                "
              >

                <div
                  className="
                    sticky
                    top-[120px]
                  "
                >

                  <TacticalFitmentSidebar />

                </div>

              </div>

            </div>

          </div>

          {/* ========================================== */}
          {/* DRAWER */}
          {/* ========================================== */}

          <ProcurementListDrawer

            open={procurementDrawerOpen}

            onClose={() =>

              setProcurementDrawerOpen(
                false
              )

            }

          />

        </div>

      </ProcurementProvider>

    </ProcurementListProvider>
  )
}