"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\operational-depth\TripSeverityCard.tsx
//
// Timestamp:
// 2026-05-10 08:00
//
// Purpose:
// - Expedition severity intelligence
// =====================================================

export default function TripSeverityCard({

  trips

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Expedition Severity Intelligence

      </div>

      {trips.map(
        (t:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"18px",
              paddingBottom:"16px",
              borderBottom:"1px solid #eee"
            }}
          >

            <div
              style={{
                fontWeight:"bold"
              }}
            >

              {t.trip}

            </div>

            <div
              style={{
                marginTop:"8px"
              }}
            >

              Severity:
              {" "}
              {t.severity}

            </div>

            <div
              style={{
                marginTop:"6px"
              }}
            >

              Recovery Risk:
              {" "}
              {t.recoveryRisk}

            </div>

          </div>
        )
      )}

    </div>
  )
}
