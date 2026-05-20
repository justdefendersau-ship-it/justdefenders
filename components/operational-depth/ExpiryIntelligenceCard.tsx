"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\operational-depth\ExpiryIntelligenceCard.tsx
//
// Timestamp:
// 2026-05-10 08:00
//
// Purpose:
// - Registration and insurance intelligence
// =====================================================

export default function ExpiryIntelligenceCard({

  data

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Operational Expiry Intelligence

      </div>

      <div style={{
        marginTop:"18px"
      }}>

        <strong>Registration:</strong>
        {" "}
        {data.registration.expiry}

      </div>

      <div style={{
        marginTop:"12px"
      }}>

        <strong>Insurance:</strong>
        {" "}
        {data.insurance.expiry}

      </div>

      <div style={{
        marginTop:"12px"
      }}>

        <strong>Roadside Assistance:</strong>
        {" "}
        {data.roadside.expiry}

      </div>

      <div style={{
        marginTop:"12px"
      }}>

        <strong>Provider:</strong>
        {" "}
        {data.roadside.provider}

      </div>

    </div>
  )
}
