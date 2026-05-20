"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\supplier-partner\OnboardingPanel.tsx
//
// Timestamp:
// 2026-05-08 09:00
//
// Purpose:
// - Supplier onboarding form
// =====================================================

export default function OnboardingPanel(){

  return (

    <div style={{
      border:"1px solid #ddd",
      borderRadius:"12px",
      padding:"24px",
      background:"#fff"
    }}>

      <div style={{
        fontSize:"26px",
        fontWeight:"bold"
      }}>

        Supplier Onboarding

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        <input
          placeholder="Supplier Name"

          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"14px"
          }}
        />

        <input
          placeholder="State"

          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"14px"
          }}
        />

        <input
          placeholder="Contact Email"

          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"14px"
          }}
        />

        <textarea
          placeholder="Inventory Capability"

          style={{
            width:"100%",
            padding:"12px",
            minHeight:"120px"
          }}
        />

        <button
          style={{
            marginTop:"20px",
            padding:"12px 20px",
            background:"#0070f3",
            color:"#fff",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer"
          }}
        >

          Submit Application

        </button>

      </div>

    </div>
  )
}
