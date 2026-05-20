"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\observability\SearchAnalyticsCard.tsx
//
// Timestamp:
// 2026-05-09 15:00
//
// Purpose:
// - Search intelligence analytics
// =====================================================

export default function SearchAnalyticsCard(){

  const searches = [

    "Td5 fuel pressure regulator",

    "Puma intercooler hose",

    "Defender coolant hose kit",

    "LT230 transfer spline"
  ]

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Search Intelligence

      </div>

      {searches.map(
        (s,idx)=>(

          <div
            key={idx}

            style={{
              marginTop:"14px"
            }}
          >

            {s}

          </div>
        )
      )}

    </div>
  )
}
