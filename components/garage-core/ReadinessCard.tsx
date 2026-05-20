"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage-core\ReadinessCard.tsx
//
// Timestamp:
// 2026-05-10 14:00
//
// Purpose:
// - Operational readiness overview
// =====================================================

export default function ReadinessCard(){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Explainable Readiness Intelligence

      </div>

      <div
        style={{
          marginTop:"18px",
          fontSize:"44px",
          fontWeight:"bold",
          color:"#36b37e"
        }}
      >

        READY

      </div>

      <div
        style={{
          marginTop:"18px",
          lineHeight:"1.6",
          color:"#5e6c84"
        }}
      >

        Vehicle currently demonstrates
        strong operational readiness
        for standard touring conditions.

      </div>

      <div
        style={{
          marginTop:"20px",
          padding:"14px",
          borderRadius:"10px",
          background:"#f4f5f7"
        }}
      >

        <strong>

          Readiness Factors

        </strong>

        <div style={{marginTop:"12px"}}>

          ✔ Recent cooling maintenance

        </div>

        <div style={{marginTop:"8px"}}>

          ✔ Current registration active

        </div>

        <div style={{marginTop:"8px"}}>

          ✔ No critical drivetrain alerts

        </div>

        <div style={{marginTop:"8px"}}>

          ⚠ Cooling hoses ageing

        </div>

      </div>

    </div>
  )
}
