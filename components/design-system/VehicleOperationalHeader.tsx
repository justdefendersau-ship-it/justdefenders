"use client";

import React from "react"

import {
  useVehicle
}
from "../../context/VehicleContext"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\design-system\VehicleOperationalHeader.tsx
//
// Timestamp:
// 2026-05-10 09:55
//
// Purpose:
// - Shared operational vehicle context
// =====================================================

export default function VehicleOperationalHeader(){

  const {

    selectedVIN

  } = useVehicle()

  return (

    <div
      className="jd-card"

      style={{
        marginBottom:"24px",
        background:"#dfe1e6"
      }}
    >

      <div className="jd-subtitle">

        Active Vehicle

      </div>

      <div
        style={{
          marginTop:"12px",
          fontWeight:"bold",
          fontSize:"20px"
        }}
      >

        {selectedVIN}

      </div>

      <div
        style={{
          marginTop:"8px",
          color:"#5e6c84"
        }}
      >

        Historical maintenance intelligence active.

      </div>

    </div>
  )
}
