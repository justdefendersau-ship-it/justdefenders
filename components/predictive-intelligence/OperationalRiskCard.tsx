"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\predictive-intelligence\OperationalRiskCard.tsx
//
// Timestamp:
// 2026-05-09 12:15
//
// Purpose:
// - Operational risk intelligence
// =====================================================

export default function OperationalRiskCard({

  risks

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Operational Risk Intelligence

      </div>

      {risks.map(
        (r:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"18px",
              padding:"16px",
              border:"1px solid #eee",
              borderRadius:"10px"
            }}
          >

            <div style={{
              fontWeight:"bold"
            }}>

              {r.type.toUpperCase()}

            </div>

            <div style={{
              marginTop:"8px"
            }}>

              {r.message}

            </div>

            <div style={{
              marginTop:"10px",
              color:"#5e6c84"
            }}>

              {r.recommendation}

            </div>

          </div>
        )
      )}

    </div>
  )
}
