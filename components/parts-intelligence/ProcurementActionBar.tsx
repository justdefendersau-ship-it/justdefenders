"use client";

// =====================================================
// JustDefenders ©
// File:
// /components/parts-intelligence/ProcurementActionBar.tsx
//
// Timestamp:
// 11 May 2026 14:35 (Sydney)
//
// PURPOSE:
// Operational commerce workflow actions
// =====================================================

import React
from "react"

// =====================================================
// COMPONENT
// =====================================================

export default function ProcurementActionBar({

  partNumber,
  vehicleModel,
  route = "Global"

}:any){

  return (

    <div className="jd-procurement-shell">

      {/* ============================================= */}
      {/* PRIMARY */}
      {/* ============================================= */}

      <button className="jd-primary-button">

        Add To Touring Loadout

      </button>

      <button className="jd-primary-button">

        Compare Suppliers

      </button>

      {/* ============================================= */}
      {/* SECONDARY */}
      {/* ============================================= */}

      <button className="jd-secondary-button">

        Save Expedition Build

      </button>

      <button className="jd-secondary-button">

        Create Procurement List

      </button>

      {/* ============================================= */}
      {/* INFO */}
      {/* ============================================= */}

      <div className="jd-procurement-meta">

        Vehicle:

        {" "}

        <strong>

          {vehicleModel}

        </strong>

        {" | "}

        Route:

        {" "}

        <strong>

          {route}

        </strong>

      </div>

    </div>
  )
}
