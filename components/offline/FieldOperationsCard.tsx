"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\offline\FieldOperationsCard.tsx
//
// Timestamp:
// 2026-05-09 18:00
//
// Purpose:
// - Expedition operational visibility
// =====================================================

export default function FieldOperationsCard(){

  const systems = [

    "Offline vehicle intelligence",

    "Cached maintenance history",

    "Touring spare recommendations",

    "Offline fuel logging",

    "Deferred sync queue",

    "Offline operational notes"
  ]

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Field Operations Platform

      </div>

      {systems.map(
        (s,idx)=>(

          <div
            key={idx}

            style={{
              marginTop:"14px"
            }}
          >

            ✔ {s}

          </div>
        )
      )}

    </div>
  )
}
