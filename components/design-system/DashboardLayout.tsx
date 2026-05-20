"use client";

import React from "react"

import "../../styles/dashboard-framework.css"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\design-system\DashboardLayout.tsx
//
// Timestamp:
// 2026-05-08 10:30
//
// Purpose:
// - Unified operational layout
// =====================================================

export default function DashboardLayout({

  title,

  children

}:any){

  return (

    <div className="jd-page">

      <div className="jd-title">

        {title}

      </div>

      <div className="jd-grid">

        {children}

      </div>

    </div>
  )
}
