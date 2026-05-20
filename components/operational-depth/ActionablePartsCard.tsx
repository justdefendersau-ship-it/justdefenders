"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\operational-depth\ActionablePartsCard.tsx
//
// Timestamp:
// 2026-05-10 08:00
//
// Purpose:
// - Actionable supplier workflows
// =====================================================

export default function ActionablePartsCard({

  parts

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Actionable Operational Parts

      </div>

      {parts.map(
        (p:any,idx:number)=>(

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

              {p.part}

            </div>

            <div
              style={{
                marginTop:"8px"
              }}
            >

              {p.description}

            </div>

            <div
              style={{
                marginTop:"8px"
              }}
            >

              Supplier:
              {" "}
              {p.supplier}

            </div>

            <button
              style={{
                marginTop:"12px",
                padding:"10px 14px",
                borderRadius:"8px",
                border:"none",
                cursor:"pointer"
              }}
            >

              {p.action}

            </button>

          </div>
        )
      )}

    </div>
  )
}
