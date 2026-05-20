"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\predictive-intelligence\OwnershipCostCard.tsx
//
// Timestamp:
// 2026-05-09 12:15
//
// Purpose:
// - Ownership operational cost visibility
// =====================================================

export default function OwnershipCostCard({

  costs

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Ownership Cost Intelligence

      </div>

      <div className="jd-metric">

        ${costs.total}

      </div>

      <div style={{
        marginTop:"20px"
      }}>

        {Object.keys(costs.grouped).map(
          (k:any,idx:number)=>(

            <div
              key={idx}

              style={{
                marginTop:"10px"
              }}
            >

              <strong>{k}</strong>
              {" "}
              ${costs.grouped[k]}

            </div>
          )
        )}

      </div>

    </div>
  )
}
