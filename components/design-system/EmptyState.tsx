"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\design-system\EmptyState.tsx
//
// Timestamp:
// 2026-05-09 10:30
//
// Purpose:
// - Unified empty states
// =====================================================

export default function EmptyState({

  message

}:any){

  return (

    <div className="jd-empty">

      {message}

    </div>
  )
}
