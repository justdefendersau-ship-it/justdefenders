"use client";

import React from "react"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\components\garage-core\OperationalExpiryCard.tsx
//
// Timestamp:
// 2026-05-10 13:15
//
// Purpose:
// - Operational expiry intelligence
// =====================================================

export default function OperationalExpiryCard({

  expiries

}:any){

  return (

    <div className="jd-card">

      <div className="jd-subtitle">

        Operational Expiry Intelligence

      </div>

      {expiries.map(
        (e:any,idx:number)=>(

          <div
            key={idx}

            style={{
              marginTop:"20px",
              paddingBottom:"14px",
              borderBottom:"1px solid #eee"
            }}
          >

            <div
              style={{
                fontWeight:"bold"
              }}
            >

              {e.item}

            </div>

            <div
              style={{
                marginTop:"8px"
              }}
            >

              {e.provider}

            </div>

            <div
              style={{
                marginTop:"8px"
              }}
            >

              Expiry:
              {" "}
              {e.expiry}

            </div>

          </div>
        )
      )}

    </div>
  )
}
