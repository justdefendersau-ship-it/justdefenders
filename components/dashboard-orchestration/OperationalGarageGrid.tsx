"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\dashboard-orchestration\OperationalGarageGrid.tsx
//
// Timestamp:
// 2026-05-10 14:00
//
// Purpose:
// - Dense operational dashboard orchestration
// - Multi-column operational layout
// - Future drag/drop preparation
// =====================================================

export default function OperationalGarageGrid({

  left,

  centre,

  right

}:any){

  return (

    <div
      style={{
        display:"grid",

        gridTemplateColumns:
          "1.2fr 1.5fr 1fr",

        gap:"24px",

        alignItems:"start",

        marginTop:"30px"
      }}
    >

      {/* LEFT */}

      <div
        style={{
          display:"flex",
          flexDirection:"column",
          gap:"24px"
        }}
      >

        {left}

      </div>

      {/* CENTRE */}

      <div
        style={{
          display:"flex",
          flexDirection:"column",
          gap:"24px"
        }}
      >

        {centre}

      </div>

      {/* RIGHT */}

      <div
        style={{
          display:"flex",
          flexDirection:"column",
          gap:"24px"
        }}
      >

        {right}

      </div>

    </div>
  )
}
