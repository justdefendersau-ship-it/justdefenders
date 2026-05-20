/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalSearchBar.tsx
 *
 * Timestamp:
 * 17 May 2026 15:15 Sydney
 *
 * PURPOSE:
 * Tactical Search Interface
 * ============================================================
 */

"use client"

import {
  Search,
  SlidersHorizontal
} from "lucide-react"

import TacticalButton from "./TacticalButton"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// TYPES
// ============================================================

interface TacticalSearchBarProps {

  selectedVehicle: string

  setSelectedVehicle: (
    value: string
  ) => void

  placeholder?: string

  onSearch?: (
    value: string
  ) => void
}

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalSearchBar({

  selectedVehicle,

  setSelectedVehicle,

  placeholder = "Search vehicle or part...",

  onSearch

}: TacticalSearchBarProps){

  // ==========================================================
  // HANDLERS
  // ==========================================================

  function handleSearch(){

    if(onSearch){

      onSearch(
        selectedVehicle
      )
    }
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        p-4
        lg:flex-row
        lg:items-center
      "

      style={{
        background:
          tacticalColors.surfaceElevated,

        borderColor:
          tacticalColors.border
      }}
    >

      {/* ==================================================== */}
      {/* SEARCH INPUT */}
      {/* ==================================================== */}

      <div
        className="
          relative
          flex-1
        "
      >

        <Search
          size={18}

          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
          "

          style={{
            color:
              tacticalColors.textMuted
          }}
        />

        <input

          type="text"

          value={selectedVehicle}

          onChange={(e)=>{

            setSelectedVehicle(
              e.target.value
            )
          }}

          placeholder={placeholder}

          className="
            w-full
            rounded-xl
            border
            py-3
            pl-11
            pr-4
            text-sm
            outline-none
            transition-all
          "

          style={{

            background:
              tacticalColors.surface,

            borderColor:
              tacticalColors.border,

            color:
              tacticalColors.textPrimary
          }}
        />

      </div>

      {/* ==================================================== */}
      {/* ACTIONS */}
      {/* ==================================================== */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <TacticalButton
          variant="secondary"
        >

          <SlidersHorizontal
            size={16}
          />

          Filters

        </TacticalButton>

        <TacticalButton
          onClick={handleSearch}
        >

          <Search
            size={16}
          />

          Search

        </TacticalButton>

      </div>

    </div>
  )
}