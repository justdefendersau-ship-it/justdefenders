"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\design-system\OperationalHeader.tsx
//
// Timestamp:
// 2026-05-09 10:30
//
// Purpose:
// - Unified operational page header
// =====================================================

export default function OperationalHeader({

  title,

  subtitle

}:any){

  return (

    <div className="jd-operational-header">

      <div>

        <div className="jd-title">

          {title}

        </div>

        <div style={{
          marginTop:"8px",
          color:"#5e6c84"
        }}>

          {subtitle}

        </div>

      </div>

    </div>
  )
}
