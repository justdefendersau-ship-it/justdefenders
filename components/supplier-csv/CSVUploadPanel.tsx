"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\supplier-csv\CSVUploadPanel.tsx
//
// Timestamp:
// 2026-05-08 08:00
//
// Purpose:
// - CSV upload panel
// =====================================================

export default function CSVUploadPanel(){

  return (

    <div style={{
      border:"1px solid #ddd",
      borderRadius:"12px",
      padding:"24px",
      background:"#fff"
    }}>

      <div style={{
        fontSize:"24px",
        fontWeight:"bold"
      }}>

        CSV Inventory Upload

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        Upload supplier inventory CSV.

      </div>

      <input
        type="file"

        style={{
          marginTop:"20px"
        }}
      />

    </div>
  )
}
