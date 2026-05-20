"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\design-system\DashboardCard.tsx
//
// Timestamp:
// 2026-05-08 10:30
//
// Purpose:
// - Unified dashboard card
// =====================================================

export default function DashboardCard({

  title,

  children,

  alertType

}:any){

  let alertClass = ""

  if(alertType === "critical"){

    alertClass =
      "jd-alert-critical"
  }

  if(alertType === "warning"){

    alertClass =
      "jd-alert-warning"
  }

  if(alertType === "success"){

    alertClass =
      "jd-alert-success"
  }

  return (

    <div className={`jd-card ${alertClass}`}>

      <div className="jd-subtitle">

        {title}

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        {children}

      </div>

    </div>
  )
}
