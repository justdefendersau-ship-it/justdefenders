"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\observability\ObservabilityCard.tsx
//
// Timestamp:
// 2026-05-09 15:00
//
// Purpose:
// - Platform observability visibility
// =====================================================

export default function ObservabilityCard({

  metrics

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Platform Observability

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        <div>

          <strong>Total Events:</strong>
          {" "}
          {metrics.totalEvents}

        </div>

        <div style={{
          marginTop:"10px"
        }}>

          <strong>Search Events:</strong>
          {" "}
          {metrics.searches}

        </div>

        <div style={{
          marginTop:"10px"
        }}>

          <strong>Workflow Failures:</strong>
          {" "}
          {metrics.workflowFailures}

        </div>

        <div style={{
          marginTop:"10px"
        }}>

          <strong>Mobile Usage:</strong>
          {" "}
          {metrics.mobileUsage}

        </div>

      </div>

    </div>
  )
}
