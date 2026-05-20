"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage\RecommendedPartsCard.tsx
//
// Timestamp:
// 2026-05-09 09:45
//
// Purpose:
// - Recommended operational parts
// =====================================================

export default function RecommendedPartsCard({

  parts

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Recommended Spares

      </div>

      {parts.map(
        (p:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"18px",
              padding:"12px",
              border:"1px solid #eee",
              borderRadius:"10px"
            }}
          >

            <div style={{
              fontWeight:"bold"
            }}>

              {p.name}

            </div>

            <div style={{
              marginTop:"8px"
            }}>

              {p.reason}

            </div>

          </div>
        )
      )}

    </div>
  )
}
