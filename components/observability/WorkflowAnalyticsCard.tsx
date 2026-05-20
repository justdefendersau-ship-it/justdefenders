"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\observability\WorkflowAnalyticsCard.tsx
//
// Timestamp:
// 2026-05-09 15:00
//
// Purpose:
// - Workflow analytics visibility
// =====================================================

export default function WorkflowAnalyticsCard(){

  const workflows = [

    {
      name:"Parts Search",
      success:94
    },

    {
      name:"Maintenance Ingestion",
      success:87
    },

    {
      name:"Fuel Logging",
      success:91
    },

    {
      name:"Supplier Lookup",
      success:76
    }
  ]

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Workflow Analytics

      </div>

      {workflows.map(
        (w:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"18px"
            }}
          >

            <div style={{
              fontWeight:"bold"
            }}>

              {w.name}

            </div>

            <div style={{
              marginTop:"6px"
            }}>

              Success Rate:
              {" "}
              {w.success}%

            </div>

          </div>
        )
      )}

    </div>
  )
}
