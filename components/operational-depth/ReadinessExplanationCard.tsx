"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\operational-depth\ReadinessExplanationCard.tsx
//
// Timestamp:
// 2026-05-10 08:00
//
// Purpose:
// - Explainable readiness intelligence
// =====================================================

export default function ReadinessExplanationCard({

  readiness

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Explainable Readiness Intelligence

      </div>

      <div
        className="jd-metric"
      >

        {readiness.score}%

      </div>

      {readiness.reasoning.map(
        (r:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"14px"
            }}
          >

            ✔ {r}

          </div>
        )
      )}

    </div>
  )
}
