"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage\TripReadinessCard.tsx
//
// Timestamp:
// 2026-05-09 09:45
//
// Purpose:
// - Touring readiness visibility
// =====================================================

export default function TripReadinessCard({

  readiness

}:any){

  const colour =

    readiness.score >= 85
    ? "#36b37e"
    : readiness.score >= 65
    ? "#ffab00"
    : "#de350b"

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Trip Readiness

      </div>

      <div style={{

        marginTop:"24px",

        fontSize:"56px",

        fontWeight:"bold",

        color:colour
      }}>

        {readiness.score}%

      </div>

      <div style={{
        marginTop:"18px"
      }}>

        {readiness.message}

      </div>

    </div>
  )
}
