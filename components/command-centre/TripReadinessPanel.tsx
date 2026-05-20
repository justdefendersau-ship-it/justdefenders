"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\command-centre\TripReadinessPanel.tsx
//
// Timestamp:
// 2026-05-07 20:00
//
// Purpose:
// - Trip-readiness intelligence
// =====================================================

export default function TripReadinessPanel(){

  const readiness = [

    "Cooling system inspection recommended",

    "Spare hoses recommended",

    "Battery condition healthy",

    "Fuel range acceptable"
  ]

  return (

    <div style={{
      border:"1px solid #ddd",
      borderRadius:"12px",
      padding:"24px",
      background:"#fff"
    }}>

      <div style={{
        fontSize:"24px",
        fontWeight:"bold"
      }}>

        Trip Readiness

      </div>

      {readiness.map(
        (r,idx)=>(

          <div
            key={idx}

            style={{
              marginTop:"16px"
            }}
          >

            • {r}

          </div>
        )
      )}

    </div>
  )
}
