"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\pilot-readiness\PilotReadinessCard.tsx
//
// Timestamp:
// 2026-05-09 13:00
//
// Purpose:
// - Pilot operational readiness visibility
// =====================================================

export default function PilotReadinessCard({

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

        Pilot Readiness

      </div>

      <div
        className="jd-metric"

        style={{
          color:colour
        }}
      >

        {readiness.score}%

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        <div>

          <strong>Completed:</strong>
          {" "}
          {readiness.completed}

        </div>

        <div style={{
          marginTop:"10px"
        }}>

          <strong>Failed:</strong>
          {" "}
          {readiness.failed}

        </div>

        <div style={{
          marginTop:"10px"
        }}>

          <strong>Total:</strong>
          {" "}
          {readiness.total}

        </div>

      </div>

    </div>
  )
}
