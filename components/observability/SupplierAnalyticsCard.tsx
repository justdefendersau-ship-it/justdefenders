"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\observability\SupplierAnalyticsCard.tsx
//
// Timestamp:
// 2026-05-09 15:00
//
// Purpose:
// - Supplier operational analytics
// =====================================================

export default function SupplierAnalyticsCard(){

  const suppliers = [

    {
      name:"MR Automotive",
      searches:42
    },

    {
      name:"All Four x 4",
      searches:31
    },

    {
      name:"British4WD",
      searches:18
    }
  ]

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Supplier Analytics

      </div>

      {suppliers.map(
        (s:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"18px"
            }}
          >

            <div style={{
              fontWeight:"bold"
            }}>

              {s.name}

            </div>

            <div style={{
              marginTop:"6px"
            }}>

              Search Visibility:
              {" "}
              {s.searches}

            </div>

          </div>
        )
      )}

    </div>
  )
}
