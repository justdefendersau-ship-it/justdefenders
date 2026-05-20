"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\command-centre\VehicleHealthCard.tsx
//
// Timestamp:
// 2026-05-07 20:00
//
// Purpose:
// - Vehicle health summary
// =====================================================

export default function VehicleHealthCard({

  healthScore,

  riskScore

}:any){

  return (

    <div style={{
      border:"1px solid #ddd",
      borderRadius:"12px",
      padding:"24px",
      background:"#fff"
    }}>

      <div style={{
        fontSize:"28px",
        fontWeight:"bold"
      }}>

        Vehicle Health

      </div>

      <div style={{
        marginTop:"24px",
        fontSize:"48px",
        fontWeight:"bold"
      }}>

        {healthScore}%

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        Risk Score:
        {" "}
        {riskScore}%

      </div>

    </div>
  )
}
