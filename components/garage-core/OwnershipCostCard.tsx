"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage-core\OwnershipCostCard.tsx
//
// Timestamp:
// 2026-05-10 13:15
//
// Purpose:
// - Ownership operational costs
// =====================================================

export default function OwnershipCostCard({

  costs

}:any){

  const total =

    costs.insurance +
    costs.registration +
    costs.roadside +
    costs.servicing +
    costs.fuelEstimate

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Ownership Cost Intelligence

      </div>

      <div
        style={{
          marginTop:"16px",
          fontSize:"42px",
          fontWeight:"bold"
        }}
      >

        ${total}

      </div>

      <div style={{marginTop:"18px"}}>

        Insurance:
        {" "}
        ${costs.insurance}

      </div>

      <div style={{marginTop:"10px"}}>

        Registration:
        {" "}
        ${costs.registration}

      </div>

      <div style={{marginTop:"10px"}}>

        Roadside:
        {" "}
        ${costs.roadside}

      </div>

      <div style={{marginTop:"10px"}}>

        Servicing:
        {" "}
        ${costs.servicing}

      </div>

      <div style={{marginTop:"10px"}}>

        Fuel Estimate:
        {" "}
        ${costs.fuelEstimate}

      </div>

    </div>
  )
}
