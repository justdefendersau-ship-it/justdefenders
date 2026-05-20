"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\ownership-intelligence\OwnershipInsightsCard.tsx
//
// Timestamp:
// 2026-05-09 09:05
//
// Purpose:
// - Ownership operational intelligence
// =====================================================

export default function OwnershipInsightsCard({

  insights

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Ownership Intelligence

      </div>

      {insights.map(
        (i:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"18px",
              padding:"14px",
              border:"1px solid #eee",
              borderRadius:"10px"
            }}
          >

            <div style={{
              fontWeight:"bold"
            }}>

              {i.type.toUpperCase()}

            </div>

            <div style={{
              marginTop:"8px"
            }}>

              {i.message}

            </div>

          </div>
        )
      )}

    </div>
  )
}
