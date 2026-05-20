/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\parts\page.tsx
 *
 * Timestamp:
 * 20 May 2026 13:10 Sydney
 *
 * PURPOSE:
 * Operational Procurement Workspace
 *
 * STRATEGY:
 * Shared procurement orchestration layer.
 *
 * IMPORTANT:
 * ALL procurement intelligence components
 * are now synchronised via:
 * ProcurementProvider
 * ============================================================
 */

"use client"

import {
  useState
} from "react"

import ProcurementSearchHero
from "@/components/procurement/ProcurementSearchHero"

import ProcurementQuickFilters
from "@/components/procurement/ProcurementQuickFilters"

import TacticalSupplierResultsTable
from "@/components/procurement/TacticalSupplierResultsTable"

import TacticalFitmentSidebar
from "@/components/procurement/TacticalFitmentSidebar"

import {
  ProcurementProvider
} from "@/contexts/ProcurementContext"

// ============================================================
// PAGE
// ============================================================

export default function PartsPage(){

  const [

    searchInput,

    setSearchInput

  ] = useState(
    "ERR3340"
  )

  const [

    activeSearch,

    setActiveSearch

  ] = useState(
    "ERR3340"
  )

  function executeSearch(){

    setActiveSearch(
      searchInput
    )
  }

  return (

    <ProcurementProvider>

      <div
        className="
          min-h-screen
        "
        style={{
          background:
            "#020617"
        }}
      >

        {/* ================================================== */}
        {/* STICKY PROCUREMENT HEADER */}
        {/* ================================================== */}

        <div
          className="
            sticky
            top-0
            z-[100]
          "
        >

          <div
            className="
              border-b
              border-slate-800
              bg-[#020617]
              px-4
              py-4
            "
          >

            <div
              className="
                mx-auto
                flex
                max-w-[1800px]
                items-center
                gap-4
              "
            >

              <input

                value={
                  searchInput
                }

                onChange={(e)=>

                  setSearchInput(
                    e.target.value
                  )
                }

                onKeyDown={(e)=>{

                  if(
                    e.key === "Enter"
                  ){

                    executeSearch()
                  }
                }}

                placeholder="
                Search Defender parts,
                OEM numbers or suppliers...
                "

                className="
                  flex-1
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  px-5
                  py-4
                  text-white
                  outline-none
                "
              />

              <button

                onClick={
                  executeSearch
                }

                className="
                  rounded-xl
                  bg-blue-600
                  px-6
                  py-4
                  font-bold
                  text-white
                  transition-all
                  hover:bg-blue-500
                "
              >

                Search

              </button>

            </div>

          </div>

        </div>

        {/* ================================================== */}
        {/* CONTENT */}
        {/* ================================================== */}

        <div
          className="
            mx-auto
            max-w-[1800px]
            px-4
            py-5
            xl:px-6
          "
        >

          {/* ============================================== */}
          {/* FILTERS */}
          {/* ============================================== */}

          <ProcurementQuickFilters />

          {/* ============================================== */}
          {/* GRID */}
          {/* ============================================== */}

          <div
            className="
              mt-6
              grid
              gap-6
              xl:grid-cols-[minmax(0,1fr)_380px]
            "
          >

            {/* ========================================== */}
            {/* RESULTS */}
            {/* ========================================== */}

            <div
              className="
                min-w-0
              "
            >

              <TacticalSupplierResultsTable
                searchTerm={
                  activeSearch
                }
              />

            </div>

            {/* ========================================== */}
            {/* SIDEBAR */}
            {/* ========================================== */}

            <div
              className="
                hidden
                xl:block
              "
            >

              <div
                className="
                  sticky
                  top-[145px]
                "
              >

                <TacticalFitmentSidebar />

              </div>

            </div>

          </div>

        </div>

      </div>

    </ProcurementProvider>
  )
}