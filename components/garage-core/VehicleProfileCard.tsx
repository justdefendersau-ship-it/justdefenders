"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage-core\VehicleProfileCard.tsx
//
// Timestamp:
// 2026-05-10 13:15
//
// Purpose:
// - Vehicle operational profile
// =====================================================

export default function VehicleProfileCard({

  profile

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Vehicle Profile

      </div>

      <div style={{marginTop:"18px"}}>

        <strong>VIN:</strong>
        {" "}
        {profile.vin}

      </div>

      <div style={{marginTop:"10px"}}>

        <strong>Model:</strong>
        {" "}
        {profile.model}

      </div>

      <div style={{marginTop:"10px"}}>

        <strong>Engine:</strong>
        {" "}
        {profile.engine}

      </div>

      <div style={{marginTop:"10px"}}>

        <strong>Odometer:</strong>
        {" "}
        {profile.odometer}

      </div>

      <div style={{marginTop:"10px"}}>

        <strong>Registration:</strong>
        {" "}
        {profile.registration}

      </div>

      <div style={{marginTop:"10px"}}>

        <strong>Registration Expiry:</strong>
        {" "}
        {profile.registrationExpiry}

      </div>

    </div>
  )
}
