"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\parts-refined\PartImageCard.tsx
//
// Timestamp:
// 2026-05-08 11:30
//
// Purpose:
// - Visual parts intelligence
// =====================================================

export default function PartImageCard({

  image,

  diagram

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Visual Parts Intelligence

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        <img
          src={image}
          alt="Part"

          style={{
            width:"100%",
            borderRadius:"10px"
          }}
        />

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        <img
          src={diagram}
          alt="Diagram"

          style={{
            width:"100%",
            borderRadius:"10px"
          }}
        />

      </div>

    </div>
  )
}
