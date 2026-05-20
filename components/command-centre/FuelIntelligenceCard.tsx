"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\command-centre\FuelIntelligenceCard.tsx
//
// Timestamp:
// 2026-05-08 11:00
//
// Purpose:
// - Fuel intelligence visibility
// =====================================================

export default function FuelIntelligenceCard({

  fuel

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Fuel Intelligence

      </div>

      <div className="jd-metric">

        {fuel.average}
        L/100km

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        Last Refuel:
        {" "}
        {fuel.lastLocation}

      </div>

      <div style={{
        marginTop:"10px"
      }}>

        Latitude:
        {" "}
        {fuel.latitude}

      </div>

      <div style={{
        marginTop:"10px"
      }}>

        Longitude:
        {" "}
        {fuel.longitude}

      </div>

    </div>
  )
}
