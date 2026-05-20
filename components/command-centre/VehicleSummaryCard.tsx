"use client";

import React from "react"

import "../..//styles/dashboard-framework.css"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\command-centre\VehicleSummaryCard.tsx
//
// Timestamp:
// 2026-05-08 11:00
//
// Purpose:
// - Vehicle operational overview
// =====================================================

export default function VehicleSummaryCard({

  vehicle

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Vehicle Overview

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        <div>

          <strong>VIN:</strong>
          {" "}
          {vehicle.vin}

        </div>

        <div style={{
          marginTop:"12px"
        }}>

          <strong>Model:</strong>
          {" "}
          {vehicle.model}

        </div>

        <div style={{
          marginTop:"12px"
        }}>

          <strong>Engine:</strong>
          {" "}
          {vehicle.engine}

        </div>

        <div style={{
          marginTop:"12px"
        }}>

          <strong>Odometer:</strong>
          {" "}
          {vehicle.odometer}
          km

        </div>

      </div>

    </div>
  )
}
