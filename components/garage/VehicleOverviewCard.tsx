"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage\VehicleOverviewCard.tsx
//
// Timestamp:
// 2026-05-09 09:45
//
// Purpose:
// - Unified ownership vehicle overview
// =====================================================

export default function VehicleOverviewCard({

  vehicle

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        {vehicle.model}

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        <div>

          <strong>VIN:</strong>
          {" "}
          {vehicle.vin}

        </div>

        <div style={{
          marginTop:"10px"
        }}>

          <strong>Engine:</strong>
          {" "}
          {vehicle.engine}

        </div>

        <div style={{
          marginTop:"10px"
        }}>

          <strong>Year:</strong>
          {" "}
          {vehicle.year}

        </div>

        <div style={{
          marginTop:"10px"
        }}>

          <strong>Odometer:</strong>
          {" "}
          {vehicle.odometer}
          km

        </div>

        <div style={{
          marginTop:"18px",
          color:"#5e6c84"
        }}>

          {vehicle.notes}

        </div>

      </div>

    </div>
  )
}
